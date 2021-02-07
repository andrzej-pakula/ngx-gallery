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
                value = -(this.state.currIndex * this.config.thumbWidth) - state.value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS10aHVtYnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL2NvbXBvbmVudHMvZ2FsbGVyeS10aHVtYnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFJTixXQUFXLEVBQ1gsTUFBTSxFQUNOLFVBQVUsRUFDVixZQUFZLEVBQ1osdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDbkQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBR3JDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQTRCekUsTUFBTSxPQUFPLHNCQUFzQjtJQW1DakMsWUFBb0IsR0FBZSxFQUFVLEtBQWE7UUFBdEMsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFqQzFELHFCQUFxQjtRQUNKLG9CQUFlLEdBQUcsSUFBSSxlQUFlLENBQWMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBSy9GLG1EQUFtRDtRQUMzQywyQkFBc0IsR0FBRyxDQUFDLENBQUM7UUFXbkMsMkRBQTJEO1FBQ2pELFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUV2RCw4Q0FBOEM7UUFDcEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFbEQsNkNBQTZDO1FBQ25DLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztRQVVqRCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxH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LENBQUM7SUFFTyxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLFlBQVksQ0FBQyxLQUFrQjtRQUNyQyxNQUFNLFFBQVEsbUNBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFLLEtBQUssQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQTlSRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JUO2FBQ0Y7OztZQW5DQyxVQUFVO1lBRFYsTUFBTTs7O29CQW9ETCxLQUFLO3FCQUdMLEtBQUs7cUJBR0wsTUFBTTt5QkFHTixNQUFNO29CQUdOLE1BQU07cUJBR04sV0FBVyxTQUFDLGNBQWM7b0JBRzFCLFdBQVcsU0FBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBIb3N0QmluZGluZyxcbiAgTmdab25lLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBHYWxsZXJ5Q29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL2NvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBHYWxsZXJ5U3RhdGUsIEdhbGxlcnlFcnJvciB9IGZyb20gJy4uL21vZGVscy9nYWxsZXJ5Lm1vZGVsJztcbmltcG9ydCB7IFRodW1ibmFpbHNQb3NpdGlvbiwgVGh1bWJuYWlsc01vZGUgfSBmcm9tICcuLi9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IFNsaWRlclN0YXRlLCBXb3JrZXJTdGF0ZSB9IGZyb20gJy4uL21vZGVscy9zbGlkZXIubW9kZWwnO1xuXG5kZWNsYXJlIGNvbnN0IEhhbW1lcjogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnYWxsZXJ5LXRodW1icycsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJzbGlkZXJTdGF0ZSQgfCBhc3luYzsgbGV0IHNsaWRlclN0YXRlXCJcbiAgICAgICAgIGNsYXNzPVwiZy10aHVtYnMtY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZy1zbGlkZXJcIlxuICAgICAgICAgICBbY2xhc3MuZy1uby10cmFuc2l0aW9uXT1cInNsaWRlclN0YXRlLmFjdGl2ZVwiXG4gICAgICAgICAgIFtuZ1N0eWxlXT1cInNsaWRlclN0YXRlLnN0eWxlXCI+XG5cbiAgICAgICAgPGdhbGxlcnktdGh1bWIgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RhdGUuaXRlbXM7bGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFt0eXBlXT1cIml0ZW0udHlwZVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtjb25maWddPVwiY29uZmlnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2RhdGFdPVwiaXRlbS5kYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2N1cnJJbmRleF09XCJzdGF0ZS5jdXJySW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICBbaW5kZXhdPVwiaVwiXG4gICAgICAgICAgICAgICAgICAgICAgIFt0YXBDbGlja0Rpc2FibGVkXT1cImNvbmZpZy5kaXNhYmxlVGh1bWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAodGFwQ2xpY2spPVwidGh1bWJDbGljay5lbWl0KGkpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgKGVycm9yKT1cImVycm9yLmVtaXQoe2l0ZW1JbmRleDogaSwgZXJyb3I6ICRldmVudH0pXCI+PC9nYWxsZXJ5LXRodW1iPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeVRodW1ic0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIC8qKiBTbGlkaW5nIHdvcmtlciAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9zbGlkaW5nV29ya2VyJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8V29ya2VyU3RhdGU+KHt2YWx1ZTogMCwgYWN0aXZlOiBmYWxzZX0pO1xuXG4gIC8qKiBIYW1tZXJKUyBpbnN0YW5jZSAqL1xuICBwcml2YXRlIF9oYW1tZXI6IGFueTtcblxuICAvKiogQ3VycmVudCBzbGlkZXIgcG9zaXRpb24gaW4gZnJlZSBzbGlkaW5nIG1vZGUgKi9cbiAgcHJpdmF0ZSBfZnJlZU1vZGVDdXJyZW50T2Zmc2V0ID0gMDtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgc2xpZGluZyBzdGF0ZSAqL1xuICBzbGlkZXJTdGF0ZSQ6IE9ic2VydmFibGU8U2xpZGVyU3RhdGU+O1xuXG4gIC8qKiBHYWxsZXJ5IHN0YXRlICovXG4gIEBJbnB1dCgpIHN0YXRlOiBHYWxsZXJ5U3RhdGU7XG5cbiAgLyoqIEdhbGxlcnkgY29uZmlnICovXG4gIEBJbnB1dCgpIGNvbmZpZzogR2FsbGVyeUNvbmZpZztcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiB0aGUgYWN0aXZlIGl0ZW0gc2hvdWxkIGNoYW5nZSAqL1xuICBAT3V0cHV0KCkgYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBudW1iZXI+KCk7XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gdGh1bWIgaXMgY2xpY2tlZCAqL1xuICBAT3V0cHV0KCkgdGh1bWJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIGFuIGVycm9yIG9jY3VycyAqL1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEdhbGxlcnlFcnJvcj4oKTtcblxuICAvKiogSG9zdCBoZWlnaHQgKi9cbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBoZWlnaHQ6IHN0cmluZztcblxuICAvKiogSG9zdCB3aWR0aCAqL1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgd2lkdGg6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG5cbiAgICAvLyBBY3RpdmF0ZSBzbGlkaW5nIHdvcmtlclxuICAgIHRoaXMuc2xpZGVyU3RhdGUkID0gdGhpcy5fc2xpZGluZ1dvcmtlciQucGlwZShtYXAoKHN0YXRlOiBXb3JrZXJTdGF0ZSkgPT4gKHtcbiAgICAgIHN0eWxlOiB0aGlzLmdldFNsaWRlclN0eWxlcyhzdGF0ZSksXG4gICAgICBhY3RpdmU6IHN0YXRlLmFjdGl2ZVxuICAgIH0pKSk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICAvLyBSZWZyZXNoIHRoZSBzbGlkZXJcbiAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IDAsIGFjdGl2ZTogZmFsc2V9KTtcbiAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgPSAwO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmdlc3R1cmVzICYmICF0aGlzLmNvbmZpZy5kaXNhYmxlVGh1bWIgJiYgdHlwZW9mIEhhbW1lciAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgbGV0IGRpcmVjdGlvbjogbnVtYmVyO1xuXG4gICAgICBzd2l0Y2ggKHRoaXMuY29uZmlnLnRodW1iUG9zaXRpb24pIHtcbiAgICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uUmlnaHQ6XG4gICAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkxlZnQ6XG4gICAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkxlZnRUb3A6XG4gICAgICAgICAgZGlyZWN0aW9uID0gSGFtbWVyLkRJUkVDVElPTl9WRVJUSUNBTDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uVG9wOlxuICAgICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b206XG4gICAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkJvdHRvbUxlZnQ6XG4gICAgICAgICAgZGlyZWN0aW9uID0gSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBBY3RpdmF0ZSBnZXN0dXJlc1xuICAgICAgdGhpcy5faGFtbWVyID0gbmV3IEhhbW1lcih0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuX2hhbW1lci5nZXQoJ3BhbicpLnNldCh7ZGlyZWN0aW9ufSk7XG5cbiAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAvLyBNb3ZlIHRoZSBzbGlkZXJcbiAgICAgICAgc3dpdGNoICh0aGlzLmNvbmZpZy50aHVtYk1vZGUpIHtcbiAgICAgICAgICBjYXNlIFRodW1ibmFpbHNNb2RlLlN0cmljdDpcbiAgICAgICAgICAgIHRoaXMuX2hhbW1lci5vbigncGFuJywgKGUpID0+IHRoaXMuc3RyaWN0TW9kZShlKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFRodW1ibmFpbHNNb2RlLkZyZWU6XG4gICAgICAgICAgICB0aGlzLl9oYW1tZXIub24oJ3BhbicsIChlKSA9PiB0aGlzLmZyZWVNb2RlKGUpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX2hhbW1lcikge1xuICAgICAgdGhpcy5faGFtbWVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2xpZGluZyBzdHJpY3QgbW9kZVxuICAgKi9cbiAgcHJpdmF0ZSBzdHJpY3RNb2RlKGUpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY29uZmlnLnRodW1iUG9zaXRpb24pIHtcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLlJpZ2h0OlxuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uTGVmdDpcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkxlZnRUb3A6XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogZS5kZWx0YVksIGFjdGl2ZTogdHJ1ZX0pO1xuICAgICAgICBpZiAoZS5pc0ZpbmFsKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTbGlkZXIoe3ZhbHVlOiAwLCBhY3RpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgdGhpcy52ZXJ0aWNhbFBhbihlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLlRvcDpcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkJvdHRvbTpcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkJvdHRvbUxlZnQ6XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogZS5kZWx0YVgsIGFjdGl2ZTogdHJ1ZX0pO1xuICAgICAgICBpZiAoZS5pc0ZpbmFsKSB7XG4gICAgICAgICAgdGhpcy51cGRhdGVTbGlkZXIoe3ZhbHVlOiAwLCBhY3RpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgdGhpcy5ob3Jpem9udGFsUGFuKGUpO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNsaWRpbmcgZnJlZSBtb2RlXG4gICAqL1xuICBwcml2YXRlIGZyZWVNb2RlKGUpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY29uZmlnLnRodW1iUG9zaXRpb24pIHtcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLlJpZ2h0OlxuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uTGVmdDpcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkxlZnRUb3A6XG4gICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ICsgZS5kZWx0YVksIGFjdGl2ZTogdHJ1ZX0pO1xuICAgICAgICBpZiAoZS5pc0ZpbmFsKSB7XG4gICAgICAgICAgaWYgKHRoaXMubWluRnJlZVNjcm9sbEV4Y2VlZGVkKGUuZGVsdGFZLCB0aGlzLmNvbmZpZy50aHVtYldpZHRoLCB0aGlzLmNvbmZpZy50aHVtYkhlaWdodCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCA9IC0odGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggLSAxIC0gdGhpcy5zdGF0ZS5jdXJySW5kZXgpICogdGhpcy5jb25maWcudGh1bWJIZWlnaHQ7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1heEZyZWVTY3JvbGxFeGNlZWRlZChlLmRlbHRhWSwgdGhpcy5jb25maWcudGh1bWJIZWlnaHQsIHRoaXMuY29uZmlnLnRodW1iV2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgPSB0aGlzLnN0YXRlLmN1cnJJbmRleCAqIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgKz0gZS5kZWx0YVk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogdGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0LCBhY3RpdmU6IGZhbHNlfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Ub3A6XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b206XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b21MZWZ0OlxuICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCArIGUuZGVsdGFYLCBhY3RpdmU6IHRydWV9KTtcbiAgICAgICAgaWYgKGUuaXNGaW5hbCkge1xuICAgICAgICAgIGlmICh0aGlzLm1pbkZyZWVTY3JvbGxFeGNlZWRlZChlLmRlbHRhWCwgdGhpcy5jb25maWcudGh1bWJIZWlnaHQsIHRoaXMuY29uZmlnLnRodW1iV2lkdGgpKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgPSAtKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC0gMSAtIHRoaXMuc3RhdGUuY3VyckluZGV4KSAqIHRoaXMuY29uZmlnLnRodW1iV2lkdGg7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1heEZyZWVTY3JvbGxFeGNlZWRlZChlLmRlbHRhWCwgdGhpcy5jb25maWcudGh1bWJXaWR0aCwgdGhpcy5jb25maWcudGh1bWJIZWlnaHQpKSB7XG4gICAgICAgICAgICB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQgPSB0aGlzLnN0YXRlLmN1cnJJbmRleCAqIHRoaXMuY29uZmlnLnRodW1iV2lkdGg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCArPSBlLmRlbHRhWDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy51cGRhdGVTbGlkZXIoe3ZhbHVlOiB0aGlzLl9mcmVlTW9kZUN1cnJlbnRPZmZzZXQsIGFjdGl2ZTogZmFsc2V9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgbWluaW11bSBmcmVlIHNjcm9sbCBpcyBleGNlZWRlZCAodXNlZCBpbiBCb3R0b20sIExlZnQgZGlyZWN0aW9ucylcbiAgICovXG4gIHByaXZhdGUgbWluRnJlZVNjcm9sbEV4Y2VlZGVkKGRlbHRhOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIC0odGhpcy5fZnJlZU1vZGVDdXJyZW50T2Zmc2V0ICsgZGVsdGEgLSB3aWR0aCAvIDIpID4gKHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC0gdGhpcy5zdGF0ZS5jdXJySW5kZXgpICogaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBtYXhpbXVtIGZyZWUgc2Nyb2xsIGlzIGV4Y2VlZGVkICh1c2VkIGluIFRvcCwgUmlnaHQgZGlyZWN0aW9ucylcbiAgICovXG4gIHByaXZhdGUgbWF4RnJlZVNjcm9sbEV4Y2VlZGVkKGRlbHRhOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZyZWVNb2RlQ3VycmVudE9mZnNldCArIGRlbHRhID4gKHRoaXMuc3RhdGUuY3VyckluZGV4ICogd2lkdGgpICsgKGhlaWdodCAvIDIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgc2xpZGluZyBzdGF0ZSB0byBzdHlsZXNcbiAgICovXG4gIHByaXZhdGUgZ2V0U2xpZGVyU3R5bGVzKHN0YXRlOiBXb3JrZXJTdGF0ZSk6IGFueSB7XG4gICAgbGV0IHZhbHVlOiBudW1iZXI7XG4gICAgc3dpdGNoICh0aGlzLmNvbmZpZy50aHVtYlBvc2l0aW9uKSB7XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Ub3A6XG4gICAgICBjYXNlIFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b206XG4gICAgICAgIHRoaXMud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jb25maWcudGh1bWJIZWlnaHQgKyAncHgnO1xuICAgICAgICB2YWx1ZSA9IC0odGhpcy5zdGF0ZS5jdXJySW5kZXggKiB0aGlzLmNvbmZpZy50aHVtYldpZHRoKSAtICh0aGlzLmNvbmZpZy50aHVtYldpZHRoIC8gMiAtIHN0YXRlLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke3ZhbHVlfXB4LCAwLCAwKWAsXG4gICAgICAgICAgd2lkdGg6IHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoICogdGhpcy5jb25maWcudGh1bWJXaWR0aCArICdweCcsXG4gICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkJvdHRvbUxlZnQ6XG4gICAgICAgIHRoaXMud2lkdGggPSAnMTAwJSc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jb25maWcudGh1bWJIZWlnaHQgKyAncHgnO1xuICAgICAgICB2YWx1ZSA9IC0odGhpcy5zdGF0ZS5jdXJySW5kZXggKiB0aGlzLmNvbmZpZy50aHVtYldpZHRoKSAtIHN0YXRlLnZhbHVlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7dmFsdWV9cHgsIDAsIDApYCxcbiAgICAgICAgICB3aWR0aDogdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggKiB0aGlzLmNvbmZpZy50aHVtYldpZHRoICsgJ3B4JyxcbiAgICAgICAgICBoZWlnaHQ6ICcxMDAlJ1xuICAgICAgICB9O1xuICAgICAgY2FzZSBUaHVtYm5haWxzUG9zaXRpb24uTGVmdDpcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLlJpZ2h0OlxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5jb25maWcudGh1bWJXaWR0aCArICdweCc7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gJzEwMCUnO1xuICAgICAgICB2YWx1ZSA9IC0odGhpcy5zdGF0ZS5jdXJySW5kZXggKiB0aGlzLmNvbmZpZy50aHVtYkhlaWdodCkgLSAodGhpcy5jb25maWcudGh1bWJIZWlnaHQgLyAyIC0gc3RhdGUudmFsdWUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsICR7dmFsdWV9cHgsIDApYCxcbiAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgIGhlaWdodDogdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggKiB0aGlzLmNvbmZpZy50aHVtYkhlaWdodCArICdweCdcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgVGh1bWJuYWlsc1Bvc2l0aW9uLkxlZnRUb3A6XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNvbmZpZy50aHVtYldpZHRoICsgJ3B4JztcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICAgIHZhbHVlID0gLSh0aGlzLnN0YXRlLmN1cnJJbmRleCAqIHRoaXMuY29uZmlnLnRodW1iSGVpZ2h0KSAtIHN0YXRlLnZhbHVlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsICR7dmFsdWV9cHgsIDApYCxcbiAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgIGhlaWdodDogdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggKiB0aGlzLmNvbmZpZy50aHVtYkhlaWdodCArICdweCdcbiAgICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZlcnRpY2FsUGFuKGU6IGFueSkge1xuICAgIGlmICghKGUuZGlyZWN0aW9uICYgSGFtbWVyLkRJUkVDVElPTl9VUCAmJiBlLm9mZnNldERpcmVjdGlvbiAmIEhhbW1lci5ESVJFQ1RJT05fVkVSVElDQUwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlLnZlbG9jaXR5WSA+IDAuMykge1xuICAgICAgdGhpcy5wcmV2KCk7XG4gICAgfSBlbHNlIGlmIChlLnZlbG9jaXR5WSA8IC0wLjMpIHtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZS5kZWx0YVkgLyAyIDw9IC10aGlzLmNvbmZpZy50aHVtYkhlaWdodCAqIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC8gdGhpcy5jb25maWcucGFuU2Vuc2l0aXZpdHkpIHtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICB9IGVsc2UgaWYgKGUuZGVsdGFZIC8gMiA+PSB0aGlzLmNvbmZpZy50aHVtYkhlaWdodCAqIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC8gdGhpcy5jb25maWcucGFuU2Vuc2l0aXZpdHkpIHtcbiAgICAgICAgdGhpcy5wcmV2KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFjdGlvbi5lbWl0KHRoaXMuc3RhdGUuY3VyckluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhvcml6b250YWxQYW4oZTogYW55KSB7XG4gICAgaWYgKCEoZS5kaXJlY3Rpb24gJiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwgJiYgZS5vZmZzZXREaXJlY3Rpb24gJiBIYW1tZXIuRElSRUNUSU9OX0hPUklaT05UQUwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChlLnZlbG9jaXR5WCA+IDAuMykge1xuICAgICAgdGhpcy5wcmV2KCk7XG4gICAgfSBlbHNlIGlmIChlLnZlbG9jaXR5WCA8IC0wLjMpIHtcbiAgICAgIHRoaXMubmV4dCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZS5kZWx0YVggLyAyIDw9IC10aGlzLmNvbmZpZy50aHVtYldpZHRoICogdGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGggLyB0aGlzLmNvbmZpZy5wYW5TZW5zaXRpdml0eSkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5kZWx0YVggLyAyID49IHRoaXMuY29uZmlnLnRodW1iV2lkdGggKiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAvIHRoaXMuY29uZmlnLnBhblNlbnNpdGl2aXR5KSB7XG4gICAgICAgIHRoaXMucHJldigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hY3Rpb24uZW1pdCh0aGlzLnN0YXRlLmN1cnJJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBuZXh0KCkge1xuICAgIHRoaXMuYWN0aW9uLmVtaXQoJ25leHQnKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJldigpIHtcbiAgICB0aGlzLmFjdGlvbi5lbWl0KCdwcmV2Jyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVNsaWRlcihzdGF0ZTogV29ya2VyU3RhdGUpIHtcbiAgICBjb25zdCBuZXdTdGF0ZTogV29ya2VyU3RhdGUgPSB7Li4udGhpcy5fc2xpZGluZ1dvcmtlciQudmFsdWUsIC4uLnN0YXRlfTtcbiAgICB0aGlzLl9zbGlkaW5nV29ya2VyJC5uZXh0KG5ld1N0YXRlKTtcbiAgfVxufVxuIl19