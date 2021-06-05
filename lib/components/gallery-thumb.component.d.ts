import { EventEmitter } from '@angular/core';
import { GalleryConfig } from '../models/config.model';
import * as ɵngcc0 from '@angular/core';
export declare class GalleryThumbComponent {
    config: GalleryConfig;
    /** Item's index in the gallery */
    index: number;
    /** Gallery current index */
    currIndex: number;
    /** Item's type 'image', 'video', 'youtube', 'iframe' */
    type: string;
    /** Item's data, this object contains the data required to display the content (e.g. src path) */
    data: any;
    error: EventEmitter<Error>;
    get isActive(): boolean;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<GalleryThumbComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<GalleryThumbComponent, "gallery-thumb", never, { "config": "config"; "index": "index"; "currIndex": "currIndex"; "type": "type"; "data": "data"; }, { "error": "error"; }, never, never>;
}

//# sourceMappingURL=gallery-thumb.component.d.ts.map