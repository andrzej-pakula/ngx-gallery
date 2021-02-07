import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
export class GalleryDotsComponent {
    constructor() {
        this.action = new EventEmitter();
    }
}
GalleryDotsComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-dots',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="g-dot"
         *ngFor="let item of state.items; let i = index"
         [class.g-dot-active]="i === state.currIndex"
         [style.width.px]="config?.dotsSize"
         [style.height.px]="config?.dotsSize"
         (tapClick)="action.emit(i)">
      <div class="g-dot-inner"></div>
    </div>
  `
            },] }
];
GalleryDotsComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1kb3RzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWdhbGxlcnkvc3JjL2xpYi9jb21wb25lbnRzL2dhbGxlcnktZG90cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLHVCQUF1QixFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQWtCaEcsTUFBTSxPQUFPLG9CQUFvQjtJQWRqQztRQWlCWSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUNoRCxDQUFDOzs7WUFsQkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7R0FTVDthQUNGOzs7b0JBRUUsS0FBSztxQkFDTCxLQUFLO3FCQUNMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdhbGxlcnlTdGF0ZSB9IGZyb20gJy4uL21vZGVscy9nYWxsZXJ5Lm1vZGVsJztcbmltcG9ydCB7IEdhbGxlcnlDb25maWcgfSBmcm9tICcuLi9tb2RlbHMvY29uZmlnLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeS1kb3RzJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImctZG90XCJcbiAgICAgICAgICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0YXRlLml0ZW1zOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgIFtjbGFzcy5nLWRvdC1hY3RpdmVdPVwiaSA9PT0gc3RhdGUuY3VyckluZGV4XCJcbiAgICAgICAgIFtzdHlsZS53aWR0aC5weF09XCJjb25maWc/LmRvdHNTaXplXCJcbiAgICAgICAgIFtzdHlsZS5oZWlnaHQucHhdPVwiY29uZmlnPy5kb3RzU2l6ZVwiXG4gICAgICAgICAodGFwQ2xpY2spPVwiYWN0aW9uLmVtaXQoaSlcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnLWRvdC1pbm5lclwiPjwvZGl2PlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlEb3RzQ29tcG9uZW50IHtcbiAgQElucHV0KCkgc3RhdGU6IEdhbGxlcnlTdGF0ZTtcbiAgQElucHV0KCkgY29uZmlnOiBHYWxsZXJ5Q29uZmlnO1xuICBAT3V0cHV0KCkgYWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG59XG4iXX0=