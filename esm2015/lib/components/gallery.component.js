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
                styles: ["::ng-deep gallery-core[dotsPosition=top] gallery-dots{top:0}::ng-deep gallery-core[dotsPosition=bottom] gallery-dots{bottom:0}::ng-deep gallery-dots{left:50%;margin:7px;position:absolute;transform:translateX(-50%)}::ng-deep .g-dot{cursor:pointer;z-index:20}::ng-deep .g-dot:hover .g-dot-inner{opacity:1}::ng-deep .g-dot-active .g-dot-inner{opacity:1;transform:scale(1.5)!important}::ng-deep .g-dot-inner{background-color:#fff;border-radius:50%;box-shadow:0 0 1px #000;height:30%;opacity:.6;transition:all .2s ease;width:30%}::ng-deep .g-dot,::ng-deep .g-dot-inner,::ng-deep gallery-dots{align-items:center;display:flex;justify-content:center}::ng-deep .g-nav-next,::ng-deep .g-nav-prev{cursor:pointer;height:40px;position:absolute;top:50%;width:30px;z-index:999}::ng-deep .g-nav-next{right:.5em;transform:translateY(-50%) perspective(1px)}::ng-deep .g-nav-prev{left:.5em;transform:translateY(-50%) perspective(1px) scale(-1)}@media only screen and (max-width:480px){::ng-deep .g-nav-next{right:.2em}::ng-deep .g-nav-prev{left:.2em}}::ng-deep .g-items-container{height:100%}::ng-deep .g-slider{position:absolute;transition:transform .4s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-core[slidingDirection=horizontal] .g-slider{flex-direction:row}::ng-deep gallery-core[slidingDirection=vertical] .g-slider{flex-direction:column}::ng-deep gallery-thumbs{display:block;overflow:unset;z-index:1}::ng-deep .g-thumbs-container{display:flex;height:100%;left:0;overflow:unset;position:relative;top:0;width:100%;z-index:206}::ng-deep gallery-core[disableThumb=true] gallery-thumb{cursor:default}::ng-deep gallery-core[thumbPosition=bottom] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=top] gallery-thumbs .g-slider{flex-direction:row;left:50%;top:0}::ng-deep gallery-core[thumbPosition=bottom] gallery-thumb,::ng-deep gallery-core[thumbPosition=top] gallery-thumb{padding:1px 0 1px 1px}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=left] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=right] gallery-thumbs .g-slider{flex-direction:column;left:0;top:50%}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumb,::ng-deep gallery-core[thumbPosition=left] gallery-thumb,::ng-deep gallery-core[thumbPosition=right] gallery-thumb{padding:0 1px 1px}::ng-deep gallery-core[thumbPosition=top]{flex-direction:column}::ng-deep gallery-core[thumbPosition=left-top],::ng-deep gallery-core[thumbPosition=left]{flex-direction:row}::ng-deep gallery-core[thumbPosition=right]{flex-direction:row-reverse}::ng-deep gallery-core[thumbPosition=bottom]{flex-direction:column-reverse}::ng-deep gallery-thumb.g-active-thumb .g-thumb-loading{background-color:#464646}::ng-deep .g-thumb-loading{background-color:#262626;height:100%;overflow:hidden;position:relative}::ng-deep .g-thumb-loading:before{-webkit-animation:phAnimation .8s linear infinite;animation:phAnimation .8s linear infinite;background:linear-gradient(90deg,hsla(0,0%,100%,0) 46%,hsla(0,0%,100%,.35) 50%,hsla(0,0%,100%,0) 54%) 50% 50%;bottom:0;content:\"\";left:50%;margin-left:-250%;position:absolute;right:0;top:0;width:500%;z-index:1}@-webkit-keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}@keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}::ng-deep gallery-core[counterPosition=top] .g-counter{border-bottom-left-radius:4px;border-bottom-right-radius:4px;top:0}::ng-deep gallery-core[counterPosition=bottom] .g-counter{border-top-left-radius:4px;border-top-right-radius:4px;bottom:0}::ng-deep .g-counter{background-color:rgba(0,0,0,.5);color:#fff;font-size:12px;left:50%;padding:4px 10px;position:absolute;transform:translateX(-50%) perspective(1px);z-index:50}::ng-deep gallery[gallerize] gallery-item{cursor:pointer}::ng-deep gallery-item,::ng-deep gallery-thumb{display:block;height:100%;overflow:hidden;position:relative;width:100%}::ng-deep gallery-item h2,::ng-deep gallery-item h4,::ng-deep gallery-thumb h2,::ng-deep gallery-thumb h4{color:coral;margin:0}::ng-deep gallery-item h2,::ng-deep gallery-thumb h2{font-size:3.5em;margin-bottom:.3em}::ng-deep gallery-item h4,::ng-deep gallery-thumb h4{font-size:1.6em}::ng-deep gallery-item{z-index:10}::ng-deep gallery-item iframe,::ng-deep gallery-item video{height:100%;position:absolute;width:100%}::ng-deep gallery-thumb{cursor:pointer;opacity:.5;transition:opacity .3s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-thumb.g-active-thumb{opacity:1}::ng-deep .g-image-item{background-position:50%;background-repeat:no-repeat;background-size:cover;height:100%;width:100%}::ng-deep .g-image-error-message,::ng-deep .g-template{align-items:center;bottom:0;color:#fff;display:flex;flex-direction:column;justify-content:center;left:0;position:absolute;right:0;top:0;z-index:10}::ng-deep .g-loading{height:80px;left:50%;position:absolute;top:50%;transform:translate3d(-50%,-50%,0);width:80px}::ng-deep gallery-core[imageSize=contain] gallery-slider .g-image-item{background-size:contain}::ng-deep gallery-image{align-items:center;display:flex;height:100%;justify-content:center}::ng-deep gallery{background-color:#000;display:block;height:500px;overflow:hidden;position:relative;z-index:1}::ng-deep gallery *{box-sizing:border-box}::ng-deep gallery,::ng-deep gallery-core{overflow:hidden;position:relative}::ng-deep .g-box,::ng-deep .g-slider,::ng-deep gallery-core{display:flex;height:100%;width:100%}::ng-deep gallery[fluid]{left:50%;transform:translateX(-50vw);width:100vw}::ng-deep gallery[fluid][fluid=false]{left:auto;transform:none;width:auto}::ng-deep .g-no-transition{transition:unset!important}::ng-deep .g-box,::ng-deep gallery-slider{display:flex;flex:1;flex-direction:column;height:100%;order:1;overflow:hidden;position:relative}::ng-deep .g-btn-close svg,::ng-deep gallery-nav svg{-webkit-filter:drop-shadow(0 0 1px #000);filter:drop-shadow(0 0 1px black);height:100%;opacity:.6;transition:opacity .2s linear;width:100%}::ng-deep .g-btn-close svg:hover,::ng-deep gallery-nav svg:hover{opacity:1}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvY29tcG9uZW50cy9nYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBTU4sWUFBWSxFQUNaLHVCQUF1QixFQUN4QixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFvQixNQUFNLE1BQU0sQ0FBQztBQUN0RCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFHdEQsT0FBTyxFQUNMLFVBQVUsRUFFVixTQUFTLEVBRVQsU0FBUyxFQUVULFdBQVcsRUFFWixNQUFNLHlCQUF5QixDQUFDO0FBZ0JqQyxNQUFNLE9BQU8sZ0JBQWdCO0lBbUQzQixZQUFvQixRQUFpQjtRQUFqQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBOUM1QixRQUFHLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3hDLFNBQUksR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUMsU0FBSSxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUMxQyxVQUFLLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQzVDLFlBQU8sR0FBVyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDL0MsWUFBTyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNoRCxhQUFRLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2pELGFBQVEsR0FBWSxJQUFJLENBQUMs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bnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBPbkluaXQsXG4gIE9uQ2hhbmdlcyxcbiAgT25EZXN0cm95LFxuICBTaW1wbGVDaGFuZ2VzLFxuICBUZW1wbGF0ZVJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneVxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uTGlrZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgR2FsbGVyeSB9IGZyb20gJy4uL3NlcnZpY2VzL2dhbGxlcnkuc2VydmljZSc7XG5pbXBvcnQgeyBHYWxsZXJ5UmVmIH0gZnJvbSAnLi4vc2VydmljZXMvZ2FsbGVyeS1yZWYnO1xuaW1wb3J0IHsgR2FsbGVyeUVycm9yLCBHYWxsZXJ5SXRlbSwgR2FsbGVyeVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2dhbGxlcnkubW9kZWwnO1xuaW1wb3J0IHtcbiAgSWZyYW1lSXRlbSxcbiAgSWZyYW1lSXRlbURhdGEsXG4gIEltYWdlSXRlbSxcbiAgSW1hZ2VJdGVtRGF0YSxcbiAgVmlkZW9JdGVtLFxuICBWaWRlb0l0ZW1EYXRhLFxuICBZb3V0dWJlSXRlbSxcbiAgWW91dHViZUl0ZW1EYXRhXG59IGZyb20gJy4vdGVtcGxhdGVzL2l0ZW1zLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZVVybHM6IFsnLi4vc3R5bGVzL2dhbGxlcnkuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxnYWxsZXJ5LWNvcmUgW3N0YXRlXT1cImdhbGxlcnlSZWYuc3RhdGUgfCBhc3luY1wiXG4gICAgICAgICAgICAgICAgICBbY29uZmlnXT1cImdhbGxlcnlSZWYuY29uZmlnIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgKGFjdGlvbik9XCJvbkFjdGlvbigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIChpdGVtQ2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAodGh1bWJDbGljayk9XCJvblRodW1iQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAoZXJyb3IpPVwib25FcnJvcigkZXZlbnQpXCI+PC9nYWxsZXJ5LWNvcmU+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBnYWxsZXJ5UmVmOiBHYWxsZXJ5UmVmO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBpdGVtczogR2FsbGVyeUl0ZW0gW107XG4gIEBJbnB1dCgpIG5hdjogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLm5hdjtcbiAgQElucHV0KCkgZG90czogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmRvdHM7XG4gIEBJbnB1dCgpIGxvb3A6IGJvb2xlYW4gPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5sb29wO1xuICBASW5wdXQoKSB0aHVtYjogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iO1xuICBASW5wdXQoKSB6b29tT3V0OiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy56b29tT3V0O1xuICBASW5wdXQoKSBjb3VudGVyOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuY291bnRlcjtcbiAgQElucHV0KCkgZG90c1NpemU6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmRvdHNTaXplO1xuICBASW5wdXQoKSBhdXRvUGxheTogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmF1dG9QbGF5O1xuICBASW5wdXQoKSBnZXN0dXJlczogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmdlc3R1cmVzO1xuICBASW5wdXQoKSB0aHVtYldpZHRoOiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYldpZHRoO1xuICBASW5wdXQoKSB0aHVtYkhlaWdodDogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcudGh1bWJIZWlnaHQ7XG4gIEBJbnB1dCgpIGRpc2FibGVUaHVtYjogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmRpc2FibGVUaHVtYjtcbiAgQElucHV0KCkgcGFuU2Vuc2l0aXZpdHk6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnBhblNlbnNpdGl2aXR5O1xuICBASW5wdXQoKSBwbGF5ZXJJbnRlcnZhbDogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcucGxheWVySW50ZXJ2YWw7XG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLml0ZW1UZW1wbGF0ZTtcbiAgQElucHV0KCkgdGh1bWJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iVGVtcGxhdGU7XG4gIEBJbnB1dCgpIHRodW1iTW9kZTogJ3N0cmljdCcgfCAnZnJlZScgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYk1vZGU7XG4gIEBJbnB1dCgpIGltYWdlU2l6ZTogJ2NvdmVyJyB8ICdjb250YWluJyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmltYWdlU2l6ZTtcbiAgQElucHV0KCkgZG90c1Bvc2l0aW9uOiAndG9wJyB8ICdib3R0b20nID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZG90c1Bvc2l0aW9uO1xuICBASW5wdXQoKSBjb3VudGVyUG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbScgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5jb3VudGVyUG9zaXRpb247XG4gIEBJbnB1dCgpIHNsaWRpbmdEaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5zbGlkaW5nRGlyZWN0aW9uO1xuICBASW5wdXQoKSBsb2FkaW5nU3RyYXRlZ3k6ICdwcmVsb2FkJyB8ICdsYXp5JyB8ICdkZWZhdWx0JyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmxvYWRpbmdTdHJhdGVneTtcbiAgQElucHV0KCkgdGh1bWJQb3NpdGlvbjogJ3RvcCcgfCAnbGVmdCcgfCAnbGVmdC10b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nID0gdGhpcy5fZ2FsbGVyeS5jb25maWcudGh1bWJQb3NpdGlvbjtcblxuICAvLyBJbnB1dHMgdXNlZCBieSB0aGUgbGlnaHRib3hcblxuICAvKiogRGVzdHJveSBnYWxsZXJ5IHJlZiBvbiBjb21wb25lbnQgZGVzdHJveSBldmVudCAqL1xuICBASW5wdXQoKSBkZXN0cm95UmVmID0gdHJ1ZTtcblxuICAvKiogU2tpcCBpbml0aWFsaXppbmcgdGhlIGNvbmZpZyB3aXRoIGNvbXBvbmVudHMgaW5wdXRzIChMaWdodGJveCBtb2RlKSAqL1xuICBASW5wdXQoKSBza2lwSW5pdENvbmZpZyA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBpdGVtQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHRodW1iQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHBsYXlpbmdDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEdhbGxlcnlTdGF0ZT4oKTtcbiAgQE91dHB1dCgpIGluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5U3RhdGU+KCk7XG4gIEBPdXRwdXQoKSBpdGVtc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8R2FsbGVyeVN0YXRlPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEdhbGxlcnlFcnJvcj4oKTtcblxuICBwcml2YXRlIF9pdGVtQ2xpY2skOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF90aHVtYkNsaWNrJDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaXRlbUNoYW5nZSQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2luZGV4Q2hhbmdlJDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfcGxheWluZ0NoYW5nZSQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3BsYXllckxpc3RlbmVyJDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9nYWxsZXJ5OiBHYWxsZXJ5KSB7XG4gIH1cblxuICBwcml2YXRlIGdldENvbmZpZygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmF2OiB0aGlzLm5hdixcbiAgICAgIGRvdHM6IHRoaXMuZG90cyxcbiAgICAgIGxvb3A6IHRoaXMubG9vcCxcbiAgICAgIHRodW1iOiB0aGlzLnRodW1iLFxuICAgICAgem9vbU91dDogdGhpcy56b29tT3V0LFxuICAgICAgY291bnRlcjogdGhpcy5jb3VudGVyLFxuICAgICAgYXV0b1BsYXk6IHRoaXMuYXV0b1BsYXksXG4gICAgICBnZXN0dXJlczogdGhpcy5nZXN0dXJlcyxcbiAgICAgIGRvdHNTaXplOiB0aGlzLmRvdHNTaXplLFxuICAgICAgaW1hZ2VTaXplOiB0aGlzLmltYWdlU2l6ZSxcbiAgICAgIHRodW1iTW9kZTogdGhpcy50aHVtYk1vZGUsXG4gICAgICB0aHVtYldpZHRoOiB0aGlzLnRodW1iV2lkdGgsXG4gICAgICB0aHVtYkhlaWdodDogdGhpcy50aHVtYkhlaWdodCxcbiAgICAgIGRpc2FibGVUaHVtYjogdGhpcy5kaXNhYmxlVGh1bWIsXG4gICAgICBkb3RzUG9zaXRpb246IHRoaXMuZG90c1Bvc2l0aW9uLFxuICAgICAgaXRlbVRlbXBsYXRlOiB0aGlzLml0ZW1UZW1wbGF0ZSxcbiAgICAgIHRodW1iVGVtcGxhdGU6IHRoaXMudGh1bWJUZW1wbGF0ZSxcbiAgICAgIHRodW1iUG9zaXRpb246IHRoaXMudGh1bWJQb3NpdGlvbixcbiAgICAgIHBhblNlbnNpdGl2aXR5OiB0aGlzLnBhblNlbnNpdGl2aXR5LFxuICAgICAgcGxheWVySW50ZXJ2YWw6IHRoaXMucGxheWVySW50ZXJ2YWwsXG4gICAgICBjb3VudGVyUG9zaXRpb246IHRoaXMuY291bnRlclBvc2l0aW9uLFxuICAgICAgbG9hZGluZ1N0cmF0ZWd5OiB0aGlzLmxvYWRpbmdTdHJhdGVneSxcbiAgICAgIHNsaWRpbmdEaXJlY3Rpb246IHRoaXMuc2xpZGluZ0RpcmVjdGlvblxuICAgIH07XG4gIH1cblxuICBvbkFjdGlvbihpOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICBzd2l0Y2ggKGkpIHtcbiAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICB0aGlzLmdhbGxlcnlSZWYubmV4dCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3ByZXYnOlxuICAgICAgICB0aGlzLmdhbGxlcnlSZWYucHJldigpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuZ2FsbGVyeVJlZi5zZXQoaSBhcyBudW1iZXIpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5nYWxsZXJ5UmVmKSB7XG4gICAgICB0aGlzLmdhbGxlcnlSZWYuc2V0Q29uZmlnKHRoaXMuZ2V0Q29uZmlnKCkpO1xuXG4gICAgICBpZiAoY2hhbmdlcy5pdGVtcyAmJiBjaGFuZ2VzLml0ZW1zLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5pdGVtcy5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIHRoaXMubG9hZCh0aGlzLml0ZW1zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBHZXQgZ2FsbGVyeSBpbnN0YW5jZSBieSBpZFxuICAgIGlmICh0aGlzLnNraXBJbml0Q29uZmlnKSB7XG4gICAgICB0aGlzLmdhbGxlcnlSZWYgPSB0aGlzLl9nYWxsZXJ5LnJlZih0aGlzLmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nYWxsZXJ5UmVmID0gdGhpcy5fZ2FsbGVyeS5yZWYodGhpcy5pZCwgdGhpcy5nZXRDb25maWcoKSk7XG4gICAgfVxuXG4gICAgLy8gTG9hZCBnYWxsZXJ5IGl0ZW1zXG4gICAgdGhpcy5sb2FkKHRoaXMuaXRlbXMpO1xuXG4gICAgLy8gQWN0aXZhdGUgcGxheWVyIGxpc3RlbmVyXG4gICAgdGhpcy5fcGxheWVyTGlzdGVuZXIkID0gdGhpcy5nYWxsZXJ5UmVmLmFjdGl2YXRlUGxheWVyKCkuc3Vic2NyaWJlKCk7XG5cbiAgICAvLyBTdWJzY3JpYmVzIHRvIGV2ZW50cyBvbiBkZW1hbmRcbiAgICBpZiAodGhpcy5pbmRleENoYW5nZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9pbmRleENoYW5nZSQgPSB0aGlzLmdhbGxlcnlSZWYuaW5kZXhDaGFuZ2VkLnN1YnNjcmliZSgoc3RhdGU6IEdhbGxlcnlTdGF0ZSkgPT4gdGhpcy5pbmRleENoYW5nZS5lbWl0KHN0YXRlKSk7XG4gICAgfVxuICAgIGlmICh0aGlzLml0ZW1zQ2hhbmdlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX2l0ZW1DaGFuZ2UkID0gdGhpcy5nYWxsZXJ5UmVmLml0ZW1zQ2hhbmdlZC5zdWJzY3JpYmUoKHN0YXRlOiBHYWxsZXJ5U3RhdGUpID0+IHRoaXMuaXRlbXNDaGFuZ2UuZW1pdChzdGF0ZSkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5wbGF5aW5nQ2hhbmdlLm9ic2VydmVycy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuX3BsYXlpbmdDaGFuZ2UkID0gdGhpcy5nYWxsZXJ5UmVmLnBsYXlpbmdDaGFuZ2VkLnN1YnNjcmliZSgoc3RhdGU6IEdhbGxlcnlTdGF0ZSkgPT4gdGhpcy5wbGF5aW5nQ2hhbmdlLmVtaXQoc3RhdGUpKTtcbiAgICB9XG5cbiAgICAvLyBTdGFydCBwbGF5aW5nIGlmIGF1dG8tcGxheSBpcyBzZXQgdG8gdHJ1ZVxuICAgIGlmICh0aGlzLmF1dG9QbGF5KSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9pdGVtQ2xpY2skLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fdGh1bWJDbGljayQudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pdGVtQ2hhbmdlJC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2luZGV4Q2hhbmdlJC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3BsYXlpbmdDaGFuZ2UkLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcGxheWVyTGlzdGVuZXIkLnVuc3Vic2NyaWJlKCk7XG4gICAgaWYgKHRoaXMuZGVzdHJveVJlZikge1xuICAgICAgdGhpcy5nYWxsZXJ5UmVmLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBvbkl0ZW1DbGljayhpOiBudW1iZXIpIHtcbiAgICB0aGlzLml0ZW1DbGljay5lbWl0KGkpO1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5pdGVtQ2xpY2submV4dChpKTtcbiAgfVxuXG4gIG9uVGh1bWJDbGljayhpOiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYuc2V0KGkpO1xuICAgIHRoaXMudGh1bWJDbGljay5lbWl0KGkpO1xuICAgIHRoaXMuZ2FsbGVyeVJlZi50aHVtYkNsaWNrLm5leHQoaSk7XG4gIH1cblxuICBvbkVycm9yKGVycjogR2FsbGVyeUVycm9yKSB7XG4gICAgdGhpcy5lcnJvci5lbWl0KGVycik7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLmVycm9yLm5leHQoZXJyKTtcbiAgfVxuXG4gIGxvYWQoaXRlbXM6IEdhbGxlcnlJdGVtW10pIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYubG9hZChpdGVtcyk7XG4gIH1cblxuICBhZGQoaXRlbTogR2FsbGVyeUl0ZW0sIGFjdGl2ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYuYWRkKGl0ZW0sIGFjdGl2ZSk7XG4gIH1cblxuICBhZGRJbWFnZShkYXRhOiBJbWFnZUl0ZW1EYXRhLCBhY3RpdmU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5hZGQobmV3IEltYWdlSXRlbShkYXRhKSwgYWN0aXZlKTtcbiAgfVxuXG4gIGFkZFZpZGVvKGRhdGE6IFZpZGVvSXRlbURhdGEsIGFjdGl2ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFkZChuZXcgVmlkZW9JdGVtKGRhdGEpLCBhY3RpdmUpO1xuICB9XG5cbiAgYWRkSWZyYW1lKGRhdGE6IElmcmFtZUl0ZW1EYXRhLCBhY3RpdmU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5hZGQobmV3IElmcmFtZUl0ZW0oZGF0YSksIGFjdGl2ZSk7XG4gIH1cblxuICBhZGRZb3V0dWJlKGRhdGE6IFlvdXR1YmVJdGVtRGF0YSwgYWN0aXZlPzogYm9vbGVhbikge1xuICAgIHRoaXMuYWRkKG5ldyBZb3V0dWJlSXRlbShkYXRhKSwgYWN0aXZlKTtcbiAgfVxuXG4gIHJlbW92ZShpOiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucmVtb3ZlKGkpO1xuICB9XG5cbiAgbmV4dCgpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYubmV4dCgpO1xuICB9XG5cbiAgcHJldigpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucHJldigpO1xuICB9XG5cbiAgc2V0KGk6IG51bWJlcikge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5zZXQoaSk7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucmVzZXQoKTtcbiAgfVxuXG4gIHBsYXkoaW50ZXJ2YWw/OiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYucGxheShpbnRlcnZhbCk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5zdG9wKCk7XG4gIH1cbn1cbiJdfQ==