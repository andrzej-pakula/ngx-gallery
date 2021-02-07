import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Lightbox } from './lightbox.service';
export class LightboxDirective {
    constructor(_lightbox, _el, _renderer) {
        this._lightbox = _lightbox;
        this._el = _el;
        this._renderer = _renderer;
        this.clickEvent = Subscription.EMPTY;
        this.index = 0;
        this.id = 'root';
    }
    ngOnInit() {
        this._renderer.setStyle(this._el.nativeElement, 'cursor', 'pointer');
        this.clickEvent = fromEvent(this._el.nativeElement, 'click').pipe(tap(() => this._lightbox.open(this.index, this.id))).subscribe();
    }
    ngOnDestroy() {
        this.clickEvent.unsubscribe();
    }
}
LightboxDirective.decorators = [
    { type: Directive, args: [{
                selector: '[lightbox]'
            },] }
];
LightboxDirective.ctorParameters = () => [
    { type: Lightbox },
    { type: ElementRef },
    { type: Renderer2 }
];
LightboxDirective.propDecorators = {
    index: [{ type: Input, args: ['lightbox',] }],
    id: [{ type: Input, args: ['gallery',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9saWdodGJveC9zcmMvbGlnaHRib3guZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFVLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0YsT0FBTyxFQUFFLFNBQVMsRUFBb0IsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFLOUMsTUFBTSxPQUFPLGlCQUFpQjtJQU81QixZQUFvQixTQUFtQixFQUFVLEdBQWUsRUFBVSxTQUFvQjtRQUExRSxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFMOUYsZUFBVSxHQUFxQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBRS9CLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDWCxPQUFFLEdBQUcsTUFBTSxDQUFDO0lBRzlCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDL0QsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3BELENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7OztZQUpRLFFBQVE7WUFIRyxVQUFVO1lBQTRCLFNBQVM7OztvQkFZaEUsS0FBSyxTQUFDLFVBQVU7aUJBQ2hCLEtBQUssU0FBQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb25MaWtlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExpZ2h0Ym94IH0gZnJvbSAnLi9saWdodGJveC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpZ2h0Ym94XSdcbn0pXG5leHBvcnQgY2xhc3MgTGlnaHRib3hEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgY2xpY2tFdmVudDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBASW5wdXQoJ2xpZ2h0Ym94JykgaW5kZXggPSAwO1xuICBASW5wdXQoJ2dhbGxlcnknKSBpZCA9ICdyb290JztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9saWdodGJveDogTGlnaHRib3gsIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY3Vyc29yJywgJ3BvaW50ZXInKTtcbiAgICB0aGlzLmNsaWNrRXZlbnQgPSBmcm9tRXZlbnQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2NsaWNrJykucGlwZShcbiAgICAgIHRhcCgoKSA9PiB0aGlzLl9saWdodGJveC5vcGVuKHRoaXMuaW5kZXgsIHRoaXMuaWQpKVxuICAgICkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsaWNrRXZlbnQudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19