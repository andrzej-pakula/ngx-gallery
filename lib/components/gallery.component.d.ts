import { OnInit, OnChanges, OnDestroy, SimpleChanges, TemplateRef, EventEmitter } from '@angular/core';
import { Gallery } from '../services/gallery.service';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryError, GalleryItem, GalleryState } from '../models/gallery.model';
import { IframeItemData, ImageItemData, VideoItemData, YoutubeItemData } from './templates/items.model';
export declare class GalleryComponent implements OnInit, OnChanges, OnDestroy {
    private _gallery;
    galleryRef: GalleryRef;
    id: string;
    items: GalleryItem[];
    nav: boolean;
    dots: boolean;
    loop: boolean;
    thumb: boolean;
    zoomOut: number;
    counter: boolean;
    dotsSize: number;
    autoPlay: boolean;
    gestures: boolean;
    thumbWidth: number;
    thumbHeight: number;
    disableThumb: boolean;
    panSensitivity: number;
    playerInterval: number;
    itemTemplate: TemplateRef<any>;
    thumbTemplate: TemplateRef<any>;
    thumbMode: 'strict' | 'free';
    imageSize: 'cover' | 'contain';
    dotsPosition: 'top' | 'bottom';
    counterPosition: 'top' | 'bottom';
    slidingDirection: 'horizontal' | 'vertical';
    loadingStrategy: 'preload' | 'lazy' | 'default';
    thumbPosition: 'top' | 'left' | 'left-top' | 'right' | 'bottom';
    /** Destroy gallery ref on component destroy event */
    destroyRef: boolean;
    /** Skip initializing the config with components inputs (Lightbox mode) */
    skipInitConfig: boolean;
    itemClick: EventEmitter<number>;
    thumbClick: EventEmitter<number>;
    playingChange: EventEmitter<GalleryState>;
    indexChange: EventEmitter<GalleryState>;
    itemsChange: EventEmitter<GalleryState>;
    error: EventEmitter<GalleryError>;
    private _itemClick$;
    private _thumbClick$;
    private _itemChange$;
    private _indexChange$;
    private _playingChange$;
    private _playerListener$;
    constructor(_gallery: Gallery);
    private getConfig;
    onAction(i: string | number): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onItemClick(i: number): void;
    onThumbClick(i: number): void;
    onError(err: GalleryError): void;
    load(items: GalleryItem[]): void;
    add(item: GalleryItem, active?: boolean): void;
    addImage(data: ImageItemData, active?: boolean): void;
    addVideo(data: VideoItemData, active?: boolean): void;
    addIframe(data: IframeItemData, active?: boolean): void;
    addYoutube(data: YoutubeItemData, active?: boolean): void;
    remove(i: number): void;
    next(): void;
    prev(): void;
    set(i: number): void;
    reset(): void;
    play(interval?: number): void;
    stop(): void;
}
