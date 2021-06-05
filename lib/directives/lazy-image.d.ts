import { OnDestroy, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import * as ɵngcc0 from '@angular/core';
export declare class LazyImage implements OnChanges, OnDestroy {
    private document;
    private _imageLoader$;
    private _loaderSub$;
    src: string;
    loaded: EventEmitter<string>;
    error: EventEmitter<Error>;
    constructor(document: any);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    loadImage(imagePath: string): void;
    /**
     * Native image loader, does not emit progress
     * @param url
     */
    nativeLoader(url: string): Observable<any>;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<LazyImage, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDeclaration<LazyImage, "[lazyImage]", never, { "src": "lazyImage"; }, { "loaded": "loaded"; "error": "error"; }, never>;
}

//# sourceMappingURL=lazy-image.d.ts.map