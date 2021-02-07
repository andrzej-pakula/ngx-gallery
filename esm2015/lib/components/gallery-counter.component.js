import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
export class GalleryCounterComponent {
}
GalleryCounterComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-counter',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="g-counter">{{(state.currIndex + 1) + '/' + state.items.length}}</div>
  `
            },] }
];
GalleryCounterComponent.propDecorators = {
    state: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1jb3VudGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWdhbGxlcnkvc3JjL2xpYi9jb21wb25lbnRzL2dhbGxlcnktY291bnRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFVMUUsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBUG5DLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOztHQUVUO2FBQ0Y7OztvQkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdhbGxlcnlTdGF0ZSB9IGZyb20gJy4uL21vZGVscy9nYWxsZXJ5Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeS1jb3VudGVyJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImctY291bnRlclwiPnt7KHN0YXRlLmN1cnJJbmRleCArIDEpICsgJy8nICsgc3RhdGUuaXRlbXMubGVuZ3RofX08L2Rpdj5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5Q291bnRlckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHN0YXRlOiBHYWxsZXJ5U3RhdGU7XG59XG4iXX0=