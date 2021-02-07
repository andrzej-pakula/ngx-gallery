import { EventEmitter } from '@angular/core';
import { GalleryError, GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
export declare class GalleryCoreComponent {
    state: GalleryState;
    config: GalleryConfig;
    action: EventEmitter<string | number>;
    itemClick: EventEmitter<number>;
    thumbClick: EventEmitter<number>;
    error: EventEmitter<GalleryError>;
    /** Set thumbnails position */
    get thumbPosition(): 'top' | 'left' | 'left-top' | 'right' | 'bottom';
    /** Set sliding direction */
    get slidingDirection(): 'horizontal' | 'vertical';
    /** Disable thumbnails clicks */
    get disableThumb(): boolean;
    /** Set gallery image size */
    get imageSize(): 'cover' | 'contain';
    /** Set gallery dots position */
    get dotsPosition(): 'top' | 'bottom';
    /** Set gallery counter position */
    get counterPosition(): 'top' | 'bottom';
}