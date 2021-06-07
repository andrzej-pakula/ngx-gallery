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
        this.youtubeItemClickEvent = new EventEmitter();
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
                  (youtubeItemClickEvent)="youtubeItemClickEvent.emit($event)"
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
    youtubeItemClickEvent: [{ type: Output }],
    applyHeight: [{ type: HostBinding, args: ['style.height',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvY29tcG9uZW50cy9nYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBTU4sWUFBWSxFQUNaLHVCQUF1QixFQUFFLFdBQVcsRUFDckMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBb0IsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3RELE9BQU8sRUFDTCxVQUFVLEVBRVYsU0FBUyxFQUVULFNBQVMsRUFFVCxXQUFXLEVBRVosTUFBTSx5QkFBeUIsQ0FBQztBQWlCakMsTUFBTSxPQUFPLGdCQUFnQjtJQXFEM0IsWUFBb0IsUUFBaUI7UUFBakIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQWhENUIsUUFBRyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN4QyxTQUFJLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzFDLFNBQUksR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUMsVUFBSyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM1QyxZQUFPLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9DLFlBQU8sR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDaEQsYUFBUSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNqRCxhQUFRLEdBQVks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LEtBQUs7MkJBQ0wsS0FBSzs2QkFDTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzs0QkFDTCxLQUFLO3dCQUNMLEtBQUs7d0JBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7K0JBQ0wsS0FBSzs4QkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBS0wsS0FBSzs2QkFHTCxLQUFLO3dCQUVMLE1BQU07eUJBQ04sTUFBTTs0QkFDTixNQUFNOzBCQUNOLE1BQU07MEJBQ04sTUFBTTtvQkFDTixNQUFNO29DQUNOLE1BQU07MEJBdUxOLFdBQVcsU0FBQyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSG9zdEJpbmRpbmcsIEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIFN1YnNjcmlwdGlvbkxpa2UgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEdhbGxlcnkgfSBmcm9tICcuLi9zZXJ2aWNlcy9nYWxsZXJ5LnNlcnZpY2UnO1xuaW1wb3J0IHsgR2FsbGVyeVJlZiB9IGZyb20gJy4uL3NlcnZpY2VzL2dhbGxlcnktcmVmJztcbmltcG9ydCB7IEdhbGxlcnlFcnJvciwgR2FsbGVyeUl0ZW0sIEdhbGxlcnlTdGF0ZSB9IGZyb20gJy4uL21vZGVscy9nYWxsZXJ5Lm1vZGVsJztcbmltcG9ydCB7XG4gIElmcmFtZUl0ZW0sXG4gIElmcmFtZUl0ZW1EYXRhLFxuICBJbWFnZUl0ZW0sXG4gIEltYWdlSXRlbURhdGEsXG4gIFZpZGVvSXRlbSxcbiAgVmlkZW9JdGVtRGF0YSxcbiAgWW91dHViZUl0ZW0sXG4gIFlvdXR1YmVJdGVtRGF0YVxufSBmcm9tICcuL3RlbXBsYXRlcy9pdGVtcy5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dhbGxlcnknLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc3R5bGVVcmxzOiBbJy4uL3N0eWxlcy9nYWxsZXJ5LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8Z2FsbGVyeS1jb3JlIFtzdGF0ZV09XCJnYWxsZXJ5UmVmLnN0YXRlIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgW2NvbmZpZ109XCJnYWxsZXJ5UmVmLmNvbmZpZyB8IGFzeW5jXCJcbiAgICAgICAgICAgICAgICAgIChhY3Rpb24pPVwib25BY3Rpb24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAoaXRlbUNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgKHRodW1iQ2xpY2spPVwib25UaHVtYkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgKHlvdXR1YmVJdGVtQ2xpY2tFdmVudCk9XCJ5b3V0dWJlSXRlbUNsaWNrRXZlbnQuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIChlcnJvcik9XCJvbkVycm9yKCRldmVudClcIj48L2dhbGxlcnktY29yZT5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIGdhbGxlcnlSZWY6IEdhbGxlcnlSZWY7XG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGl0ZW1zOiBHYWxsZXJ5SXRlbSBbXTtcbiAgQElucHV0KCkgbmF2OiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcubmF2O1xuICBASW5wdXQoKSBkb3RzOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZG90cztcbiAgQElucHV0KCkgbG9vcDogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmxvb3A7XG4gIEBJbnB1dCgpIHRodW1iOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcudGh1bWI7XG4gIEBJbnB1dCgpIHpvb21PdXQ6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnpvb21PdXQ7XG4gIEBJbnB1dCgpIGNvdW50ZXI6IGJvb2xlYW4gPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5jb3VudGVyO1xuICBASW5wdXQoKSBkb3RzU2l6ZTogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZG90c1NpemU7XG4gIEBJbnB1dCgpIGF1dG9QbGF5OiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuYXV0b1BsYXk7XG4gIEBJbnB1dCgpIGdlc3R1cmVzOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZ2VzdHVyZXM7XG4gIEBJbnB1dCgpIHRodW1iV2lkdGg6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iV2lkdGg7XG4gIEBJbnB1dCgpIHRodW1iSGVpZ2h0OiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYkhlaWdodDtcbiAgQElucHV0KCkgZGlzYWJsZVRodW1iOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZGlzYWJsZVRodW1iO1xuICBASW5wdXQoKSBwYW5TZW5zaXRpdml0eTogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcucGFuU2Vuc2l0aXZpdHk7XG4gIEBJbnB1dCgpIHBsYXllckludGVydmFsOiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5wbGF5ZXJJbnRlcnZhbDtcbiAgQElucHV0KCkgaXRlbVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+ID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuaXRlbVRlbXBsYXRlO1xuICBASW5wdXQoKSB0aHVtYlRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+ID0gdGhpcy5fZ2FsbGVyeS5jb25maWcudGh1bWJUZW1wbGF0ZTtcbiAgQElucHV0KCkgdGh1bWJNb2RlOiAnc3RyaWN0JyB8ICdmcmVlJyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iTW9kZTtcbiAgQElucHV0KCkgaW1hZ2VTaXplOiAnY292ZXInIHwgJ2NvbnRhaW4nID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuaW1hZ2VTaXplO1xuICBASW5wdXQoKSBkb3RzUG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbScgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5kb3RzUG9zaXRpb247XG4gIEBJbnB1dCgpIGNvdW50ZXJQb3NpdGlvbjogJ3RvcCcgfCAnYm90dG9tJyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmNvdW50ZXJQb3NpdGlvbjtcbiAgQElucHV0KCkgc2xpZGluZ0RpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnNsaWRpbmdEaXJlY3Rpb247XG4gIEBJbnB1dCgpIGxvYWRpbmdTdHJhdGVneTogJ3ByZWxvYWQnIHwgJ2xhenknIHwgJ2RlZmF1bHQnID0gdGhpcy5fZ2FsbGVyeS5jb25maWcubG9hZGluZ1N0cmF0ZWd5O1xuICBASW5wdXQoKSB0aHVtYlBvc2l0aW9uOiAndG9wJyB8ICdsZWZ0JyB8ICdsZWZ0LXRvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAgJ2JvdHRvbS1sZWZ0JyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iUG9zaXRpb247XG5cbiAgLy8gSW5wdXRzIHVzZWQgYnkgdGhlIGxpZ2h0Ym94XG5cbiAgLyoqIERlc3Ryb3kgZ2FsbGVyeSByZWYgb24gY29tcG9uZW50IGRlc3Ryb3kgZXZlbnQgKi9cbiAgQElucHV0KCkgZGVzdHJveVJlZiA9IHRydWU7XG5cbiAgLyoqIFNraXAgaW5pdGlhbGl6aW5nIHRoZSBjb25maWcgd2l0aCBjb21wb25lbnRzIGlucHV0cyAoTGlnaHRib3ggbW9kZSkgKi9cbiAgQElucHV0KCkgc2tpcEluaXRDb25maWcgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSB0aHVtYkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBwbGF5aW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5U3RhdGU+KCk7XG4gIEBPdXRwdXQoKSBpbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8R2FsbGVyeVN0YXRlPigpO1xuICBAT3V0cHV0KCkgaXRlbXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEdhbGxlcnlTdGF0ZT4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5RXJyb3I+KCk7XG4gIEBPdXRwdXQoKSB5b3V0dWJlSXRlbUNsaWNrRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPEVsZW1lbnRSZWY+KCk7XG5cbiAgcHJpdmF0ZSBfaXRlbUNsaWNrJDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdGh1bWJDbGljayQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2l0ZW1DaGFuZ2UkOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9pbmRleENoYW5nZSQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3BsYXlpbmdDaGFuZ2UkOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9wbGF5ZXJMaXN0ZW5lciQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIF9oZWlnaHQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9nYWxsZXJ5OiBHYWxsZXJ5KSB7XG4gIH1cblxuICBwcml2YXRlIGdldENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmF2OiB0aGlzLm5hdixcbiAgICAgIGRvdHM6IHRoaXMuZG90cyxcbiAgICAgIGxvb3A6IHRoaXMubG9vcCxcbiAgICAgIHRodW1iOiB0aGlzLnRodW1iLFxuICAgICAgem9vbU91dDogdGhpcy56b29tT3V0LFxuICAgICAgY291bnRlcjogdGhpcy5jb3VudGVyLFxuICAgICAgYXV0b1BsYXk6IHRoaXMuYXV0b1BsYXksXG4gICAgICBnZXN0dXJlczogdGhpcy5nZXN0dXJlcyxcbiAgICAgIGRvdHNTaXplOiB0aGlzLmRvdHNTaXplLFxuICAgICAgaW1hZ2VTaXplOiB0aGlzLmltYWdlU2l6ZSxcbiAgICAgIHRodW1iTW9kZTogdGhpcy50aHVtYk1vZGUsXG4gICAgICB0aHVtYldpZHRoOiB0aGlzLnRodW1iV2lkdGgsXG4gICAgICB0aHVtYkhlaWdodDogdGhpcy50aHVtYkhlaWdodCxcbiAgICAgIGRpc2FibGVUaHVtYjogdGhpcy5kaXNhYmxlVGh1bWIsXG4gICAgICBkb3RzUG9zaXRpb246IHRoaXMuZG90c1Bvc2l0aW9uLFxuICAgICAgaXRlbVRlbXBsYXRlOiB0aGlzLml0ZW1UZW1wbGF0ZSxcbiAgICAgIHRodW1iVGVtcGxhdGU6IHRoaXMudGh1bWJUZW1wbGF0ZSxcbiAgICAgIHRodW1iUG9zaXRpb246IHRoaXMudGh1bWJQb3NpdGlvbixcbiAgICAgIHBhblNlbnNpdGl2aXR5OiB0aGlzLnBhblNlbnNpdGl2aXR5LFxuICAgICAgcGxheWVySW50ZXJ2YWw6IHRoaXMucGxheWVySW50ZXJ2YWwsXG4gICAgICBjb3VudGVyUG9zaXRpb246IHRoaXMuY291bnRlclBvc2l0aW9uLFxuICAgICAgbG9hZGluZ1N0cmF0ZWd5OiB0aGlzLmxvYWRpbmdTdHJhdGVneSxcbiAgICAgIHNsaWRpbmdEaXJlY3Rpb246IHRoaXMuc2xpZGluZ0RpcmVjdGlvblxuICAgIH07XG4gIH1cblxuICBvbkFjdGlvbihpOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKGkpIHtcbiAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICB0aGlzLmdhbGxlcnlSZWYubmV4dCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ByZXYnOlxuICAgICAgICB0aGlzLmdhbGxlcnlSZWYucHJldigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZ2FsbGVyeVJlZi5zZXQoaSBhcyBudW1iZXIpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5nYWxsZXJ5UmVmKSB7XG4gICAgICB0aGlzLmdhbGxlcnlSZWYuc2V0Q29uZmlnKHRoaXMuZ2V0Q29uZmlnKCkpO1xuXG4gICAgICBpZiAoY2hhbmdlcy5pdGVtcyAmJiBjaGFuZ2VzLml0ZW1zLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5pdGVtcy5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIHRoaXMubG9hZCh0aGlzLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBHZXQgZ2FsbGVyeSBpbnN0YW5jZSBieSBpZFxuICAgIGlmICh0aGlzLnNraXBJbml0Q29uZmlnKSB7XG4gICAgICB0aGlzLmdhbGxlcnlSZWYgPSB0aGlzLl9nYWxsZXJ5LnJlZih0aGlzLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYWxsZXJ5UmVmID0gdGhpcy5fZ2FsbGVyeS5yZWYodGhpcy5pZCwgdGhpcy5nZXRDb25maWcoKSk7XG4gICAgfVxuXG4gICAgLy8gTG9hZCBnYWxsZXJ5IGl0ZW1zXG4gICAgdGhpcy5sb2FkKHRoaXMuaXRlbXMpO1xuXG4gICAgLy8gQWN0aXZhdGUgcGxheWVyIGxpc3RlbmVyXG4gICAgdGhpcy5fcGxheWVyTGlzdGVuZXIkID0gdGhpcy5nYWxsZXJ5UmVmLmFjdGl2YXRlUGxheWVyKCkuc3Vic2NyaWJlKCk7XG5cbiAgICAvLyBTdWJzY3JpYmVzIHRvIGV2ZW50cyBvbiBkZW1hbmRcbiAgICBpZiAodGhpcy5pbmRleENoYW5nZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9pbmRleENoYW5nZSQgPSB0aGlzLmdhbGxlcnlSZWYuaW5kZXhDaGFuZ2VkLnN1YnNjcmliZSgoc3RhdGU6IEdhbGxlcnlTdGF0ZSkgPT4gdGhpcy5pbmRleENoYW5nZS5lbWl0KHN0YXRlKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLml0ZW1zQ2hhbmdlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2l0ZW1DaGFuZ2UkID0gdGhpcy5nYWxsZXJ5UmVmLml0ZW1zQ2hhbmdlZC5zdWJzY3JpYmUoKHN0YXRlOiBHYWxsZXJ5U3RhdGUpID0+IHRoaXMuaXRlbXNDaGFuZ2UuZW1pdChzdGF0ZSkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wbGF5aW5nQ2hhbmdlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3BsYXlpbmdDaGFuZ2UkID0gdGhpcy5nYWxsZXJ5UmVmLnBsYXlpbmdDaGFuZ2VkLnN1YnNjcmliZSgoc3RhdGU6IEdhbGxlcnlTdGF0ZSkgPT4gdGhpcy5wbGF5aW5nQ2hhbmdlLmVtaXQoc3RhdGUpKTtcbiAgICB9XG5cbiAgICAvLyBTdGFydCBwbGF5aW5nIGlmIGF1dG8tcGxheSBpcyBzZXQgdG8gdHJ1ZVxuICAgIGlmICh0aGlzLmF1dG9QbGF5KSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9pdGVtQ2xpY2skLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdGh1bWJDbGljayQudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pdGVtQ2hhbmdlJC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2luZGV4Q2hhbmdlJC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3BsYXlpbmdDaGFuZ2UkLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcGxheWVyTGlzdGVuZXIkLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuZGVzdHJveVJlZikge1xuICAgICAgdGhpcy5nYWxsZXJ5UmVmLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBvbkl0ZW1DbGljayhpOiBudW1iZXIpIHtcbiAgICB0aGlzLml0ZW1DbGljay5lbWl0KGkpO1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5pdGVtQ2xpY2submV4dChpKTtcbiAgfVxuXG4gIG9uVGh1bWJDbGljayhpOiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYuc2V0KGkpO1xuICAgIHRoaXMudGh1bWJDbGljay5lbWl0KGkpO1xuICAgIHRoaXMuZ2FsbGVyeVJlZi50aHVtYkNsaWNrLm5leHQoaSk7XG4gIH1cblxuICBvbkVycm9yKGVycjogR2FsbGVyeUVycm9yKSB7XG4gICAgdGhpcy5lcnJvci5lbWl0KGVycik7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLmVycm9yLm5leHQoZXJyKTtcbiAgfVxuXG4gIGxvYWQoaXRlbXM6IEdhbGxlcnlJdGVtW10pIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYubG9hZChpdGVtcyk7XG4gIH1cblxuICBhZGQoaXRlbTogR2FsbGVyeUl0ZW0sIGFjdGl2ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYuYWRkKGl0ZW0sIGFjdGl2ZSk7XG4gIH1cblxuICBhZGRJbWFnZShkYXRhOiBJbWFnZUl0ZW1EYXRhLCBhY3RpdmU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5hZGQobmV3IEltYWdlSXRlbShkYXRhKSwgYWN0aXZlKTtcbiAgfVxuXG4gIGFkZFZpZGVvKGRhdGE6IFZpZGVvSXRlbURhdGEsIGFjdGl2ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFkZChuZXcgVmlkZW9JdGVtKGRhdGEpLCBhY3RpdmUpO1xuICB9XG5cbiAgYWRkSWZyYW1lKGRhdGE6IElmcmFtZUl0ZW1EYXRhLCBhY3RpdmU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5hZGQobmV3IElmcmFtZUl0ZW0oZGF0YSksIGFjdGl2ZSk7XG4gIH1cblxuICBhZGRZb3V0dWJlKGRhdGE6IFlvdXR1YmVJdGVtRGF0YSwgYWN0aXZlPzogYm9vbGVhbikge1xuICAgIHRoaXMuYWRkKG5ldyBZb3V0dWJlSXRlbShkYXRhKSwgYWN0aXZlKTtcbiAgfVxuXG4gIHJlbW92ZShpOiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucmVtb3ZlKGkpO1xuICB9XG5cbiAgbmV4dCgpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYubmV4dCgpO1xuICB9XG5cbiAgcHJldigpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucHJldigpO1xuICB9XG5cbiAgc2V0KGk6IG51bWJlcikge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5zZXQoaSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucmVzZXQoKTtcbiAgfVxuXG4gIHBsYXkoaW50ZXJ2YWw/OiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucGxheShpbnRlcnZhbCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5zdG9wKCk7XG4gIH1cblxuICB3aXRoSGVpZ2h0KGhlaWdodDogbnVtYmVyKSB7XG4gICAgdGhpcy5faGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcbiAgfVxuXG4gIGdldCBoZWlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnc3R5bGUuaGVpZ2h0JykgZ2V0IGFwcGx5SGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgfVxufVxuIl19