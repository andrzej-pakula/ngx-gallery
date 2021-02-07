import { Directive, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
/**
 * This directive uses tap event if HammerJS is loaded, otherwise it falls back to normal click event
 */
export class TapClick {
    constructor(_el) {
        this._el = _el;
        this.clickListener = Subscription.EMPTY;
        this.tapClick = new EventEmitter();
    }
    ngOnInit() {
        this.activateClickEvent();
    }
    activateClickEvent() {
        if (typeof Hammer !== 'undefined') {
            // Use Hammer.js tap event
            this._hammer = new Hammer(this._el.nativeElement);
            this._hammer.on('tap', () => {
                if (!this.tapClickDisabled) {
                    this.tapClick.emit(null);
                }
            });
        }
        else {
            // Use normal click event
            this.clickListener = fromEvent(this._el.nativeElement, 'click').pipe(filter(() => !this.tapClickDisabled), tap(() => this.tapClick.emit(null))).subscribe();
        }
    }
    ngOnDestroy() {
        if (this._hammer) {
            this._hammer.destroy();
        }
        this.clickListener.unsubscribe();
    }
}
TapClick.decorators = [
    { type: Directive, args: [{
                selector: '[tapClick]'
            },] }
];
TapClick.ctorParameters = () => [
    { type: ElementRef }
];
TapClick.propDecorators = {
    tapClickDisabled: [{ type: Input }],
    tapClick: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwLWNsaWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL2RpcmVjdGl2ZXMvdGFwLWNsaWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0RyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSTdDOztHQUVHO0FBSUgsTUFBTSxPQUFPLFFBQVE7SUFPbkIsWUFBb0IsR0FBZTtRQUFmLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFKbkMsa0JBQWEsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBRXpCLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBR3hDLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUNqQywwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUMxQjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2xFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUNwQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDcEMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNmO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN4QjtRQUNELElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbkMsQ0FBQzs7O1lBeENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsWUFBWTthQUN2Qjs7O1lBWHFELFVBQVU7OzsrQkFnQjdELEtBQUs7dUJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5kZWNsYXJlIGNvbnN0IEhhbW1lcjogYW55O1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIHVzZXMgdGFwIGV2ZW50IGlmIEhhbW1lckpTIGlzIGxvYWRlZCwgb3RoZXJ3aXNlIGl0IGZhbGxzIGJhY2sgdG8gbm9ybWFsIGNsaWNrIGV2ZW50XG4gKi9cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t0YXBDbGlja10nXG59KVxuZXhwb3J0IGNsYXNzIFRhcENsaWNrIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2hhbW1lcjogYW55O1xuICBjbGlja0xpc3RlbmVyID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBASW5wdXQoKSB0YXBDbGlja0Rpc2FibGVkOiBib29sZWFuO1xuICBAT3V0cHV0KCkgdGFwQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYWN0aXZhdGVDbGlja0V2ZW50KCk7XG4gIH1cblxuICBhY3RpdmF0ZUNsaWNrRXZlbnQoKSB7XG4gICAgaWYgKHR5cGVvZiBIYW1tZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBVc2UgSGFtbWVyLmpzIHRhcCBldmVudFxuICAgICAgdGhpcy5faGFtbWVyID0gbmV3IEhhbW1lcih0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgIHRoaXMuX2hhbW1lci5vbigndGFwJywgKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMudGFwQ2xpY2tEaXNhYmxlZCkge1xuICAgICAgICAgIHRoaXMudGFwQ2xpY2suZW1pdChudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFVzZSBub3JtYWwgY2xpY2sgZXZlbnRcbiAgICAgIHRoaXMuY2xpY2tMaXN0ZW5lciA9IGZyb21FdmVudCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY2xpY2snKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4gIXRoaXMudGFwQ2xpY2tEaXNhYmxlZCksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLnRhcENsaWNrLmVtaXQobnVsbCkpXG4gICAgICApLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl9oYW1tZXIpIHtcbiAgICAgIHRoaXMuX2hhbW1lci5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuY2xpY2tMaXN0ZW5lci51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=