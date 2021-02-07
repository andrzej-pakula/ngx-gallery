import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
export class GalleryCoreComponent {
    constructor() {
        this.action = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.thumbClick = new EventEmitter();
        this.error = new EventEmitter();
    }
    /** Set thumbnails position */
    get thumbPosition() {
        return this.config.thumbPosition;
    }
    /** Set sliding direction */
    get slidingDirection() {
        return this.config.slidingDirection;
    }
    /** Disable thumbnails clicks */
    get disableThumb() {
        return this.config.disableThumb;
    }
    /** Set gallery image size */
    get imageSize() {
        return this.config.imageSize;
    }
    /** Set gallery dots position */
    get dotsPosition() {
        return this.config.dotsPosition;
    }
    /** Set gallery counter position */
    get counterPosition() {
        return this.config.counterPosition;
    }
}
GalleryCoreComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-core',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <gallery-thumbs *ngIf="config.thumb"
                    [state]="state"
                    [config]="config"
                    (action)="action.emit($event)"
                    (thumbClick)="thumbClick.emit($event)">
    </gallery-thumbs>
    <div class="g-box">
      <gallery-slider [state]="state"
                      [config]="config"
                      (action)="action.emit($event)"
                      (itemClick)="itemClick.emit($event)"
                      (error)="error.emit($event)">

        <gallery-nav *ngIf="config.nav && state.items.length > 1"
                     [state]="state"
                     [config]="config"
                     (action)="action.emit($event)">
        </gallery-nav>

      </gallery-slider>

      <gallery-dots *ngIf="config.dots"
                    [state]="state"
                    [config]="config"
                    (action)="action.emit($event)">
      </gallery-dots>

      <gallery-counter *ngIf="config.counter"
                       [state]="state">
      </gallery-counter>
    </div>
  `
            },] }
];
GalleryCoreComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }],
    itemClick: [{ type: Output }],
    thumbClick: [{ type: Output }],
    error: [{ type: Output }],
    thumbPosition: [{ type: HostBinding, args: ['attr.thumbPosition',] }],
    slidingDirection: [{ type: HostBinding, args: ['attr.slidingDirection',] }],
    disableThumb: [{ type: HostBinding, args: ['attr.disableThumb',] }],
    imageSize: [{ type: HostBinding, args: ['attr.imageSize',] }],
    dotsPosition: [{ type: HostBinding, args: ['attr.dotsPosition',] }],
    counterPosition: [{ type: HostBinding, args: ['attr.counterPosition',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1jb3JlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWdhbGxlcnkvc3JjL2xpYi9jb21wb25lbnRzL2dhbGxlcnktY29yZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSx1QkFBdUIsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUF5QzdHLE1BQU0sT0FBTyxvQkFBb0I7SUFyQ2pDO1FBeUNZLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBbUIsQ0FBQztRQUM3QyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN2QyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUN4QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQWdCLENBQUM7SUFnQ3JELENBQUM7SUE5QkMsOEJBQThCO0lBQzlCLElBQXVDLGFBQWE7UUFDbEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNEJBQTRCO0lBQzVCLElBQTBDLGdCQUFnQjtRQUN4RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDdEMsQ0FBQztJQUVELGdDQUFnQztJQUNoQyxJQUFzQyxZQUFZO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDbEMsQ0FBQztJQUVELDZCQUE2QjtJQUM3QixJQUFtQyxTQUFTO1FBQzFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELGdDQUFnQztJQUNoQyxJQUFzQyxZQUFZO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDbEMsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxJQUF5QyxlQUFlO1FBQ3RELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDckMsQ0FBQzs7O1lBMUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1Q7YUFDRjs7O29CQUdFLEtBQUs7cUJBQ0wsS0FBSztxQkFDTCxNQUFNO3dCQUNOLE1BQU07eUJBQ04sTUFBTTtvQkFDTixNQUFNOzRCQUdOLFdBQVcsU0FBQyxvQkFBb0I7K0JBS2hDLFdBQVcsU0FBQyx1QkFBdUI7MkJBS25DLFdBQVcsU0FBQyxtQkFBbUI7d0JBSy9CLFdBQVcsU0FBQyxnQkFBZ0I7MkJBSzVCLFdBQVcsU0FBQyxtQkFBbUI7OEJBSy9CLFdBQVcsU0FBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEhvc3RCaW5kaW5nLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHYWxsZXJ5RXJyb3IsIEdhbGxlcnlTdGF0ZSB9IGZyb20gJy4uL21vZGVscy9nYWxsZXJ5Lm1vZGVsJztcbmltcG9ydCB7IEdhbGxlcnlDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvY29uZmlnLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeS1jb3JlJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGdhbGxlcnktdGh1bWJzICpuZ0lmPVwiY29uZmlnLnRodW1iXCJcbiAgICAgICAgICAgICAgICAgICAgW3N0YXRlXT1cInN0YXRlXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbmZpZ109XCJjb25maWdcIlxuICAgICAgICAgICAgICAgICAgICAoYWN0aW9uKT1cImFjdGlvbi5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAodGh1bWJDbGljayk9XCJ0aHVtYkNsaWNrLmVtaXQoJGV2ZW50KVwiPlxuICAgIDwvZ2FsbGVyeS10aHVtYnM+XG4gICAgPGRpdiBjbGFzcz1cImctYm94XCI+XG4gICAgICA8Z2FsbGVyeS1zbGlkZXIgW3N0YXRlXT1cInN0YXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgKGFjdGlvbik9XCJhY3Rpb24uZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAoaXRlbUNsaWNrKT1cIml0ZW1DbGljay5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgIChlcnJvcik9XCJlcnJvci5lbWl0KCRldmVudClcIj5cblxuICAgICAgICA8Z2FsbGVyeS1uYXYgKm5nSWY9XCJjb25maWcubmF2ICYmIHN0YXRlLml0ZW1zLmxlbmd0aCA+IDFcIlxuICAgICAgICAgICAgICAgICAgICAgW3N0YXRlXT1cInN0YXRlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjb25maWddPVwiY29uZmlnXCJcbiAgICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwiYWN0aW9uLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgICA8L2dhbGxlcnktbmF2PlxuXG4gICAgICA8L2dhbGxlcnktc2xpZGVyPlxuXG4gICAgICA8Z2FsbGVyeS1kb3RzICpuZ0lmPVwiY29uZmlnLmRvdHNcIlxuICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwic3RhdGVcIlxuICAgICAgICAgICAgICAgICAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwiYWN0aW9uLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgPC9nYWxsZXJ5LWRvdHM+XG5cbiAgICAgIDxnYWxsZXJ5LWNvdW50ZXIgKm5nSWY9XCJjb25maWcuY291bnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdGF0ZV09XCJzdGF0ZVwiPlxuICAgICAgPC9nYWxsZXJ5LWNvdW50ZXI+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUNvcmVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIHN0YXRlOiBHYWxsZXJ5U3RhdGU7XG4gIEBJbnB1dCgpIGNvbmZpZzogR2FsbGVyeUNvbmZpZztcbiAgQE91dHB1dCgpIGFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVtYmVyPigpO1xuICBAT3V0cHV0KCkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSB0aHVtYkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8R2FsbGVyeUVycm9yPigpO1xuXG4gIC8qKiBTZXQgdGh1bWJuYWlscyBwb3NpdGlvbiAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIudGh1bWJQb3NpdGlvbicpIGdldCB0aHVtYlBvc2l0aW9uKCk6ICd0b3AnIHwgJ2xlZnQnIHwgJ2xlZnQtdG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnRodW1iUG9zaXRpb247XG4gIH1cblxuICAvKiogU2V0IHNsaWRpbmcgZGlyZWN0aW9uICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5zbGlkaW5nRGlyZWN0aW9uJykgZ2V0IHNsaWRpbmdEaXJlY3Rpb24oKTogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLnNsaWRpbmdEaXJlY3Rpb247XG4gIH1cblxuICAvKiogRGlzYWJsZSB0aHVtYm5haWxzIGNsaWNrcyAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZVRodW1iJykgZ2V0IGRpc2FibGVUaHVtYigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuZGlzYWJsZVRodW1iO1xuICB9XG5cbiAgLyoqIFNldCBnYWxsZXJ5IGltYWdlIHNpemUgKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmltYWdlU2l6ZScpIGdldCBpbWFnZVNpemUoKTogJ2NvdmVyJyB8ICdjb250YWluJyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmltYWdlU2l6ZTtcbiAgfVxuXG4gIC8qKiBTZXQgZ2FsbGVyeSBkb3RzIHBvc2l0aW9uICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5kb3RzUG9zaXRpb24nKSBnZXQgZG90c1Bvc2l0aW9uKCk6ICd0b3AnIHwgJ2JvdHRvbScge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5kb3RzUG9zaXRpb247XG4gIH1cblxuICAvKiogU2V0IGdhbGxlcnkgY291bnRlciBwb3NpdGlvbiAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuY291bnRlclBvc2l0aW9uJykgZ2V0IGNvdW50ZXJQb3NpdGlvbigpOiAndG9wJyB8ICdib3R0b20nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuY291bnRlclBvc2l0aW9uO1xuICB9XG5cbn1cbiJdfQ==