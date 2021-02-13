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
    get height() {
        return this._height;
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
                styles: ["::ng-deep gallery-core[dotsPosition=top] gallery-dots{top:0}::ng-deep gallery-core[dotsPosition=bottom] gallery-dots{bottom:0}::ng-deep gallery-dots{left:50%;margin:7px;position:absolute;transform:translateX(-50%)}::ng-deep .g-dot{cursor:pointer;z-index:20}::ng-deep .g-dot:hover .g-dot-inner{opacity:1}::ng-deep .g-dot-active .g-dot-inner{opacity:1;transform:scale(1.5)!important}::ng-deep .g-dot-inner{background-color:#fff;border-radius:50%;box-shadow:0 0 1px #000;height:30%;opacity:.6;transition:all .2s ease;width:30%}::ng-deep .g-dot,::ng-deep .g-dot-inner,::ng-deep gallery-dots{align-items:center;display:flex;justify-content:center}::ng-deep .g-nav-next,::ng-deep .g-nav-prev{cursor:pointer;height:40px;position:absolute;top:50%;width:30px;z-index:999}::ng-deep .g-nav-next{right:.5em;transform:translateY(-50%) perspective(1px)}::ng-deep .g-nav-prev{left:.5em;transform:translateY(-50%) perspective(1px) scale(-1)}@media only screen and (max-width:480px){::ng-deep .g-nav-next{right:.2em}::ng-deep .g-nav-prev{left:.2em}}::ng-deep .g-items-container{height:100%}::ng-deep .g-slider{position:absolute;transition:transform .4s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-core[slidingDirection=horizontal] .g-slider{flex-direction:row}::ng-deep gallery-core[slidingDirection=vertical] .g-slider{flex-direction:column}::ng-deep gallery-thumbs{display:block;overflow:unset;z-index:1}::ng-deep .g-thumbs-container{display:flex;height:100%;left:0;overflow:unset;position:relative;top:0;width:100%;z-index:206}::ng-deep gallery-core[disableThumb=true] gallery-thumb{cursor:default}::ng-deep gallery-core[thumbPosition=bottom-left] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=bottom] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=top] gallery-thumbs .g-slider{flex-direction:row;left:50%;top:0}::ng-deep gallery-core[thumbPosition=bottom-left] gallery-thumb,::ng-deep gallery-core[thumbPosition=bottom] gallery-thumb,::ng-deep gallery-core[thumbPosition=top] gallery-thumb{padding:1px 0 1px 1px}::ng-deep gallery-core[thumbPosition=bottom-left] gallery-thumbs .g-slider{left:0}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=left] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=right] gallery-thumbs .g-slider{flex-direction:column;left:0;top:50%}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumb,::ng-deep gallery-core[thumbPosition=left] gallery-thumb,::ng-deep gallery-core[thumbPosition=right] gallery-thumb{padding:0 1px 1px}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumbs .g-slider{top:0}::ng-deep gallery-core[thumbPosition=top]{flex-direction:column}::ng-deep gallery-core[thumbPosition=left-top],::ng-deep gallery-core[thumbPosition=left]{flex-direction:row}::ng-deep gallery-core[thumbPosition=right]{flex-direction:row-reverse}::ng-deep gallery-core[thumbPosition=bottom-left],::ng-deep gallery-core[thumbPosition=bottom]{flex-direction:column-reverse}::ng-deep gallery-thumb.g-active-thumb .g-thumb-loading{background-color:#464646}::ng-deep .g-thumb-loading{background-color:#262626;height:100%;overflow:hidden;position:relative}::ng-deep .g-thumb-loading:before{-webkit-animation:phAnimation .8s linear infinite;animation:phAnimation .8s linear infinite;background:linear-gradient(90deg,hsla(0,0%,100%,0) 46%,hsla(0,0%,100%,.35) 50%,hsla(0,0%,100%,0) 54%) 50% 50%;bottom:0;content:\"\";left:50%;margin-left:-250%;position:absolute;right:0;top:0;width:500%;z-index:1}@-webkit-keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}@keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}::ng-deep gallery-core[counterPosition=top] .g-counter{border-bottom-left-radius:4px;border-bottom-right-radius:4px;top:0}::ng-deep gallery-core[counterPosition=bottom] .g-counter{border-top-left-radius:4px;border-top-right-radius:4px;bottom:0}::ng-deep .g-counter{background-color:rgba(0,0,0,.5);color:#fff;font-size:12px;left:50%;padding:4px 10px;position:absolute;transform:translateX(-50%) perspective(1px);z-index:50}::ng-deep gallery[gallerize] gallery-item{cursor:pointer}::ng-deep gallery-item,::ng-deep gallery-thumb{display:block;height:100%;overflow:hidden;position:relative;width:100%}::ng-deep gallery-item h2,::ng-deep gallery-item h4,::ng-deep gallery-thumb h2,::ng-deep gallery-thumb h4{color:coral;margin:0}::ng-deep gallery-item h2,::ng-deep gallery-thumb h2{font-size:3.5em;margin-bottom:.3em}::ng-deep gallery-item h4,::ng-deep gallery-thumb h4{font-size:1.6em}::ng-deep gallery-item{z-index:10}::ng-deep gallery-item iframe,::ng-deep gallery-item video{height:100%;position:absolute;width:100%}::ng-deep gallery-thumb{cursor:pointer;opacity:.5;transition:opacity .3s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-thumb.g-active-thumb{opacity:1}::ng-deep .g-image-item{background-position:50%;background-repeat:no-repeat;background-size:cover;height:100%;width:100%}::ng-deep .g-image-error-message,::ng-deep .g-template{align-items:center;bottom:0;color:#fff;display:flex;flex-direction:column;justify-content:center;left:0;position:absolute;right:0;top:0;z-index:10}::ng-deep .g-loading{height:80px;left:50%;position:absolute;top:50%;transform:translate3d(-50%,-50%,0);width:80px}::ng-deep gallery-core[imageSize=contain] gallery-slider .g-image-item{background-size:contain}::ng-deep gallery-image{align-items:center;display:flex;height:100%;justify-content:center}::ng-deep gallery{background-color:#000;display:block;height:500px;overflow:hidden;position:relative;z-index:1}::ng-deep gallery *{box-sizing:border-box}::ng-deep gallery,::ng-deep gallery-core{overflow:hidden;position:relative}::ng-deep .g-box,::ng-deep .g-slider,::ng-deep gallery-core{display:flex;height:100%;width:100%}::ng-deep gallery[fluid]{left:50%;transform:translateX(-50vw);width:100vw}::ng-deep gallery[fluid][fluid=false]{left:auto;transform:none;width:auto}::ng-deep .g-no-transition{transition:unset!important}::ng-deep .g-box,::ng-deep gallery-slider{display:flex;flex:1;flex-direction:column;height:100%;order:1;overflow:hidden;position:relative}::ng-deep .g-btn-close svg,::ng-deep gallery-nav svg{-webkit-filter:drop-shadow(0 0 1px #000);filter:drop-shadow(0 0 1px black);height:100%;opacity:.6;transition:opacity .2s linear;width:100%}::ng-deep .g-btn-close svg:hover,::ng-deep gallery-nav svg:hover{opacity:1}"]
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
    height: [{ type: HostBinding, args: ['style.height',] }],
    destroyRef: [{ type: Input }],
    skipInitConfig: [{ type: Input }],
    itemClick: [{ type: Output }],
    thumbClick: [{ type: Output }],
    playingChange: [{ type: Output }],
    indexChange: [{ type: Output }],
    itemsChange: [{ type: Output }],
    error: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvY29tcG9uZW50cy9nYWxsZXJ5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBTU4sWUFBWSxFQUNaLHVCQUF1QixFQUFFLFdBQVcsRUFDckMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBb0IsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBR3RELE9BQU8sRUFDTCxVQUFVLEVBRVYsU0FBUyxFQUVULFNBQVMsRUFFVCxXQUFXLEVBRVosTUFBTSx5QkFBeUIsQ0FBQztBQWdCakMsTUFBTSxPQUFPLGdCQUFnQjtJQXdEM0IsWUFBb0IsUUFBaUI7UUFBakIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQW5ENUIsUUFBRyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUN4QyxTQUFJLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzFDLFNBQUksR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDMUMsVUFBSyxHQUFZLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM1QyxZQUFPLEdBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9DLFlBQU8sR0FBWSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDaEQsYUFBUSxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNqRCxhQUFRLEdBQVks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Szs4QkFDTCxLQUFLOytCQUNMLEtBQUs7OEJBQ0wsS0FBSzs0QkFDTCxLQUFLO3FCQUdMLFdBQVcsU0FBQyxjQUFjO3lCQU8xQixLQUFLOzZCQUdMLEtBQUs7d0JBRUwsTUFBTTt5QkFDTixNQUFNOzRCQUNOLE1BQU07MEJBQ04sTUFBTTswQkFDTixNQUFNO29CQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBIb3N0QmluZGluZ1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgU3Vic2NyaXB0aW9uTGlrZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgR2FsbGVyeSB9IGZyb20gJy4uL3NlcnZpY2VzL2dhbGxlcnkuc2VydmljZSc7XG5pbXBvcnQgeyBHYWxsZXJ5UmVmIH0gZnJvbSAnLi4vc2VydmljZXMvZ2FsbGVyeS1yZWYnO1xuaW1wb3J0IHsgR2FsbGVyeUVycm9yLCBHYWxsZXJ5SXRlbSwgR2FsbGVyeVN0YXRlIH0gZnJvbSAnLi4vbW9kZWxzL2dhbGxlcnkubW9kZWwnO1xuaW1wb3J0IHtcbiAgSWZyYW1lSXRlbSxcbiAgSWZyYW1lSXRlbURhdGEsXG4gIEltYWdlSXRlbSxcbiAgSW1hZ2VJdGVtRGF0YSxcbiAgVmlkZW9JdGVtLFxuICBWaWRlb0l0ZW1EYXRhLFxuICBZb3V0dWJlSXRlbSxcbiAgWW91dHViZUl0ZW1EYXRhXG59IGZyb20gJy4vdGVtcGxhdGVzL2l0ZW1zLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzdHlsZVVybHM6IFsnLi4vc3R5bGVzL2dhbGxlcnkuc2NzcyddLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxnYWxsZXJ5LWNvcmUgW3N0YXRlXT1cImdhbGxlcnlSZWYuc3RhdGUgfCBhc3luY1wiXG4gICAgICAgICAgICAgICAgICBbY29uZmlnXT1cImdhbGxlcnlSZWYuY29uZmlnIHwgYXN5bmNcIlxuICAgICAgICAgICAgICAgICAgKGFjdGlvbik9XCJvbkFjdGlvbigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIChpdGVtQ2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAodGh1bWJDbGljayk9XCJvblRodW1iQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAoZXJyb3IpPVwib25FcnJvcigkZXZlbnQpXCI+PC9nYWxsZXJ5LWNvcmU+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBnYWxsZXJ5UmVmOiBHYWxsZXJ5UmVmO1xuICBASW5wdXQoKSBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBpdGVtczogR2FsbGVyeUl0ZW0gW107XG4gIEBJbnB1dCgpIG5hdjogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLm5hdjtcbiAgQElucHV0KCkgZG90czogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmRvdHM7XG4gIEBJbnB1dCgpIGxvb3A6IGJvb2xlYW4gPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5sb29wO1xuICBASW5wdXQoKSB0aHVtYjogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iO1xuICBASW5wdXQoKSB6b29tT3V0OiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy56b29tT3V0O1xuICBASW5wdXQoKSBjb3VudGVyOiBib29sZWFuID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuY291bnRlcjtcbiAgQElucHV0KCkgZG90c1NpemU6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmRvdHNTaXplO1xuICBASW5wdXQoKSBhdXRvUGxheTogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmF1dG9QbGF5O1xuICBASW5wdXQoKSBnZXN0dXJlczogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmdlc3R1cmVzO1xuICBASW5wdXQoKSB0aHVtYldpZHRoOiBudW1iZXIgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYldpZHRoO1xuICBASW5wdXQoKSB0aHVtYkhlaWdodDogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcudGh1bWJIZWlnaHQ7XG4gIEBJbnB1dCgpIGRpc2FibGVUaHVtYjogYm9vbGVhbiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmRpc2FibGVUaHVtYjtcbiAgQElucHV0KCkgcGFuU2Vuc2l0aXZpdHk6IG51bWJlciA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnBhblNlbnNpdGl2aXR5O1xuICBASW5wdXQoKSBwbGF5ZXJJbnRlcnZhbDogbnVtYmVyID0gdGhpcy5fZ2FsbGVyeS5jb25maWcucGxheWVySW50ZXJ2YWw7XG4gIEBJbnB1dCgpIGl0ZW1UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLml0ZW1UZW1wbGF0ZTtcbiAgQElucHV0KCkgdGh1bWJUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLnRodW1iVGVtcGxhdGU7XG4gIEBJbnB1dCgpIHRodW1iTW9kZTogJ3N0cmljdCcgfCAnZnJlZScgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYk1vZGU7XG4gIEBJbnB1dCgpIGltYWdlU2l6ZTogJ2NvdmVyJyB8ICdjb250YWluJyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmltYWdlU2l6ZTtcbiAgQElucHV0KCkgZG90c1Bvc2l0aW9uOiAndG9wJyB8ICdib3R0b20nID0gdGhpcy5fZ2FsbGVyeS5jb25maWcuZG90c1Bvc2l0aW9uO1xuICBASW5wdXQoKSBjb3VudGVyUG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbScgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5jb3VudGVyUG9zaXRpb247XG4gIEBJbnB1dCgpIHNsaWRpbmdEaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy5zbGlkaW5nRGlyZWN0aW9uO1xuICBASW5wdXQoKSBsb2FkaW5nU3RyYXRlZ3k6ICdwcmVsb2FkJyB8ICdsYXp5JyB8ICdkZWZhdWx0JyA9IHRoaXMuX2dhbGxlcnkuY29uZmlnLmxvYWRpbmdTdHJhdGVneTtcbiAgQElucHV0KCkgdGh1bWJQb3NpdGlvbjogJ3RvcCcgfCAnbGVmdCcgfCAnbGVmdC10b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgICdib3R0b20tbGVmdCcgPSB0aGlzLl9nYWxsZXJ5LmNvbmZpZy50aHVtYlBvc2l0aW9uO1xuXG4gIF9oZWlnaHQ6IHN0cmluZztcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5oZWlnaHQnKSBnZXQgaGVpZ2h0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2hlaWdodFxuICB9XG5cbiAgLy8gSW5wdXRzIHVzZWQgYnkgdGhlIGxpZ2h0Ym94XG5cbiAgLyoqIERlc3Ryb3kgZ2FsbGVyeSByZWYgb24gY29tcG9uZW50IGRlc3Ryb3kgZXZlbnQgKi9cbiAgQElucHV0KCkgZGVzdHJveVJlZiA9IHRydWU7XG5cbiAgLyoqIFNraXAgaW5pdGlhbGl6aW5nIHRoZSBjb25maWcgd2l0aCBjb21wb25lbnRzIGlucHV0cyAoTGlnaHRib3ggbW9kZSkgKi9cbiAgQElucHV0KCkgc2tpcEluaXRDb25maWcgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSB0aHVtYkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBwbGF5aW5nQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5U3RhdGU+KCk7XG4gIEBPdXRwdXQoKSBpbmRleENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8R2FsbGVyeVN0YXRlPigpO1xuICBAT3V0cHV0KCkgaXRlbXNDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEdhbGxlcnlTdGF0ZT4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxHYWxsZXJ5RXJyb3I+KCk7XG5cbiAgcHJpdmF0ZSBfaXRlbUNsaWNrJDogU3Vic2NyaXB0aW9uTGlrZSA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdGh1bWJDbGljayQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2l0ZW1DaGFuZ2UkOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9pbmRleENoYW5nZSQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3BsYXlpbmdDaGFuZ2UkOiBTdWJzY3JpcHRpb25MaWtlID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9wbGF5ZXJMaXN0ZW5lciQ6IFN1YnNjcmlwdGlvbkxpa2UgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZ2FsbGVyeTogR2FsbGVyeSkge1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDb25maWcoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hdjogdGhpcy5uYXYsXG4gICAgICBkb3RzOiB0aGlzLmRvdHMsXG4gICAgICBsb29wOiB0aGlzLmxvb3AsXG4gICAgICB0aHVtYjogdGhpcy50aHVtYixcbiAgICAgIHpvb21PdXQ6IHRoaXMuem9vbU91dCxcbiAgICAgIGNvdW50ZXI6IHRoaXMuY291bnRlcixcbiAgICAgIGF1dG9QbGF5OiB0aGlzLmF1dG9QbGF5LFxuICAgICAgZ2VzdHVyZXM6IHRoaXMuZ2VzdHVyZXMsXG4gICAgICBkb3RzU2l6ZTogdGhpcy5kb3RzU2l6ZSxcbiAgICAgIGltYWdlU2l6ZTogdGhpcy5pbWFnZVNpemUsXG4gICAgICB0aHVtYk1vZGU6IHRoaXMudGh1bWJNb2RlLFxuICAgICAgdGh1bWJXaWR0aDogdGhpcy50aHVtYldpZHRoLFxuICAgICAgdGh1bWJIZWlnaHQ6IHRoaXMudGh1bWJIZWlnaHQsXG4gICAgICBkaXNhYmxlVGh1bWI6IHRoaXMuZGlzYWJsZVRodW1iLFxuICAgICAgZG90c1Bvc2l0aW9uOiB0aGlzLmRvdHNQb3NpdGlvbixcbiAgICAgIGl0ZW1UZW1wbGF0ZTogdGhpcy5pdGVtVGVtcGxhdGUsXG4gICAgICB0aHVtYlRlbXBsYXRlOiB0aGlzLnRodW1iVGVtcGxhdGUsXG4gICAgICB0aHVtYlBvc2l0aW9uOiB0aGlzLnRodW1iUG9zaXRpb24sXG4gICAgICBwYW5TZW5zaXRpdml0eTogdGhpcy5wYW5TZW5zaXRpdml0eSxcbiAgICAgIHBsYXllckludGVydmFsOiB0aGlzLnBsYXllckludGVydmFsLFxuICAgICAgY291bnRlclBvc2l0aW9uOiB0aGlzLmNvdW50ZXJQb3NpdGlvbixcbiAgICAgIGxvYWRpbmdTdHJhdGVneTogdGhpcy5sb2FkaW5nU3RyYXRlZ3ksXG4gICAgICBzbGlkaW5nRGlyZWN0aW9uOiB0aGlzLnNsaWRpbmdEaXJlY3Rpb25cbiAgICB9O1xuICB9XG5cbiAgb25BY3Rpb24oaTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgc3dpdGNoIChpKSB7XG4gICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgdGhpcy5nYWxsZXJ5UmVmLm5leHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwcmV2JzpcbiAgICAgICAgdGhpcy5nYWxsZXJ5UmVmLnByZXYoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmdhbGxlcnlSZWYuc2V0KGkgYXMgbnVtYmVyKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKHRoaXMuZ2FsbGVyeVJlZikge1xuICAgICAgdGhpcy5nYWxsZXJ5UmVmLnNldENvbmZpZyh0aGlzLmdldENvbmZpZygpKTtcblxuICAgICAgaWYgKGNoYW5nZXMuaXRlbXMgJiYgY2hhbmdlcy5pdGVtcy5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMuaXRlbXMucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICB0aGlzLmxvYWQodGhpcy5pdGVtcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gR2V0IGdhbGxlcnkgaW5zdGFuY2UgYnkgaWRcbiAgICBpZiAodGhpcy5za2lwSW5pdENvbmZpZykge1xuICAgICAgdGhpcy5nYWxsZXJ5UmVmID0gdGhpcy5fZ2FsbGVyeS5yZWYodGhpcy5pZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ2FsbGVyeVJlZiA9IHRoaXMuX2dhbGxlcnkucmVmKHRoaXMuaWQsIHRoaXMuZ2V0Q29uZmlnKCkpO1xuICAgIH1cblxuICAgIC8vIExvYWQgZ2FsbGVyeSBpdGVtc1xuICAgIHRoaXMubG9hZCh0aGlzLml0ZW1zKTtcblxuICAgIC8vIEFjdGl2YXRlIHBsYXllciBsaXN0ZW5lclxuICAgIHRoaXMuX3BsYXllckxpc3RlbmVyJCA9IHRoaXMuZ2FsbGVyeVJlZi5hY3RpdmF0ZVBsYXllcigpLnN1YnNjcmliZSgpO1xuXG4gICAgLy8gU3Vic2NyaWJlcyB0byBldmVudHMgb24gZGVtYW5kXG4gICAgaWYgKHRoaXMuaW5kZXhDaGFuZ2Uub2JzZXJ2ZXJzLmxlbmd0aCkge1xuICAgICAgdGhpcy5faW5kZXhDaGFuZ2UkID0gdGhpcy5nYWxsZXJ5UmVmLmluZGV4Q2hhbmdlZC5zdWJzY3JpYmUoKHN0YXRlOiBHYWxsZXJ5U3RhdGUpID0+IHRoaXMuaW5kZXhDaGFuZ2UuZW1pdChzdGF0ZSkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pdGVtc0NoYW5nZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9pdGVtQ2hhbmdlJCA9IHRoaXMuZ2FsbGVyeVJlZi5pdGVtc0NoYW5nZWQuc3Vic2NyaWJlKChzdGF0ZTogR2FsbGVyeVN0YXRlKSA9PiB0aGlzLml0ZW1zQ2hhbmdlLmVtaXQoc3RhdGUpKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGxheWluZ0NoYW5nZS5vYnNlcnZlcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9wbGF5aW5nQ2hhbmdlJCA9IHRoaXMuZ2FsbGVyeVJlZi5wbGF5aW5nQ2hhbmdlZC5zdWJzY3JpYmUoKHN0YXRlOiBHYWxsZXJ5U3RhdGUpID0+IHRoaXMucGxheWluZ0NoYW5nZS5lbWl0KHN0YXRlKSk7XG4gICAgfVxuXG4gICAgLy8gU3RhcnQgcGxheWluZyBpZiBhdXRvLXBsYXkgaXMgc2V0IHRvIHRydWVcbiAgICBpZiAodGhpcy5hdXRvUGxheSkge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5faXRlbUNsaWNrJC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3RodW1iQ2xpY2skLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5faXRlbUNoYW5nZSQudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9pbmRleENoYW5nZSQudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9wbGF5aW5nQ2hhbmdlJC51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3BsYXllckxpc3RlbmVyJC51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLmRlc3Ryb3lSZWYpIHtcbiAgICAgIHRoaXMuZ2FsbGVyeVJlZi5kZXN0cm95KCk7XG4gICAgfVxuICB9XG5cbiAgb25JdGVtQ2xpY2soaTogbnVtYmVyKSB7XG4gICAgdGhpcy5pdGVtQ2xpY2suZW1pdChpKTtcbiAgICB0aGlzLmdhbGxlcnlSZWYuaXRlbUNsaWNrLm5leHQoaSk7XG4gIH1cblxuICBvblRodW1iQ2xpY2soaTogbnVtYmVyKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLnNldChpKTtcbiAgICB0aGlzLnRodW1iQ2xpY2suZW1pdChpKTtcbiAgICB0aGlzLmdhbGxlcnlSZWYudGh1bWJDbGljay5uZXh0KGkpO1xuICB9XG5cbiAgb25FcnJvcihlcnI6IEdhbGxlcnlFcnJvcikge1xuICAgIHRoaXMuZXJyb3IuZW1pdChlcnIpO1xuICAgIHRoaXMuZ2FsbGVyeVJlZi5lcnJvci5uZXh0KGVycik7XG4gIH1cblxuICBsb2FkKGl0ZW1zOiBHYWxsZXJ5SXRlbVtdKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLmxvYWQoaXRlbXMpO1xuICB9XG5cbiAgYWRkKGl0ZW06IEdhbGxlcnlJdGVtLCBhY3RpdmU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLmFkZChpdGVtLCBhY3RpdmUpO1xuICB9XG5cbiAgYWRkSW1hZ2UoZGF0YTogSW1hZ2VJdGVtRGF0YSwgYWN0aXZlPzogYm9vbGVhbikge1xuICAgIHRoaXMuYWRkKG5ldyBJbWFnZUl0ZW0oZGF0YSksIGFjdGl2ZSk7XG4gIH1cblxuICBhZGRWaWRlbyhkYXRhOiBWaWRlb0l0ZW1EYXRhLCBhY3RpdmU/OiBib29sZWFuKSB7XG4gICAgdGhpcy5hZGQobmV3IFZpZGVvSXRlbShkYXRhKSwgYWN0aXZlKTtcbiAgfVxuXG4gIGFkZElmcmFtZShkYXRhOiBJZnJhbWVJdGVtRGF0YSwgYWN0aXZlPzogYm9vbGVhbikge1xuICAgIHRoaXMuYWRkKG5ldyBJZnJhbWVJdGVtKGRhdGEpLCBhY3RpdmUpO1xuICB9XG5cbiAgYWRkWW91dHViZShkYXRhOiBZb3V0dWJlSXRlbURhdGEsIGFjdGl2ZT86IGJvb2xlYW4pIHtcbiAgICB0aGlzLmFkZChuZXcgWW91dHViZUl0ZW0oZGF0YSksIGFjdGl2ZSk7XG4gIH1cblxuICByZW1vdmUoaTogbnVtYmVyKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLnJlbW92ZShpKTtcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLm5leHQoKTtcbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLnByZXYoKTtcbiAgfVxuXG4gIHNldChpOiBudW1iZXIpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYuc2V0KGkpO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLnJlc2V0KCk7XG4gIH1cblxuICBwbGF5KGludGVydmFsPzogbnVtYmVyKSB7XG4gICAgdGhpcy5nYWxsZXJ5UmVmLnBsYXkoaW50ZXJ2YWwpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB0aGlzLmdhbGxlcnlSZWYuc3RvcCgpO1xuICB9XG5cbiAgd2l0aEhlaWdodChoZWlnaHQ6IHN0cmluZyB8IG51bWJlcikge1xuICAgIHRoaXMuX2hlaWdodCA9IGAke2hlaWdodH1weGBcbiAgfVxufVxuIl19