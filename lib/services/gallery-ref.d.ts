import { Subject, Observable } from 'rxjs';
import { GalleryError, GalleryItem, GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
export declare class GalleryRef {
    private deleteInstance;
    /** Stream that emits gallery state */
    private readonly _state;
    /** Stream that emits gallery config */
    private readonly _config;
    /** Stream that emits on item click */
    readonly itemClick: Subject<number>;
    /** Stream that emits on thumbnail click */
    readonly thumbClick: Subject<number>;
    /** Stream that emits on an error occurs */
    readonly error: Subject<GalleryError>;
    /** Gallery Events */
    /** Stream that emits gallery state */
    readonly state: Observable<GalleryState>;
    /** Stream that emits gallery config */
    readonly config: Observable<GalleryConfig>;
    /** Stream that emits when gallery is initialized/reset */
    get initialized(): Observable<GalleryState>;
    /** Stream that emits when items is changed (items loaded, item added, item removed) */
    get itemsChanged(): Observable<GalleryState>;
    /** Stream that emits when current item is changed */
    get indexChanged(): Observable<GalleryState>;
    /** Stream that emits when the player should start or stop */
    get playingChanged(): Observable<GalleryState>;
    /** Stream that emits when the player should start or stop */
    private get playerActions();
    constructor(config: GalleryConfig, deleteInstance: () => void);
    /**
     * Activate player actions listener
     */
    activatePlayer(): Observable<GalleryState>;
    /**
     * Set gallery state
     */
    private setState;
    /**
     * Set gallery config
     */
    setConfig(config: GalleryConfig): void;
    /**
     * Add gallery item
     */
    add(item: GalleryItem, active?: boolean): void;
    /**
     * Add image item
     */
    addImage(data: any, active?: boolean): void;
    /**
     * Add video item
     */
    addVideo(data: any, active?: boolean): void;
    /**
     * Add iframe item
     */
    addIframe(data: any, active?: boolean): void;
    /**
     * Add youtube item
     */
    addYoutube(data: any, active?: boolean): void;
    /**
     * Remove gallery item
     */
    remove(i: number): void;
    /**
     * Load items and reset the state
     */
    load(items: GalleryItem[]): void;
    /**
     * Set active item
     */
    set(i: number): void;
    /**
     * Next item
     */
    next(): void;
    /**
     * Prev item
     */
    prev(): void;
    /**
     * Start gallery player
     */
    play(interval?: number): void;
    /**
     * Stop gallery player
     */
    stop(): void;
    /**
     * Reset gallery to initial state
     */
    reset(): void;
    /**
     * Destroy gallery
     */
    destroy(): void;
}
