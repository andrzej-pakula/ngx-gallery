import { ElementRef, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as ɵngcc0 from '@angular/core';
export declare class GalleryIframeComponent {
    private _sanitizer;
    iframeSrc: SafeResourceUrl;
    iframeClickEvent: EventEmitter<ElementRef<any>>;
    set src(src: string);
    set pauseVideo(shouldPause: boolean);
    autoplay: boolean;
    iframe: ElementRef;
    constructor(_sanitizer: DomSanitizer);
    onIframeClick(el: ElementRef): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<GalleryIframeComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<GalleryIframeComponent, "gallery-iframe", never, { "src": "src"; "pauseVideo": "pause"; "autoplay": "autoplay"; }, { "iframeClickEvent": "iframeClickEvent"; }, never, never>;
}

//# sourceMappingURL=gallery-iframe.component.d.ts.map