import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
export class GalleryCoreComponent {
    constructor() {
        this.action = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.thumbClick = new EventEmitter();
        this.error = new EventEmitter();
        this.youtubeItemClickEvent = new EventEmitter();
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
                      (youtubeItemClickEvent)="youtubeItemClickEvent.emit($event)"
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
    youtubeItemClickEvent: [{ type: Output }],
    thumbPosition: [{ type: HostBinding, args: ['attr.thumbPosition',] }],
    slidingDirection: [{ type: HostBinding, args: ['attr.slidingDirection',] }],
    disableThumb: [{ type: HostBinding, args: ['attr.disableThumb',] }],
    imageSize: [{ type: HostBinding, args: ['attr.imageSize',] }],
    dotsPosition: [{ type: HostBinding, args: ['attr.dotsPosition',] }],
    counterPosition: [{ type: HostBinding, args: ['attr.counterPosition',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1jb3JlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWdhbGxlcnkvc3JjL2xpYi9jb21wb25lbnRzL2dhbGxlcnktY29yZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFdBQVcsRUFDWCx1QkFBdUIsRUFDdkIsWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBMEN2QixNQUFNLE9BQU8sb0JBQW9CO0lBdENqQztRQTBDWSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7UUFDN0MsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDdkMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDeEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFnQixDQUFDO1FBQ3pDLDBCQUFxQixHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7SUFnQ25FLENBQUM7SUE5QkMsOEJBQThCO0lBQzlCLElBQXVDLGFBQWE7UUFDbEQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNEJBQTRCO0lBQzVCLElBQTBDLGdCQUFnQjtRQUN4RCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDdEMsQ0FBQztJQUVELGdDQUFnQztJQUNoQyxJQUFzQyxZQUFZO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDbEMsQ0FBQztJQUVELDZCQUE2QjtJQUM3QixJQUFtQyxTQUFTO1FBQzFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDL0IsQ0FBQztJQUVELGdDQUFnQztJQUNoQyxJQUFzQyxZQUFZO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDbEMsQ0FBQztJQUVELG1DQUFtQztJQUNuQyxJQUF5QyxlQUFlO1FBQ3RELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDckMsQ0FBQzs7O1lBNUVGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUNUO2FBQ0Y7OztvQkFHRSxLQUFLO3FCQUNMLEtBQUs7cUJBQ0wsTUFBTTt3QkFDTixNQUFNO3lCQUNOLE1BQU07b0JBQ04sTUFBTTtvQ0FDTixNQUFNOzRCQUdOLFdBQVcsU0FBQyxvQkFBb0I7K0JBS2hDLFdBQVcsU0FBQyx1QkFBdUI7MkJBS25DLFdBQVcsU0FBQyxtQkFBbUI7d0JBSy9CLFdBQVcsU0FBQyxnQkFBZ0I7MkJBSzVCLFdBQVcsU0FBQyxtQkFBbUI7OEJBSy9CLFdBQVcsU0FBQyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEhvc3RCaW5kaW5nLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgRXZlbnRFbWl0dGVyLFxuICBFbGVtZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR2FsbGVyeUVycm9yLCBHYWxsZXJ5U3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvZ2FsbGVyeS5tb2RlbCc7XG5pbXBvcnQgeyBHYWxsZXJ5Q29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL2NvbmZpZy5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dhbGxlcnktY29yZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxnYWxsZXJ5LXRodW1icyAqbmdJZj1cImNvbmZpZy50aHVtYlwiXG4gICAgICAgICAgICAgICAgICAgIFtzdGF0ZV09XCJzdGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgIFtjb25maWddPVwiY29uZmlnXCJcbiAgICAgICAgICAgICAgICAgICAgKGFjdGlvbik9XCJhY3Rpb24uZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgKHRodW1iQ2xpY2spPVwidGh1bWJDbGljay5lbWl0KCRldmVudClcIj5cbiAgICA8L2dhbGxlcnktdGh1bWJzPlxuICAgIDxkaXYgY2xhc3M9XCJnLWJveFwiPlxuICAgICAgPGdhbGxlcnktc2xpZGVyIFtzdGF0ZV09XCJzdGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2NvbmZpZ109XCJjb25maWdcIlxuICAgICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwiYWN0aW9uLmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGl0ZW1DbGljayk9XCJpdGVtQ2xpY2suZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAoeW91dHViZUl0ZW1DbGlja0V2ZW50KT1cInlvdXR1YmVJdGVtQ2xpY2tFdmVudC5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgIChlcnJvcik9XCJlcnJvci5lbWl0KCRldmVudClcIj5cblxuICAgICAgICA8Z2FsbGVyeS1uYXYgKm5nSWY9XCJjb25maWcubmF2ICYmIHN0YXRlLml0ZW1zLmxlbmd0aCA+IDFcIlxuICAgICAgICAgICAgICAgICAgICAgW3N0YXRlXT1cInN0YXRlXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjb25maWddPVwiY29uZmlnXCJcbiAgICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwiYWN0aW9uLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgICA8L2dhbGxlcnktbmF2PlxuXG4gICAgICA8L2dhbGxlcnktc2xpZGVyPlxuXG4gICAgICA8Z2FsbGVyeS1kb3RzICpuZ0lmPVwiY29uZmlnLmRvdHNcIlxuICAgICAgICAgICAgICAgICAgICBbc3RhdGVdPVwic3RhdGVcIlxuICAgICAgICAgICAgICAgICAgICBbY29uZmlnXT1cImNvbmZpZ1wiXG4gICAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwiYWN0aW9uLmVtaXQoJGV2ZW50KVwiPlxuICAgICAgPC9nYWxsZXJ5LWRvdHM+XG5cbiAgICAgIDxnYWxsZXJ5LWNvdW50ZXIgKm5nSWY9XCJjb25maWcuY291bnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtzdGF0ZV09XCJzdGF0ZVwiPlxuICAgICAgPC9nYWxsZXJ5LWNvdW50ZXI+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUNvcmVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIHN0YXRlOiBHYWxsZXJ5U3RhdGU7XG4gIEBJbnB1dCgpIGNvbmZpZzogR2FsbGVyeUNvbmZpZztcbiAgQE91dHB1dCgpIGFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVtYmVyPigpO1xuICBAT3V0cHV0KCkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSB0aHVtYkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8R2FsbGVyeUVycm9yPigpO1xuICBAT3V0cHV0KCkgeW91dHViZUl0ZW1DbGlja0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxFbGVtZW50UmVmPigpO1xuXG4gIC8qKiBTZXQgdGh1bWJuYWlscyBwb3NpdGlvbiAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIudGh1bWJQb3NpdGlvbicpIGdldCB0aHVtYlBvc2l0aW9uKCk6ICd0b3AnIHwgJ2xlZnQnIHwgJ2xlZnQtdG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICAnYm90dG9tLWxlZnQnIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcudGh1bWJQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKiBTZXQgc2xpZGluZyBkaXJlY3Rpb24gKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLnNsaWRpbmdEaXJlY3Rpb24nKSBnZXQgc2xpZGluZ0RpcmVjdGlvbigpOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuc2xpZGluZ0RpcmVjdGlvbjtcbiAgfVxuXG4gIC8qKiBEaXNhYmxlIHRodW1ibmFpbHMgY2xpY2tzICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5kaXNhYmxlVGh1bWInKSBnZXQgZGlzYWJsZVRodW1iKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5kaXNhYmxlVGh1bWI7XG4gIH1cblxuICAvKiogU2V0IGdhbGxlcnkgaW1hZ2Ugc2l6ZSAqL1xuICBASG9zdEJpbmRpbmcoJ2F0dHIuaW1hZ2VTaXplJykgZ2V0IGltYWdlU2l6ZSgpOiAnY292ZXInIHwgJ2NvbnRhaW4nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcuaW1hZ2VTaXplO1xuICB9XG5cbiAgLyoqIFNldCBnYWxsZXJ5IGRvdHMgcG9zaXRpb24gKi9cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRvdHNQb3NpdGlvbicpIGdldCBkb3RzUG9zaXRpb24oKTogJ3RvcCcgfCAnYm90dG9tJyB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLmRvdHNQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKiBTZXQgZ2FsbGVyeSBjb3VudGVyIHBvc2l0aW9uICovXG4gIEBIb3N0QmluZGluZygnYXR0ci5jb3VudGVyUG9zaXRpb24nKSBnZXQgY291bnRlclBvc2l0aW9uKCk6ICd0b3AnIHwgJ2JvdHRvbScge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb3VudGVyUG9zaXRpb247XG4gIH1cblxufVxuIl19