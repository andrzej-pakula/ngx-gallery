import { OnDestroy, OnInit, ElementRef, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
/**
 * This directive uses tap event if HammerJS is loaded, otherwise it falls back to normal click event
 */
import * as ɵngcc0 from '@angular/core';
export declare class TapClick implements OnInit, OnDestroy {
    private _el;
    private _hammer;
    clickListener: Subscription;
    tapClickDisabled: boolean;
    tapClick: EventEmitter<any>;
    constructor(_el: ElementRef);
    ngOnInit(): void;
    activateClickEvent(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<TapClick, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<TapClick, "[tapClick]", never, { "tapClickDisabled": "tapClickDisabled"; }, { "tapClick": "tapClick"; }, never>;
}

//# sourceMappingURL=tap-click.d.ts.map