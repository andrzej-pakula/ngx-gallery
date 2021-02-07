import { ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
export declare class GalleryIframeComponent {
    private _sanitizer;
    iframeSrc: SafeResourceUrl;
    set src(src: string);
    set pauseVideo(shouldPause: boolean);
    autoplay: boolean;
    iframe: ElementRef;
    constructor(_sanitizer: DomSanitizer);
}
