import { Directive, Input, Output, EventEmitter, HostListener, ElementRef, Renderer2 } from '@angular/core';
export class IframeTracker {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.iframeClick = new EventEmitter();
    }
    ngOnInit() {
        this.renderer.listen(window, 'blur', () => this.onWindowBlur());
    }
    onIframeMouseOver() {
        this.log('Iframe mouse over');
        this.iframeMouseOver = true;
        this.resetFocusOnWindow();
    }
    onIframeMouseOut() {
        this.log('Iframe mouse out');
        this.iframeMouseOver = false;
        this.resetFocusOnWindow();
    }
    onWindowBlur() {
        if (this.iframeMouseOver) {
            this.log('WOW! Iframe click!!!');
            this.resetFocusOnWindow();
            this.iframeClick.emit(this.el);
        }
    }
    resetFocusOnWindow() {
        setTimeout(() => {
            this.log('reset focus to window');
            window.focus();
        }, 100);
    }
    log(message) {
        if (this.debug) {
            console.log(message);
        }
    }
}
IframeTracker.decorators = [
    { type: Directive, args: [{
                selector: '[iframeTracker]'
            },] }
];
IframeTracker.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
IframeTracker.propDecorators = {
    debug: [{ type: Input }],
    iframeClick: [{ type: Output }],
    onIframeMouseOver: [{ type: HostListener, args: ['mouseover',] }],
    onIframeMouseOut: [{ type: HostListener, args: ['mouseout',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLXRyYWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvZGlyZWN0aXZlcy9pZnJhbWUtdHJhY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUNwQyxNQUFNLGVBQWUsQ0FBQztBQUt2QixNQUFNLE9BQU8sYUFBYTtJQU14QixZQUFvQixFQUFjLEVBQVUsUUFBbUI7UUFBM0MsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFGckQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0lBRVcsQ0FBQztJQUVuRSxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBR0QsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFHRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVPLFlBQVk7UUFDbEIsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUM7SUFFTyxHQUFHLENBQUMsT0FBZTtRQUN6QixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQzs7O1lBaERGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCOzs7WUFMZSxVQUFVO1lBQUUsU0FBUzs7O29CQVNsQyxLQUFLOzBCQUNMLE1BQU07Z0NBUU4sWUFBWSxTQUFDLFdBQVc7K0JBT3hCLFlBQVksU0FBQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lciwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBPbkluaXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tpZnJhbWVUcmFja2VyXSdcbn0pXG5leHBvcnQgY2xhc3MgSWZyYW1lVHJhY2tlciBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgaWZyYW1lTW91c2VPdmVyOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGRlYnVnOiBib29sZWFuO1xuICBAT3V0cHV0KCkgaWZyYW1lQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPEVsZW1lbnRSZWY+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZiwgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKHdpbmRvdywgJ2JsdXInLCAoKSA9PiB0aGlzLm9uV2luZG93Qmx1cigpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlb3ZlcicpXG4gIG9uSWZyYW1lTW91c2VPdmVyKCkge1xuICAgIHRoaXMubG9nKCdJZnJhbWUgbW91c2Ugb3ZlcicpO1xuICAgIHRoaXMuaWZyYW1lTW91c2VPdmVyID0gdHJ1ZTtcbiAgICB0aGlzLnJlc2V0Rm9jdXNPbldpbmRvdygpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VvdXQnKVxuICBvbklmcmFtZU1vdXNlT3V0KCkge1xuICAgIHRoaXMubG9nKCdJZnJhbWUgbW91c2Ugb3V0Jyk7XG4gICAgdGhpcy5pZnJhbWVNb3VzZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLnJlc2V0Rm9jdXNPbldpbmRvdygpO1xuICB9XG5cbiAgcHJpdmF0ZSBvbldpbmRvd0JsdXIoKSB7XG4gICAgaWYgKHRoaXMuaWZyYW1lTW91c2VPdmVyKSB7XG4gICAgICB0aGlzLmxvZygnV09XISBJZnJhbWUgY2xpY2shISEnKTtcbiAgICAgIHRoaXMucmVzZXRGb2N1c09uV2luZG93KCk7XG4gICAgICB0aGlzLmlmcmFtZUNsaWNrLmVtaXQodGhpcy5lbCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSByZXNldEZvY3VzT25XaW5kb3coKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmxvZygncmVzZXQgZm9jdXMgdG8gd2luZG93Jyk7XG4gICAgICB3aW5kb3cuZm9jdXMoKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2cobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19