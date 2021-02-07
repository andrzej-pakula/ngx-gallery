import { Overlay } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { Gallery } from 'ng-gallery';
import { LightboxConfig } from './lightbox.model';
export declare class Lightbox {
    private _gallery;
    private _overlay;
    /** Gallery overlay ref */
    private _overlayRef;
    /** Global config */
    private _config;
    /** Stream that emits when lightbox is opened */
    opened: Subject<string>;
    /** Stream that emits when lightbox is closed */
    closed: Subject<string>;
    constructor(config: LightboxConfig, _gallery: Gallery, _overlay: Overlay);
    /**
     * Set Lightbox Config
     * @param config - LightboxConfig
     */
    setConfig(config: LightboxConfig): void;
    /**
     * Open Lightbox Overlay
     * @param i - Current Index
     * @param id - Gallery ID
     * @param config - Lightbox Config
     */
    open(i?: number, id?: string, config?: LightboxConfig): void;
    /**
     * Close Lightbox Overlay
     */
    close(): void;
}
