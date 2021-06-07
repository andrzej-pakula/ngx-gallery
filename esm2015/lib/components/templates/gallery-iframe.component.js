import { Component, Input, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class GalleryIframeComponent {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.iframeClickEvent = new EventEmitter();
    }
    set src(src) {
        this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(src);
    }
    set pauseVideo(shouldPause) {
        if (this.iframe.nativeElement) {
            if (shouldPause) {
                const iframe = this.iframe.nativeElement;
                iframe.src = null;
            }
        }
    }
    onIframeClick(el) {
        this.iframeClickEvent.emit(el);
    }
}
GalleryIframeComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-iframe',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <iframe
            #iframe
            frameborder="0"
            allowfullscreen
            (iframeClick)="onIframeClick($event)"
            [attr.allow]="autoplay ? 'autoplay' : ''"
            [src]="iframeSrc"
            iframeTracker
    >
    </iframe>
  `
            },] }
];
GalleryIframeComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
GalleryIframeComponent.propDecorators = {
    iframeClickEvent: [{ type: Output }],
    src: [{ type: Input, args: ['src',] }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    autoplay: [{ type: Input }],
    iframe: [{ type: ViewChild, args: ['iframe', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1pZnJhbWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL2NvbXBvbmVudHMvdGVtcGxhdGVzL2dhbGxlcnktaWZyYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQWMsdUJBQXVCLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2SCxPQUFPLEVBQUUsWUFBWSxFQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBa0IxRSxNQUFNLE9BQU8sc0JBQXNCO0lBcUJqQyxZQUFvQixVQUF3QjtRQUF4QixlQUFVLEdBQVYsVUFBVSxDQUFjO1FBbkJsQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0lBb0I1RCxDQUFDO0lBbEJELElBQWtCLEdBQUcsQ0FBQyxHQUFXO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsSUFBb0IsVUFBVSxDQUFDLFdBQW9CO1FBQ2pELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUU7WUFDN0IsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsTUFBTSxNQUFNLEdBQXNCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO2dCQUM1RCxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQzthQUNuQjtTQUNGO0lBQ0gsQ0FBQztJQVNELGFBQWEsQ0FBQyxFQUFjO1FBQzFCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDaEMsQ0FBQzs7O1lBMUNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO2FBQ0Y7OztZQWpCUSxZQUFZOzs7K0JBb0JsQixNQUFNO2tCQUVOLEtBQUssU0FBQyxLQUFLO3lCQUlYLEtBQUssU0FBQyxPQUFPO3VCQVNiLEtBQUs7cUJBRUwsU0FBUyxTQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeS1pZnJhbWUnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aWZyYW1lXG4gICAgICAgICAgICAjaWZyYW1lXG4gICAgICAgICAgICBmcmFtZWJvcmRlcj1cIjBcIlxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuXG4gICAgICAgICAgICAoaWZyYW1lQ2xpY2spPVwib25JZnJhbWVDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgIFthdHRyLmFsbG93XT1cImF1dG9wbGF5ID8gJ2F1dG9wbGF5JyA6ICcnXCJcbiAgICAgICAgICAgIFtzcmNdPVwiaWZyYW1lU3JjXCJcbiAgICAgICAgICAgIGlmcmFtZVRyYWNrZXJcbiAgICA+XG4gICAgPC9pZnJhbWU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUlmcmFtZUNvbXBvbmVudCB7XG4gIGlmcmFtZVNyYzogU2FmZVJlc291cmNlVXJsO1xuICBAT3V0cHV0KCkgaWZyYW1lQ2xpY2tFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXI8RWxlbWVudFJlZj4oKTtcblxuICBASW5wdXQoJ3NyYycpIHNldCBzcmMoc3JjOiBzdHJpbmcpIHtcbiAgICB0aGlzLmlmcmFtZVNyYyA9IHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoc3JjKTtcbiAgfVxuXG4gIEBJbnB1dCgncGF1c2UnKSBzZXQgcGF1c2VWaWRlbyhzaG91bGRQYXVzZTogYm9vbGVhbikge1xuICAgIGlmICh0aGlzLmlmcmFtZS5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBpZiAoc2hvdWxkUGF1c2UpIHtcbiAgICAgICAgY29uc3QgaWZyYW1lOiBIVE1MSUZyYW1lRWxlbWVudCA9IHRoaXMuaWZyYW1lLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGlmcmFtZS5zcmMgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIGF1dG9wbGF5OiBib29sZWFuO1xuXG4gIEBWaWV3Q2hpbGQoJ2lmcmFtZScsIHsgc3RhdGljOiB0cnVlIH0pIGlmcmFtZTogRWxlbWVudFJlZjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICB9XG5cbiAgb25JZnJhbWVDbGljayhlbDogRWxlbWVudFJlZik6IHZvaWQge1xuICAgIHRoaXMuaWZyYW1lQ2xpY2tFdmVudC5lbWl0KGVsKVxuICB9XG59XG4iXX0=