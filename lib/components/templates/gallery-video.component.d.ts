import { OnInit, ElementRef, EventEmitter } from '@angular/core';
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
}
