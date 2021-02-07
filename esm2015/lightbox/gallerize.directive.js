import { Directive, Input, Inject, Optional, Self, Host, NgZone, ElementRef, Renderer2, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Gallery, ImageItem, GalleryComponent } from 'ng-gallery';
// Uncomment the following line in development mode
// import { Gallery, GalleryRef, ImageItem, GalleryComponent, GalleryState, GalleryItem } from '../../src/public-api';
import { Lightbox } from './lightbox.service';
import { Subject, from, EMPTY } from 'rxjs';
import { tap, map, switchMap, finalize, debounceTime } from 'rxjs/operators';
export class GallerizeDirective {
    constructor(_zone, _el, _gallery, _lightbox, _renderer, platform, _document, _galleryCmp) {
        this._zone = _zone;
        this._el = _el;
        this._gallery = _gallery;
        this._lightbox = _lightbox;
        this._renderer = _renderer;
        this._document = _document;
        this._galleryCmp = _galleryCmp;
        /** Default gallery id */
        this._galleryId = 'lightbox';
        /** The selector used to query images elements */
        this.selector = 'img';
        // Set gallerize mode
        if (isPlatformBrowser(platform)) {
            this._mode = _galleryCmp ? "gallery" /* Gallery */ : "detector" /* Detector */;
        }
    }
    ngOnInit() {
        this._zone.runOutsideAngular(() => {
            this._galleryId = this.gallerize || this._galleryId;
            const ref = this._gallery.ref(this._galleryId);
            switch (this._mode) {
                case "detector" /* Detector */:
                    this.detectorMode(ref);
                    break;
                case "gallery" /* Gallery */:
                    this.galleryMode(ref);
            }
        });
    }
    ngOnDestroy() {
        switch (this._mode) {
            case "detector" /* Detector */:
                this._detector$.complete();
                this._observer$.disconnect();
                break;
            case "gallery" /* Gallery */:
                this._itemClick$.unsubscribe();
                this._itemChange$.unsubscribe();
        }
    }
    /** Gallery mode: means `gallerize` directive is used on `<gallery>` component
     * Adds a click event to each gallery item so it opens in lightbox */
    galleryMode(galleryRef) {
        // Clone its items to the new gallery instance
        this._itemClick$ = this._galleryCmp.galleryRef.itemClick.subscribe((i) => this._lightbox.open(i, this._galleryId));
        this._itemChange$ = this._galleryCmp.galleryRef.itemsChanged.subscribe((state) => galleryRef.load(state.items));
    }
    /** Detector mode: means `gallerize` directive is used on a normal HTMLElement
     *  Detects images and adds a click event to each image so it opens in the lightbox */
    detectorMode(galleryRef) {
        this._detector$ = new Subject();
        // Query image elements
        this._detector$.pipe(debounceTime(300), switchMap(() => {
            /** get all img elements from content */
            const imageElements = this._el.nativeElement.querySelectorAll(this.selector);
            if (imageElements && imageElements.length) {
                const images = [];
                return from(imageElements).pipe(map((el, i) => {
                    // Add click event to the image
                    this._renderer.setStyle(el, 'cursor', 'pointer');
                    this._renderer.setProperty(el, 'onclick', () => this._zone.run(() => this._lightbox.open(i, this._galleryId)));
                    if (el instanceof HTMLImageElement) {
                        // If element is type of img use the src property
                        return {
                            src: el.getAttribute('imageSrc') || el.src,
                            thumb: el.getAttribute('thumbSrc') || el.src
                        };
                    }
                    else {
                        // Otherwise, use element background-image url
                        const elStyle = el.currentStyle || this._document.defaultView.getComputedStyle(el, null);
                        const background = elStyle.backgroundImage.slice(4, -1).replace(/"/g, '');
                        return {
                            src: el.getAttribute('imageSrc') || background,
                            thumb: el.getAttribute('thumbSrc') || background
                        };
                    }
                }), tap((data) => images.push(new ImageItem(data))), finalize(() => galleryRef.load(images)));
            }
            else {
                return EMPTY;
            }
        })).subscribe();
        // Observe content changes
        this._observer$ = new MutationObserver(() => this._detector$.next());
        this._observer$.observe(this._el.nativeElement, { childList: true, subtree: true });
    }
}
GallerizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[gallerize]'
            },] }
];
GallerizeDirective.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: Gallery },
    { type: Lightbox },
    { type: Renderer2 },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: GalleryComponent, decorators: [{ type: Host }, { type: Self }, { type: Optional }] }
];
GallerizeDirective.propDecorators = {
    gallerize: [{ type: Input }],
    selector: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyaXplLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWdhbGxlcnkvbGlnaHRib3gvc3JjL2dhbGxlcml6ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBR0wsTUFBTSxFQUNOLFFBQVEsRUFDUixJQUFJLEVBQ0osSUFBSSxFQUNKLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUNULFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFOUQsT0FBTyxFQUFFLE9BQU8sRUFBYyxTQUFTLEVBQUUsZ0JBQWdCLEVBQTZCLE1BQU0sWUFBWSxDQUFDO0FBQ3pHLG1EQUFtRDtBQUNuRCxzSEFBc0g7QUFDdEgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTlDLE9BQU8sRUFBRSxPQUFPLEVBQWdCLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUQsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQWdCN0UsTUFBTSxPQUFPLGtCQUFrQjtJQThCN0IsWUFBb0IsS0FBYSxFQUNiLEdBQWUsRUFDZixRQUFpQixFQUNqQixTQUFtQixFQUNuQixTQUFvQixFQUNQLFFBQWdCLEVBQ1gsU0FBYyxFQUNKLFdBQTZCO1FBUHpELFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFFRixjQUFTLEdBQVQsU0FBUyxDQUFL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VSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUN4QyxDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsT0FBTyxLQUFLLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUNILENBQUMsU0FBUyxFQUFFLENBQUM7UUFFZCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQzs7O1lBdklGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTthQUN4Qjs7O1lBNUJDLE1BQU07WUFDTixVQUFVO1lBTUgsT0FBTztZQUdQLFFBQVE7WUFSZixTQUFTO1lBOERrQyxNQUFNLHVCQUFwQyxNQUFNLFNBQUMsV0FBVzs0Q0FDbEIsTUFBTSxTQUFDLFFBQVE7WUExRFcsZ0JBQWdCLHVCQTJEMUMsSUFBSSxZQUFJLElBQUksWUFBSSxRQUFROzs7d0JBWnBDLEtBQUs7dUJBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT25EZXN0cm95LFxuICBJbmplY3QsXG4gIE9wdGlvbmFsLFxuICBTZWxmLFxuICBIb3N0LFxuICBOZ1pvbmUsXG4gIEVsZW1lbnRSZWYsXG4gIFJlbmRlcmVyMixcbiAgUExBVEZPUk1fSURcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBHYWxsZXJ5LCBHYWxsZXJ5UmVmLCBJbWFnZUl0ZW0sIEdhbGxlcnlDb21wb25lbnQsIEdhbGxlcnlTdGF0ZSwgR2FsbGVyeUl0ZW0gfSBmcm9tICduZy1nYWxsZXJ5Jztcbi8vIFVuY29tbWVudCB0aGUgZm9sbG93aW5nIGxpbmUgaW4gZGV2ZWxvcG1lbnQgbW9kZVxuLy8gaW1wb3J0IHsgR2FsbGVyeSwgR2FsbGVyeVJlZiwgSW1hZ2VJdGVtLCBHYWxsZXJ5Q29tcG9uZW50LCBHYWxsZXJ5U3RhdGUsIEdhbGxlcnlJdGVtIH0gZnJvbSAnLi4vLi4vc3JjL3B1YmxpYy1hcGknO1xuaW1wb3J0IHsgTGlnaHRib3ggfSBmcm9tICcuL2xpZ2h0Ym94LnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24sIGZyb20sIEVNUFRZIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIG1hcCwgc3dpdGNoTWFwLCBmaW5hbGl6ZSwgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIFRoaXMgZGlyZWN0aXZlIGhhcyAyIG1vZGVzOlxuICogMSAtIElmIGhvc3QgZWxlbWVudCBpcyBhIEhUTUxFbGVtZW50LCBpdCBkZXRlY3RzIHRoZSBpbWFnZXMgYW5kIGhvb2tzIHRoZWlyIGNsaWNrcyB0byBsaWdodGJveFxuICogMiAtIElmIGhvc3QgZWxlbWVudCBpcyBhIEdhbGxlcnlDb21wb25lbnQsIGl0IGhvb2tzIHRoZSBpbWFnZXMgY2xpY2sgdG8gdGhlIGxpZ2h0Ym94XG4gKi9cblxuY29uc3QgZW51bSBHYWxsZXJpemVNb2RlIHtcbiAgRGV0ZWN0b3IgPSAnZGV0ZWN0b3InLFxuICBHYWxsZXJ5ID0gJ2dhbGxlcnknXG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tnYWxsZXJpemVdJ1xufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJpemVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgLyoqIERlZmF1bHQgZ2FsbGVyeSBpZCAqL1xuICBwcml2YXRlIF9nYWxsZXJ5SWQgPSAnbGlnaHRib3gnO1xuXG4gIC8qKiBHYWxsZXJpemUgbW9kZSAqL1xuICBwcml2YXRlIHJlYWRvbmx5IF9tb2RlOiBHYWxsZXJpemVNb2RlO1xuXG4gIC8qKiBJZiBob3N0IGVsZW1lbnQgaXMgYSBIVE1MRWxlbWVudCwgd2lsbCB1c2UgdGhlIGZvbGxvd2luZyB2YXJpYWJsZXM6ICovXG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHRvIGZpcmUgdGhlIGRldGVjdGlvbiBzdHJlYW0gdGhlIGltYWdlIGVsZW1lbnRzIGhhcyBjaGFuZ2VkICovXG4gIHByaXZhdGUgX29ic2VydmVyJDogYW55O1xuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIGltYWdlIGlzIGRpc2NvdmVyICovXG4gIHByaXZhdGUgX2RldGVjdG9yJDogU3ViamVjdDxhbnk+O1xuXG4gIC8qKiBJZiBob3N0IGVsZW1lbnQgaXMgYSBHYWxsZXJ5Q29tcG9uZW50LCB3aWxsIHVzZSB0aGUgZm9sbG93aW5nIHZhcmlhYmxlczogKi9cblxuICAvKiogR2FsbGVyeSBldmVudHMgKGlmIHVzZWQgb24gYSBnYWxsZXJ5IGNvbXBvbmVudCkgKi9cbiAgcHJpdmF0ZSBfaXRlbUNsaWNrJDogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIF9pdGVtQ2hhbmdlJDogU3Vic2NyaXB0aW9uO1xuXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIC8qKiBJZiBzZXQsIGl0IHdpbGwgYmVjb21lIHRoZSBnYWxsZXJ5IGlkICovXG4gIEBJbnB1dCgpIGdhbGxlcml6ZTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgc2VsZWN0b3IgdXNlZCB0byBxdWVyeSBpbWFnZXMgZWxlbWVudHMgKi9cbiAgQElucHV0KCkgc2VsZWN0b3IgPSAnaW1nJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF96b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9nYWxsZXJ5OiBHYWxsZXJ5LFxuICAgICAgICAgICAgICBwcml2YXRlIF9saWdodGJveDogTGlnaHRib3gsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtOiBPYmplY3QsXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXG4gICAgICAgICAgICAgIEBIb3N0KCkgQFNlbGYoKSBAT3B0aW9uYWwoKSBwcml2YXRlIF9nYWxsZXJ5Q21wOiBHYWxsZXJ5Q29tcG9uZW50KSB7XG5cbiAgICAvLyBTZXQgZ2FsbGVyaXplIG1vZGVcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm0pKSB7XG4gICAgICB0aGlzLl9tb2RlID0gX2dhbGxlcnlDbXAgPyBHYWxsZXJpemVNb2RlLkdhbGxlcnkgOiBHYWxsZXJpemVNb2RlLkRldGVjdG9yO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fZ2FsbGVyeUlkID0gdGhpcy5nYWxsZXJpemUgfHwgdGhpcy5fZ2FsbGVyeUlkO1xuICAgICAgY29uc3QgcmVmID0gdGhpcy5fZ2FsbGVyeS5yZWYodGhpcy5fZ2FsbGVyeUlkKTtcblxuICAgICAgc3dpdGNoICh0aGlzLl9tb2RlKSB7XG4gICAgICAgIGNhc2UgR2FsbGVyaXplTW9kZS5EZXRlY3RvcjpcbiAgICAgICAgICB0aGlzLmRldGVjdG9yTW9kZShyZWYpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdhbGxlcml6ZU1vZGUuR2FsbGVyeTpcbiAgICAgICAgICB0aGlzLmdhbGxlcnlNb2RlKHJlZik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuX21vZGUpIHtcbiAgICAgIGNhc2UgR2FsbGVyaXplTW9kZS5EZXRlY3RvcjpcbiAgICAgICAgdGhpcy5fZGV0ZWN0b3IkLmNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuX29ic2VydmVyJC5kaXNjb25uZWN0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHYWxsZXJpemVNb2RlLkdhbGxlcnk6XG4gICAgICAgIHRoaXMuX2l0ZW1DbGljayQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5faXRlbUNoYW5nZSQudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvKiogR2FsbGVyeSBtb2RlOiBtZWFucyBgZ2FsbGVyaXplYCBkaXJlY3RpdmUgaXMgdXNlZCBvbiBgPGdhbGxlcnk+YCBjb21wb25lbnRcbiAgICogQWRkcyBhIGNsaWNrIGV2ZW50IHRvIGVhY2ggZ2FsbGVyeSBpdGVtIHNvIGl0IG9wZW5zIGluIGxpZ2h0Ym94ICovXG4gIHByaXZhdGUgZ2FsbGVyeU1vZGUoZ2FsbGVyeVJlZjogR2FsbGVyeVJlZikge1xuICAgIC8vIENsb25lIGl0cyBpdGVtcyB0byB0aGUgbmV3IGdhbGxlcnkgaW5zdGFuY2VcbiAgICB0aGlzLl9pdGVtQ2xpY2skID0gdGhpcy5fZ2FsbGVyeUNtcC5nYWxsZXJ5UmVmLml0ZW1DbGljay5zdWJzY3JpYmUoKGk6IG51bWJlcikgPT4gdGhpcy5fbGlnaHRib3gub3BlbihpLCB0aGlzLl9nYWxsZXJ5SWQpKTtcbiAgICB0aGlzLl9pdGVtQ2hhbmdlJCA9IHRoaXMuX2dhbGxlcnlDbXAuZ2FsbGVyeVJlZi5pdGVtc0NoYW5nZWQuc3Vic2NyaWJlKChzdGF0ZTogR2FsbGVyeVN0YXRlKSA9PiBnYWxsZXJ5UmVmLmxvYWQoc3RhdGUuaXRlbXMpKTtcbiAgfVxuXG4gIC8qKiBEZXRlY3RvciBtb2RlOiBtZWFucyBgZ2FsbGVyaXplYCBkaXJlY3RpdmUgaXMgdXNlZCBvbiBhIG5vcm1hbCBIVE1MRWxlbWVudFxuICAgKiAgRGV0ZWN0cyBpbWFnZXMgYW5kIGFkZHMgYSBjbGljayBldmVudCB0byBlYWNoIGltYWdlIHNvIGl0IG9wZW5zIGluIHRoZSBsaWdodGJveCAqL1xuICBwcml2YXRlIGRldGVjdG9yTW9kZShnYWxsZXJ5UmVmOiBHYWxsZXJ5UmVmKSB7XG4gICAgdGhpcy5fZGV0ZWN0b3IkID0gbmV3IFN1YmplY3QoKTtcbiAgICAvLyBRdWVyeSBpbWFnZSBlbGVtZW50c1xuICAgIHRoaXMuX2RldGVjdG9yJC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuXG4gICAgICAgIC8qKiBnZXQgYWxsIGltZyBlbGVtZW50cyBmcm9tIGNvbnRlbnQgKi9cbiAgICAgICAgY29uc3QgaW1hZ2VFbGVtZW50cyA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoaW1hZ2VFbGVtZW50cyAmJiBpbWFnZUVsZW1lbnRzLmxlbmd0aCkge1xuXG4gICAgICAgICAgY29uc3QgaW1hZ2VzOiBHYWxsZXJ5SXRlbVtdID0gW107XG5cbiAgICAgICAgICByZXR1cm4gZnJvbShpbWFnZUVsZW1lbnRzKS5waXBlKFxuICAgICAgICAgICAgbWFwKChlbDogYW55LCBpKSA9PiB7XG4gICAgICAgICAgICAgIC8vIEFkZCBjbGljayBldmVudCB0byB0aGUgaW1hZ2VcbiAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWwsICdjdXJzb3InLCAncG9pbnRlcicpO1xuICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eShlbCwgJ29uY2xpY2snLCAoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuKCgpID0+IHRoaXMuX2xpZ2h0Ym94Lm9wZW4oaSwgdGhpcy5fZ2FsbGVyeUlkKSlcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBpZiAoZWwgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgZWxlbWVudCBpcyB0eXBlIG9mIGltZyB1c2UgdGhlIHNyYyBwcm9wZXJ0eVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBzcmM6IGVsLmdldEF0dHJpYnV0ZSgnaW1hZ2VTcmMnKSB8fCBlbC5zcmMsXG4gICAgICAgICAgICAgICAgICB0aHVtYjogZWwuZ2V0QXR0cmlidXRlKCd0aHVtYlNyYycpIHx8IGVsLnNyY1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlLCB1c2UgZWxlbWVudCBiYWNrZ3JvdW5kLWltYWdlIHVybFxuICAgICAgICAgICAgICAgIGNvbnN0IGVsU3R5bGUgPSBlbC5jdXJyZW50U3R5bGUgfHwgdGhpcy5fZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFja2dyb3VuZCA9IGVsU3R5bGUuYmFja2dyb3VuZEltYWdlLnNsaWNlKDQsIC0xKS5yZXBsYWNlKC9cIi9nLCAnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIHNyYzogZWwuZ2V0QXR0cmlidXRlKCdpbWFnZVNyYycpIHx8IGJhY2tncm91bmQsXG4gICAgICAgICAgICAgICAgICB0aHVtYjogZWwuZ2V0QXR0cmlidXRlKCd0aHVtYlNyYycpIHx8IGJhY2tncm91bmRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRhcCgoZGF0YTogYW55KSA9PiBpbWFnZXMucHVzaChuZXcgSW1hZ2VJdGVtKGRhdGEpKSksXG4gICAgICAgICAgICBmaW5hbGl6ZSgoKSA9PiBnYWxsZXJ5UmVmLmxvYWQoaW1hZ2VzKSlcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApLnN1YnNjcmliZSgpO1xuXG4gICAgLy8gT2JzZXJ2ZSBjb250ZW50IGNoYW5nZXNcbiAgICB0aGlzLl9vYnNlcnZlciQgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB0aGlzLl9kZXRlY3RvciQubmV4dCgpKTtcbiAgICB0aGlzLl9vYnNlcnZlciQub2JzZXJ2ZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB7Y2hpbGRMaXN0OiB0cnVlLCBzdWJ0cmVlOiB0cnVlfSk7XG4gIH1cbn1cbiJdfQ==