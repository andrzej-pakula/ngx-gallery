import { Component, Input, Output, Inject, NgZone, ElementRef, EventEmitter, ChangeDetectionStrategy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import { SlidingDirection } from '../models/constants';
export class GallerySliderComponent {
    constructor(_el, _zone, platform) {
        this._el = _el;
        this._zone = _zone;
        this.platform = platform;
        /** Sliding worker */
        this._slidingWorker$ = new BehaviorSubject({ value: 0, active: false });
        /** Stream that emits when the active item should change */
        this.action = new EventEmitter();
        /** Stream that emits when item is clicked */
        this.itemClick = new EventEmitter();
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
        this.youtubeItemClickEvent = new EventEmitter();
        // Activate sliding worker
        this.sliderState$ = this._slidingWorker$.pipe(map((state) => ({
            style: this.getSliderStyles(state),
            active: state.active
        })));
    }
    /** Item zoom */
    get zoom() {
        return { transform: `perspective(50px) translate3d(0, 0, ${-this.config.zoomOut}px)` };
    }
    ngOnChanges() {
        // Refresh the slider
        this.updateSlider({ value: 0, active: false });
    }
    ngOnInit() {
        if (this.config.gestures && typeof Hammer !== 'undefined') {
            const direction = this.config.slidingDirection === SlidingDirection.Horizontal
                ? Hammer.DIRECTION_HORIZONTAL
                : Hammer.DIRECTION_VERTICAL;
            // Activate gestures
            this._hammer = new Hammer(this._el.nativeElement);
            this._hammer.get('pan').set({ direction });
            this._zone.runOutsideAngular(() => {
                // Move the slider
                this._hammer.on('pan', (e) => {
                    switch (this.config.slidingDirection) {
                        case SlidingDirection.Horizontal:
                            this.updateSlider({ value: e.deltaX, active: true });
                            if (e.isFinal) {
                                this.updateSlider({ value: 0, active: false });
                                this.horizontalPan(e);
                            }
                            break;
                        case SlidingDirection.Vertical:
                            this.updateSlider({ value: e.deltaY, active: true });
                            if (e.isFinal) {
                                this.updateSlider({ value: 0, active: false });
                                this.verticalPan(e);
                            }
                    }
                });
            });
        }
        // Rearrange slider on window resize
        if (isPlatformBrowser(this.platform)) {
            this._resizeSub$ = fromEvent(window, 'resize').pipe(debounceTime(200), tap(() => this.updateSlider(this._slidingWorker$.value))).subscribe();
        }
        setTimeout(() => this.updateSlider({ value: 0, active: false }));
    }
    ngOnDestroy() {
        if (this._hammer) {
            this._hammer.destroy();
        }
        if (this._resizeSub$) {
            this._resizeSub$.unsubscribe();
        }
        this._slidingWorker$.complete();
    }
    /**
     * Convert sliding state to styles
     */
    getSliderStyles(state) {
        switch (this.config.slidingDirection) {
            case SlidingDirection.Horizontal:
                return {
                    transform: `translate3d(${-(this.state.currIndex * this._el.nativeElement.offsetWidth) + state.value}px, 0, 0)`,
                    width: `calc(100% * ${this.state.items.length})`,
                    height: '100%'
                };
            case SlidingDirection.Vertical:
                return {
                    transform: `translate3d(0, ${-(this.state.currIndex * this._el.nativeElement.offsetHeight) + state.value}px, 0)`,
                    width: '100%',
                    height: `calc(100% * ${this.state.items.length})`,
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
            if (e.deltaY / 2 <= -this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaY / 2 >= this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
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
            if (e.deltaX / 2 <= -this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaX / 2 >= this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
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
GallerySliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-slider',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div *ngIf="sliderState$ | async; let sliderState"
         class="g-items-container"
         [ngStyle]="zoom">

      <div class="g-slider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-item *ngFor="let item of state.items; let i = index"
                      [type]="item.type"
                      [config]="config"
                      [data]="item.data"
                      [currIndex]="state.currIndex"
                      [index]="i"
                      (tapClick)="itemClick.emit(i)"
                      (youtubeItemClickEvent)="youtubeItemClickEvent.emit($event)"
                      (error)="error.emit({itemIndex: i, error: $event})">
        </gallery-item>

      </div>
    </div>
    <ng-content></ng-content>
  `
            },] }
];
GallerySliderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
GallerySliderComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }],
    itemClick: [{ type: Output }],
    error: [{ type: Output }],
    youtubeItemClickEvent: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1zbGlkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL2NvbXBvbmVudHMvZ2FsbGVyeS1zbGlkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFJTixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixZQUFZLEVBQ1osdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUE0QixTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDNUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFpQ3ZELE1BQU0sT0FBTyxzQkFBc0I7SUFvQ2pDLFlBQW9CLEdBQWUsRUFBVSxLQUFhLEVBQStCLFFBQWdCO1FBQXJGLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQStCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFsQ3pHLHFCQUFxQjtRQUNKLG9CQUFlLEdBQUcsSUFBSSxlQUFlLENBQWMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBaUIvRiwyREFBMkQ7UUFDakQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFtQixDQUFDO1FBRXZELDZDQUE2QztRQUNuQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUVqRCw2Q0FBNkM7UUFDbkMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFnQixD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QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTyxJQUFJO1FBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLFlBQVksQ0FBQyxLQUFrQjtRQUNyQyxNQUFNLFFBQVEsbUNBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxHQUFLLEtBQUssQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQTFNRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7YUFDRjs7O1lBMUNDLFVBQVU7WUFEVixNQUFNO1lBZ0Y2RixNQUFNLHVCQUE1QyxNQUFNLFNBQUMsV0FBVzs7O29CQXJCOUUsS0FBSztxQkFHTCxLQUFLO3FCQUdMLE1BQU07d0JBR04sTUFBTTtvQkFHTixNQUFNO29DQUVOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIEluamVjdCxcbiAgTmdab25lLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBQTEFURk9STV9JRFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgdGFwLCBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBHYWxsZXJ5U3RhdGUsIEdhbGxlcnlFcnJvciB9IGZyb20gJy4uL21vZGVscy9nYWxsZXJ5Lm1vZGVsJztcbmltcG9ydCB7IEdhbGxlcnlDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvY29uZmlnLm1vZGVsJztcbmltcG9ydCB7IFNsaWRpbmdEaXJlY3Rpb24gfSBmcm9tICcuLi9tb2RlbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IFNsaWRlclN0YXRlLCBXb3JrZXJTdGF0ZSB9IGZyb20gJy4uL21vZGVscy9zbGlkZXIubW9kZWwnO1xuXG5kZWNsYXJlIGNvbnN0IEhhbW1lcjogYW55O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnYWxsZXJ5LXNsaWRlcicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJzbGlkZXJTdGF0ZSQgfCBhc3luYzsgbGV0IHNsaWRlclN0YXRlXCJcbiAgICAgICAgIGNsYXNzPVwiZy1pdGVtcy1jb250YWluZXJcIlxuICAgICAgICAgW25nU3R5bGVdPVwiem9vbVwiPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiZy1zbGlkZXJcIlxuICAgICAgICAgICBbY2xhc3MuZy1uby10cmFuc2l0aW9uXT1cInNsaWRlclN0YXRlLmFjdGl2ZVwiXG4gICAgICAgICAgIFtuZ1N0eWxlXT1cInNsaWRlclN0YXRlLnN0eWxlXCI+XG5cbiAgICAgICAgPGdhbGxlcnktaXRlbSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdGF0ZS5pdGVtczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgW3R5cGVdPVwiaXRlbS50eXBlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2RhdGFdPVwiaXRlbS5kYXRhXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY3VyckluZGV4XT1cInN0YXRlLmN1cnJJbmRleFwiXG4gICAgICAgICAgICAgICAgICAgICAgW2luZGV4XT1cImlcIlxuICAgICAgICAgICAgICAgICAgICAgICh0YXBDbGljayk9XCJpdGVtQ2xpY2suZW1pdChpKVwiXG4gICAgICAgICAgICAgICAgICAgICAgKHlvdXR1YmVJdGVtQ2xpY2tFdmVudCk9XCJ5b3V0dWJlSXRlbUNsaWNrRXZlbnQuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpPVwiZXJyb3IuZW1pdCh7aXRlbUluZGV4OiBpLCBlcnJvcjogJGV2ZW50fSlcIj5cbiAgICAgICAgPC9nYWxsZXJ5LWl0ZW0+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5U2xpZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgLyoqIFNsaWRpbmcgd29ya2VyICovXG4gIHByaXZhdGUgcmVhZG9ubHkgX3NsaWRpbmdXb3JrZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxXb3JrZXJTdGF0ZT4oe3ZhbHVlOiAwLCBhY3RpdmU6IGZhbHNlfSk7XG5cbiAgLyoqIEhhbW1lckpTIGluc3RhbmNlICovXG4gIHByaXZhdGUgX2hhbW1lcjogYW55O1xuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIHRoZSB2aWV3IGlzIHJlLXNpemVkICovXG4gIHByaXZhdGUgX3Jlc2l6ZVN1YiQ6IFN1YnNjcmlwdGlvbjtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgc2xpZGluZyBzdGF0ZSAqL1xuICBzbGlkZXJTdGF0ZSQ6IE9ic2VydmFibGU8U2xpZGVyU3RhdGU+O1xuXG4gIC8qKiBHYWxsZXJ5IHN0YXRlICovXG4gIEBJbnB1dCgpIHN0YXRlOiBHYWxsZXJ5U3RhdGU7XG5cbiAgLyoqIEdhbGxlcnkgY29uZmlnICovXG4gIEBJbnB1dCgpIGNvbmZpZzogR2FsbGVyeUNvbmZpZztcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiB0aGUgYWN0aXZlIGl0ZW0gc2hvdWxkIGNoYW5nZSAqL1xuICBAT3V0cHV0KCkgYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBudW1iZXI+KCk7XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gaXRlbSBpcyBjbGlja2VkICovXG4gIEBPdXRwdXQoKSBpdGVtQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhbiBlcnJvciBvY2N1cnMgKi9cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5RXJyb3I+KCk7XG5cbiAgQE91dHB1dCgpIHlvdXR1YmVJdGVtQ2xpY2tFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8RWxlbWVudFJlZj4oKTtcblxuICAvKiogSXRlbSB6b29tICovXG4gIGdldCB6b29tKCkge1xuICAgIHJldHVybiB7dHJhbnNmb3JtOiBgcGVyc3BlY3RpdmUoNTBweCkgdHJhbnNsYXRlM2QoMCwgMCwgJHstdGhpcy5jb25maWcuem9vbU91dH1weClgfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF96b25lOiBOZ1pvbmUsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm06IE9iamVjdCkge1xuXG4gICAgLy8gQWN0aXZhdGUgc2xpZGluZyB3b3JrZXJcbiAgICB0aGlzLnNsaWRlclN0YXRlJCA9IHRoaXMuX3NsaWRpbmdXb3JrZXIkLnBpcGUobWFwKChzdGF0ZTogV29ya2VyU3RhdGUpID0+ICh7XG4gICAgICBzdHlsZTogdGhpcy5nZXRTbGlkZXJTdHlsZXMoc3RhdGUpLFxuICAgICAgYWN0aXZlOiBzdGF0ZS5hY3RpdmVcbiAgICB9KSkpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgLy8gUmVmcmVzaCB0aGUgc2xpZGVyXG4gICAgdGhpcy51cGRhdGVTbGlkZXIoe3ZhbHVlOiAwLCBhY3RpdmU6IGZhbHNlfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb25maWcuZ2VzdHVyZXMgJiYgdHlwZW9mIEhhbW1lciAhPT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5jb25maWcuc2xpZGluZ0RpcmVjdGlvbiA9PT0gU2xpZGluZ0RpcmVjdGlvbi5Ib3Jpem9udGFsXG4gICAgICAgID8gSGFtbWVyLkRJUkVDVElPTl9IT1JJWk9OVEFMXG4gICAgICAgIDogSGFtbWVyLkRJUkVDVElPTl9WRVJUSUNBTDtcblxuICAgICAgLy8gQWN0aXZhdGUgZ2VzdHVyZXNcbiAgICAgIHRoaXMuX2hhbW1lciA9IG5ldyBIYW1tZXIodGhpcy5fZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICB0aGlzLl9oYW1tZXIuZ2V0KCdwYW4nKS5zZXQoe2RpcmVjdGlvbn0pO1xuXG4gICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgLy8gTW92ZSB0aGUgc2xpZGVyXG4gICAgICAgIHRoaXMuX2hhbW1lci5vbigncGFuJywgKGUpID0+IHtcblxuICAgICAgICAgIHN3aXRjaCAodGhpcy5jb25maWcuc2xpZGluZ0RpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBTbGlkaW5nRGlyZWN0aW9uLkhvcml6b250YWw6XG4gICAgICAgICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogZS5kZWx0YVgsIGFjdGl2ZTogdHJ1ZX0pO1xuICAgICAgICAgICAgICBpZiAoZS5pc0ZpbmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTbGlkZXIoe3ZhbHVlOiAwLCBhY3RpdmU6IGZhbHNlfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3Jpem9udGFsUGFuKGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBTbGlkaW5nRGlyZWN0aW9uLlZlcnRpY2FsOlxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNsaWRlcih7dmFsdWU6IGUuZGVsdGFZLCBhY3RpdmU6IHRydWV9KTtcbiAgICAgICAgICAgICAgaWYgKGUuaXNGaW5hbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogMCwgYWN0aXZlOiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgIHRoaXMudmVydGljYWxQYW4oZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUmVhcnJhbmdlIHNsaWRlciBvbiB3aW5kb3cgcmVzaXplXG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm0pKSB7XG4gICAgICB0aGlzLl9yZXNpemVTdWIkID0gZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpLnBpcGUoXG4gICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy51cGRhdGVTbGlkZXIodGhpcy5fc2xpZGluZ1dvcmtlciQudmFsdWUpKVxuICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlU2xpZGVyKHt2YWx1ZTogMCwgYWN0aXZlOiBmYWxzZX0pKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9oYW1tZXIpIHtcbiAgICAgIHRoaXMuX2hhbW1lci5kZXN0cm95KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLl9yZXNpemVTdWIkKSB7XG4gICAgICB0aGlzLl9yZXNpemVTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIHRoaXMuX3NsaWRpbmdXb3JrZXIkLmNvbXBsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBzbGlkaW5nIHN0YXRlIHRvIHN0eWxlc1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRTbGlkZXJTdHlsZXMoc3RhdGU6IFdvcmtlclN0YXRlKTogYW55IHtcbiAgICBzd2l0Y2ggKHRoaXMuY29uZmlnLnNsaWRpbmdEaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgU2xpZGluZ0RpcmVjdGlvbi5Ib3Jpem9udGFsOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7LSh0aGlzLnN0YXRlLmN1cnJJbmRleCAqIHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGgpICsgc3RhdGUudmFsdWV9cHgsIDAsIDApYCxcbiAgICAgICAgICB3aWR0aDogYGNhbGMoMTAwJSAqICR7dGhpcy5zdGF0ZS5pdGVtcy5sZW5ndGh9KWAsXG4gICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgU2xpZGluZ0RpcmVjdGlvbi5WZXJ0aWNhbDpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAkey0odGhpcy5zdGF0ZS5jdXJySW5kZXggKiB0aGlzLl9lbC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCkgKyBzdGF0ZS52YWx1ZX1weCwgMClgLFxuICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgaGVpZ2h0OiBgY2FsYygxMDAlICogJHt0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aH0pYCxcbiAgICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHZlcnRpY2FsUGFuKGUpIHtcbiAgICBpZiAoIShlLmRpcmVjdGlvbiAmIEhhbW1lci5ESVJFQ1RJT05fVVAgJiYgZS5vZmZzZXREaXJlY3Rpb24gJiBIYW1tZXIuRElSRUNUSU9OX1ZFUlRJQ0FMKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZS52ZWxvY2l0eVkgPiAwLjMpIHtcbiAgICAgIHRoaXMucHJldigpO1xuICAgIH0gZWxzZSBpZiAoZS52ZWxvY2l0eVkgPCAtMC4zKSB7XG4gICAgICB0aGlzLm5leHQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGUuZGVsdGFZIC8gMiA8PSAtdGhpcy5fZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAvIHRoaXMuY29uZmlnLnBhblNlbnNpdGl2aXR5KSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgfSBlbHNlIGlmIChlLmRlbHRhWSAvIDIgPj0gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAvIHRoaXMuY29uZmlnLnBhblNlbnNpdGl2aXR5KSB7XG4gICAgICAgIHRoaXMucHJldigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hY3Rpb24uZW1pdCh0aGlzLnN0YXRlLmN1cnJJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBob3Jpem9udGFsUGFuKGUpIHtcbiAgICBpZiAoIShlLmRpcmVjdGlvbiAmIEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCAmJiBlLm9mZnNldERpcmVjdGlvbiAmIEhhbW1lci5ESVJFQ1RJT05fSE9SSVpPTlRBTCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGUudmVsb2NpdHlYID4gMC4zKSB7XG4gICAgICB0aGlzLnByZXYoKTtcbiAgICB9IGVsc2UgaWYgKGUudmVsb2NpdHlYIDwgLTAuMykge1xuICAgICAgdGhpcy5uZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlLmRlbHRhWCAvIDIgPD0gLXRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggKiB0aGlzLnN0YXRlLml0ZW1zLmxlbmd0aCAvIHRoaXMuY29uZmlnLnBhblNlbnNpdGl2aXR5KSB7XG4gICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgfSBlbHNlIGlmIChlLmRlbHRhWCAvIDIgPj0gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCAqIHRoaXMuc3RhdGUuaXRlbXMubGVuZ3RoIC8gdGhpcy5jb25maWcucGFuU2Vuc2l0aXZpdHkpIHtcbiAgICAgICAgdGhpcy5wcmV2KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFjdGlvbi5lbWl0KHRoaXMuc3RhdGUuY3VyckluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5leHQoKSB7XG4gICAgdGhpcy5hY3Rpb24uZW1pdCgnbmV4dCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmV2KCkge1xuICAgIHRoaXMuYWN0aW9uLmVtaXQoJ3ByZXYnKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2xpZGVyKHN0YXRlOiBXb3JrZXJTdGF0ZSkge1xuICAgIGNvbnN0IG5ld1N0YXRlOiBXb3JrZXJTdGF0ZSA9IHsuLi50aGlzLl9zbGlkaW5nV29ya2VyJC52YWx1ZSwgLi4uc3RhdGV9O1xuICAgIHRoaXMuX3NsaWRpbmdXb3JrZXIkLm5leHQobmV3U3RhdGUpO1xuICB9XG59XG4iXX0=