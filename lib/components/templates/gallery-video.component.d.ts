import { OnInit, ElementRef, EventEmitter } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class GalleryVideoComponent implements OnInit {
    videoSources: {
        url: string;
        type?: string;
    }[];
    controls: boolean;
    src: string | {
        url: string;
        type?: string;
    }[];
    poster: string;
    controlsEnabled: boolean;
    set pauseVideo(shouldPause: boolean);
    set playVideo(shouldPlay: boolean);
    /** Stream that emits when an error occurs */
    error: EventEmitter<Error>;
    video: ElementRef;
    ngOnInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<GalleryVideoComponent, never>;
    static ɵcmp: ɵngcc0.ɵɵComponentDeclaration<GalleryVideoComponent, "gallery-video", never, { "pauseVideo": "pause"; "playVideo": "play"; "src": "src"; "poster": "poster"; "controlsEnabled": "controls"; }, { "error": "error"; }, never, never>;
}

//# sourceMappingURL=gallery-video.component.d.ts.map