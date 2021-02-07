import { InjectionToken, Component, ChangeDetectionStrategy, Optional, Inject, ElementRef, Injectable, Directive, NgZone, Renderer2, PLATFORM_ID, Host, Self, Input, NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ConfigurableFocusTrapFactory, A11yModule } from '@angular/cdk/a11y';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { ESCAPE, RIGHT_ARROW, LEFT_ARROW } from '@angular/cdk/keycodes';
import { Subject, from, EMPTY, Subscription, fromEvent } from 'rxjs';
import { Gallery, ImageItem, GalleryComponent, GalleryModule } from 'ng-gallery';
import { debounceTime, switchMap, map, tap, finalize } from 'rxjs/operators';

const LIGHTBOX_CONFIG = new InjectionToken('LIGHTBOX_CONFIG');

const lightboxAnimation = trigger('lightbox', [
    // Note: The `enter` animation transitions to `transform: none`, because for some reason
    // specifying the transform explicitly, causes IE both to blur the dialog content and
    // decimate the animation performance. Leaving it as `none` solves both issues.
    state('void, exit', style({ opacity: 0, transform: 'scale(0.7)' })),
    state('enter', style({ transform: 'none' })),
    transition('* => enter', animate('{{startAnimationTime}}ms cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'none', opacity: 1 }))),
    transition('* => void, * => exit', animate('{{exitAnimationTime}}ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0 }))),
]);

class LightboxComponent {
    constructor(_document, _focusTrapFactory, _elementRef, sanitizer) {
        this._document = _document;
        this._focusTrapFactory = _focusTrapFactory;
        this._elementRef = _elementRef;
        this.sanitizer = sanitizer;
        /** State of the lightbox animation. */
        this.state = 'enter';
        this._savePreviouslyFocusedElement();
    }
    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event) {
        if (event.toState === 'enter') {
            this._trapFocus();
        }
        else {
            this.overlayRef.dispose();
            this._restoreFocus();
        }
    }
    /** Moves the focus inside the focus trap. */
    _trapFocus() {
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        }
        // If were to attempt to focus immediately, then the content of the lightbox would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        this._focusTrap.focusInitialElementWhenReady();
    }
    /** Saves a reference to the element that was focused before the lightbox was opened. */
    _savePreviouslyFocusedElement() {
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = this._document.activeElement;
            // Note that there is no focus method when rendering on the server.
            if (this._elementRef.nativeElement.focus) {
                // Move focus onto the lightbox immediately in order to prevent the user from accidentally
                // opening multiple dialogs at the same time. Needs to be async, because the element
                // may not be focusable immediately.
                Promise.resolve().then(() => this._elementRef.nativeElement.focus());
            }
        }
    }
    /** Restores focus to the element that was focused before the lightbox opened. */
    _restoreFocus() {
        const toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    }
}
LightboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'lightbox',
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [lightboxAnimation],
                template: `
    <gallery [id]="id" [destroyRef]="false" [skipInitConfig]="true">
      <i class="g-btn-close" aria-label="Close" (click)="overlayRef.detach()"
         [innerHTML]="sanitizer.bypassSecurityTrustHtml(closeIcon)"></i>
    </gallery>
  `,
                host: {
                    'tabindex': '-1',
                    'aria-modal': 'true',
                    '[attr.id]': '"lightbox-" + id',
                    '[attr.role]': 'role',
                    '[attr.aria-labelledby]': 'ariaLabel ? null : ariaLabelledBy',
                    '[attr.aria-label]': 'ariaLabel',
                    '[attr.aria-describedby]': 'ariaDescribedBy || null',
                    '[@lightbox]': '{ value: state, params: { startAnimationTime: startAnimationTime, exitAnimationTime: exitAnimationTime } }',
                    '(@lightbox.done)': 'onAnimationDone($event)',
                },
                styles: ["::ng-deep lightbox{border-radius:4px;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:block;height:800px;max-height:90vh;max-width:94vw;overflow:hidden;position:relative;width:1100px}::ng-deep lightbox:focus{outline:none}::ng-deep lightbox gallery{display:block;height:100%;margin:0;overflow:hidden;width:100%}::ng-deep .g-backdrop{background-color:rgba(0,0,0,.32)}::ng-deep .fullscreen{width:100%}::ng-deep .fullscreen ::ng-deep lightbox{border-radius:0;bottom:0;height:100%;left:0;max-height:unset;max-width:unset;position:fixed;right:0;top:0;width:100%}::ng-deep .g-overlay{margin:auto}@media only screen and (max-width:480px){::ng-deep .g-overlay{width:100%}::ng-deep .g-overlay ::ng-deep lightbox{border-radius:0;bottom:0;height:100%;left:0;max-height:unset;max-width:unset;position:fixed;right:0;top:0;width:100%}}::ng-deep .g-btn-close{cursor:pointer;height:20px;position:absolute;right:.9em;top:.9em;width:20px;z-index:60}@media only screen and (max-width:480px){::ng-deep .g-btn-close{right:.7em;top:.7em}}"]
            },] }
];
LightboxComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: ConfigurableFocusTrapFactory },
    { type: ElementRef },
    { type: DomSanitizer }
];

const defaultConfig = {
    backdropClass: 'g-backdrop',
    panelClass: 'g-overlay',
    hasBackdrop: true,
    keyboardShortcuts: true,
    role: 'lightbox',
    startAnimationTime: 150,
    exitAnimationTime: 75,
    closeIcon: `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512px" height="512px" enable-background="new 0 0 47.971 47.971" version="1.1" viewBox="0 0 47.971 47.971" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
	<path d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z" fill="#fff"/>
</svg>
`
};

class Lightbox {
    constructor(config, _gallery, _overlay) {
        this._gallery = _gallery;
        this._overlay = _overlay;
        /** Stream that emits when lightbox is opened */
        this.opened = new Subject();
        /** Stream that emits when lightbox is closed */
        this.closed = new Subject();
        this._config = config ? Object.assign(Object.assign({}, defaultConfig), config) : defaultConfig;
    }
    /**
     * Set Lightbox Config
     * @param config - LightboxConfig
     */
    setConfig(config) {
        this._config = Object.assign(Object.assign({}, this._config), config);
    }
    /**
     * Open Lightbox Overlay
     * @param i - Current Index
     * @param id - Gallery ID
     * @param config - Lightbox Config
     */
    open(i = 0, id = 'lightbox', config) {
        const _config = config ? Object.assign(Object.assign({}, this._config), config) : this._config;
        const overlayConfig = {
            backdropClass: _config.backdropClass,
            panelClass: _config.panelClass,
            hasBackdrop: _config.hasBackdrop,
            positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
            scrollStrategy: this._overlay.scrollStrategies.block(),
            disposeOnNavigation: true
        };
        const galleryRef = this._gallery.ref(id);
        galleryRef.set(i);
        this._overlayRef = this._overlay.create(overlayConfig);
        // overlay opened event
        this._overlayRef.attachments().subscribe(() => this.opened.next(id));
        // overlay closed event
        this._overlayRef.detachments().subscribe(() => this.closed.next(id));
        // Attach gallery to the overlay
        const galleryPortal = new ComponentPortal(LightboxComponent);
        const lightboxRef = this._overlayRef.attach(galleryPortal);
        lightboxRef.instance.id = id;
        lightboxRef.instance.overlayRef = this._overlayRef;
        lightboxRef.instance.closeIcon = this._config.closeIcon;
        lightboxRef.instance.role = this._config.role;
        lightboxRef.instance.ariaLabel = this._config.ariaLabel;
        lightboxRef.instance.ariaLabelledBy = this._config.ariaLabelledBy;
        lightboxRef.instance.ariaDescribedBy = this._config.ariaDescribedBy;
        lightboxRef.instance.startAnimationTime = this._config.startAnimationTime;
        lightboxRef.instance.exitAnimationTime = this._config.exitAnimationTime;
        if (_config.hasBackdrop) {
            this._overlayRef.backdropClick().subscribe(() => this.close());
        }
        // Add keyboard shortcuts
        if (_config.keyboardShortcuts) {
            this._overlayRef.keydownEvents().subscribe((event) => {
                switch (event.keyCode) {
                    case LEFT_ARROW:
                        galleryRef.prev();
                        break;
                    case RIGHT_ARROW:
                        galleryRef.next();
                        break;
                    case ESCAPE:
                        this.close();
                }
            });
        }
    }
    /**
     * Close Lightbox Overlay
     */
    close() {
        if (this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
    }
}
Lightbox.decorators = [
    { type: Injectable }
];
Lightbox.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIGHTBOX_CONFIG,] }] },
    { type: Gallery },
    { type: Overlay }
];

class GallerizeDirective {
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

class LightboxDirective {
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

class LightboxModule {
    static withConfig(config) {
        return {
            ngModule: LightboxModule,
            providers: [
                {
                    provide: LIGHTBOX_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
LightboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    OverlayModule,
                    GalleryModule,
                    A11yModule
                ],
                declarations: [
                    LightboxComponent,
                    LightboxDirective,
                    GallerizeDirective
                ],
                exports: [
                    LightboxDirective,
                    GallerizeDirective
                ],
                providers: [
                    Lightbox
                ],
                entryComponents: [
                    LightboxComponent
                ]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { GallerizeDirective, LIGHTBOX_CONFIG, Lightbox, LightboxComponent, LightboxModule, lightboxAnimation as ɵa, LightboxDirective as ɵb };
//# sourceMappingURL=ng-gallery-lightbox.js.map
