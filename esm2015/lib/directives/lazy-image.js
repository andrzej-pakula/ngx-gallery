import { Directive, Input, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription, zip, fromEvent } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
export class LazyImage {
    constructor(document) {
        this.document = document;
        this._imageLoader$ = new Subject();
        this._loaderSub$ = Subscription.EMPTY;
        this.loaded = new EventEmitter();
        this.error = new EventEmitter();
        this._loaderSub$ = this._imageLoader$.pipe(switchMap((imageSrc) => this.nativeLoader(imageSrc))).subscribe();
    }
    ngOnChanges(changes) {
        if (changes['src'] && changes['src'].previousValue !== changes['src'].currentValue) {
            this.loadImage(this.src);
        }
    }
    ngOnDestroy() {
        this._loaderSub$.unsubscribe();
        this._imageLoader$.complete();
    }
    loadImage(imagePath) {
        this._imageLoader$.next(imagePath);
    }
    /**
     * Native image loader, does not emit progress
     * @param url
     */
    nativeLoader(url) {
        const img = this.document.createElement('img');
        // Stop previously loading
        img.src = url;
        // Image load success
        const loadSuccess = fromEvent(img, 'load').pipe(tap(() => this.loaded.emit(url)));
        // Image load failed
        const loadError = fromEvent(img, 'error').pipe(tap(() => this.error.emit(new Error(`[lazyImage]: The image ${url} did not load`))));
        return zip(loadSuccess, loadError);
    }
}
LazyImage.decorators = [
    { type: Directive, args: [{
                selector: '[lazyImage]'
            },] }
];
LazyImage.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
LazyImage.propDecorators = {
    src: [{ type: Input, args: ['lazyImage',] }],
    loaded: [{ type: Output }],
    error: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1pbWFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWdhbGxlcnkvc3JjL2xpYi9kaXJlY3RpdmVzL2xhenktaW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUF1QyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFjLFlBQVksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFLaEQsTUFBTSxPQUFPLFNBQVM7SUFVcEIsWUFBc0MsUUFBYTtRQUFiLGFBQVEsR0FBUixRQUFRLENBQUs7UUFSM0Msa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ3RDLGdCQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUkvQixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNwQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUcxQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUN4QyxTQUFTLENBQUMsQ0FBQyxRQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQzdELENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLEVBQUU7WUFDbEYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsU0FBUyxDQUFDLFNBQWlCO1FBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7O09BR0c7SUFDSCxZQUFZLENBQUMsR0FBVztRQUN0QixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMvQywwQkFBMEI7UUFDMUIsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZCxxQkFBcUI7UUFDckIsTUFBTSxXQUFXLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQzdDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNqQyxDQUFDO1FBQ0Ysb0JBQW9CO1FBQ3BCLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM1QyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsMEJBQTBCLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUNwRixDQUFDO1FBQ0YsT0FBTyxHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7OztZQW5ERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7YUFDeEI7Ozs0Q0FXYyxNQUFNLFNBQUMsUUFBUTs7O2tCQUwzQixLQUFLLFNBQUMsV0FBVztxQkFFakIsTUFBTTtvQkFDTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksIFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcywgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgemlwLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGF6eUltYWdlXSdcbn0pXG5leHBvcnQgY2xhc3MgTGF6eUltYWdlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgX2ltYWdlTG9hZGVyJCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBfbG9hZGVyU3ViJCA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBASW5wdXQoJ2xhenlJbWFnZScpIHNyYzogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBsb2FkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxFcnJvcj4oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnkpIHtcbiAgICB0aGlzLl9sb2FkZXJTdWIkID0gdGhpcy5faW1hZ2VMb2FkZXIkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGltYWdlU3JjOiBzdHJpbmcpID0+IHRoaXMubmF0aXZlTG9hZGVyKGltYWdlU3JjKSlcbiAgICApLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydzcmMnXSAmJiBjaGFuZ2VzWydzcmMnXS5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzWydzcmMnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMubG9hZEltYWdlKHRoaXMuc3JjKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9sb2FkZXJTdWIkLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faW1hZ2VMb2FkZXIkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBsb2FkSW1hZ2UoaW1hZ2VQYXRoOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9pbWFnZUxvYWRlciQubmV4dChpbWFnZVBhdGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIE5hdGl2ZSBpbWFnZSBsb2FkZXIsIGRvZXMgbm90IGVtaXQgcHJvZ3Jlc3NcbiAgICogQHBhcmFtIHVybFxuICAgKi9cbiAgbmF0aXZlTG9hZGVyKHVybDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICBjb25zdCBpbWcgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIC8vIFN0b3AgcHJldmlvdXNseSBsb2FkaW5nXG4gICAgaW1nLnNyYyA9IHVybDtcbiAgICAvLyBJbWFnZSBsb2FkIHN1Y2Nlc3NcbiAgICBjb25zdCBsb2FkU3VjY2VzcyA9IGZyb21FdmVudChpbWcsICdsb2FkJykucGlwZShcbiAgICAgIHRhcCgoKSA9PiB0aGlzLmxvYWRlZC5lbWl0KHVybCkpXG4gICAgKTtcbiAgICAvLyBJbWFnZSBsb2FkIGZhaWxlZFxuICAgIGNvbnN0IGxvYWRFcnJvciA9IGZyb21FdmVudChpbWcsICdlcnJvcicpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4gdGhpcy5lcnJvci5lbWl0KG5ldyBFcnJvcihgW2xhenlJbWFnZV06IFRoZSBpbWFnZSAke3VybH0gZGlkIG5vdCBsb2FkYCkpKVxuICAgICk7XG4gICAgcmV0dXJuIHppcChsb2FkU3VjY2VzcywgbG9hZEVycm9yKTtcbiAgfVxuXG59XG4iXX0=