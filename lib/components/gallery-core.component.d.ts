import { EventEmitter, ElementRef } from '@angular/core';
import { GalleryError, GalleryState } from '../models/gallery.model';
import { GalleryConfig } from '../models/config.model';
import * as ɵngcc0 from '@angular/core';
export declare class GalleryCoreComponent {
    state: GalleryState;
    config: GalleryConfig;
    action: EventEmitter<string | number>;
    itemClick: EventEmitter<number>;
    thumbClick: EventEmitter<number>;
    error: EventEmitter<GalleryError>;
    youtubeItemClickEvent: EventEmitter<ElementRef<any>>;
    /** Set thumbnails position */
    get thumbPosition(): 'top' | 'left' | 'left-top' | 'right' | 'bottom' | 'bottom-left';
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
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<GalleryCoreComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<GalleryCoreComponent, "gallery-core", never, { "state": "state"; "config": "config"; }, { "action": "action"; "itemClick": "itemClick"; "thumbClick": "thumbClick"; "error": "error"; "youtubeItemClickEvent": "youtubeItemClickEvent"; }, never, never>;
}

//# sourceMappingURL=gallery-core.component.d.ts.map