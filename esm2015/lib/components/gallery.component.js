import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
    error: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvY29tcG9uZW50cy9nYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBTU4sWUFBWSxFQUNaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFvQixNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHdEQsT0FBTyxFQUNMLFVBQVUsRUFFVixTQUFTLEVBRVQsU0FBUyxFQUVULFdBQVcsRUFFWixNQUFNLHlCQUF5QixDQUFDO0FBZ0JqQyxNQUFNLE9BQU8sZ0JBQWdCO0lBbUQzQixZQUFvQixRQUFpQjtRQUFqQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBOUM1QixRQUFHLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3hDLFNBQUksR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUMsU0FBSSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMxQyxVQUFLLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzVDLFlBQU8sR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDL0MsWUFBTyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNoRCxhQUFRLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2pELGFBQVEsR0FBWSxJQUFJLENBQUMs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bnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uTGlrZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgR2FsbGVyeSB9IGZyb20gJy4uL3NlcnZpY2VzL2dhbGxlcnkuc2VydmljZSc7XG5pbXBvcnQgeyBHYWxsZXJ5UmVmIH0gZnJvbSAnLi4vc2VydmljZXMvZ2FsbGVyeS1yZWYnO1xuaW1wb3J0IHsgR2FsbGVyeUVycm9yLCBHYWxsZXJ5SXRlbSwgR2FsbGVyeVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2dhbGxlcnkubW9kZWwnO1xuaW1wb3J0IHtcbiAgSWZyYW1lSXRlbSxcbiAgSWZyYW1lSXRlbURhdGEsXG4gIEltYWdlSXRlbSxcbiAgSW1hZ2VJdGVtRGF0YSxcbiAgVmlkZW9JdGVtLFxuICBWaWRlb0l0ZW1EYXRhLFxuICBZb3V0dWJlSXRlbSxcbiAgWW91dHViZUl0ZW1EYXRhXG59IGZyb20gJy4vdGVtcGxhdGVzL2l0ZW1zLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZVVybHM6IFsnLi4vc3R5bGVzL2dhbGxlcnkuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxnYWxsZXJ5LWNvcmUgW3N0YXRlXT1cImdhbGxlcnlSZWYuc3RhdGUgfCBhc3luY1wiXG4gICAgICAgICAgICAgICAgICBbY29uZmlnXT1cImdhbGxlcnlSZWYuY29uZmlnIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgKGFjdGlvbik9XCJvbkFjdGlvbigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIChpdGVtQ2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAodGh1bWJDbGljayk9XCJvblRodW1iQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAoZXJyb3IpPVwib25FcnJvcigkZXZlbnQpXCI+PC9nYWxsZXJ5LWNvcmU+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBnYWxsZXJ5UmVmOiBHYWxsZXJ5UmVmO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBpdGVtczogR2FsbGVyeUl0ZW0gW107XG4gIEBJbnB1dCgpIG5hdjogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLm5hdjtcbiAgQElucHV0KCkgZG90czogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmRvdHM7XG4gIEBJbnB1dCgpIGxvb3A6IGJvb2xlYW4gPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5sb29wO1xuICBASW5wdXQoKSB0aHVtYjogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iO1xuICBASW5wdXQoKSB6b29tT3V0OiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy56b29tT3V0O1xuICBASW5wdXQoKSBjb3VudGVyOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuY291bnRlcjtcbiAgQElucHV0KCkgZG90c1NpemU6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmRvdHNTaXplO1xuICBASW5wdXQoKSBhdXRvUGxheTogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmF1dG9QbGF5O1xuICBASW5wdXQoKSBnZXN0dXJlczogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmdlc3R1cmVzO1xuICBASW5wdXQoKSB0aHVtYldpZHRoOiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYldpZHRoO1xuICBASW5wdXQoKSB0aHVtYkhlaWdodDogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcudGh1bWJIZWlnaHQ7XG4gIEBJbnB1dCgpIGRpc2FibGVUaHVtYjogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmRpc2FibGVUaHVtYjtcbiAgQElucHV0KCkgcGFuU2Vuc2l0aXZpdHk6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnBhblNlbnNpdGl2aXR5O1xuICBASW5wdXQoKSBwbGF5ZXJJbnRlcnZhbDogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcucGxheWVySW50ZXJ2YWw7XG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLml0ZW1UZW1wbGF0ZTtcbiAgQElucHV0KCkgdGh1bWJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iVGVtcGxhdGU7XG4gIEBJbnB1dCgpIHRodW1iTW9kZTogJ3N0cmljdCcgfCAnZnJlZScgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYk1vZGU7XG4gIEBJbnB1dCgpIGltYWdlU2l6ZTogJ2NvdmVyJyB8ICdjb250YWluJyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmltYWdlU2l6ZTtcbiAgQElucHV0KCkgZG90c1Bvc2l0aW9uOiAndG9wJyB8ICdib3R0b20nID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZG90c1Bvc2l0aW9uO1xuICBASW5wdXQoKSBjb3VudGVyUG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbScgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5jb3VudGVyUG9zaXRpb247XG4gIEBJbnB1dCgpIHNsaWRpbmdEaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5zbGlkaW5nRGlyZWN0aW9uO1xuICBASW5wdXQoKSBsb2FkaW5nU3RyYXRlZ3k6ICdwcmVsb2FkJyB8ICdsYXp5JyB8ICdkZWZhdWx0JyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmxvYWRpbmdTdHJhdGVneTtcbiAgQElucHV0KCkgdGh1bWJQb3NpdGlvbjogJ3RvcCcgfCAnbGVmdCcgfCAnbGVmdC10b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgICdib3R0b20tbGVmdCcgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYlBvc2l0aW9uO1xuXG4gIC8vIElucHV0cyB1c2VkIGJ5IHRoZSBsaWdodGJveFxuXG4gIC8qKiBEZXN0cm95IGdhbGxlcnkgcmVmIG9uIGNvbXBvbmVudCBkZXN0cm95IGV2ZW50ICovXG4gIEBJbnB1dCgpIGRlc3Ryb3lSZWYgPSB0cnVlO1xuXG4gIC8qKiBTa2lwIGluaXRpYWxpemluZyB0aGUgY29uZmlnIHdpdGggY29tcG9uZW50cyBpbnB1dHMgKExpZ2h0Ym94IG1vZGUpICovXG4gIEBJbnB1dCgpIHNraXBJbml0Q29uZmlnID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGl0ZW1DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgdGh1bWJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICBAT3V0cHV0KCkgcGxheWluZ0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8R2FsbGVyeVN0YXRlPigpO1xuICBAT3V0cHV0KCkgaW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEdhbGxlcnlTdGF0ZT4oKTtcbiAgQE91dHB1dCgpIGl0ZW1zQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5U3RhdGU+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8R2FsbGVyeUVycm9yPigpO1xuXG4gIHByaXZhdGUgX2l0ZW1DbGljayQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3RodW1iQ2xpY2skOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9pdGVtQ2hhbmdlJDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaW5kZXhDaGFuZ2UkOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9wbGF5aW5nQ2hhbmdlJDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfcGxheWVyTGlzdGVuZXIkOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2dhbGxlcnk6IEdhbGxlcnkpIHtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29uZmlnKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYXY6IHRoaXMubmF2LFxuICAgICAgZG90czogdGhpcy5kb3RzLFxuICAgICAgbG9vcDogdGhpcy5sb29wLFxuICAgICAgdGh1bWI6IHRoaXMudGh1bWIsXG4gICAgICB6b29tT3V0OiB0aGlzLnpvb21PdXQsXG4gICAgICBjb3VudGVyOiB0aGlzLmNvdW50ZXIsXG4gICAgICBhdXRvUGxheTogdGhpcy5hdXRvUGxheSxcbiAgICAgIGdlc3R1cmVzOiB0aGlzLmdlc3R1cmVzLFxuICAgICAgZG90c1NpemU6IHRoaXMuZG90c1NpemUsXG4gICAgICBpbWFnZVNpemU6IHRoaXMuaW1hZ2VTaXplLFxuICAgICAgdGh1bWJNb2RlOiB0aGlzLnRodW1iTW9kZSxcbiAgICAgIHRodW1iV2lkdGg6IHRoaXMudGh1bWJXaWR0aCxcbiAgICAgIHRodW1iSGVpZ2h0OiB0aGlzLnRodW1iSGVpZ2h0LFxuICAgICAgZGlzYWJsZVRodW1iOiB0aGlzLmRpc2FibGVUaHVtYixcbiAgICAgIGRvdHNQb3NpdGlvbjogdGhpcy5kb3RzUG9zaXRpb24sXG4gICAgICBpdGVtVGVtcGxhdGU6IHRoaXMuaXRlbVRlbXBsYXRlLFxuICAgICAgdGh1bWJUZW1wbGF0ZTogdGhpcy50aHVtYlRlbXBsYXRlLFxuICAgICAgdGh1bWJQb3NpdGlvbjogdGhpcy50aHVtYlBvc2l0aW9uLFxuICAgICAgcGFuU2Vuc2l0aXZpdHk6IHRoaXMucGFuU2Vuc2l0aXZpdHksXG4gICAgICBwbGF5ZXJJbnRlcnZhbDogdGhpcy5wbGF5ZXJJbnRlcnZhbCxcbiAgICAgIGNvdW50ZXJQb3NpdGlvbjogdGhpcy5jb3VudGVyUG9zaXRpb24sXG4gICAgICBsb2FkaW5nU3RyYXRlZ3k6IHRoaXMubG9hZGluZ1N0cmF0ZWd5LFxuICAgICAgc2xpZGluZ0RpcmVjdGlvbjogdGhpcy5zbGlkaW5nRGlyZWN0aW9uXG4gICAgfTtcbiAgfVxuXG4gIG9uQWN0aW9uKGk6IHN0cmluZyB8IG51bWJlcikge1xuICAgIHN3aXRjaCAoaSkge1xuICAgICAgY2FzZSAnbmV4dCc6XG4gICAgICAgIHRoaXMuZ2FsbGVyeVJlZi5uZXh0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJldic6XG4gICAgICAgIHRoaXMuZ2FsbGVyeVJlZi5wcmV2KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5nYWxsZXJ5UmVmLnNldChpIGFzIG51bWJlcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLmdhbGxlcnlSZWYpIHtcbiAgICAgIHRoaXMuZ2FsbGVyeVJlZi5zZXRDb25maWcodGhpcy5nZXRDb25maWcoKSk7XG5cbiAgICAgIGlmIChjaGFuZ2VzLml0ZW1zICYmIGNoYW5nZXMuaXRlbXMuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLml0ZW1zLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgdGhpcy5sb2FkKHRoaXMuaXRlbXMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIEdldCBnYWxsZXJ5IGluc3RhbmNlIGJ5IGlkXG4gICAgaWYgKHRoaXMuc2tpcEluaXRDb25maWcpIHtcbiAgICAgIHRoaXMuZ2FsbGVyeVJlZiA9IHRoaXMuX2dhbGxlcnkucmVmKHRoaXMuaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdhbGxlcnlSZWYgPSB0aGlzLl9nYWxsZXJ5LnJlZih0aGlzLmlkLCB0aGlzLmdldENvbmZpZygpKTtcbiAgICB9XG5cbiAgICAvLyBMb2FkIGdhbGxlcnkgaXRlbXNcbiAgICB0aGlzLmxvYWQodGhpcy5pdGVtcyk7XG5cbiAgICAvLyBBY3RpdmF0ZSBwbGF5ZXIgbGlzdGVuZXJcbiAgICB0aGlzLl9wbGF5ZXJMaXN0ZW5lciQgPSB0aGlzLmdhbGxlcnlSZWYuYWN0aXZhdGVQbGF5ZXIoKS5zdWJzY3JpYmUoKTtcblxuICAgIC8vIFN1YnNjcmliZXMgdG8gZXZlbnRzIG9uIGRlbWFuZFxuICAgIGlmICh0aGlzLmluZGV4Q2hhbmdlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2luZGV4Q2hhbmdlJCA9IHRoaXMuZ2FsbGVyeVJlZi5pbmRleENoYW5nZWQuc3Vic2NyaWJlKChzdGF0ZTogR2FsbGVyeVN0YXRlKSA9PiB0aGlzLmluZGV4Q2hhbmdlLmVtaXQoc3RhdGUpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXRlbXNDaGFuZ2Uub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5faXRlbUNoYW5nZSQgPSB0aGlzLmdhbGxlcnlSZWYuaXRlbXNDaGFuZ2VkLnN1YnNjcmliZSgoc3RhdGU6IEdhbGxlcnlTdGF0ZSkgPT4gdGhpcy5pdGVtc0NoYW5nZS5lbWl0KHN0YXRlKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLnBsYXlpbmdDaGFuZ2Uub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5fcGxheWluZ0NoYW5nZSQgPSB0aGlzLmdhbGxlcnlSZWYucGxheWluZ0NoYW5nZWQuc3Vic2NyaWJlKChzdGF0ZTogR2FsbGVyeVN0YXRlKSA9PiB0aGlzLnBsYXlpbmdDaGFuZ2UuZW1pdChzdGF0ZSkpO1xuICAgIH1cblxuICAgIC8vIFN0YXJ0IHBsYXlpbmcgaWYgYXV0by1wbGF5IGlzIHNldCB0byB0cnVlXG4gICAgaWYgKHRoaXMuYXV0b1BsYXkpIHtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuX2l0ZW1DbGljayQudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl90aHVtYkNsaWNrJC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2l0ZW1DaGFuZ2UkLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faW5kZXhDaGFuZ2UkLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcGxheWluZ0NoYW5nZSQudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9wbGF5ZXJMaXN0ZW5lciQudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5kZXN0cm95UmVmKSB7XG4gICAgICB0aGlzLmdhbGxlcnlSZWYuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIG9uSXRlbUNsaWNrKGk6IG51bWJlcikge1xuICAgIHRoaXMuaXRlbUNsaWNrLmVtaXQoaSk7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLml0ZW1DbGljay5uZXh0KGkpO1xuICB9XG5cbiAgb25UaHVtYkNsaWNrKGk6IG51bWJlcikge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5zZXQoaSk7XG4gICAgdGhpcy50aHVtYkNsaWNrLmVtaXQoaSk7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLnRodW1iQ2xpY2submV4dChpKTtcbiAgfVxuXG4gIG9uRXJyb3IoZXJyOiBHYWxsZXJ5RXJyb3IpIHtcbiAgICB0aGlzLmVycm9yLmVtaXQoZXJyKTtcbiAgICB0aGlzLmdhbGxlcnlSZWYuZXJyb3IubmV4dChlcnIpO1xuICB9XG5cbiAgbG9hZChpdGVtczogR2FsbGVyeUl0ZW1bXSkge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5sb2FkKGl0ZW1zKTtcbiAgfVxuXG4gIGFkZChpdGVtOiBHYWxsZXJ5SXRlbSwgYWN0aXZlPzogYm9vbGVhbikge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5hZGQoaXRlbSwgYWN0aXZlKTtcbiAgfVxuXG4gIGFkZEltYWdlKGRhdGE6IEltYWdlSXRlbURhdGEsIGFjdGl2ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFkZChuZXcgSW1hZ2VJdGVtKGRhdGEpLCBhY3RpdmUpO1xuICB9XG5cbiAgYWRkVmlkZW8oZGF0YTogVmlkZW9JdGVtRGF0YSwgYWN0aXZlPzogYm9vbGVhbikge1xuICAgIHRoaXMuYWRkKG5ldyBWaWRlb0l0ZW0oZGF0YSksIGFjdGl2ZSk7XG4gIH1cblxuICBhZGRJZnJhbWUoZGF0YTogSWZyYW1lSXRlbURhdGEsIGFjdGl2ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFkZChuZXcgSWZyYW1lSXRlbShkYXRhKSwgYWN0aXZlKTtcbiAgfVxuXG4gIGFkZFlvdXR1YmUoZGF0YTogWW91dHViZUl0ZW1EYXRhLCBhY3RpdmU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5hZGQobmV3IFlvdXR1YmVJdGVtKGRhdGEpLCBhY3RpdmUpO1xuICB9XG5cbiAgcmVtb3ZlKGk6IG51bWJlcikge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5yZW1vdmUoaSk7XG4gIH1cblxuICBuZXh0KCkge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5uZXh0KCk7XG4gIH1cblxuICBwcmV2KCkge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5wcmV2KCk7XG4gIH1cblxuICBzZXQoaTogbnVtYmVyKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLnNldChpKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5yZXNldCgpO1xuICB9XG5cbiAgcGxheShpbnRlcnZhbD86IG51bWJlcikge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5wbGF5KGludGVydmFsKTtcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLnN0b3AoKTtcbiAgfVxufVxuIl19