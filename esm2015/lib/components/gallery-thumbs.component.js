import { Component, Input, Output, HostBinding, NgZone, ElementRef, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThumbnailsPosition, ThumbnailsMode } from '../models/constants';
export class GalleryThumbsComponent {
    constructor(_el, _zone) {
        this._el = _el;
        this._zone = _zone;
        /** Sliding worker */
        this._slidingWorker$ = new BehaviorSubject({ value: 0, active: false });
        /** Current slider position in free sliding mode */
        this._freeModeCurrentOffset = 0;
        /** Stream that emits when the active item should change */
        this.action = new EventEmitter();
        /** Stream that emits when thumb is clicked */
        this.thumbClick = new EventEmitter();
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
        // Activate sliding worker
        this.sliderState$ = this._slidingWorker$.pipe(map((state) => ({
            style: this.getSliderStyles(state),
            active: state.active
        })));
    }
    ngOnChanges() {
        // Refresh the slider
        this.updateSlider({ value: 0, active: false });
        this._freeModeCurrentOffset = 0;
    }
    ngOnInit() {
        if (this.config.gestures && !this.config.disableThumb && typeof Hammer !== 'undefined') {
            let direction;
            switch (this.config.thumbPosition) {
                case ThumbnailsPosition.Right:
                case ThumbnailsPosition.Left:
                case ThumbnailsPosition.LeftTop:
                    direction = Hammer.DIRECTION_VERTICAL;
                    break;
                case ThumbnailsPosition.Top:
                case ThumbnailsPosition.Bottom:
                case ThumbnailsPosition.BottomLeft:
                    direction = Hammer.DIRECTION_HORIZONTAL;
                    break;
            }
            // Activate gestures
            this._hammer = new Hammer(this._el.nativeElement);
            this._hammer.get('pan').set({ direction });
            this._zone.runOutsideAngular(() => {
                // Move the slider
                switch (this.config.thumbMode) {
                    case ThumbnailsMode.Strict:
                        this._hammer.on('pan', (e) => this.strictMode(e));
                        break;
                    case ThumbnailsMode.Free:
                        this._hammer.on('pan', (e) => this.freeMode(e));
                }
            });
        }
    }
    ngOnDestroy() {
        if (this._hammer) {
            this._hammer.destroy();
        }
    }
    /**
     * Sliding strict mode
     */
    strictMode(e) {
        switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Right:
            case ThumbnailsPosition.Left:
            case ThumbnailsPosition.LeftTop:
                this.updateSlider({ value: e.deltaY, active: true });
                if (e.isFinal) {
                    this.updateSlider({ value: 0, active: false });
                    this.verticalPan(e);
                }
                break;
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
            case ThumbnailsPosition.BottomLeft:
                this.updateSlider({ value: e.deltaX, active: true });
                if (e.isFinal) {
                    this.updateSlider({ value: 0, active: false });
                    this.horizontalPan(e);
                }
        }
    }
    /**
     * Sliding free mode
     */
    freeMode(e) {
        switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Right:
            case ThumbnailsPosition.Left:
            case ThumbnailsPosition.LeftTop:
                this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaY, active: true });
                if (e.isFinal) {
                    if (this.minFreeScrollExceeded(e.deltaY, this.config.thumbWidth, this.config.thumbHeight)) {
                        this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbHeight;
                    }
                    else if (this.maxFreeScrollExceeded(e.deltaY, this.config.thumbHeight, this.config.thumbWidth)) {
                        this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbHeight;
                    }
                    else {
                        this._freeModeCurrentOffset += e.deltaY;
                    }
                    this.updateSlider({ value: this._freeModeCurrentOffset, active: false });
                }
                break;
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
            case ThumbnailsPosition.BottomLeft:
                this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaX, active: true });
                if (e.isFinal) {
                    if (this.minFreeScrollExceeded(e.deltaX, this.config.thumbHeight, this.config.thumbWidth)) {
                        this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbWidth;
                    }
                    else if (this.maxFreeScrollExceeded(e.deltaX, this.config.thumbWidth, this.config.thumbHeight)) {
                        this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbWidth;
                    }
                    else {
                        this._freeModeCurrentOffset += e.deltaX;
                    }
                    this.updateSlider({ value: this._freeModeCurrentOffset, active: false });
                }
        }
    }
    /**
     * Check if the minimum free scroll is exceeded (used in Bottom, Left directions)
     */
    minFreeScrollExceeded(delta, width, height) {
        return -(this._freeModeCurrentOffset + delta - width / 2) > (this.state.items.length - this.state.currIndex) * height;
    }
    /**
     * Check if the maximum free scroll is exceeded (used in Top, Right directions)
     */
    maxFreeScrollExceeded(delta, width, height) {
        return this._freeModeCurrentOffset + delta > (this.state.currIndex * width) + (height / 2);
    }
    /**
     * Convert sliding state to styles
     */
    getSliderStyles(state) {
        let value;
        switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
                this.width = '100%';
                this.height = this.config.thumbHeight + 'px';
                value = -(this.state.currIndex * this.config.thumbWidth) - (this.config.thumbWidth / 2 - state.value);
                return {
                    transform: `translate3d(${value}px, 0, 0)`,
                    width: this.state.items.length * this.config.thumbWidth + 'px',
                    height: '100%'
                };
            case ThumbnailsPosition.BottomLeft:
                this.width = '100%';
                this.height = this.config.thumbHeight + 'px';
                value = -(this.state.currIndex * this.config.thumbWidth);
                return {
                    transform: `translate3d(${value}px, 0, 0)`,
                    width: this.state.items.length * this.config.thumbWidth + 'px',
                    height: '100%'
                };
            case ThumbnailsPosition.Left:
            case ThumbnailsPosition.Right:
                this.width = this.config.thumbWidth + 'px';
                this.height = '100%';
                value = -(this.state.currIndex * this.config.thumbHeight) - (this.config.thumbHeight / 2 - state.value);
                return {
                    transform: `translate3d(0, ${value}px, 0)`,
                    width: '100%',
                    height: this.state.items.length * this.config.thumbHeight + 'px'
                };
            case ThumbnailsPosition.LeftTop:
                this.width = this.config.thumbWidth + 'px';
                this.height = '100%';
                value = -(this.state.currIndex * this.config.thumbHeight) - state.value;
                return {
                    transform: `translate3d(0, ${value}px, 0)`,
                    width: '100%',
                    height: this.state.items.length * this.config.thumbHeight + 'px'
                };
        }
    }
    verticalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_UP && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) {
            return;
        }
        if (e.velocityY > 0.3) {
            this.prev();
        }
        else if (e.velocityY < -0.3) {
            this.next();
        }
        else {
            if (e.deltaY / 2 <= -this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaY / 2 >= this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    horizontalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_HORIZONTAL && e.offsetDirection & Hammer.DIRECTION_HORIZONTAL)) {
            return;
        }
        if (e.velocityX > 0.3) {
            this.prev();
        }
        else if (e.velocityX < -0.3) {
            this.next();
        }
        else {
            if (e.deltaX / 2 <= -this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaX / 2 >= this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    next() {
        this.action.emit('next');
    }
    prev() {
        this.action.emit('prev');
    }
    updateSlider(state) {
        const newState = Object.assign(Object.assign({}, this._slidingWorker$.value), state);
        this._slidingWorker$.next(newState);
    }
}
GalleryThumbsComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-thumbs',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div *ngIf="sliderState$ | async; let sliderState"
         class="g-thumbs-container">
      <div class="g-slider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-thumb *ngFor="let item of state.items;let i = index"
                       [type]="item.type"
                       [config]="config"
                       [data]="item.data"
                       [currIndex]="state.currIndex"
                       [index]="i"
                       [tapClickDisabled]="config.disableThumb"
                       (tapClick)="thumbClick.emit(i)"
                       (error)="error.emit({itemIndex: i, error: $event})"></gallery-thumb>
      </div>
    </div>
  `
            },] }
];
GalleryThumbsComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
GalleryThumbsComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }],
    thumbClick: [{ type: Output }],
    error: [{ type: Output }],
    height: [{ type: HostBinding, args: ['style.height',] }],
    width: [{ type: HostBinding, args: ['style.width',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS10aHVtYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL2NvbXBvbmVudHMvZ2FsbGVyeS10aHVtYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFJTixXQUFXLEVBQ1gsTUFBTSxFQUNOLFVBQVUsRUFDVixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQTRCekUsTUFBTSxPQUFPLHNCQUFzQjtJQW1DakMsWUFBb0IsR0FBZSxFQUFVLEtBQWE7UUFBdEMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFqQzFELHFCQUFxQjtRQUNKLG9CQUFlLEdBQUcsSUFBSSxlQUFlLENBQWMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBSy9GLG1EQUFtRDtRQUMzQywyQkFBc0IsR0FBRyxDQUFDLENBQUM7UUFXbkMsMkRBQTJEO1FBQ2pELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUV2RCw4Q0FBOEM7UUFDcEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbEQsNkNBQTZDO1FBQ25DLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztRQVVqRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxH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LElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxZQUFZLENBQUMsS0FBa0I7UUFDckMsTUFBTSxRQUFRLG1DQUFvQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBSyxLQUFLLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDOzs7WUE5UkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCVDthQUNGOzs7WUFuQ0MsVUFBVTtZQURWLE1BQU07OztvQkFvREwsS0FBSztxQkFHTCxLQUFLO3FCQUdMLE1BQU07eUJBR04sTUFBTTtvQkFHTixNQUFNO3FCQUdOLFdBQVcsU0FBQyxjQUFjO29CQUcxQixXQUFXLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgSG9zdEJpbmRpbmcsXG4gIE5nWm9uZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR2FsbGVyeUNvbmZpZyB9IGZyb20gJy4uL21vZGVscy9jb25maWcubW9kZWwnO1xuaW1wb3J0IHsgR2FsbGVyeVN0YXRlLCBHYWxsZXJ5RXJyb3IgfSBmcm9tICcuLi9tb2RlbHMvZ2FsbGVyeS5tb2RlbCc7XG5pbXBvcnQgeyBUaHVtYm5haWxzUG9zaXRpb24sIFRodW1ibmFpbHNNb2RlIH0gZnJvbSAnLi4vbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBTbGlkZXJTdGF0ZSwgV29ya2VyU3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvc2xpZGVyLm1vZGVsJztcblxuZGVjbGFyZSBjb25zdCBIYW1tZXI6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeS10aHVtYnMnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2ICpuZ0lmPVwic2xpZGVyU3RhdGUkIHwgYXN5bmM7IGxldCBzbGlkZXJTdGF0ZVwiXG4gICAgICAgICBjbGFzcz1cImctdGh1bWJzLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImctc2xpZGVyXCJcbiAgICAgICAgICAgW2NsYXNzLmctbm8tdHJhbnNpdGlvbl09XCJzbGlkZXJTdGF0ZS5hY3RpdmVcIlxuICAgICAgICAgICBbbmdTdHlsZV09XCJzbGlkZXJTdGF0ZS5zdHlsZVwiPlxuXG4gICAgICAgIDxnYWxsZXJ5LXRodW1iICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zO2xldCBpID0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICBbdHlwZV09XCJpdGVtLnR5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtkYXRhXT1cIml0ZW0uZGF0YVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtjdXJySW5kZXhdPVwic3RhdGUuY3VyckluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2luZGV4XT1cImlcIlxuICAgICAgICAgICAgICAgICAgICAgICBbdGFwQ2xpY2tEaXNhYmxlZF09XCJjb25maWcuZGlzYWJsZVRodW1iXCJcbiAgICAgICAgICAgICAgICAgICAgICAgKHRhcENsaWNrKT1cInRodW1iQ2xpY2suZW1pdChpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgIChlcnJvcik9XCJlcnJvci5lbWl0KHtpdGVtSW5kZXg6IGksIGVycm9yOiAkZXZlbnR9KVwiPjwvZ2FsbGVyeS10aHVtYj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlUaHVtYnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAvKiogU2xpZGluZyB3b3JrZXIgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfc2xpZGluZ1dvcmtlciQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFdvcmtlclN0YXRlPih7dmFsdWU6IDAsIGFjdGl2ZTogZmFsc2V9KTtcblxuICAvKiogSGFtbWVySlMgaW5zdGFuY2UgKi9cbiAgcHJpdmF0ZSBfaGFtbWVyOiBhbnk7XG5cbiAgLyoqIEN1cnJlbnQgc2xpZGVyIHBvc2l0aW9uIGluIGZyZWUgc2xpZGluZyBtb2RlICovXG4gIHByaXZhdGUgX2ZyZWVNb2RlQ3VycmVudE9mZnNldCA9IDA7XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHNsaWRpbmcgc3RhdGUgKi9cbiAgc2xpZGVyU3RhdGUkOiBPYnNlcnZhYmxlPFNsaWRlclN0YXRlPjtcblxuICAvKiogR2FsbGVyeSBzdGF0ZSAqL1xuICBASW5wdXQoKSBzdGF0ZTogR2FsbGVyeVN0YXRlO1xuXG4gIC8qKiBHYWxsZXJ5IGNvbmZpZyAqL1xuICBASW5wdXQoKSBjb25maWc6IEdhbGxlcnlDb25maWc7XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGhlIGFjdGl2ZSBpdGVtIHNob3VsZCBjaGFuZ2UgKi9cbiAgQE91dHB1dCgpIGFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVtYmVyPigpO1xuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRodW1iIGlzIGNsaWNrZWQgKi9cbiAgQE91dHB1dCgpIHRodW1iQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhbiBlcnJvciBvY2N1cnMgKi9cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5RXJyb3I+KCk7XG5cbiAgLyoqIEhvc3QgaGVpZ2h0ICovXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgaGVpZ2h0OiBzdHJpbmc7XG5cbiAgLyoqIEhvc3Qgd2lkdGggKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIHdpZHRoOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge1xuXG4gICAgLy8gQWN0aXZhdGUgc2xpZGluZyB3b3JrZXJcbiAgICB0aGlzLnNsaWRlclN0YXRlJCA9IHRoaXMuX3NsaWRpbmdXb3JrZXIkLnBpcGUobWFwKChzdGF0ZTogV29ya2VyU3RhdGUpID0+ICh7XG4gICAgICBzdHlsZTogdGhpcy5nZXRTbGlkZXJTdHlsZXMoc3RhdGUpLFxuICAgICAgYWN0aXZlOiBzdGF0ZS5hY3RpdmVcbiAgICB9KSkpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgLy8gUmVmcmVzaCB0aGUgc2xpZGVyXG4gICAgdGhpcy51cGRhdGVTbGlkZXIoe3ZhbHVlOiAwLCBhY3RpdmU6IGZhbHNlfSk7XG4gICAgdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ID0gMDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmNvbmZpZy5nZXN0dXJlcyAmJiAhdGhpcy5jb25maWcuZGlzYWJsZVRodW1iICYmIHR5cGVvZiBIYW1tZXIgIT09ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgIGxldCBkaXJlY3Rpb246IG51bWJlcjtcblxuICAgICAgc3dpdGNoICh0aGlzLmNvbmZpZy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLlJpZ2h0OlxuICAgICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5MZWZ0OlxuICAgICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5MZWZ0VG9wOlxuICAgICAgICAgIGRpcmVjdGlvbiA9IEhhbW1lci5ESVJFQ1RJT05fVkVSVElDQUw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLlRvcDpcbiAgICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uQm90dG9tOlxuICAgICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b21MZWZ0OlxuICAgICAgICAgIGRpcmVjdGlvbiA9IEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTDtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgLy8gQWN0aXZhdGUgZ2VzdHVyZXNcbiAgICAgIHRoaXMuX2hhbW1lciA9IG5ldyBIYW1tZXIodGhpcy5fZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICB0aGlzLl9oYW1tZXIuZ2V0KCdwYW4nKS5zZXQoe2RpcmVjdGlvbn0pO1xuXG4gICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgLy8gTW92ZSB0aGUgc2xpZGVyXG4gICAgICAgIHN3aXRjaCAodGhpcy5jb25maWcudGh1bWJNb2RlKSB7XG4gICAgICAgICAgY2FzZSBUaHVtYm5haWxzTW9kZS5TdHJpY3Q6XG4gICAgICAgICAgICB0aGlzLl9oYW1tZXIub24oJ3BhbicsIChlKSA9PiB0aGlzLnN0cmljdE1vZGUoZSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBUaHVtYm5haWxzTW9kZS5GcmVlOlxuICAgICAgICAgICAgdGhpcy5faGFtbWVyLm9uKCdwYW4nLCAoZSkgPT4gdGhpcy5mcmVlTW9kZShlKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9oYW1tZXIpIHtcbiAgICAgIHRoaXMuX2hhbW1lci5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNsaWRpbmcgc3RyaWN0IG1vZGVcbiAgICovXG4gIHByaXZhdGUgc3RyaWN0TW9kZShlKSB7XG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5SaWdodDpcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkxlZnQ6XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5MZWZ0VG9wOlxuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IGUuZGVsdGFZLCBhY3RpdmU6IHRydWV9KTtcbiAgICAgICAgaWYgKGUuaXNGaW5hbCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogMCwgYWN0aXZlOiBmYWxzZX0pO1xuICAgICAgICAgIHRoaXMudmVydGljYWxQYW4oZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Ub3A6XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b206XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b21MZWZ0OlxuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IGUuZGVsdGFYLCBhY3RpdmU6IHRydWV9KTtcbiAgICAgICAgaWYgKGUuaXNGaW5hbCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogMCwgYWN0aXZlOiBmYWxzZX0pO1xuICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbFBhbihlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTbGlkaW5nIGZyZWUgbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBmcmVlTW9kZShlKSB7XG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5SaWdodDpcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkxlZnQ6XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5MZWZ0VG9wOlxuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCArIGUuZGVsdGFZLCBhY3RpdmU6IHRydWV9KTtcbiAgICAgICAgaWYgKGUuaXNGaW5hbCkge1xuICAgICAgICAgIGlmICh0aGlzLm1pbkZyZWVTY3JvbGxFeGNlZWRlZChlLmRlbHRhWSwgdGhpcy5jb25maWcudGh1bWJXaWR0aCwgdGhpcy5jb25maWcudGh1bWJIZWlnaHQpKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgPSAtKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC0gMSAtIHRoaXMuc3RhdGUuY3VyckluZGV4KSAqIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0O1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhGcmVlU2Nyb2xsRXhjZWVkZWQoZS5kZWx0YVksIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0LCB0aGlzLmNvbmZpZy50aHVtYldpZHRoKSkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ID0gdGhpcy5zdGF0ZS5jdXJySW5kZXggKiB0aGlzLmNvbmZpZy50aHVtYkhlaWdodDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ICs9IGUuZGVsdGFZO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCwgYWN0aXZlOiBmYWxzZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uVG9wOlxuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uQm90dG9tOlxuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uQm90dG9tTGVmdDpcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZXIoe3ZhbHVlOiB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgKyBlLmRlbHRhWCwgYWN0aXZlOiB0cnVlfSk7XG4gICAgICAgIGlmIChlLmlzRmluYWwpIHtcbiAgICAgICAgICBpZiAodGhpcy5taW5GcmVlU2Nyb2xsRXhjZWVkZWQoZS5kZWx0YVgsIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0LCB0aGlzLmNvbmZpZy50aHVtYldpZHRoKSkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ID0gLSh0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAtIDEgLSB0aGlzLnN0YXRlLmN1cnJJbmRleCkgKiB0aGlzLmNvbmZpZy50aHVtYldpZHRoO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhGcmVlU2Nyb2xsRXhjZWVkZWQoZS5kZWx0YVgsIHRoaXMuY29uZmlnLnRodW1iV2lkdGgsIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0KSkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ID0gdGhpcy5zdGF0ZS5jdXJySW5kZXggKiB0aGlzLmNvbmZpZy50aHVtYldpZHRoO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgKz0gZS5kZWx0YVg7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0LCBhY3RpdmU6IGZhbHNlfSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIG1pbmltdW0gZnJlZSBzY3JvbGwgaXMgZXhjZWVkZWQgKHVzZWQgaW4gQm90dG9tLCBMZWZ0IGRpcmVjdGlvbnMpXG4gICAqL1xuICBwcml2YXRlIG1pbkZyZWVTY3JvbGxFeGNlZWRlZChkZWx0YTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAtKHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCArIGRlbHRhIC0gd2lkdGggLyAyKSA+ICh0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAtIHRoaXMuc3RhdGUuY3VyckluZGV4KSAqIGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgbWF4aW11bSBmcmVlIHNjcm9sbCBpcyBleGNlZWRlZCAodXNlZCBpbiBUb3AsIFJpZ2h0IGRpcmVjdGlvbnMpXG4gICAqL1xuICBwcml2YXRlIG1heEZyZWVTY3JvbGxFeGNlZWRlZChkZWx0YTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgKyBkZWx0YSA+ICh0aGlzLnN0YXRlLmN1cnJJbmRleCAqIHdpZHRoKSArIChoZWlnaHQgLyAyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IHNsaWRpbmcgc3RhdGUgdG8gc3R5bGVzXG4gICAqL1xuICBwcml2YXRlIGdldFNsaWRlclN0eWxlcyhzdGF0ZTogV29ya2VyU3RhdGUpOiBhbnkge1xuICAgIGxldCB2YWx1ZTogbnVtYmVyO1xuICAgIHN3aXRjaCAodGhpcy5jb25maWcudGh1bWJQb3NpdGlvbikge1xuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uVG9wOlxuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uQm90dG9tOlxuICAgICAgICB0aGlzLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgdmFsdWUgPSAtKHRoaXMuc3RhdGUuY3VyckluZGV4ICogdGhpcy5jb25maWcudGh1bWJXaWR0aCkgLSAodGhpcy5jb25maWcudGh1bWJXaWR0aCAvIDIgLSBzdGF0ZS52YWx1ZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt2YWx1ZX1weCwgMCwgMClgLFxuICAgICAgICAgIHdpZHRoOiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAqIHRoaXMuY29uZmlnLnRodW1iV2lkdGggKyAncHgnLFxuICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgIH07XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b21MZWZ0OlxuICAgICAgICB0aGlzLndpZHRoID0gJzEwMCUnO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgdmFsdWUgPSAtKHRoaXMuc3RhdGUuY3VyckluZGV4ICogdGhpcy5jb25maWcudGh1bWJXaWR0aCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt2YWx1ZX1weCwgMCwgMClgLFxuICAgICAgICAgIHdpZHRoOiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAqIHRoaXMuY29uZmlnLnRodW1iV2lkdGggKyAncHgnLFxuICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgIH07XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5MZWZ0OlxuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uUmlnaHQ6XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNvbmZpZy50aHVtYldpZHRoICsgJ3B4JztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIHZhbHVlID0gLSh0aGlzLnN0YXRlLmN1cnJJbmRleCAqIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0KSAtICh0aGlzLmNvbmZpZy50aHVtYkhlaWdodCAvIDIgLSBzdGF0ZS52YWx1ZSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHt2YWx1ZX1weCwgMClgLFxuICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAqIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9O1xuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uTGVmdFRvcDpcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY29uZmlnLnRodW1iV2lkdGggKyAncHgnO1xuICAgICAgICB0aGlzLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgdmFsdWUgPSAtKHRoaXMuc3RhdGUuY3VyckluZGV4ICogdGhpcy5jb25maWcudGh1bWJIZWlnaHQpIC0gc3RhdGUudmFsdWU7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHt2YWx1ZX1weCwgMClgLFxuICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAqIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdmVydGljYWxQYW4oZTogYW55KSB7XG4gICAgaWYgKCEoZS5kaXJlY3Rpb24gJiBIYW1tZXIuRElSRUNUSU9OX1VQICYmIGUub2Zmc2V0RGlyZWN0aW9uICYgSGFtbWVyLkRJUkVDVElPTl9WRVJUSUNBTCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGUudmVsb2NpdHlZID4gMC4zKSB7XG4gICAgICB0aGlzLnByZXYoKTtcbiAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlZIDwgLTAuMykge1xuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlLmRlbHRhWSAvIDIgPD0gLXRoaXMuY29uZmlnLnRodW1iSGVpZ2h0ICogdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggLyB0aGlzLmNvbmZpZy5wYW5TZW5zaXRpdml0eSkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5kZWx0YVkgLyAyID49IHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0ICogdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggLyB0aGlzLmNvbmZpZy5wYW5TZW5zaXRpdml0eSkge1xuICAgICAgICB0aGlzLnByZXYoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWN0aW9uLmVtaXQodGhpcy5zdGF0ZS5jdXJySW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaG9yaXpvbnRhbFBhbihlOiBhbnkpIHtcbiAgICBpZiAoIShlLmRpcmVjdGlvbiAmIEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCAmJiBlLm9mZnNldERpcmVjdGlvbiAmIEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGUudmVsb2NpdHlYID4gMC4zKSB7XG4gICAgICB0aGlzLnByZXYoKTtcbiAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYIDwgLTAuMykge1xuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlLmRlbHRhWCAvIDIgPD0gLXRoaXMuY29uZmlnLnRodW1iV2lkdGggKiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAvIHRoaXMuY29uZmlnLnBhblNlbnNpdGl2aXR5KSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgfSBlbHNlIGlmIChlLmRlbHRhWCAvIDIgPj0gdGhpcy5jb25maWcudGh1bWJXaWR0aCAqIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC8gdGhpcy5jb25maWcucGFuU2Vuc2l0aXZpdHkpIHtcbiAgICAgICAgdGhpcy5wcmV2KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFjdGlvbi5lbWl0KHRoaXMuc3RhdGUuY3VyckluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5leHQoKSB7XG4gICAgdGhpcy5hY3Rpb24uZW1pdCgnbmV4dCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmV2KCkge1xuICAgIHRoaXMuYWN0aW9uLmVtaXQoJ3ByZXYnKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2xpZGVyKHN0YXRlOiBXb3JrZXJTdGF0ZSkge1xuICAgIGNvbnN0IG5ld1N0YXRlOiBXb3JrZXJTdGF0ZSA9IHsuLi50aGlzLl9zbGlkaW5nV29ya2VyJC52YWx1ZSwgLi4uc3RhdGV9O1xuICAgIHRoaXMuX3NsaWRpbmdXb3JrZXIkLm5leHQobmV3U3RhdGUpO1xuICB9XG59XG4iXX0=