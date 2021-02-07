import { InjectionToken, ɵɵdefineInjectable, ɵɵinject, Injectable, Optional, Inject, EventEmitter, Component, ChangeDetectionStrategy, Input, Output, ViewChild, HostBinding, ElementRef, NgZone, PLATFORM_ID, Directive, NgModule } from '@angular/core';
import { Subject, BehaviorSubject, of, EMPTY, Subscription, fromEvent, zip } from 'rxjs';
import { filter, switchMap, delay, tap, map, debounceTime } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, style, animate } from '@angular/animations';
import { isPlatformBrowser, DOCUMENT, CommonModule } from '@angular/common';

var GalleryAction;
(function (GalleryAction) {
    GalleryAction["INITIALIZED"] = "initialized";
    GalleryAction["ITEMS_CHANGED"] = "itemsChanged";
    GalleryAction["INDEX_CHANGED"] = "indexChanged";
    GalleryAction["PLAY"] = "play";
    GalleryAction["STOP"] = "stop";
})(GalleryAction || (GalleryAction = {}));
var ImageSize;
(function (ImageSize) {
    ImageSize["Cover"] = "cover";
    ImageSize["Contain"] = "contain";
})(ImageSize || (ImageSize = {}));
var LoadingStrategy;
(function (LoadingStrategy) {
    LoadingStrategy["Preload"] = "preload";
    LoadingStrategy["Lazy"] = "lazy";
    LoadingStrategy["Default"] = "default";
})(LoadingStrategy || (LoadingStrategy = {}));
var ThumbnailsPosition;
(function (ThumbnailsPosition) {
    ThumbnailsPosition["Top"] = "top";
    ThumbnailsPosition["Left"] = "left";
    ThumbnailsPosition["LeftTop"] = "left-top";
    ThumbnailsPosition["Right"] = "right";
    ThumbnailsPosition["Bottom"] = "bottom";
})(ThumbnailsPosition || (ThumbnailsPosition = {}));
var ImageLoaderMode;
(function (ImageLoaderMode) {
    ImageLoaderMode["Determinate"] = "determinate";
    ImageLoaderMode["Indeterminate"] = "indeterminate";
})(ImageLoaderMode || (ImageLoaderMode = {}));
var DotsPosition;
(function (DotsPosition) {
    DotsPosition["Top"] = "top";
    DotsPosition["Bottom"] = "bottom";
})(DotsPosition || (DotsPosition = {}));
var CounterPosition;
(function (CounterPosition) {
    CounterPosition["Top"] = "top";
    CounterPosition["Bottom"] = "bottom";
})(CounterPosition || (CounterPosition = {}));
var ThumbnailsMode;
(function (ThumbnailsMode) {
    ThumbnailsMode["Free"] = "free";
    ThumbnailsMode["Strict"] = "strict";
})(ThumbnailsMode || (ThumbnailsMode = {}));
var SlidingDirection;
(function (SlidingDirection) {
    SlidingDirection["Horizontal"] = "horizontal";
    SlidingDirection["Vertical"] = "vertical";
})(SlidingDirection || (SlidingDirection = {}));
var GalleryItemType;
(function (GalleryItemType) {
    GalleryItemType["Image"] = "image";
    GalleryItemType["Video"] = "video";
    GalleryItemType["Youtube"] = "youtube";
    GalleryItemType["Iframe"] = "iframe";
})(GalleryItemType || (GalleryItemType = {}));

/** Initial state */
const defaultState = {
    action: GalleryAction.INITIALIZED,
    isPlaying: false,
    hasNext: false,
    hasPrev: false,
    currIndex: 0,
    items: []
};
const defaultConfig = {
    nav: true,
    loop: true,
    zoomOut: 0,
    dots: false,
    thumb: true,
    dotsSize: 30,
    counter: true,
    gestures: true,
    autoPlay: false,
    thumbWidth: 120,
    thumbHeight: 90,
    panSensitivity: 25,
    disableThumb: false,
    playerInterval: 3000,
    imageSize: ImageSize.Contain,
    thumbMode: ThumbnailsMode.Strict,
    dotsPosition: DotsPosition.Bottom,
    counterPosition: CounterPosition.Top,
    thumbPosition: ThumbnailsPosition.Bottom,
    loadingStrategy: LoadingStrategy.Default,
    slidingDirection: SlidingDirection.Horizontal,
    navIcon: `<?xml version="1.0" encoding="UTF-8"?><svg width="512px" height="512px" enable-background="new 0 0 240.823 240.823" version="1.1" viewBox="0 0 240.823 240.823" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m183.19 111.82l-108.3-108.26c-4.752-4.74-12.451-4.74-17.215 0-4.752 4.74-4.752 12.439 0 17.179l99.707 99.671-99.695 99.671c-4.752 4.74-4.752 12.439 0 17.191 4.752 4.74 12.463 4.74 17.215 0l108.3-108.26c4.68-4.691 4.68-12.511-0.012-17.19z" fill="#fff"/></svg>`,
    loadingIcon: `<?xml version="1.0" encoding="UTF-8"?><svg stroke="#fff" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>`
};

class ImageItem {
    constructor(data) {
        this.data = data;
        this.type = GalleryItemType.Image;
    }
}
class VideoItem {
    constructor(data) {
        this.data = data;
        this.type = GalleryItemType.Video;
    }
}
class IframeItem {
    constructor(data) {
        this.data = data;
        this.type = GalleryItemType.Iframe;
    }
}
class YoutubeItem {
    constructor(data) {
        this.data = Object.assign(Object.assign({}, data), {
            src: `https://youtube.com/embed/${data.src}`,
            thumb: data.thumb ? data.thumb : `//img.youtube.com/vi/${data.src}/default.jpg`
        });
        this.type = GalleryItemType.Youtube;
    }
}

const filterActions = (actions) => {
    return filter((state) => actions.indexOf(state.action) > -1);
};
const ɵ0 = filterActions;
class GalleryRef {
    constructor(config, deleteInstance) {
        this.deleteInstance = deleteInstance;
        /** Stream that emits on item click */
        this.itemClick = new Subject();
        /** Stream that emits on thumbnail click */
        this.thumbClick = new Subject();
        /** Stream that emits on an error occurs */
        this.error = new Subject();
        this._state = new BehaviorSubject(defaultState);
        this._config = new BehaviorSubject(config);
        this.state = this._state.asObservable();
        this.config = this._config.asObservable();
    }
    /** Stream that emits when gallery is initialized/reset */
    get initialized() {
        return this.state.pipe(filterActions([GalleryAction.INITIALIZED]));
    }
    /** Stream that emits when items is changed (items loaded, item added, item removed) */
    get itemsChanged() {
        return this.state.pipe(filterActions([GalleryAction.ITEMS_CHANGED]));
    }
    /** Stream that emits when current item is changed */
    get indexChanged() {
        return this.state.pipe(filterActions([GalleryAction.INDEX_CHANGED]));
    }
    /** Stream that emits when the player should start or stop */
    get playingChanged() {
        return this.state.pipe(filterActions([GalleryAction.PLAY, GalleryAction.STOP]));
    }
    /** Stream that emits when the player should start or stop */
    get playerActions() {
        return this.state.pipe(filterActions([GalleryAction.PLAY, GalleryAction.STOP, GalleryAction.INDEX_CHANGED]));
    }
    /**
     * Activate player actions listener
     */
    activatePlayer() {
        return this.playerActions.pipe(switchMap((e) => e.isPlaying ? of({}).pipe(delay(this._config.value.playerInterval), tap(() => this.next())) : EMPTY));
    }
    /**
     * Set gallery state
     */
    setState(state) {
        this._state.next(Object.assign(Object.assign({}, this._state.value), state));
    }
    /**
     * Set gallery config
     */
    setConfig(config) {
        this._config.next(Object.assign(Object.assign({}, this._config.value), config));
    }
    /**
     * Add gallery item
     */
    add(item, active) {
        const items = [...this._state.value.items, item];
        this.setState({
            action: GalleryAction.ITEMS_CHANGED,
            items,
            hasNext: items.length > 1,
            currIndex: active ? items.length - 1 : this._state.value.currIndex
        });
    }
    /**
     * Add image item
     */
    addImage(data, active) {
        this.add(new ImageItem(data), active);
    }
    /**
     * Add video item
     */
    addVideo(data, active) {
        this.add(new VideoItem(data), active);
    }
    /**
     * Add iframe item
     */
    addIframe(data, active) {
        this.add(new IframeItem(data), active);
    }
    /**
     * Add youtube item
     */
    addYoutube(data, active) {
        this.add(new YoutubeItem(data), active);
    }
    /**
     * Remove gallery item
     */
    remove(i) {
        const items = [
            ...this._state.value.items.slice(0, i),
            ...this._state.value.items.slice(i + 1, this._state.value.items.length)
        ];
        this.setState({
            action: GalleryAction.ITEMS_CHANGED,
            items,
            hasNext: items.length > 1,
            hasPrev: i > 0
        });
    }
    /**
     * Load items and reset the state
     */
    load(items) {
        if (items) {
            this.setState({
                action: GalleryAction.ITEMS_CHANGED,
                items,
                hasNext: items.length > 1,
                hasPrev: false
            });
        }
    }
    /**
     * Set active item
     */
    set(i) {
        if (i !== this._state.value.currIndex) {
            this.setState({
                action: GalleryAction.INDEX_CHANGED,
                currIndex: i,
                hasNext: i < this._state.value.items.length - 1,
                hasPrev: i > 0
            });
        }
    }
    /**
     * Next item
     */
    next() {
        if (this._state.value.hasNext) {
            this.set(this._state.value.currIndex + 1);
        }
        else if (this._config.value.loop) {
            this.set(0);
        }
    }
    /**
     * Prev item
     */
    prev() {
        if (this._state.value.hasPrev) {
            this.set(this._state.value.currIndex - 1);
        }
        else if (this._config.value.loop) {
            this.set(this._state.value.items.length - 1);
        }
    }
    /**
     * Start gallery player
     */
    play(interval) {
        if (interval) {
            this.setConfig({ playerInterval: interval });
        }
        this.setState({ action: GalleryAction.PLAY, isPlaying: true });
    }
    /**
     * Stop gallery player
     */
    stop() {
        this.setState({ action: GalleryAction.STOP, isPlaying: false });
    }
    /**
     * Reset gallery to initial state
     */
    reset() {
        this.setState(defaultState);
    }
    /**
     * Destroy gallery
     */
    destroy() {
        this._state.complete();
        this._config.complete();
        this.itemClick.complete();
        this.thumbClick.complete();
        this.deleteInstance();
    }
}

const GALLERY_CONFIG = new InjectionToken('GALLERY_CONFIG');

class Gallery {
    constructor(config) {
        /** Store gallery instances */
        this._instances = new Map();
        this.config = config ? Object.assign(Object.assign({}, defaultConfig), config) : defaultConfig;
    }
    /**
     * Get or create gallery by ID
     * @param id
     * @param config
     */
    ref(id = 'root', config) {
        if (this._instances.has(id)) {
            const galleryRef = this._instances.get(id);
            if (config) {
                galleryRef.setConfig(Object.assign(Object.assign({}, this.config), config));
            }
            return galleryRef;
        }
        else {
            return this._instances.set(id, new GalleryRef(Object.assign(Object.assign({}, this.config), config), this.deleteInstance(id))).get(id);
        }
    }
    /**
     * Destroy all gallery instances
     */
    destroyAll() {
        this._instances.forEach((ref) => ref.destroy());
    }
    /**
     * Reset all gallery instances
     */
    resetAll() {
        this._instances.forEach((ref) => ref.reset());
    }
    /**
     * A destroyer function for each gallery instance
     */
    deleteInstance(id) {
        return () => {
            if (this._instances.has(id)) {
                this._instances.delete(id);
            }
        };
    }
}
Gallery.ɵprov = ɵɵdefineInjectable({ factory: function Gallery_Factory() { return new Gallery(ɵɵinject(GALLERY_CONFIG, 8)); }, token: Gallery, providedIn: "root" });
Gallery.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
Gallery.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GALLERY_CONFIG,] }] }
];

class GalleryComponent {
    constructor(_gallery) {
        this._gallery = _gallery;
        this.nav = this._gallery.config.nav;
        this.dots = this._gallery.config.dots;
        this.loop = this._gallery.config.loop;
        this.thumb = this._gallery.config.thumb;
        this.zoomOut = this._gallery.config.zoomOut;
        this.counter = this._gallery.config.counter;
        this.dotsSize = this._gallery.config.dotsSize;
        this.autoPlay = this._gallery.config.autoPlay;
        this.gestures = this._gallery.config.gestures;
        this.thumbWidth = this._gallery.config.thumbWidth;
        this.thumbHeight = this._gallery.config.thumbHeight;
        this.disableThumb = this._gallery.config.disableThumb;
        this.panSensitivity = this._gallery.config.panSensitivity;
        this.playerInterval = this._gallery.config.playerInterval;
        this.itemTemplate = this._gallery.config.itemTemplate;
        this.thumbTemplate = this._gallery.config.thumbTemplate;
        this.thumbMode = this._gallery.config.thumbMode;
        this.imageSize = this._gallery.config.imageSize;
        this.dotsPosition = this._gallery.config.dotsPosition;
        this.counterPosition = this._gallery.config.counterPosition;
        this.slidingDirection = this._gallery.config.slidingDirection;
        this.loadingStrategy = this._gallery.config.loadingStrategy;
        this.thumbPosition = this._gallery.config.thumbPosition;
        // Inputs used by the lightbox
        /** Destroy gallery ref on component destroy event */
        this.destroyRef = true;
        /** Skip initializing the config with components inputs (Lightbox mode) */
        this.skipInitConfig = false;
        this.itemClick = new EventEmitter();
        this.thumbClick = new EventEmitter();
        this.playingChange = new EventEmitter();
        this.indexChange = new EventEmitter();
        this.itemsChange = new EventEmitter();
        this.error = new EventEmitter();
        this._itemClick$ = Subscription.EMPTY;
        this._thumbClick$ = Subscription.EMPTY;
        this._itemChange$ = Subscription.EMPTY;
        this._indexChange$ = Subscription.EMPTY;
        this._playingChange$ = Subscription.EMPTY;
        this._playerListener$ = Subscription.EMPTY;
    }
    getConfig() {
        return {
            nav: this.nav,
            dots: this.dots,
            loop: this.loop,
            thumb: this.thumb,
            zoomOut: this.zoomOut,
            counter: this.counter,
            autoPlay: this.autoPlay,
            gestures: this.gestures,
            dotsSize: this.dotsSize,
            imageSize: this.imageSize,
            thumbMode: this.thumbMode,
            thumbWidth: this.thumbWidth,
            thumbHeight: this.thumbHeight,
            disableThumb: this.disableThumb,
            dotsPosition: this.dotsPosition,
            itemTemplate: this.itemTemplate,
            thumbTemplate: this.thumbTemplate,
            thumbPosition: this.thumbPosition,
            panSensitivity: this.panSensitivity,
            playerInterval: this.playerInterval,
            counterPosition: this.counterPosition,
            loadingStrategy: this.loadingStrategy,
            slidingDirection: this.slidingDirection
        };
    }
    onAction(i) {
        switch (i) {
            case 'next':
                this.galleryRef.next();
                break;
            case 'prev':
                this.galleryRef.prev();
                break;
            default:
                this.galleryRef.set(i);
        }
    }
    ngOnChanges(changes) {
        if (this.galleryRef) {
            this.galleryRef.setConfig(this.getConfig());
            if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
                this.load(this.items);
            }
        }
    }
    ngOnInit() {
        // Get gallery instance by id
        if (this.skipInitConfig) {
            this.galleryRef = this._gallery.ref(this.id);
        }
        else {
            this.galleryRef = this._gallery.ref(this.id, this.getConfig());
        }
        // Load gallery items
        this.load(this.items);
        // Activate player listener
        this._playerListener$ = this.galleryRef.activatePlayer().subscribe();
        // Subscribes to events on demand
        if (this.indexChange.observers.length) {
            this._indexChange$ = this.galleryRef.indexChanged.subscribe((state) => this.indexChange.emit(state));
        }
        if (this.itemsChange.observers.length) {
            this._itemChange$ = this.galleryRef.itemsChanged.subscribe((state) => this.itemsChange.emit(state));
        }
        if (this.playingChange.observers.length) {
            this._playingChange$ = this.galleryRef.playingChanged.subscribe((state) => this.playingChange.emit(state));
        }
        // Start playing if auto-play is set to true
        if (this.autoPlay) {
            this.play();
        }
    }
    ngOnDestroy() {
        this._itemClick$.unsubscribe();
        this._thumbClick$.unsubscribe();
        this._itemChange$.unsubscribe();
        this._indexChange$.unsubscribe();
        this._playingChange$.unsubscribe();
        this._playerListener$.unsubscribe();
        if (this.destroyRef) {
            this.galleryRef.destroy();
        }
    }
    onItemClick(i) {
        this.itemClick.emit(i);
        this.galleryRef.itemClick.next(i);
    }
    onThumbClick(i) {
        this.galleryRef.set(i);
        this.thumbClick.emit(i);
        this.galleryRef.thumbClick.next(i);
    }
    onError(err) {
        this.error.emit(err);
        this.galleryRef.error.next(err);
    }
    load(items) {
        this.galleryRef.load(items);
    }
    add(item, active) {
        this.galleryRef.add(item, active);
    }
    addImage(data, active) {
        this.add(new ImageItem(data), active);
    }
    addVideo(data, active) {
        this.add(new VideoItem(data), active);
    }
    addIframe(data, active) {
        this.add(new IframeItem(data), active);
    }
    addYoutube(data, active) {
        this.add(new YoutubeItem(data), active);
    }
    remove(i) {
        this.galleryRef.remove(i);
    }
    next() {
        this.galleryRef.next();
    }
    prev() {
        this.galleryRef.prev();
    }
    set(i) {
        this.galleryRef.set(i);
    }
    reset() {
        this.galleryRef.reset();
    }
    play(interval) {
        this.galleryRef.play(interval);
    }
    stop() {
        this.galleryRef.stop();
    }
}
GalleryComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <gallery-core [state]="galleryRef.state | async"
                  [config]="galleryRef.config | async"
                  (action)="onAction($event)"
                  (itemClick)="onItemClick($event)"
                  (thumbClick)="onThumbClick($event)"
                  (error)="onError($event)"></gallery-core>
    <ng-content></ng-content>
  `,
                styles: ["::ng-deep gallery-core[dotsPosition=top] gallery-dots{top:0}::ng-deep gallery-core[dotsPosition=bottom] gallery-dots{bottom:0}::ng-deep gallery-dots{left:50%;margin:7px;position:absolute;transform:translateX(-50%)}::ng-deep .g-dot{cursor:pointer;z-index:20}::ng-deep .g-dot:hover .g-dot-inner{opacity:1}::ng-deep .g-dot-active .g-dot-inner{opacity:1;transform:scale(1.5)!important}::ng-deep .g-dot-inner{background-color:#fff;border-radius:50%;box-shadow:0 0 1px #000;height:30%;opacity:.6;transition:all .2s ease;width:30%}::ng-deep .g-dot,::ng-deep .g-dot-inner,::ng-deep gallery-dots{align-items:center;display:flex;justify-content:center}::ng-deep .g-nav-next,::ng-deep .g-nav-prev{cursor:pointer;height:40px;position:absolute;top:50%;width:30px;z-index:999}::ng-deep .g-nav-next{right:.5em;transform:translateY(-50%) perspective(1px)}::ng-deep .g-nav-prev{left:.5em;transform:translateY(-50%) perspective(1px) scale(-1)}@media only screen and (max-width:480px){::ng-deep .g-nav-next{right:.2em}::ng-deep .g-nav-prev{left:.2em}}::ng-deep .g-items-container{height:100%}::ng-deep .g-slider{position:absolute;transition:transform .4s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-core[slidingDirection=horizontal] .g-slider{flex-direction:row}::ng-deep gallery-core[slidingDirection=vertical] .g-slider{flex-direction:column}::ng-deep gallery-thumbs{display:block;overflow:unset;z-index:1}::ng-deep .g-thumbs-container{display:flex;height:100%;left:0;overflow:unset;position:relative;top:0;width:100%;z-index:206}::ng-deep gallery-core[disableThumb=true] gallery-thumb{cursor:default}::ng-deep gallery-core[thumbPosition=bottom] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=top] gallery-thumbs .g-slider{flex-direction:row;left:50%;top:0}::ng-deep gallery-core[thumbPosition=bottom] gallery-thumb,::ng-deep gallery-core[thumbPosition=top] gallery-thumb{padding:1px 0 1px 1px}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=left] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=right] gallery-thumbs .g-slider{flex-direction:column;left:0;top:50%}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumb,::ng-deep gallery-core[thumbPosition=left] gallery-thumb,::ng-deep gallery-core[thumbPosition=right] gallery-thumb{padding:0 1px 1px}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumbs .g-slider{top:0}::ng-deep gallery-core[thumbPosition=top]{flex-direction:column}::ng-deep gallery-core[thumbPosition=left-top],::ng-deep gallery-core[thumbPosition=left]{flex-direction:row}::ng-deep gallery-core[thumbPosition=right]{flex-direction:row-reverse}::ng-deep gallery-core[thumbPosition=bottom]{flex-direction:column-reverse}::ng-deep gallery-thumb.g-active-thumb .g-thumb-loading{background-color:#464646}::ng-deep .g-thumb-loading{background-color:#262626;height:100%;overflow:hidden;position:relative}::ng-deep .g-thumb-loading:before{-webkit-animation:phAnimation .8s linear infinite;animation:phAnimation .8s linear infinite;background:linear-gradient(90deg,hsla(0,0%,100%,0) 46%,hsla(0,0%,100%,.35) 50%,hsla(0,0%,100%,0) 54%) 50% 50%;bottom:0;content:\"\";left:50%;margin-left:-250%;position:absolute;right:0;top:0;width:500%;z-index:1}@-webkit-keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}@keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}::ng-deep gallery-core[counterPosition=top] .g-counter{border-bottom-left-radius:4px;border-bottom-right-radius:4px;top:0}::ng-deep gallery-core[counterPosition=bottom] .g-counter{border-top-left-radius:4px;border-top-right-radius:4px;bottom:0}::ng-deep .g-counter{background-color:rgba(0,0,0,.5);color:#fff;font-size:12px;left:50%;padding:4px 10px;position:absolute;transform:translateX(-50%) perspective(1px);z-index:50}::ng-deep gallery[gallerize] gallery-item{cursor:pointer}::ng-deep gallery-item,::ng-deep gallery-thumb{display:block;height:100%;overflow:hidden;position:relative;width:100%}::ng-deep gallery-item h2,::ng-deep gallery-item h4,::ng-deep gallery-thumb h2,::ng-deep gallery-thumb h4{color:coral;margin:0}::ng-deep gallery-item h2,::ng-deep gallery-thumb h2{font-size:3.5em;margin-bottom:.3em}::ng-deep gallery-item h4,::ng-deep gallery-thumb h4{font-size:1.6em}::ng-deep gallery-item{z-index:10}::ng-deep gallery-item iframe,::ng-deep gallery-item video{height:100%;position:absolute;width:100%}::ng-deep gallery-thumb{cursor:pointer;opacity:.5;transition:opacity .3s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-thumb.g-active-thumb{opacity:1}::ng-deep .g-image-item{background-position:50%;background-repeat:no-repeat;background-size:cover;height:100%;width:100%}::ng-deep .g-image-error-message,::ng-deep .g-template{align-items:center;bottom:0;color:#fff;display:flex;flex-direction:column;justify-content:center;left:0;position:absolute;right:0;top:0;z-index:10}::ng-deep .g-loading{height:80px;left:50%;position:absolute;top:50%;transform:translate3d(-50%,-50%,0);width:80px}::ng-deep gallery-core[imageSize=contain] gallery-slider .g-image-item{background-size:contain}::ng-deep gallery-image{align-items:center;display:flex;height:100%;justify-content:center}::ng-deep gallery{background-color:#000;display:block;height:500px;overflow:hidden;position:relative;z-index:1}::ng-deep gallery *{box-sizing:border-box}::ng-deep gallery,::ng-deep gallery-core{overflow:hidden;position:relative}::ng-deep .g-box,::ng-deep .g-slider,::ng-deep gallery-core{display:flex;height:100%;width:100%}::ng-deep gallery[fluid]{left:50%;transform:translateX(-50vw);width:100vw}::ng-deep gallery[fluid][fluid=false]{left:auto;transform:none;width:auto}::ng-deep .g-no-transition{transition:unset!important}::ng-deep .g-box,::ng-deep gallery-slider{display:flex;flex:1;flex-direction:column;height:100%;order:1;overflow:hidden;position:relative}::ng-deep .g-btn-close svg,::ng-deep gallery-nav svg{-webkit-filter:drop-shadow(0 0 1px #000);filter:drop-shadow(0 0 1px black);height:100%;opacity:.6;transition:opacity .2s linear;width:100%}::ng-deep .g-btn-close svg:hover,::ng-deep gallery-nav svg:hover{opacity:1}"]
            },] }
];
GalleryComponent.ctorParameters = () => [
    { type: Gallery }
];
GalleryComponent.propDecorators = {
    id: [{ type: Input }],
    items: [{ type: Input }],
    nav: [{ type: Input }],
    dots: [{ type: Input }],
    loop: [{ type: Input }],
    thumb: [{ type: Input }],
    zoomOut: [{ type: Input }],
    counter: [{ type: Input }],
    dotsSize: [{ type: Input }],
    autoPlay: [{ type: Input }],
    gestures: [{ type: Input }],
    thumbWidth: [{ type: Input }],
    thumbHeight: [{ type: Input }],
    disableThumb: [{ type: Input }],
    panSensitivity: [{ type: Input }],
    playerInterval: [{ type: Input }],
    itemTemplate: [{ type: Input }],
    thumbTemplate: [{ type: Input }],
    thumbMode: [{ type: Input }],
    imageSize: [{ type: Input }],
    dotsPosition: [{ type: Input }],
    counterPosition: [{ type: Input }],
    slidingDirection: [{ type: Input }],
    loadingStrategy: [{ type: Input }],
    thumbPosition: [{ type: Input }],
    destroyRef: [{ type: Input }],
    skipInitConfig: [{ type: Input }],
    itemClick: [{ type: Output }],
    thumbClick: [{ type: Output }],
    playingChange: [{ type: Output }],
    indexChange: [{ type: Output }],
    itemsChange: [{ type: Output }],
    error: [{ type: Output }]
};

class GalleryIframeComponent {
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

class GalleryImageComponent {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        /** Stream that emits the state */
        this._state = new BehaviorSubject('loading');
        this.state = this._state.asObservable();
        /** Progress value */
        this.progress = 0;
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
    }
    get imageLoadSuccess() {
        return !!this.imageUrl;
    }
    get imageLoadFailed() {
        return !!this.loadError;
    }
    ngOnInit() {
        if (this.loadingIcon) {
            this.loaderTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingIcon);
        }
        if (this.loadingError) {
            this.errorTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingError);
        }
    }
    ngOnDestroy() {
        this._state.complete();
    }
    onProgress({ loaded, total }) {
        this.progress = loaded * 100 / total;
    }
    onLoaded(blobUrl) {
        this.imageUrl = this._sanitizer.bypassSecurityTrustStyle(`url("${blobUrl}")`);
        this._state.next('success');
    }
    onError(err) {
        this.loadError = err;
        this._state.next('failed');
        this.error.emit(err);
    }
}
GalleryImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-image',
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('fadeIn', [
                        transition(':enter', [
                            style({ opacity: 0 }),
                            animate('300ms ease-in', style({ opacity: 1 }))
                        ])
                    ])
                ],
                template: `
    <ng-container [lazyImage]="src"
                  (progress)="onProgress($event)"
                  (loaded)="onLoaded($event)"
                  (error)="onError($event)"
                  [ngSwitch]="state | async">

      <div *ngSwitchCase="'success'"
           @fadeIn
           class="g-image-item"
           [style.backgroundImage]="imageUrl">
      </div>

      <div *ngSwitchCase="'failed'"
           class="g-image-error-message">
        <div *ngIf="errorTemplate; else defaultError"
             [innerHTML]="errorTemplate"></div>
        <ng-template #defaultError>
          <ng-container *ngIf="isThumbnail; else isLarge">
            <h4>⚠</h4>
          </ng-container>
          <ng-template #isLarge>
            <h2>⚠</h2>
            <p>Unable to load the image!</p>
          </ng-template>
        </ng-template>
      </div>

      <ng-container *ngSwitchCase="'loading'">
        <div *ngIf="loaderTemplate; else defaultLoader"
             class="g-loading"
             [innerHTML]="loaderTemplate">
        </div>
        <ng-template #defaultLoader>
          <div *ngIf="isThumbnail" class="g-thumb-loading"></div>
        </ng-template>
      </ng-container>
    </ng-container>
  `
            },] }
];
GalleryImageComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
GalleryImageComponent.propDecorators = {
    isThumbnail: [{ type: Input }],
    src: [{ type: Input }],
    loadingIcon: [{ type: Input }],
    loadingError: [{ type: Input }],
    error: [{ type: Output }],
    imageLoadSuccess: [{ type: HostBinding, args: ['class.g-image-loaded',] }],
    imageLoadFailed: [{ type: HostBinding, args: ['class.g-image-error',] }]
};

class GalleryVideoComponent {
    constructor() {
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
    }
    set pauseVideo(shouldPause) {
        if (this.video.nativeElement) {
            const video = this.video.nativeElement;
            if (shouldPause && !video.paused) {
                video.pause();
            }
        }
    }
    set playVideo(shouldPlay) {
        if (this.video.nativeElement) {
            const video = this.video.nativeElement;
            if (shouldPlay) {
                video.play();
            }
        }
    }
    ngOnInit() {
        if (this.src instanceof Array) {
            // If video has multiple sources
            this.videoSources = [...this.src];
        }
        else {
            this.videoSources = [{ url: this.src }];
        }
        this.controls = typeof this.controlsEnabled === 'boolean' ? this.controlsEnabled : true;
    }
}
GalleryVideoComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-video',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <video #video [controls]="controls" [poster]="poster" (error)="error.emit($event)">
      <source *ngFor="let src of videoSources" [src]="src?.url" [type]="src?.type"/>
    </video>
  `
            },] }
];
GalleryVideoComponent.propDecorators = {
    src: [{ type: Input }],
    poster: [{ type: Input }],
    controlsEnabled: [{ type: Input, args: ['controls',] }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    playVideo: [{ type: Input, args: ['play',] }],
    error: [{ type: Output }],
    video: [{ type: ViewChild, args: ['video', { static: true },] }]
};

class GalleryNavComponent {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        this.action = new EventEmitter();
    }
    ngOnInit() {
        this.navIcon = this._sanitizer.bypassSecurityTrustHtml(this.config.navIcon);
    }
}
GalleryNavComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-nav',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <i *ngIf="config.loop || state.hasPrev"
       class="g-nav-prev"
       aria-label="Previous"
       (tapClick)="action.emit('prev')"
       [innerHtml]="navIcon"></i>

    <i *ngIf="config.loop || state.hasNext"
       class="g-nav-next"
       aria-label="Next"
       (tapClick)="action.emit('next')"
       [innerHtml]="navIcon"></i>
  `
            },] }
];
GalleryNavComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
GalleryNavComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }]
};

class GalleryCoreComponent {
    constructor() {
        this.action = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.thumbClick = new EventEmitter();
        this.error = new EventEmitter();
    }
    /** Set thumbnails position */
    get thumbPosition() {
        return this.config.thumbPosition;
    }
    /** Set sliding direction */
    get slidingDirection() {
        return this.config.slidingDirection;
    }
    /** Disable thumbnails clicks */
    get disableThumb() {
        return this.config.disableThumb;
    }
    /** Set gallery image size */
    get imageSize() {
        return this.config.imageSize;
    }
    /** Set gallery dots position */
    get dotsPosition() {
        return this.config.dotsPosition;
    }
    /** Set gallery counter position */
    get counterPosition() {
        return this.config.counterPosition;
    }
}
GalleryCoreComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-core',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <gallery-thumbs *ngIf="config.thumb"
                    [state]="state"
                    [config]="config"
                    (action)="action.emit($event)"
                    (thumbClick)="thumbClick.emit($event)">
    </gallery-thumbs>
    <div class="g-box">
      <gallery-slider [state]="state"
                      [config]="config"
                      (action)="action.emit($event)"
                      (itemClick)="itemClick.emit($event)"
                      (error)="error.emit($event)">

        <gallery-nav *ngIf="config.nav && state.items.length > 1"
                     [state]="state"
                     [config]="config"
                     (action)="action.emit($event)">
        </gallery-nav>

      </gallery-slider>

      <gallery-dots *ngIf="config.dots"
                    [state]="state"
                    [config]="config"
                    (action)="action.emit($event)">
      </gallery-dots>

      <gallery-counter *ngIf="config.counter"
                       [state]="state">
      </gallery-counter>
    </div>
  `
            },] }
];
GalleryCoreComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }],
    itemClick: [{ type: Output }],
    thumbClick: [{ type: Output }],
    error: [{ type: Output }],
    thumbPosition: [{ type: HostBinding, args: ['attr.thumbPosition',] }],
    slidingDirection: [{ type: HostBinding, args: ['attr.slidingDirection',] }],
    disableThumb: [{ type: HostBinding, args: ['attr.disableThumb',] }],
    imageSize: [{ type: HostBinding, args: ['attr.imageSize',] }],
    dotsPosition: [{ type: HostBinding, args: ['attr.dotsPosition',] }],
    counterPosition: [{ type: HostBinding, args: ['attr.counterPosition',] }]
};

class GalleryDotsComponent {
    constructor() {
        this.action = new EventEmitter();
    }
}
GalleryDotsComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-dots',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div class="g-dot"
         *ngFor="let item of state.items; let i = index"
         [class.g-dot-active]="i === state.currIndex"
         [style.width.px]="config?.dotsSize"
         [style.height.px]="config?.dotsSize"
         (tapClick)="action.emit(i)">
      <div class="g-dot-inner"></div>
    </div>
  `
            },] }
];
GalleryDotsComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }]
};

class GalleryThumbsComponent {
    constructor(_el, _zone) {
        this._el = _el;
        this._zone = _zone;
        /** Sliding worker */
        this._slidingWorker$ = new BehaviorSubject({ value: 0, active: false });
        /** Current slider position in free sliding mode */
        this._freeModeCurrentOffset = 0;
        /** Stream that emits when the active item should change */
        this.action = new EventEmitter();
        /** Stream that emits when thumb is clicked */
        this.thumbClick = new EventEmitter();
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
        // Activate sliding worker
        this.sliderState$ = this._slidingWorker$.pipe(map((state) => ({
            style: this.getSliderStyles(state),
            active: state.active
        })));
    }
    ngOnChanges() {
        // Refresh the slider
        this.updateSlider({ value: 0, active: false });
        this._freeModeCurrentOffset = 0;
    }
    ngOnInit() {
        if (this.config.gestures && !this.config.disableThumb && typeof Hammer !== 'undefined') {
            let direction;
            switch (this.config.thumbPosition) {
                case ThumbnailsPosition.Right:
                case ThumbnailsPosition.Left:
                case ThumbnailsPosition.LeftTop:
                    direction = Hammer.DIRECTION_VERTICAL;
                    break;
                case ThumbnailsPosition.Top:
                case ThumbnailsPosition.Bottom:
                    direction = Hammer.DIRECTION_HORIZONTAL;
                    break;
            }
            // Activate gestures
            this._hammer = new Hammer(this._el.nativeElement);
            this._hammer.get('pan').set({ direction });
            this._zone.runOutsideAngular(() => {
                // Move the slider
                switch (this.config.thumbMode) {
                    case ThumbnailsMode.Strict:
                        this._hammer.on('pan', (e) => this.strictMode(e));
                        break;
                    case ThumbnailsMode.Free:
                        this._hammer.on('pan', (e) => this.freeMode(e));
                }
            });
        }
    }
    ngOnDestroy() {
        if (this._hammer) {
            this._hammer.destroy();
        }
    }
    /**
     * Sliding strict mode
     */
    strictMode(e) {
        switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Right:
            case ThumbnailsPosition.Left:
            case ThumbnailsPosition.LeftTop:
                this.updateSlider({ value: e.deltaY, active: true });
                if (e.isFinal) {
                    this.updateSlider({ value: 0, active: false });
                    this.verticalPan(e);
                }
                break;
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
                this.updateSlider({ value: e.deltaX, active: true });
                if (e.isFinal) {
                    this.updateSlider({ value: 0, active: false });
                    this.horizontalPan(e);
                }
        }
    }
    /**
     * Sliding free mode
     */
    freeMode(e) {
        switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Right:
            case ThumbnailsPosition.Left:
            case ThumbnailsPosition.LeftTop:
                this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaY, active: true });
                if (e.isFinal) {
                    if (this.minFreeScrollExceeded(e.deltaY, this.config.thumbWidth, this.config.thumbHeight)) {
                        this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbHeight;
                    }
                    else if (this.maxFreeScrollExceeded(e.deltaY, this.config.thumbHeight, this.config.thumbWidth)) {
                        this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbHeight;
                    }
                    else {
                        this._freeModeCurrentOffset += e.deltaY;
                    }
                    this.updateSlider({ value: this._freeModeCurrentOffset, active: false });
                }
                break;
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
                this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaX, active: true });
                if (e.isFinal) {
                    if (this.minFreeScrollExceeded(e.deltaX, this.config.thumbHeight, this.config.thumbWidth)) {
                        this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbWidth;
                    }
                    else if (this.maxFreeScrollExceeded(e.deltaX, this.config.thumbWidth, this.config.thumbHeight)) {
                        this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbWidth;
                    }
                    else {
                        this._freeModeCurrentOffset += e.deltaX;
                    }
                    this.updateSlider({ value: this._freeModeCurrentOffset, active: false });
                }
        }
    }
    /**
     * Check if the minimum free scroll is exceeded (used in Bottom, Left directions)
     */
    minFreeScrollExceeded(delta, width, height) {
        return -(this._freeModeCurrentOffset + delta - width / 2) > (this.state.items.length - this.state.currIndex) * height;
    }
    /**
     * Check if the maximum free scroll is exceeded (used in Top, Right directions)
     */
    maxFreeScrollExceeded(delta, width, height) {
        return this._freeModeCurrentOffset + delta > (this.state.currIndex * width) + (height / 2);
    }
    /**
     * Convert sliding state to styles
     */
    getSliderStyles(state) {
        let value;
        switch (this.config.thumbPosition) {
            case ThumbnailsPosition.Top:
            case ThumbnailsPosition.Bottom:
                this.width = '100%';
                this.height = this.config.thumbHeight + 'px';
                value = -(this.state.currIndex * this.config.thumbWidth) - (this.config.thumbWidth / 2 - state.value);
                return {
                    transform: `translate3d(${value}px, 0, 0)`,
                    width: this.state.items.length * this.config.thumbWidth + 'px',
                    height: '100%'
                };
            case ThumbnailsPosition.Left:
            case ThumbnailsPosition.Right:
                this.width = this.config.thumbWidth + 'px';
                this.height = '100%';
                value = -(this.state.currIndex * this.config.thumbHeight) - (this.config.thumbHeight / 2 - state.value);
                return {
                    transform: `translate3d(0, ${value}px, 0)`,
                    width: '100%',
                    height: this.state.items.length * this.config.thumbHeight + 'px'
                };
            case ThumbnailsPosition.LeftTop:
                this.width = this.config.thumbWidth + 'px';
                this.height = '100%';
                value = -(this.state.currIndex * this.config.thumbHeight) - state.value;
                return {
                    transform: `translate3d(0, ${value}px, 0)`,
                    width: '100%',
                    height: this.state.items.length * this.config.thumbHeight + 'px'
                };
        }
    }
    verticalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_UP && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) {
            return;
        }
        if (e.velocityY > 0.3) {
            this.prev();
        }
        else if (e.velocityY < -0.3) {
            this.next();
        }
        else {
            if (e.deltaY / 2 <= -this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaY / 2 >= this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    horizontalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_HORIZONTAL && e.offsetDirection & Hammer.DIRECTION_HORIZONTAL)) {
            return;
        }
        if (e.velocityX > 0.3) {
            this.prev();
        }
        else if (e.velocityX < -0.3) {
            this.next();
        }
        else {
            if (e.deltaX / 2 <= -this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaX / 2 >= this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    next() {
        this.action.emit('next');
    }
    prev() {
        this.action.emit('prev');
    }
    updateSlider(state) {
        const newState = Object.assign(Object.assign({}, this._slidingWorker$.value), state);
        this._slidingWorker$.next(newState);
    }
}
GalleryThumbsComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-thumbs',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div *ngIf="sliderState$ | async; let sliderState"
         class="g-thumbs-container">
      <div class="g-slider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-thumb *ngFor="let item of state.items;let i = index"
                       [type]="item.type"
                       [config]="config"
                       [data]="item.data"
                       [currIndex]="state.currIndex"
                       [index]="i"
                       [tapClickDisabled]="config.disableThumb"
                       (tapClick)="thumbClick.emit(i)"
                       (error)="error.emit({itemIndex: i, error: $event})"></gallery-thumb>
      </div>
    </div>
  `
            },] }
];
GalleryThumbsComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone }
];
GalleryThumbsComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }],
    thumbClick: [{ type: Output }],
    error: [{ type: Output }],
    height: [{ type: HostBinding, args: ['style.height',] }],
    width: [{ type: HostBinding, args: ['style.width',] }]
};

class GallerySliderComponent {
    constructor(_el, _zone, platform) {
        this._el = _el;
        this._zone = _zone;
        this.platform = platform;
        /** Sliding worker */
        this._slidingWorker$ = new BehaviorSubject({ value: 0, active: false });
        /** Stream that emits when the active item should change */
        this.action = new EventEmitter();
        /** Stream that emits when item is clicked */
        this.itemClick = new EventEmitter();
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
        // Activate sliding worker
        this.sliderState$ = this._slidingWorker$.pipe(map((state) => ({
            style: this.getSliderStyles(state),
            active: state.active
        })));
    }
    /** Item zoom */
    get zoom() {
        return { transform: `perspective(50px) translate3d(0, 0, ${-this.config.zoomOut}px)` };
    }
    ngOnChanges() {
        // Refresh the slider
        this.updateSlider({ value: 0, active: false });
    }
    ngOnInit() {
        if (this.config.gestures && typeof Hammer !== 'undefined') {
            const direction = this.config.slidingDirection === SlidingDirection.Horizontal
                ? Hammer.DIRECTION_HORIZONTAL
                : Hammer.DIRECTION_VERTICAL;
            // Activate gestures
            this._hammer = new Hammer(this._el.nativeElement);
            this._hammer.get('pan').set({ direction });
            this._zone.runOutsideAngular(() => {
                // Move the slider
                this._hammer.on('pan', (e) => {
                    switch (this.config.slidingDirection) {
                        case SlidingDirection.Horizontal:
                            this.updateSlider({ value: e.deltaX, active: true });
                            if (e.isFinal) {
                                this.updateSlider({ value: 0, active: false });
                                this.horizontalPan(e);
                            }
                            break;
                        case SlidingDirection.Vertical:
                            this.updateSlider({ value: e.deltaY, active: true });
                            if (e.isFinal) {
                                this.updateSlider({ value: 0, active: false });
                                this.verticalPan(e);
                            }
                    }
                });
            });
        }
        // Rearrange slider on window resize
        if (isPlatformBrowser(this.platform)) {
            this._resizeSub$ = fromEvent(window, 'resize').pipe(debounceTime(200), tap(() => this.updateSlider(this._slidingWorker$.value))).subscribe();
        }
        setTimeout(() => this.updateSlider({ value: 0, active: false }));
    }
    ngOnDestroy() {
        if (this._hammer) {
            this._hammer.destroy();
        }
        if (this._resizeSub$) {
            this._resizeSub$.unsubscribe();
        }
        this._slidingWorker$.complete();
    }
    /**
     * Convert sliding state to styles
     */
    getSliderStyles(state) {
        switch (this.config.slidingDirection) {
            case SlidingDirection.Horizontal:
                return {
                    transform: `translate3d(${-(this.state.currIndex * this._el.nativeElement.offsetWidth) + state.value}px, 0, 0)`,
                    width: `calc(100% * ${this.state.items.length})`,
                    height: '100%'
                };
            case SlidingDirection.Vertical:
                return {
                    transform: `translate3d(0, ${-(this.state.currIndex * this._el.nativeElement.offsetHeight) + state.value}px, 0)`,
                    width: '100%',
                    height: `calc(100% * ${this.state.items.length})`,
                };
        }
    }
    verticalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_UP && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) {
            return;
        }
        if (e.velocityY > 0.3) {
            this.prev();
        }
        else if (e.velocityY < -0.3) {
            this.next();
        }
        else {
            if (e.deltaY / 2 <= -this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaY / 2 >= this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    horizontalPan(e) {
        if (!(e.direction & Hammer.DIRECTION_HORIZONTAL && e.offsetDirection & Hammer.DIRECTION_HORIZONTAL)) {
            return;
        }
        if (e.velocityX > 0.3) {
            this.prev();
        }
        else if (e.velocityX < -0.3) {
            this.next();
        }
        else {
            if (e.deltaX / 2 <= -this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
                this.next();
            }
            else if (e.deltaX / 2 >= this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
                this.prev();
            }
            else {
                this.action.emit(this.state.currIndex);
            }
        }
    }
    next() {
        this.action.emit('next');
    }
    prev() {
        this.action.emit('prev');
    }
    updateSlider(state) {
        const newState = Object.assign(Object.assign({}, this._slidingWorker$.value), state);
        this._slidingWorker$.next(newState);
    }
}
GallerySliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-slider',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <div *ngIf="sliderState$ | async; let sliderState"
         class="g-items-container"
         [ngStyle]="zoom">

      <div class="g-slider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-item *ngFor="let item of state.items; let i = index"
                      [type]="item.type"
                      [config]="config"
                      [data]="item.data"
                      [currIndex]="state.currIndex"
                      [index]="i"
                      (tapClick)="itemClick.emit(i)"
                      (error)="error.emit({itemIndex: i, error: $event})">
        </gallery-item>

      </div>
    </div>
    <ng-content></ng-content>
  `
            },] }
];
GallerySliderComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
GallerySliderComponent.propDecorators = {
    state: [{ type: Input }],
    config: [{ type: Input }],
    action: [{ type: Output }],
    itemClick: [{ type: Output }],
    error: [{ type: Output }]
};

class GalleryCounterComponent {
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

class GalleryItemComponent {
    constructor() {
        this.Types = GalleryItemType;
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
    }
    get isActive() {
        return this.index === this.currIndex;
    }
    get isAutoPlay() {
        if (this.isActive) {
            if (this.type === GalleryItemType.Video || this.type === GalleryItemType.Youtube) {
                return this.data.autoplay;
            }
        }
    }
    get youtubeSrc() {
        let autoplay = 0;
        if (this.isActive && this.type === GalleryItemType.Youtube && this.data.autoplay) {
            autoplay = 1;
        }
        const url = new URL(this.data.src);
        url.search = new URLSearchParams(Object.assign(Object.assign({ wmode: 'transparent' }, this.data.params), { autoplay })).toString();
        return url.href;
    }
    get load() {
        switch (this.config.loadingStrategy) {
            case LoadingStrategy.Preload:
                return true;
            case LoadingStrategy.Lazy:
                return this.currIndex === this.index;
            default:
                return this.currIndex === this.index || this.currIndex === this.index - 1 || this.currIndex === this.index + 1;
        }
    }
}
GalleryItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-item',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *ngIf="load" [ngSwitch]="type">

      <ng-container *ngSwitchCase="Types.Image">

        <gallery-image [src]="data.src"
                       [loadingIcon]="config.loadingIcon"
                       [loadingError]="config.loadingError"
                       (error)="error.emit($event)"></gallery-image>

        <div class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

      <gallery-video *ngSwitchCase="Types.Video"
                     [src]="data.src"
                     [poster]="data.poster"
                     [controls]="data.controls"
                     [play]="isAutoPlay"
                     [pause]="currIndex !== index"
                     (error)="error.emit($event)"></gallery-video>

      <gallery-iframe *ngSwitchCase="Types.Youtube"
                      [src]="youtubeSrc"
                      [autoplay]="isAutoPlay"
                      [pause]="currIndex !== index"></gallery-iframe>

      <gallery-iframe *ngSwitchCase="Types.Iframe"
                      [src]="data.src"></gallery-iframe>

      <ng-container *ngSwitchDefault>

        <div class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

    </ng-container>
  `
            },] }
];
GalleryItemComponent.propDecorators = {
    config: [{ type: Input }],
    index: [{ type: Input }],
    currIndex: [{ type: Input }],
    type: [{ type: Input }],
    data: [{ type: Input }],
    error: [{ type: Output }],
    isActive: [{ type: HostBinding, args: ['class.g-active-item',] }]
};

class GalleryThumbComponent {
    constructor() {
        this.error = new EventEmitter();
    }
    get isActive() {
        return this.index === this.currIndex;
    }
}
GalleryThumbComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-thumb',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <gallery-image [src]="data.thumb" 
                   mode="indeterminate"
                   [isThumbnail]="true" 
                   [loadingIcon]="config.thumbLoadingIcon"
                   [loadingError]="config.thumbLoadingError "
                   (error)="error.emit($event)"></gallery-image>

    <div *ngIf="config.thumbTemplate" class="g-template g-thumb-template">
      <ng-container
        *ngTemplateOutlet="config.thumbTemplate; context: { index: this.index, type: this.type, data: this.data }">
      </ng-container>
    </div>
  `
            },] }
];
GalleryThumbComponent.propDecorators = {
    config: [{ type: Input }],
    index: [{ type: Input }],
    currIndex: [{ type: Input }],
    type: [{ type: Input }],
    data: [{ type: Input }],
    error: [{ type: Output }],
    isActive: [{ type: HostBinding, args: ['class.g-active-thumb',] }]
};

class LazyImage {
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

/**
 * This directive uses tap event if HammerJS is loaded, otherwise it falls back to normal click event
 */
class TapClick {
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

class GalleryModule {
    static withConfig(config) {
        return {
            ngModule: GalleryModule,
            providers: [
                {
                    provide: GALLERY_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
GalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    GalleryComponent,
                    GalleryNavComponent,
                    GalleryDotsComponent,
                    GalleryCoreComponent,
                    GallerySliderComponent,
                    GalleryCounterComponent,
                    GalleryThumbsComponent,
                    GalleryThumbComponent,
                    GalleryItemComponent,
                    GalleryImageComponent,
                    GalleryVideoComponent,
                    GalleryIframeComponent,
                    LazyImage,
                    TapClick
                ],
                exports: [
                    GalleryComponent,
                    LazyImage,
                    TapClick
                ]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { CounterPosition, DotsPosition, GALLERY_CONFIG, Gallery, GalleryAction, GalleryComponent, GalleryIframeComponent, GalleryImageComponent, GalleryItemType, GalleryModule, GalleryRef, GalleryVideoComponent, IframeItem, ImageItem, ImageLoaderMode, ImageSize, LoadingStrategy, SlidingDirection, ThumbnailsMode, ThumbnailsPosition, VideoItem, YoutubeItem, ɵ0, GalleryNavComponent as ɵa, GalleryDotsComponent as ɵb, GalleryCoreComponent as ɵc, GallerySliderComponent as ɵd, GalleryCounterComponent as ɵe, GalleryThumbsComponent as ɵf, GalleryThumbComponent as ɵg, GalleryItemComponent as ɵh, LazyImage as ɵi, TapClick as ɵj };
//# sourceMappingURL=ng-gallery.js.map