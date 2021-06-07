import { EventEmitter, ElementRef, Renderer2, OnInit } from '@angular/core';
import * as ɵngcc0 from '@angular/core';
export declare class IframeTracker implements OnInit {
    private el;
    private renderer;
    private iframeMouseOver;
    debug: boolean;
    iframeClick: EventEmitter<ElementRef<any>>;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    onIframeMouseOver(): void;
    onIframeMouseOut(): void;
    private onWindowBlur;
    private resetFocusOnWindow;
    private log;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<IframeTracker, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<IframeTracker, "[iframeTracker]", never, { "debug": "debug"; }, { "iframeClick": "iframeClick"; }, never>;
}

//# sourceMappingURL=iframe-tracker.d.ts.map