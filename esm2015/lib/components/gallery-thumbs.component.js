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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS10aHVtYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL2NvbXBvbmVudHMvZ2FsbGVyeS10aHVtYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFJTixXQUFXLEVBQ1gsTUFBTSxFQUNOLFVBQVUsRUFDVixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQTRCekUsTUFBTSxPQUFPLHNCQUFzQjtJQW1DakMsWUFBb0IsR0FBZSxFQUFVLEtBQWE7UUFBdEMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFqQzFELHFCQUFxQjtRQUNKLG9CQUFlLEdBQUcsSUFBSSxlQUFlLENBQWMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBSy9GLG1EQUFtRDtRQUMzQywyQkFBc0IsR0FBRyxDQUFDLENBQUM7UUFXbkMsMkRBQTJEO1FBQ2pELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUV2RCw4Q0FBOEM7UUFDcEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbEQsNkNBQTZDO1FBQ25DLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztRQVVqRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxH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bnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIEhvc3RCaW5kaW5nLFxuICBOZ1pvbmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEdhbGxlcnlDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvY29uZmlnLm1vZGVsJztcbmltcG9ydCB7IEdhbGxlcnlTdGF0ZSwgR2FsbGVyeUVycm9yIH0gZnJvbSAnLi4vbW9kZWxzL2dhbGxlcnkubW9kZWwnO1xuaW1wb3J0IHsgVGh1bWJuYWlsc1Bvc2l0aW9uLCBUaHVtYm5haWxzTW9kZSB9IGZyb20gJy4uL21vZGVscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgU2xpZGVyU3RhdGUsIFdvcmtlclN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL3NsaWRlci5tb2RlbCc7XG5cbmRlY2xhcmUgY29uc3QgSGFtbWVyOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dhbGxlcnktdGh1bWJzJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cInNsaWRlclN0YXRlJCB8IGFzeW5jOyBsZXQgc2xpZGVyU3RhdGVcIlxuICAgICAgICAgY2xhc3M9XCJnLXRodW1icy1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnLXNsaWRlclwiXG4gICAgICAgICAgIFtjbGFzcy5nLW5vLXRyYW5zaXRpb25dPVwic2xpZGVyU3RhdGUuYWN0aXZlXCJcbiAgICAgICAgICAgW25nU3R5bGVdPVwic2xpZGVyU3RhdGUuc3R5bGVcIj5cblxuICAgICAgICA8Z2FsbGVyeS10aHVtYiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGF0ZS5pdGVtcztsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3R5cGVdPVwiaXRlbS50eXBlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2NvbmZpZ109XCJjb25maWdcIlxuICAgICAgICAgICAgICAgICAgICAgICBbZGF0YV09XCJpdGVtLmRhdGFcIlxuICAgICAgICAgICAgICAgICAgICAgICBbY3VyckluZGV4XT1cInN0YXRlLmN1cnJJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtpbmRleF09XCJpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW3RhcENsaWNrRGlzYWJsZWRdPVwiY29uZmlnLmRpc2FibGVUaHVtYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICh0YXBDbGljayk9XCJ0aHVtYkNsaWNrLmVtaXQoaSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpPVwiZXJyb3IuZW1pdCh7aXRlbUluZGV4OiBpLCBlcnJvcjogJGV2ZW50fSlcIj48L2dhbGxlcnktdGh1bWI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5VGh1bWJzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgLyoqIFNsaWRpbmcgd29ya2VyICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX3NsaWRpbmdXb3JrZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXb3JrZXJTdGF0ZT4oe3ZhbHVlOiAwLCBhY3RpdmU6IGZhbHNlfSk7XG5cbiAgLyoqIEhhbW1lckpTIGluc3RhbmNlICovXG4gIHByaXZhdGUgX2hhbW1lcjogYW55O1xuXG4gIC8qKiBDdXJyZW50IHNsaWRlciBwb3NpdGlvbiBpbiBmcmVlIHNsaWRpbmcgbW9kZSAqL1xuICBwcml2YXRlIF9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgPSAwO1xuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyBzbGlkaW5nIHN0YXRlICovXG4gIHNsaWRlclN0YXRlJDogT2JzZXJ2YWJsZTxTbGlkZXJTdGF0ZT47XG5cbiAgLyoqIEdhbGxlcnkgc3RhdGUgKi9cbiAgQElucHV0KCkgc3RhdGU6IEdhbGxlcnlTdGF0ZTtcblxuICAvKiogR2FsbGVyeSBjb25maWcgKi9cbiAgQElucHV0KCkgY29uZmlnOiBHYWxsZXJ5Q29uZmlnO1xuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRoZSBhY3RpdmUgaXRlbSBzaG91bGQgY2hhbmdlICovXG4gIEBPdXRwdXQoKSBhY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZyB8IG51bWJlcj4oKTtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiB0aHVtYiBpcyBjbGlja2VkICovXG4gIEBPdXRwdXQoKSB0aHVtYkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYW4gZXJyb3Igb2NjdXJzICovXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8R2FsbGVyeUVycm9yPigpO1xuXG4gIC8qKiBIb3N0IGhlaWdodCAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpIGhlaWdodDogc3RyaW5nO1xuXG4gIC8qKiBIb3N0IHdpZHRoICovXG4gIEBIb3N0QmluZGluZygnc3R5bGUud2lkdGgnKSB3aWR0aDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHtcblxuICAgIC8vIEFjdGl2YXRlIHNsaWRpbmcgd29ya2VyXG4gICAgdGhpcy5zbGlkZXJTdGF0ZSQgPSB0aGlzLl9zbGlkaW5nV29ya2VyJC5waXBlKG1hcCgoc3RhdGU6IFdvcmtlclN0YXRlKSA9PiAoe1xuICAgICAgc3R5bGU6IHRoaXMuZ2V0U2xpZGVyU3R5bGVzKHN0YXRlKSxcbiAgICAgIGFjdGl2ZTogc3RhdGUuYWN0aXZlXG4gICAgfSkpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIC8vIFJlZnJlc2ggdGhlIHNsaWRlclxuICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogMCwgYWN0aXZlOiBmYWxzZX0pO1xuICAgIHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCA9IDA7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZ2VzdHVyZXMgJiYgIXRoaXMuY29uZmlnLmRpc2FibGVUaHVtYiAmJiB0eXBlb2YgSGFtbWVyICE9PSAndW5kZWZpbmVkJykge1xuXG4gICAgICBsZXQgZGlyZWN0aW9uOiBudW1iZXI7XG5cbiAgICAgIHN3aXRjaCAodGhpcy5jb25maWcudGh1bWJQb3NpdGlvbikge1xuICAgICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5SaWdodDpcbiAgICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uTGVmdDpcbiAgICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uTGVmdFRvcDpcbiAgICAgICAgICBkaXJlY3Rpb24gPSBIYW1tZXIuRElSRUNUSU9OX1ZFUlRJQ0FMO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Ub3A6XG4gICAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkJvdHRvbTpcbiAgICAgICAgICBkaXJlY3Rpb24gPSBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUw7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIEFjdGl2YXRlIGdlc3R1cmVzXG4gICAgICB0aGlzLl9oYW1tZXIgPSBuZXcgSGFtbWVyKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgdGhpcy5faGFtbWVyLmdldCgncGFuJykuc2V0KHtkaXJlY3Rpb259KTtcblxuICAgICAgdGhpcy5fem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIC8vIE1vdmUgdGhlIHNsaWRlclxuICAgICAgICBzd2l0Y2ggKHRoaXMuY29uZmlnLnRodW1iTW9kZSkge1xuICAgICAgICAgIGNhc2UgVGh1bWJuYWlsc01vZGUuU3RyaWN0OlxuICAgICAgICAgICAgdGhpcy5faGFtbWVyLm9uKCdwYW4nLCAoZSkgPT4gdGhpcy5zdHJpY3RNb2RlKGUpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgVGh1bWJuYWlsc01vZGUuRnJlZTpcbiAgICAgICAgICAgIHRoaXMuX2hhbW1lci5vbigncGFuJywgKGUpID0+IHRoaXMuZnJlZU1vZGUoZSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5faGFtbWVyKSB7XG4gICAgICB0aGlzLl9oYW1tZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTbGlkaW5nIHN0cmljdCBtb2RlXG4gICAqL1xuICBwcml2YXRlIHN0cmljdE1vZGUoZSkge1xuICAgIHN3aXRjaCAodGhpcy5jb25maWcudGh1bWJQb3NpdGlvbikge1xuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uUmlnaHQ6XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5MZWZ0OlxuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uTGVmdFRvcDpcbiAgICAgICAgdGhpcy51cGRhdGVTbGlkZXIoe3ZhbHVlOiBlLmRlbHRhWSwgYWN0aXZlOiB0cnVlfSk7XG4gICAgICAgIGlmIChlLmlzRmluYWwpIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IDAsIGFjdGl2ZTogZmFsc2V9KTtcbiAgICAgICAgICB0aGlzLnZlcnRpY2FsUGFuKGUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uVG9wOlxuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uQm90dG9tOlxuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IGUuZGVsdGFYLCBhY3RpdmU6IHRydWV9KTtcbiAgICAgICAgaWYgKGUuaXNGaW5hbCkge1xuICAgICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogMCwgYWN0aXZlOiBmYWxzZX0pO1xuICAgICAgICAgIHRoaXMuaG9yaXpvbnRhbFBhbihlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTbGlkaW5nIGZyZWUgbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBmcmVlTW9kZShlKSB7XG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5SaWdodDpcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkxlZnQ6XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5MZWZ0VG9wOlxuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCArIGUuZGVsdGFZLCBhY3RpdmU6IHRydWV9KTtcbiAgICAgICAgaWYgKGUuaXNGaW5hbCkge1xuICAgICAgICAgIGlmICh0aGlzLm1pbkZyZWVTY3JvbGxFeGNlZWRlZChlLmRlbHRhWSwgdGhpcy5jb25maWcudGh1bWJXaWR0aCwgdGhpcy5jb25maWcudGh1bWJIZWlnaHQpKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgPSAtKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC0gMSAtIHRoaXMuc3RhdGUuY3VyckluZGV4KSAqIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0O1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5tYXhGcmVlU2Nyb2xsRXhjZWVkZWQoZS5kZWx0YVksIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0LCB0aGlzLmNvbmZpZy50aHVtYldpZHRoKSkge1xuICAgICAgICAgICAgdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ID0gdGhpcy5zdGF0ZS5jdXJySW5kZXggKiB0aGlzLmNvbmZpZy50aHVtYkhlaWdodDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ICs9IGUuZGVsdGFZO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCwgYWN0aXZlOiBmYWxzZX0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uVG9wOlxuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uQm90dG9tOlxuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCArIGUuZGVsdGFYLCBhY3RpdmU6IHRydWV9KTtcbiAgICAgICAgaWYgKGUuaXNGaW5hbCkge1xuICAgICAgICAgIGlmICh0aGlzLm1pbkZyZWVTY3JvbGxFeGNlZWRlZChlLmRlbHRhWCwgdGhpcy5jb25maWcudGh1bWJIZWlnaHQsIHRoaXMuY29uZmlnLnRodW1iV2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgPSAtKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC0gMSAtIHRoaXMuc3RhdGUuY3VyckluZGV4KSAqIHRoaXMuY29uZmlnLnRodW1iV2lkdGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1heEZyZWVTY3JvbGxFeGNlZWRlZChlLmRlbHRhWCwgdGhpcy5jb25maWcudGh1bWJXaWR0aCwgdGhpcy5jb25maWcudGh1bWJIZWlnaHQpKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgPSB0aGlzLnN0YXRlLmN1cnJJbmRleCAqIHRoaXMuY29uZmlnLnRodW1iV2lkdGg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCArPSBlLmRlbHRhWDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy51cGRhdGVTbGlkZXIoe3ZhbHVlOiB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQsIGFjdGl2ZTogZmFsc2V9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgbWluaW11bSBmcmVlIHNjcm9sbCBpcyBleGNlZWRlZCAodXNlZCBpbiBCb3R0b20sIExlZnQgZGlyZWN0aW9ucylcbiAgICovXG4gIHByaXZhdGUgbWluRnJlZVNjcm9sbEV4Y2VlZGVkKGRlbHRhOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC0odGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ICsgZGVsdGEgLSB3aWR0aCAvIDIpID4gKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC0gdGhpcy5zdGF0ZS5jdXJySW5kZXgpICogaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBtYXhpbXVtIGZyZWUgc2Nyb2xsIGlzIGV4Y2VlZGVkICh1c2VkIGluIFRvcCwgUmlnaHQgZGlyZWN0aW9ucylcbiAgICovXG4gIHByaXZhdGUgbWF4RnJlZVNjcm9sbEV4Y2VlZGVkKGRlbHRhOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCArIGRlbHRhID4gKHRoaXMuc3RhdGUuY3VyckluZGV4ICogd2lkdGgpICsgKGhlaWdodCAvIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgc2xpZGluZyBzdGF0ZSB0byBzdHlsZXNcbiAgICovXG4gIHByaXZhdGUgZ2V0U2xpZGVyU3R5bGVzKHN0YXRlOiBXb3JrZXJTdGF0ZSk6IGFueSB7XG4gICAgbGV0IHZhbHVlOiBudW1iZXI7XG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Ub3A6XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b206XG4gICAgICAgIHRoaXMud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jb25maWcudGh1bWJIZWlnaHQgKyAncHgnO1xuICAgICAgICB2YWx1ZSA9IC0odGhpcy5zdGF0ZS5jdXJySW5kZXggKiB0aGlzLmNvbmZpZy50aHVtYldpZHRoKSAtICh0aGlzLmNvbmZpZy50aHVtYldpZHRoIC8gMiAtIHN0YXRlLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke3ZhbHVlfXB4LCAwLCAwKWAsXG4gICAgICAgICAgd2lkdGg6IHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoICogdGhpcy5jb25maWcudGh1bWJXaWR0aCArICdweCcsXG4gICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkxlZnQ6XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5SaWdodDpcbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY29uZmlnLnRodW1iV2lkdGggKyAncHgnO1xuICAgICAgICB0aGlzLmhlaWdodCA9ICcxMDAlJztcbiAgICAgICAgdmFsdWUgPSAtKHRoaXMuc3RhdGUuY3VyckluZGV4ICogdGhpcy5jb25maWcudGh1bWJIZWlnaHQpIC0gKHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0IC8gMiAtIHN0YXRlLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke3ZhbHVlfXB4LCAwKWAsXG4gICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoICogdGhpcy5jb25maWcudGh1bWJIZWlnaHQgKyAncHgnXG4gICAgICAgIH07XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5MZWZ0VG9wOlxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jb25maWcudGh1bWJXaWR0aCArICdweCc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICB2YWx1ZSA9IC0odGhpcy5zdGF0ZS5jdXJySW5kZXggKiB0aGlzLmNvbmZpZy50aHVtYkhlaWdodCkgLSBzdGF0ZS52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke3ZhbHVlfXB4LCAwKWAsXG4gICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICBoZWlnaHQ6IHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoICogdGhpcy5jb25maWcudGh1bWJIZWlnaHQgKyAncHgnXG4gICAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2ZXJ0aWNhbFBhbihlOiBhbnkpIHtcbiAgICBpZiAoIShlLmRpcmVjdGlvbiAmIEhhbW1lci5ESVJFQ1RJT05fVVAgJiYgZS5vZmZzZXREaXJlY3Rpb24gJiBIYW1tZXIuRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZS52ZWxvY2l0eVkgPiAwLjMpIHtcbiAgICAgIHRoaXMucHJldigpO1xuICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVkgPCAtMC4zKSB7XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGUuZGVsdGFZIC8gMiA8PSAtdGhpcy5jb25maWcudGh1bWJIZWlnaHQgKiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAvIHRoaXMuY29uZmlnLnBhblNlbnNpdGl2aXR5KSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgfSBlbHNlIGlmIChlLmRlbHRhWSAvIDIgPj0gdGhpcy5jb25maWcudGh1bWJIZWlnaHQgKiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAvIHRoaXMuY29uZmlnLnBhblNlbnNpdGl2aXR5KSB7XG4gICAgICAgIHRoaXMucHJldigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hY3Rpb24uZW1pdCh0aGlzLnN0YXRlLmN1cnJJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBob3Jpem9udGFsUGFuKGU6IGFueSkge1xuICAgIGlmICghKGUuZGlyZWN0aW9uICYgSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMICYmIGUub2Zmc2V0RGlyZWN0aW9uICYgSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZS52ZWxvY2l0eVggPiAwLjMpIHtcbiAgICAgIHRoaXMucHJldigpO1xuICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVggPCAtMC4zKSB7XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGUuZGVsdGFYIC8gMiA8PSAtdGhpcy5jb25maWcudGh1bWJXaWR0aCAqIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC8gdGhpcy5jb25maWcucGFuU2Vuc2l0aXZpdHkpIHtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUuZGVsdGFYIC8gMiA+PSB0aGlzLmNvbmZpZy50aHVtYldpZHRoICogdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggLyB0aGlzLmNvbmZpZy5wYW5TZW5zaXRpdml0eSkge1xuICAgICAgICB0aGlzLnByZXYoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWN0aW9uLmVtaXQodGhpcy5zdGF0ZS5jdXJySW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbmV4dCgpIHtcbiAgICB0aGlzLmFjdGlvbi5lbWl0KCduZXh0Jyk7XG4gIH1cblxuICBwcml2YXRlIHByZXYoKSB7XG4gICAgdGhpcy5hY3Rpb24uZW1pdCgncHJldicpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVTbGlkZXIoc3RhdGU6IFdvcmtlclN0YXRlKSB7XG4gICAgY29uc3QgbmV3U3RhdGU6IFdvcmtlclN0YXRlID0gey4uLnRoaXMuX3NsaWRpbmdXb3JrZXIkLnZhbHVlLCAuLi5zdGF0ZX07XG4gICAgdGhpcy5fc2xpZGluZ1dvcmtlciQubmV4dChuZXdTdGF0ZSk7XG4gIH1cbn1cbiJdfQ==