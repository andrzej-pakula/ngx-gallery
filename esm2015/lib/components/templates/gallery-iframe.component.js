import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class GalleryIframeComponent {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
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
}
GalleryIframeComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-iframe',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <iframe #iframe
            frameborder="0"
            allowfullscreen
            [attr.allow]="autoplay ? 'autoplay' : ''"
            [src]="iframeSrc">
    </iframe>
  `
            },] }
];
GalleryIframeComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
GalleryIframeComponent.propDecorators = {
    src: [{ type: Input, args: ['src',] }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    autoplay: [{ type: Input }],
    iframe: [{ type: ViewChild, args: ['iframe', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1pZnJhbWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL2NvbXBvbmVudHMvdGVtcGxhdGVzL2dhbGxlcnktaWZyYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQWMsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLFlBQVksRUFBbUIsTUFBTSwyQkFBMkIsQ0FBQztBQWMxRSxNQUFNLE9BQU8sc0JBQXNCO0lBcUJqQyxZQUFvQixVQUF3QjtRQUF4QixlQUFVLEdBQVYsVUFBVSxDQUFjO0lBQzVDLENBQUM7SUFsQkQsSUFBa0IsR0FBRyxDQUFDLEdBQVc7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxJQUFvQixVQUFVLENBQUMsV0FBb0I7UUFDakQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUM3QixJQUFJLFdBQVcsRUFBRTtnQkFDZixNQUFNLE1BQU0sR0FBc0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7Z0JBQzVELE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2FBQ25CO1NBQ0Y7SUFDSCxDQUFDOzs7WUEzQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7R0FPVDthQUNGOzs7WUFiUSxZQUFZOzs7a0JBa0JsQixLQUFLLFNBQUMsS0FBSzt5QkFJWCxLQUFLLFNBQUMsT0FBTzt1QkFTYixLQUFLO3FCQUVMLFNBQVMsU0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeS1pZnJhbWUnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aWZyYW1lICNpZnJhbWVcbiAgICAgICAgICAgIGZyYW1lYm9yZGVyPVwiMFwiXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW5cbiAgICAgICAgICAgIFthdHRyLmFsbG93XT1cImF1dG9wbGF5ID8gJ2F1dG9wbGF5JyA6ICcnXCJcbiAgICAgICAgICAgIFtzcmNdPVwiaWZyYW1lU3JjXCI+XG4gICAgPC9pZnJhbWU+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUlmcmFtZUNvbXBvbmVudCB7XG5cbiAgaWZyYW1lU3JjOiBTYWZlUmVzb3VyY2VVcmw7XG5cbiAgQElucHV0KCdzcmMnKSBzZXQgc3JjKHNyYzogc3RyaW5nKSB7XG4gICAgdGhpcy5pZnJhbWVTcmMgPSB0aGlzLl9zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHNyYyk7XG4gIH1cblxuICBASW5wdXQoJ3BhdXNlJykgc2V0IHBhdXNlVmlkZW8oc2hvdWxkUGF1c2U6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy5pZnJhbWUubmF0aXZlRWxlbWVudCkge1xuICAgICAgaWYgKHNob3VsZFBhdXNlKSB7XG4gICAgICAgIGNvbnN0IGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQgPSB0aGlzLmlmcmFtZS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBpZnJhbWUuc3JjID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBhdXRvcGxheTogYm9vbGVhbjtcblxuICBAVmlld0NoaWxkKCdpZnJhbWUnLCB7IHN0YXRpYzogdHJ1ZSB9KSBpZnJhbWU6IEVsZW1lbnRSZWY7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgfVxufVxuIl19