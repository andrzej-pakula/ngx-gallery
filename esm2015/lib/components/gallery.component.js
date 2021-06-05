import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gallery } from '../services/gallery.service';
import { IframeItem, ImageItem, VideoItem, YoutubeItem } from './templates/items.model';
export class GalleryComponent {
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
    withHeight(height) {
        this._height = `${height}px`;
    }
    get height() {
        return this._height;
    }
    get applyHeight() {
        return this.height;
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
                styles: ["::ng-deep gallery-core[dotsPosition=top] gallery-dots{top:0}::ng-deep gallery-core[dotsPosition=bottom] gallery-dots{bottom:0}::ng-deep gallery-dots{margin:7px;position:absolute;left:50%;transform:translateX(-50%)}::ng-deep .g-dot{cursor:pointer;z-index:20}::ng-deep .g-dot:hover .g-dot-inner{opacity:1}::ng-deep .g-dot-active .g-dot-inner{opacity:1;transform:scale(1.5)!important}::ng-deep .g-dot-inner{background-color:#fff;opacity:.6;width:30%;height:30%;border-radius:50%;box-shadow:0 0 1px #000;transition:all .2s ease}::ng-deep .g-dot,::ng-deep .g-dot-inner,::ng-deep gallery-dots{display:flex;justify-content:center;align-items:center}::ng-deep .g-nav-next,::ng-deep .g-nav-prev{position:absolute;top:50%;width:30px;height:40px;cursor:pointer;z-index:999}::ng-deep .g-nav-next{right:.5em;transform:translateY(-50%) perspective(1px)}::ng-deep .g-nav-prev{left:.5em;transform:translateY(-50%) perspective(1px) scale(-1)}@media only screen and (max-width:480px){::ng-deep .g-nav-next{right:.2em}::ng-deep .g-nav-prev{left:.2em}}::ng-deep .g-items-container{height:100%}::ng-deep .g-slider{position:absolute;transition:transform .4s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-core[slidingDirection=horizontal] .g-slider{flex-direction:row}::ng-deep gallery-core[slidingDirection=vertical] .g-slider{flex-direction:column}::ng-deep gallery-thumbs{display:block;z-index:1;overflow:unset}::ng-deep .g-thumbs-container{position:relative;z-index:206;width:100%;height:100%;left:0;top:0;display:flex;overflow:unset}::ng-deep gallery-core[disableThumb=true] gallery-thumb{cursor:default}::ng-deep gallery-core[thumbPosition=bottom-left] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=bottom] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=top] gallery-thumbs .g-slider{flex-direction:row;top:0;left:50%}::ng-deep gallery-core[thumbPosition=bottom-left] gallery-thumb,::ng-deep gallery-core[thumbPosition=bottom] gallery-thumb,::ng-deep gallery-core[thumbPosition=top] gallery-thumb{padding:1px 0 1px 1px}::ng-deep gallery-core[thumbPosition=bottom-left] gallery-thumbs .g-slider{left:0}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=left] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=right] gallery-thumbs .g-slider{flex-direction:column;top:50%;left:0}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumb,::ng-deep gallery-core[thumbPosition=left] gallery-thumb,::ng-deep gallery-core[thumbPosition=right] gallery-thumb{padding:0 1px 1px}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumbs .g-slider{top:0}::ng-deep gallery-core[thumbPosition=top]{flex-direction:column}::ng-deep gallery-core[thumbPosition=left-top],::ng-deep gallery-core[thumbPosition=left]{flex-direction:row}::ng-deep gallery-core[thumbPosition=right]{flex-direction:row-reverse}::ng-deep gallery-core[thumbPosition=bottom-left],::ng-deep gallery-core[thumbPosition=bottom]{flex-direction:column-reverse}::ng-deep gallery-thumb.g-active-thumb .g-thumb-loading{background-color:#464646}::ng-deep .g-thumb-loading{position:relative;overflow:hidden;height:100%;background-color:#262626}::ng-deep .g-thumb-loading:before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:50%;z-index:1;width:500%;margin-left:-250%;-webkit-animation:phAnimation .8s linear infinite;animation:phAnimation .8s linear infinite;background:linear-gradient(90deg,hsla(0,0%,100%,0) 46%,hsla(0,0%,100%,.35) 50%,hsla(0,0%,100%,0) 54%) 50% 50%}@-webkit-keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}@keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}::ng-deep gallery-core[counterPosition=top] .g-counter{top:0;border-bottom-left-radius:4px;border-bottom-right-radius:4px}::ng-deep gallery-core[counterPosition=bottom] .g-counter{bottom:0;border-top-left-radius:4px;border-top-right-radius:4px}::ng-deep .g-counter{z-index:50;position:absolute;left:50%;transform:translateX(-50%) perspective(1px);font-size:12px;padding:4px 10px;color:#fff;background-color:rgba(0,0,0,.5)}::ng-deep gallery[gallerize] gallery-item{cursor:pointer}::ng-deep gallery-item,::ng-deep gallery-thumb{position:relative;height:100%;width:100%;display:block;overflow:hidden}::ng-deep gallery-item h2,::ng-deep gallery-item h4,::ng-deep gallery-thumb h2,::ng-deep gallery-thumb h4{color:coral;margin:0}::ng-deep gallery-item h2,::ng-deep gallery-thumb h2{font-size:3.5em;margin-bottom:.3em}::ng-deep gallery-item h4,::ng-deep gallery-thumb h4{font-size:1.6em}::ng-deep gallery-item{z-index:10}::ng-deep gallery-item iframe,::ng-deep gallery-item video{position:absolute;width:100%;height:100%}::ng-deep gallery-thumb{opacity:.5;cursor:pointer;transition:opacity .3s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-thumb.g-active-thumb{opacity:1}::ng-deep .g-image-item{background-position:50%;background-repeat:no-repeat;background-size:cover;width:100%;height:100%}::ng-deep .g-image-error-message,::ng-deep .g-template{position:absolute;z-index:10;left:0;top:0;right:0;bottom:0;color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column}::ng-deep .g-loading{position:absolute;transform:translate3d(-50%,-50%,0);left:50%;top:50%;width:80px;height:80px}::ng-deep gallery-core[imageSize=contain] gallery-slider .g-image-item{background-size:contain}::ng-deep gallery-image{display:flex;justify-content:center;align-items:center;height:100%}::ng-deep gallery{position:relative;z-index:1;overflow:hidden;display:block;height:500px;background-color:#000}::ng-deep gallery *{box-sizing:border-box}::ng-deep gallery,::ng-deep gallery-core{position:relative;overflow:hidden}::ng-deep .g-box,::ng-deep .g-slider,::ng-deep gallery-core{display:flex;height:100%;width:100%}::ng-deep gallery[fluid]{transform:translateX(-50vw);width:100vw;left:50%}::ng-deep gallery[fluid][fluid=false]{transform:none;width:auto;left:auto}::ng-deep .g-no-transition{transition:unset!important}::ng-deep .g-box,::ng-deep gallery-slider{overflow:hidden;position:relative;display:flex;flex-direction:column;flex:1;order:1;height:100%}::ng-deep .g-btn-close svg,::ng-deep gallery-nav svg{width:100%;height:100%;filter:drop-shadow(0 0 1px black);transition:opacity .2s linear;opacity:.6}::ng-deep .g-btn-close svg:hover,::ng-deep gallery-nav svg:hover{opacity:1}"]
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
    error: [{ type: Output }],
    applyHeight: [{ type: HostBinding, args: ['style.height',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvY29tcG9uZW50cy9nYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBTU4sWUFBWSxFQUNaLHVCQUF1QixFQUFFLFdBQVcsRUFDckMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBb0IsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3RELE9BQU8sRUFDTCxVQUFVLEVBRVYsU0FBUyxFQUVULFNBQVMsRUFFVCxXQUFXLEVBRVosTUFBTSx5QkFBeUIsQ0FBQztBQWdCakMsTUFBTSxPQUFPLGdCQUFnQjtJQW9EM0IsWUFBb0IsUUFBaUI7UUFBakIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQS9DNUIsUUFBRyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN4QyxTQUFJLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzFDLFNBQUksR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUMsVUFBSyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM1QyxZQUFPLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9DLFlBQU8sR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDaEQsYUFBUSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNqRCxhQUFRLEdBQVks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MkJBQ0wsS0FBSzs0QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBS0wsS0FBSzs2QkFHTCxLQUFLO3dCQUVMLE1BQU07eUJBQ04sTUFBTTs0QkFDTixNQUFNOzBCQUNOLE1BQU07MEJBQ04sTUFBTTtvQkFDTixNQUFNOzBCQXVMTixXQUFXLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVGVtcGxhdGVSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEhvc3RCaW5kaW5nXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uLCBTdWJzY3JpcHRpb25MaWtlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBHYWxsZXJ5IH0gZnJvbSAnLi4vc2VydmljZXMvZ2FsbGVyeS5zZXJ2aWNlJztcbmltcG9ydCB7IEdhbGxlcnlSZWYgfSBmcm9tICcuLi9zZXJ2aWNlcy9nYWxsZXJ5LXJlZic7XG5pbXBvcnQgeyBHYWxsZXJ5RXJyb3IsIEdhbGxlcnlJdGVtLCBHYWxsZXJ5U3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvZ2FsbGVyeS5tb2RlbCc7XG5pbXBvcnQge1xuICBJZnJhbWVJdGVtLFxuICBJZnJhbWVJdGVtRGF0YSxcbiAgSW1hZ2VJdGVtLFxuICBJbWFnZUl0ZW1EYXRhLFxuICBWaWRlb0l0ZW0sXG4gIFZpZGVvSXRlbURhdGEsXG4gIFlvdXR1YmVJdGVtLFxuICBZb3V0dWJlSXRlbURhdGFcbn0gZnJvbSAnLi90ZW1wbGF0ZXMvaXRlbXMubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnYWxsZXJ5JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHN0eWxlVXJsczogWycuLi9zdHlsZXMvZ2FsbGVyeS5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGdhbGxlcnktY29yZSBbc3RhdGVdPVwiZ2FsbGVyeVJlZi5zdGF0ZSB8IGFzeW5jXCJcbiAgICAgICAgICAgICAgICAgIFtjb25maWddPVwiZ2FsbGVyeVJlZi5jb25maWcgfCBhc3luY1wiXG4gICAgICAgICAgICAgICAgICAoYWN0aW9uKT1cIm9uQWN0aW9uKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgKGl0ZW1DbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICh0aHVtYkNsaWNrKT1cIm9uVGh1bWJDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIChlcnJvcik9XCJvbkVycm9yKCRldmVudClcIj48L2dhbGxlcnktY29yZT5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIGdhbGxlcnlSZWY6IEdhbGxlcnlSZWY7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGl0ZW1zOiBHYWxsZXJ5SXRlbSBbXTtcbiAgQElucHV0KCkgbmF2OiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcubmF2O1xuICBASW5wdXQoKSBkb3RzOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZG90cztcbiAgQElucHV0KCkgbG9vcDogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmxvb3A7XG4gIEBJbnB1dCgpIHRodW1iOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcudGh1bWI7XG4gIEBJbnB1dCgpIHpvb21PdXQ6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnpvb21PdXQ7XG4gIEBJbnB1dCgpIGNvdW50ZXI6IGJvb2xlYW4gPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5jb3VudGVyO1xuICBASW5wdXQoKSBkb3RzU2l6ZTogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZG90c1NpemU7XG4gIEBJbnB1dCgpIGF1dG9QbGF5OiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuYXV0b1BsYXk7XG4gIEBJbnB1dCgpIGdlc3R1cmVzOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZ2VzdHVyZXM7XG4gIEBJbnB1dCgpIHRodW1iV2lkdGg6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iV2lkdGg7XG4gIEBJbnB1dCgpIHRodW1iSGVpZ2h0OiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYkhlaWdodDtcbiAgQElucHV0KCkgZGlzYWJsZVRodW1iOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZGlzYWJsZVRodW1iO1xuICBASW5wdXQoKSBwYW5TZW5zaXRpdml0eTogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcucGFuU2Vuc2l0aXZpdHk7XG4gIEBJbnB1dCgpIHBsYXllckludGVydmFsOiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5wbGF5ZXJJbnRlcnZhbDtcbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+ID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuaXRlbVRlbXBsYXRlO1xuICBASW5wdXQoKSB0aHVtYlRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+ID0gdGhpcy5fZ2FsbGVyeS5jb25maWcudGh1bWJUZW1wbGF0ZTtcbiAgQElucHV0KCkgdGh1bWJNb2RlOiAnc3RyaWN0JyB8ICdmcmVlJyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iTW9kZTtcbiAgQElucHV0KCkgaW1hZ2VTaXplOiAnY292ZXInIHwgJ2NvbnRhaW4nID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuaW1hZ2VTaXplO1xuICBASW5wdXQoKSBkb3RzUG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbScgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5kb3RzUG9zaXRpb247XG4gIEBJbnB1dCgpIGNvdW50ZXJQb3NpdGlvbjogJ3RvcCcgfCAnYm90dG9tJyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmNvdW50ZXJQb3NpdGlvbjtcbiAgQElucHV0KCkgc2xpZGluZ0RpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnNsaWRpbmdEaXJlY3Rpb247XG4gIEBJbnB1dCgpIGxvYWRpbmdTdHJhdGVneTogJ3ByZWxvYWQnIHwgJ2xhenknIHwgJ2RlZmF1bHQnID0gdGhpcy5fZ2FsbGVyeS5jb25maWcubG9hZGluZ1N0cmF0ZWd5O1xuICBASW5wdXQoKSB0aHVtYlBvc2l0aW9uOiAndG9wJyB8ICdsZWZ0JyB8ICdsZWZ0LXRvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAgJ2JvdHRvbS1sZWZ0JyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iUG9zaXRpb247XG5cbiAgLy8gSW5wdXRzIHVzZWQgYnkgdGhlIGxpZ2h0Ym94XG5cbiAgLyoqIERlc3Ryb3kgZ2FsbGVyeSByZWYgb24gY29tcG9uZW50IGRlc3Ryb3kgZXZlbnQgKi9cbiAgQElucHV0KCkgZGVzdHJveVJlZiA9IHRydWU7XG5cbiAgLyoqIFNraXAgaW5pdGlhbGl6aW5nIHRoZSBjb25maWcgd2l0aCBjb21wb25lbnRzIGlucHV0cyAoTGlnaHRib3ggbW9kZSkgKi9cbiAgQElucHV0KCkgc2tpcEluaXRDb25maWcgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSB0aHVtYkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBwbGF5aW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5U3RhdGU+KCk7XG4gIEBPdXRwdXQoKSBpbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8R2FsbGVyeVN0YXRlPigpO1xuICBAT3V0cHV0KCkgaXRlbXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEdhbGxlcnlTdGF0ZT4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5RXJyb3I+KCk7XG5cbiAgcHJpdmF0ZSBfaXRlbUNsaWNrJDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdGh1bWJDbGljayQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2l0ZW1DaGFuZ2UkOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9pbmRleENoYW5nZSQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3BsYXlpbmdDaGFuZ2UkOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9wbGF5ZXJMaXN0ZW5lciQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIF9oZWlnaHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9nYWxsZXJ5OiBHYWxsZXJ5KSB7XG4gIH1cblxuICBwcml2YXRlIGdldENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmF2OiB0aGlzLm5hdixcbiAgICAgIGRvdHM6IHRoaXMuZG90cyxcbiAgICAgIGxvb3A6IHRoaXMubG9vcCxcbiAgICAgIHRodW1iOiB0aGlzLnRodW1iLFxuICAgICAgem9vbU91dDogdGhpcy56b29tT3V0LFxuICAgICAgY291bnRlcjogdGhpcy5jb3VudGVyLFxuICAgICAgYXV0b1BsYXk6IHRoaXMuYXV0b1BsYXksXG4gICAgICBnZXN0dXJlczogdGhpcy5nZXN0dXJlcyxcbiAgICAgIGRvdHNTaXplOiB0aGlzLmRvdHNTaXplLFxuICAgICAgaW1hZ2VTaXplOiB0aGlzLmltYWdlU2l6ZSxcbiAgICAgIHRodW1iTW9kZTogdGhpcy50aHVtYk1vZGUsXG4gICAgICB0aHVtYldpZHRoOiB0aGlzLnRodW1iV2lkdGgsXG4gICAgICB0aHVtYkhlaWdodDogdGhpcy50aHVtYkhlaWdodCxcbiAgICAgIGRpc2FibGVUaHVtYjogdGhpcy5kaXNhYmxlVGh1bWIsXG4gICAgICBkb3RzUG9zaXRpb246IHRoaXMuZG90c1Bvc2l0aW9uLFxuICAgICAgaXRlbVRlbXBsYXRlOiB0aGlzLml0ZW1UZW1wbGF0ZSxcbiAgICAgIHRodW1iVGVtcGxhdGU6IHRoaXMudGh1bWJUZW1wbGF0ZSxcbiAgICAgIHRodW1iUG9zaXRpb246IHRoaXMudGh1bWJQb3NpdGlvbixcbiAgICAgIHBhblNlbnNpdGl2aXR5OiB0aGlzLnBhblNlbnNpdGl2aXR5LFxuICAgICAgcGxheWVySW50ZXJ2YWw6IHRoaXMucGxheWVySW50ZXJ2YWwsXG4gICAgICBjb3VudGVyUG9zaXRpb246IHRoaXMuY291bnRlclBvc2l0aW9uLFxuICAgICAgbG9hZGluZ1N0cmF0ZWd5OiB0aGlzLmxvYWRpbmdTdHJhdGVneSxcbiAgICAgIHNsaWRpbmdEaXJlY3Rpb246IHRoaXMuc2xpZGluZ0RpcmVjdGlvblxuICAgIH07XG4gIH1cblxuICBvbkFjdGlvbihpOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKGkpIHtcbiAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICB0aGlzLmdhbGxlcnlSZWYubmV4dCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ByZXYnOlxuICAgICAgICB0aGlzLmdhbGxlcnlSZWYucHJldigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZ2FsbGVyeVJlZi5zZXQoaSBhcyBudW1iZXIpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5nYWxsZXJ5UmVmKSB7XG4gICAgICB0aGlzLmdhbGxlcnlSZWYuc2V0Q29uZmlnKHRoaXMuZ2V0Q29uZmlnKCkpO1xuXG4gICAgICBpZiAoY2hhbmdlcy5pdGVtcyAmJiBjaGFuZ2VzLml0ZW1zLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5pdGVtcy5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIHRoaXMubG9hZCh0aGlzLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBHZXQgZ2FsbGVyeSBpbnN0YW5jZSBieSBpZFxuICAgIGlmICh0aGlzLnNraXBJbml0Q29uZmlnKSB7XG4gICAgICB0aGlzLmdhbGxlcnlSZWYgPSB0aGlzLl9nYWxsZXJ5LnJlZih0aGlzLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYWxsZXJ5UmVmID0gdGhpcy5fZ2FsbGVyeS5yZWYodGhpcy5pZCwgdGhpcy5nZXRDb25maWcoKSk7XG4gICAgfVxuXG4gICAgLy8gTG9hZCBnYWxsZXJ5IGl0ZW1zXG4gICAgdGhpcy5sb2FkKHRoaXMuaXRlbXMpO1xuXG4gICAgLy8gQWN0aXZhdGUgcGxheWVyIGxpc3RlbmVyXG4gICAgdGhpcy5fcGxheWVyTGlzdGVuZXIkID0gdGhpcy5nYWxsZXJ5UmVmLmFjdGl2YXRlUGxheWVyKCkuc3Vic2NyaWJlKCk7XG5cbiAgICAvLyBTdWJzY3JpYmVzIHRvIGV2ZW50cyBvbiBkZW1hbmRcbiAgICBpZiAodGhpcy5pbmRleENoYW5nZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9pbmRleENoYW5nZSQgPSB0aGlzLmdhbGxlcnlSZWYuaW5kZXhDaGFuZ2VkLnN1YnNjcmliZSgoc3RhdGU6IEdhbGxlcnlTdGF0ZSkgPT4gdGhpcy5pbmRleENoYW5nZS5lbWl0KHN0YXRlKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLml0ZW1zQ2hhbmdlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2l0ZW1DaGFuZ2UkID0gdGhpcy5nYWxsZXJ5UmVmLml0ZW1zQ2hhbmdlZC5zdWJzY3JpYmUoKHN0YXRlOiBHYWxsZXJ5U3RhdGUpID0+IHRoaXMuaXRlbXNDaGFuZ2UuZW1pdChzdGF0ZSkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wbGF5aW5nQ2hhbmdlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3BsYXlpbmdDaGFuZ2UkID0gdGhpcy5nYWxsZXJ5UmVmLnBsYXlpbmdDaGFuZ2VkLnN1YnNjcmliZSgoc3RhdGU6IEdhbGxlcnlTdGF0ZSkgPT4gdGhpcy5wbGF5aW5nQ2hhbmdlLmVtaXQoc3RhdGUpKTtcbiAgICB9XG5cbiAgICAvLyBTdGFydCBwbGF5aW5nIGlmIGF1dG8tcGxheSBpcyBzZXQgdG8gdHJ1ZVxuICAgIGlmICh0aGlzLmF1dG9QbGF5KSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9pdGVtQ2xpY2skLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdGh1bWJDbGljayQudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pdGVtQ2hhbmdlJC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2luZGV4Q2hhbmdlJC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3BsYXlpbmdDaGFuZ2UkLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcGxheWVyTGlzdGVuZXIkLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuZGVzdHJveVJlZikge1xuICAgICAgdGhpcy5nYWxsZXJ5UmVmLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBvbkl0ZW1DbGljayhpOiBudW1iZXIpIHtcbiAgICB0aGlzLml0ZW1DbGljay5lbWl0KGkpO1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5pdGVtQ2xpY2submV4dChpKTtcbiAgfVxuXG4gIG9uVGh1bWJDbGljayhpOiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYuc2V0KGkpO1xuICAgIHRoaXMudGh1bWJDbGljay5lbWl0KGkpO1xuICAgIHRoaXMuZ2FsbGVyeVJlZi50aHVtYkNsaWNrLm5leHQoaSk7XG4gIH1cblxuICBvbkVycm9yKGVycjogR2FsbGVyeUVycm9yKSB7XG4gICAgdGhpcy5lcnJvci5lbWl0KGVycik7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLmVycm9yLm5leHQoZXJyKTtcbiAgfVxuXG4gIGxvYWQoaXRlbXM6IEdhbGxlcnlJdGVtW10pIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYubG9hZChpdGVtcyk7XG4gIH1cblxuICBhZGQoaXRlbTogR2FsbGVyeUl0ZW0sIGFjdGl2ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYuYWRkKGl0ZW0sIGFjdGl2ZSk7XG4gIH1cblxuICBhZGRJbWFnZShkYXRhOiBJbWFnZUl0ZW1EYXRhLCBhY3RpdmU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5hZGQobmV3IEltYWdlSXRlbShkYXRhKSwgYWN0aXZlKTtcbiAgfVxuXG4gIGFkZFZpZGVvKGRhdGE6IFZpZGVvSXRlbURhdGEsIGFjdGl2ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFkZChuZXcgVmlkZW9JdGVtKGRhdGEpLCBhY3RpdmUpO1xuICB9XG5cbiAgYWRkSWZyYW1lKGRhdGE6IElmcmFtZUl0ZW1EYXRhLCBhY3RpdmU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5hZGQobmV3IElmcmFtZUl0ZW0oZGF0YSksIGFjdGl2ZSk7XG4gIH1cblxuICBhZGRZb3V0dWJlKGRhdGE6IFlvdXR1YmVJdGVtRGF0YSwgYWN0aXZlPzogYm9vbGVhbikge1xuICAgIHRoaXMuYWRkKG5ldyBZb3V0dWJlSXRlbShkYXRhKSwgYWN0aXZlKTtcbiAgfVxuXG4gIHJlbW92ZShpOiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucmVtb3ZlKGkpO1xuICB9XG5cbiAgbmV4dCgpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYubmV4dCgpO1xuICB9XG5cbiAgcHJldigpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucHJldigpO1xuICB9XG5cbiAgc2V0KGk6IG51bWJlcikge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5zZXQoaSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucmVzZXQoKTtcbiAgfVxuXG4gIHBsYXkoaW50ZXJ2YWw/OiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucGxheShpbnRlcnZhbCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5zdG9wKCk7XG4gIH1cblxuICB3aXRoSGVpZ2h0KGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5faGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgZ2V0IGFwcGx5SGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgfVxufVxuIl19