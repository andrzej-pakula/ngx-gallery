(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/common'), require('@angular/cdk/a11y'), require('@angular/animations'), require('@angular/cdk/portal'), require('@angular/cdk/overlay'), require('@angular/cdk/keycodes'), require('rxjs'), require('ng-gallery'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('ng-gallery/lightbox', ['exports', '@angular/core', '@angular/platform-browser', '@angular/common', '@angular/cdk/a11y', '@angular/animations', '@angular/cdk/portal', '@angular/cdk/overlay', '@angular/cdk/keycodes', 'rxjs', 'ng-gallery', 'rxjs/operators'], factory) :
    (global = global || self, factory((global['ng-gallery'] = global['ng-gallery'] || {}, global['ng-gallery'].lightbox = {}), global.ng.core, global.ng.platformBrowser, global.ng.common, global.ng.cdk.a11y, global.ng.animations, global.ng.cdk.portal, global.ng.cdk.overlay, global.ng.cdk.keycodes, global.rxjs, global['ng-gallery'], global.rxjs.operators));
}(this, (function (exports, core, platformBrowser, common, a11y, animations, portal, overlay, keycodes, rxjs, ngGallery, operators) { 'use strict';

    var LIGHTBOX_CONFIG = new core.InjectionToken('LIGHTBOX_CONFIG');

    var lightboxAnimation = animations.trigger('lightbox', [
        // Note: The `enter` animation transitions to `transform: none`, because for some reason
        // specifying the transform explicitly, causes IE both to blur the dialog content and
        // decimate the animation performance. Leaving it as `none` solves both issues.
        animations.state('void, exit', animations.style({ opacity: 0, transform: 'scale(0.7)' })),
        animations.state('enter', animations.style({ transform: 'none' })),
        animations.transition('* => enter', animations.animate('{{startAnimationTime}}ms cubic-bezier(0, 0, 0.2, 1)', animations.style({ transform: 'none', opacity: 1 }))),
        animations.transition('* => void, * => exit', animations.animate('{{exitAnimationTime}}ms cubic-bezier(0.4, 0.0, 0.2, 1)', animations.style({ opacity: 0 }))),
    ]);

    var LightboxComponent = /** @class */ (function () {
        function LightboxComponent(_document, _focusTrapFactory, _elementRef, sanitizer) {
            this._document = _document;
            this._focusTrapFactory = _focusTrapFactory;
            this._elementRef = _elementRef;
            this.sanitizer = sanitizer;
            /** State of the lightbox animation. */
            this.state = 'enter';
            this._savePreviouslyFocusedElement();
        }
        /** Callback, invoked whenever an animation on the host completes. */
        LightboxComponent.prototype.onAnimationDone = function (event) {
            if (event.toState === 'enter') {
                this._trapFocus();
            }
            else {
                this.overlayRef.dispose();
                this._restoreFocus();
            }
        };
        /** Moves the focus inside the focus trap. */
        LightboxComponent.prototype._trapFocus = function () {
            if (!this._focusTrap) {
                this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
            }
            // If were to attempt to focus immediately, then the content of the lightbox would not yet be
            // ready in instances where change detection has to run first. To deal with this, we simply
            // wait for the microtask queue to be empty.
            this._focusTrap.focusInitialElementWhenReady();
        };
        /** Saves a reference to the element that was focused before the lightbox was opened. */
        LightboxComponent.prototype._savePreviouslyFocusedElement = function () {
            var _this = this;
            if (this._document) {
                this._elementFocusedBeforeDialogWasOpened = this._document.activeElement;
                // Note that there is no focus method when rendering on the server.
                if (this._elementRef.nativeElement.focus) {
                    // Move focus onto the lightbox immediately in order to prevent the user from accidentally
                    // opening multiple dialogs at the same time. Needs to be async, because the element
                    // may not be focusable immediately.
                    Promise.resolve().then(function () { return _this._elementRef.nativeElement.focus(); });
                }
            }
        };
        /** Restores focus to the element that was focused before the lightbox opened. */
        LightboxComponent.prototype._restoreFocus = function () {
            var toFocus = this._elementFocusedBeforeDialogWasOpened;
            // We need the extra check, because IE can set the `activeElement` to null in some cases.
            if (toFocus && typeof toFocus.focus === 'function') {
                toFocus.focus();
            }
            if (this._focusTrap) {
                this._focusTrap.destroy();
            }
        };
        return LightboxComponent;
    }());
    LightboxComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'lightbox',
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    animations: [lightboxAnimation],
                    template: "\n    <gallery [id]=\"id\" [destroyRef]=\"false\" [skipInitConfig]=\"true\">\n      <i class=\"g-btn-close\" aria-label=\"Close\" (click)=\"overlayRef.detach()\"\n         [innerHTML]=\"sanitizer.bypassSecurityTrustHtml(closeIcon)\"></i>\n    </gallery>\n  ",
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
    LightboxComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: a11y.ConfigurableFocusTrapFactory },
        { type: core.ElementRef },
        { type: platformBrowser.DomSanitizer }
    ]; };

    var defaultConfig = {
        backdropClass: 'g-backdrop',
        panelClass: 'g-overlay',
        hasBackdrop: true,
        keyboardShortcuts: true,
        role: 'lightbox',
        startAnimationTime: 150,
        exitAnimationTime: 75,
        closeIcon: "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<svg width=\"512px\" height=\"512px\" enable-background=\"new 0 0 47.971 47.971\" version=\"1.1\" viewBox=\"0 0 47.971 47.971\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\">\n\t<path d=\"M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z\" fill=\"#fff\"/>\n</svg>\n"
    };

    var Lightbox = /** @class */ (function () {
        function Lightbox(config, _gallery, _overlay) {
            this._gallery = _gallery;
            this._overlay = _overlay;
            /** Stream that emits when lightbox is opened */
            this.opened = new rxjs.Subject();
            /** Stream that emits when lightbox is closed */
            this.closed = new rxjs.Subject();
            this._config = config ? Object.assign(Object.assign({}, defaultConfig), config) : defaultConfig;
        }
        /**
         * Set Lightbox Config
         * @param config - LightboxConfig
         */
        Lightbox.prototype.setConfig = function (config) {
            this._config = Object.assign(Object.assign({}, this._config), config);
        };
        /**
         * Open Lightbox Overlay
         * @param i - Current Index
         * @param id - Gallery ID
         * @param config - Lightbox Config
         */
        Lightbox.prototype.open = function (i, id, config) {
            var _this = this;
            if (i === void 0) { i = 0; }
            if (id === void 0) { id = 'lightbox'; }
            var _config = config ? Object.assign(Object.assign({}, this._config), config) : this._config;
            var overlayConfig = {
                backdropClass: _config.backdropClass,
                panelClass: _config.panelClass,
                hasBackdrop: _config.hasBackdrop,
                positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
                scrollStrategy: this._overlay.scrollStrategies.block(),
                disposeOnNavigation: true
            };
            var galleryRef = this._gallery.ref(id);
            galleryRef.set(i);
            this._overlayRef = this._overlay.create(overlayConfig);
            // overlay opened event
            this._overlayRef.attachments().subscribe(function () { return _this.opened.next(id); });
            // overlay closed event
            this._overlayRef.detachments().subscribe(function () { return _this.closed.next(id); });
            // Attach gallery to the overlay
            var galleryPortal = new portal.ComponentPortal(LightboxComponent);
            var lightboxRef = this._overlayRef.attach(galleryPortal);
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
                this._overlayRef.backdropClick().subscribe(function () { return _this.close(); });
            }
            // Add keyboard shortcuts
            if (_config.keyboardShortcuts) {
                this._overlayRef.keydownEvents().subscribe(function (event) {
                    switch (event.keyCode) {
                        case keycodes.LEFT_ARROW:
                            galleryRef.prev();
                            break;
                        case keycodes.RIGHT_ARROW:
                            galleryRef.next();
                            break;
                        case keycodes.ESCAPE:
                            _this.close();
                    }
                });
            }
        };
        /**
         * Close Lightbox Overlay
         */
        Lightbox.prototype.close = function () {
            if (this._overlayRef.hasAttached()) {
                this._overlayRef.detach();
            }
        };
        return Lightbox;
    }());
    Lightbox.decorators = [
        { type: core.Injectable }
    ];
    Lightbox.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [LIGHTBOX_CONFIG,] }] },
        { type: ngGallery.Gallery },
        { type: overlay.Overlay }
    ]; };

    var GallerizeDirective = /** @class */ (function () {
        function GallerizeDirective(_zone, _el, _gallery, _lightbox, _renderer, platform, _document, _galleryCmp) {
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
            if (common.isPlatformBrowser(platform)) {
                this._mode = _galleryCmp ? "gallery" /* Gallery */ : "detector" /* Detector */;
            }
        }
        GallerizeDirective.prototype.ngOnInit = function () {
            var _this = this;
            this._zone.runOutsideAngular(function () {
                _this._galleryId = _this.gallerize || _this._galleryId;
                var ref = _this._gallery.ref(_this._galleryId);
                switch (_this._mode) {
                    case "detector" /* Detector */:
                        _this.detectorMode(ref);
                        break;
                    case "gallery" /* Gallery */:
                        _this.galleryMode(ref);
                }
            });
        };
        GallerizeDirective.prototype.ngOnDestroy = function () {
            switch (this._mode) {
                case "detector" /* Detector */:
                    this._detector$.complete();
                    this._observer$.disconnect();
                    break;
                case "gallery" /* Gallery */:
                    this._itemClick$.unsubscribe();
                    this._itemChange$.unsubscribe();
            }
        };
        /** Gallery mode: means `gallerize` directive is used on `<gallery>` component
         * Adds a click event to each gallery item so it opens in lightbox */
        GallerizeDirective.prototype.galleryMode = function (galleryRef) {
            var _this = this;
            // Clone its items to the new gallery instance
            this._itemClick$ = this._galleryCmp.galleryRef.itemClick.subscribe(function (i) { return _this._lightbox.open(i, _this._galleryId); });
            this._itemChange$ = this._galleryCmp.galleryRef.itemsChanged.subscribe(function (state) { return galleryRef.load(state.items); });
        };
        /** Detector mode: means `gallerize` directive is used on a normal HTMLElement
         *  Detects images and adds a click event to each image so it opens in the lightbox */
        GallerizeDirective.prototype.detectorMode = function (galleryRef) {
            var _this = this;
            this._detector$ = new rxjs.Subject();
            // Query image elements
            this._detector$.pipe(operators.debounceTime(300), operators.switchMap(function () {
                /** get all img elements from content */
                var imageElements = _this._el.nativeElement.querySelectorAll(_this.selector);
                if (imageElements && imageElements.length) {
                    var images_1 = [];
                    return rxjs.from(imageElements).pipe(operators.map(function (el, i) {
                        // Add click event to the image
                        _this._renderer.setStyle(el, 'cursor', 'pointer');
                        _this._renderer.setProperty(el, 'onclick', function () { return _this._zone.run(function () { return _this._lightbox.open(i, _this._galleryId); }); });
                        if (el instanceof HTMLImageElement) {
                            // If element is type of img use the src property
                            return {
                                src: el.getAttribute('imageSrc') || el.src,
                                thumb: el.getAttribute('thumbSrc') || el.src
                            };
                        }
                        else {
                            // Otherwise, use element background-image url
                            var elStyle = el.currentStyle || _this._document.defaultView.getComputedStyle(el, null);
                            var background = elStyle.backgroundImage.slice(4, -1).replace(/"/g, '');
                            return {
                                src: el.getAttribute('imageSrc') || background,
                                thumb: el.getAttribute('thumbSrc') || background
                            };
                        }
                    }), operators.tap(function (data) { return images_1.push(new ngGallery.ImageItem(data)); }), operators.finalize(function () { return galleryRef.load(images_1); }));
                }
                else {
                    return rxjs.EMPTY;
                }
            })).subscribe();
            // Observe content changes
            this._observer$ = new MutationObserver(function () { return _this._detector$.next(); });
            this._observer$.observe(this._el.nativeElement, { childList: true, subtree: true });
        };
        return GallerizeDirective;
    }());
    GallerizeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[gallerize]'
                },] }
    ];
    GallerizeDirective.ctorParameters = function () { return [
        { type: core.NgZone },
        { type: core.ElementRef },
        { type: ngGallery.Gallery },
        { type: Lightbox },
        { type: core.Renderer2 },
        { type: Object, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] },
        { type: undefined, decorators: [{ type: core.Inject, args: [common.DOCUMENT,] }] },
        { type: ngGallery.GalleryComponent, decorators: [{ type: core.Host }, { type: core.Self }, { type: core.Optional }] }
    ]; };
    GallerizeDirective.propDecorators = {
        gallerize: [{ type: core.Input }],
        selector: [{ type: core.Input }]
    };

    var LightboxDirective = /** @class */ (function () {
        function LightboxDirective(_lightbox, _el, _renderer) {
            this._lightbox = _lightbox;
            this._el = _el;
            this._renderer = _renderer;
            this.clickEvent = rxjs.Subscription.EMPTY;
            this.index = 0;
            this.id = 'root';
        }
        LightboxDirective.prototype.ngOnInit = function () {
            var _this = this;
            this._renderer.setStyle(this._el.nativeElement, 'cursor', 'pointer');
            this.clickEvent = rxjs.fromEvent(this._el.nativeElement, 'click').pipe(operators.tap(function () { return _this._lightbox.open(_this.index, _this.id); })).subscribe();
        };
        LightboxDirective.prototype.ngOnDestroy = function () {
            this.clickEvent.unsubscribe();
        };
        return LightboxDirective;
    }());
    LightboxDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[lightbox]'
                },] }
    ];
    LightboxDirective.ctorParameters = function () { return [
        { type: Lightbox },
        { type: core.ElementRef },
        { type: core.Renderer2 }
    ]; };
    LightboxDirective.propDecorators = {
        index: [{ type: core.Input, args: ['lightbox',] }],
        id: [{ type: core.Input, args: ['gallery',] }]
    };

    var LightboxModule = /** @class */ (function () {
        function LightboxModule() {
        }
        LightboxModule.withConfig = function (config) {
            return {
                ngModule: LightboxModule,
                providers: [
                    {
                        provide: LIGHTBOX_CONFIG,
                        useValue: config
                    }
                ]
            };
        };
        return LightboxModule;
    }());
    LightboxModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        overlay.OverlayModule,
                        ngGallery.GalleryModule,
                        a11y.A11yModule
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

    exports.GallerizeDirective = GallerizeDirective;
    exports.LIGHTBOX_CONFIG = LIGHTBOX_CONFIG;
    exports.Lightbox = Lightbox;
    exports.LightboxComponent = LightboxComponent;
    exports.LightboxModule = LightboxModule;
    exports.ɵa = lightboxAnimation;
    exports.ɵb = LightboxDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-gallery-lightbox.umd.js.map
