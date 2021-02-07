import { Component, Optional, ChangeDetectionStrategy, ElementRef, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';
import { lightboxAnimation } from './lightbox.animation';
export class LightboxComponent {
    constructor(_document, _focusTrapFactory, _elementRef, sanitizer) {
        this._document = _document;
        this._focusTrapFactory = _focusTrapFactory;
        this._elementRef = _elementRef;
        this.sanitizer = sanitizer;
        /** State of the lightbox animation. */
        this.state = 'enter';
        this._savePreviouslyFocusedElement();
    }
    /** Callback, invoked whenever an animation on the host completes. */
    onAnimationDone(event) {
        if (event.toState === 'enter') {
            this._trapFocus();
        }
        else {
            this.overlayRef.dispose();
            this._restoreFocus();
        }
    }
    /** Moves the focus inside the focus trap. */
    _trapFocus() {
        if (!this._focusTrap) {
            this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        }
        // If were to attempt to focus immediately, then the content of the lightbox would not yet be
        // ready in instances where change detection has to run first. To deal with this, we simply
        // wait for the microtask queue to be empty.
        this._focusTrap.focusInitialElementWhenReady();
    }
    /** Saves a reference to the element that was focused before the lightbox was opened. */
    _savePreviouslyFocusedElement() {
        if (this._document) {
            this._elementFocusedBeforeDialogWasOpened = this._document.activeElement;
            // Note that there is no focus method when rendering on the server.
            if (this._elementRef.nativeElement.focus) {
                // Move focus onto the lightbox immediately in order to prevent the user from accidentally
                // opening multiple dialogs at the same time. Needs to be async, because the element
                // may not be focusable immediately.
                Promise.resolve().then(() => this._elementRef.nativeElement.focus());
            }
        }
    }
    /** Restores focus to the element that was focused before the lightbox opened. */
    _restoreFocus() {
        const toFocus = this._elementFocusedBeforeDialogWasOpened;
        // We need the extra check, because IE can set the `activeElement` to null in some cases.
        if (toFocus && typeof toFocus.focus === 'function') {
            toFocus.focus();
        }
        if (this._focusTrap) {
            this._focusTrap.destroy();
        }
    }
}
LightboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'lightbox',
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [lightboxAnimation],
                template: `
    <gallery [id]="id" [destroyRef]="false" [skipInitConfig]="true">
      <i class="g-btn-close" aria-label="Close" (click)="overlayRef.detach()"
         [innerHTML]="sanitizer.bypassSecurityTrustHtml(closeIcon)"></i>
    </gallery>
  `,
                host: {
                    'tabindex': '-1',
                    'aria-modal': 'true',
                    '[attr.id]': '"lightbox-" + id',
                    '[attr.role]': 'role',
                    '[attr.aria-labelledby]': 'ariaLabel ? null : ariaLabelledBy',
                    '[attr.aria-label]': 'ariaLabel',
                    '[attr.aria-describedby]': 'ariaDescribedBy || null',
                    '[@lightbox]': '{ value: state, params: { startAnimationTime: startAnimationTime, exitAnimationTime: exitAnimationTime } }',
                    '(@lightbox.done)': 'onAnimationDone($event)',
                },
                styles: ["::ng-deep lightbox{border-radius:4px;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12);display:block;height:800px;max-height:90vh;max-width:94vw;overflow:hidden;position:relative;width:1100px}::ng-deep lightbox:focus{outline:none}::ng-deep lightbox gallery{display:block;height:100%;margin:0;overflow:hidden;width:100%}::ng-deep .g-backdrop{background-color:rgba(0,0,0,.32)}::ng-deep .fullscreen{width:100%}::ng-deep .fullscreen ::ng-deep lightbox{border-radius:0;bottom:0;height:100%;left:0;max-height:unset;max-width:unset;position:fixed;right:0;top:0;width:100%}::ng-deep .g-overlay{margin:auto}@media only screen and (max-width:480px){::ng-deep .g-overlay{width:100%}::ng-deep .g-overlay ::ng-deep lightbox{border-radius:0;bottom:0;height:100%;left:0;max-height:unset;max-width:unset;position:fixed;right:0;top:0;width:100%}}::ng-deep .g-btn-close{cursor:pointer;height:20px;position:absolute;right:.9em;top:.9em;width:20px;z-index:60}@media only screen and (max-width:480px){::ng-deep .g-btn-close{right:.7em;top:.7em}}"]
            },] }
];
LightboxComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] },
    { type: ConfigurableFocusTrapFactory },
    { type: ElementRef },
    { type: DomSanitizer }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9saWdodGJveC9zcmMvbGlnaHRib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUczQyxPQUFPLEVBQWEsNEJBQTRCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQXlCekQsTUFBTSxPQUFPLGlCQUFpQjtJQXNDNUIsWUFBa0QsU0FBYyxFQUM1QyxpQkFBK0MsRUFDL0MsV0FBdUIsRUFDeEIsU0FBdUI7UUFIUSxjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQzVDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBOEI7UUFDL0MsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBYztRQTlCMUMsdUNBQXVDO1FBQ3ZDLFVBQUssR0FBOEIsT0FBTyxDQUFDO1FBOEJ6QyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLGVBQWUsQ0FBQyxLQUFxQjtRQUNuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxFQUFFO1lBQzdCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQsNkNBQTZDO0lBQ3JDLFVBQVU7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDakY7UUFDRCw2RkFBNkY7UUFDN0YsMkZBQTJGO1FBQzNGLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLDRCQUE0QixFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELHdGQUF3RjtJQUNoRiw2QkFBNkI7UUFDbkMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxvQ0FBb0MsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQTRCLENBQUM7WUFFeEYsbUVBQW1FO1lBQ25FLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFO2dCQUN4QywwRkFBMEY7Z0JBQzFGLG9GQUFvRjtnQkFDcEYsb0NBQW9DO2dCQUNwQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDdEU7U0FDRjtJQUNILENBQUM7SUFFRCxpRkFBaUY7SUFDekUsYUFBYTtRQUNuQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsb0NBQW9DLENBQUM7UUFFMUQseUZBQXlGO1FBQ3pGLElBQUksT0FBTyxJQUFJLE9BQU8sT0FBTyxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDbEQsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pCO1FBRUQsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDM0I7SUFDSCxDQUFDOzs7WUFwSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsVUFBVSxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBRS9CLFFBQVEsRUFBRTs7Ozs7R0FLVDtnQkFDRCxJQUFJLEVBQUU7b0JBQ0osVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFlBQVksRUFBRSxNQUFNO29CQUNwQixXQUFXLEVBQUUsa0JBQWtCO29CQUMvQixhQUFhLEVBQUUsTUFBTTtvQkFDckIsd0JBQXdCLEVBQUUsbUNBQW1DO29CQUM3RCxtQkFBbUIsRUFBRSxXQUFXO29CQUNoQyx5QkFBeUIsRUFBRSx5QkFBeUI7b0JBQ3BELGFBQWEsRUFBRSw0R0FBNEc7b0JBQzNILGtCQUFrQixFQUFFLHlCQUF5QjtpQkFDOUM7O2FBQ0Y7Ozs0Q0F1Q2MsUUFBUSxZQUFJLE1BQU0sU0FBQyxRQUFRO1lBaEV0Qiw0QkFBNEI7WUFMTyxVQUFVO1lBQ3hELFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9wdGlvbmFsLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgRWxlbWVudFJlZiwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgRm9jdXNUcmFwLCBDb25maWd1cmFibGVGb2N1c1RyYXBGYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgbGlnaHRib3hBbmltYXRpb24gfSBmcm9tICcuL2xpZ2h0Ym94LmFuaW1hdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpZ2h0Ym94JyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtsaWdodGJveEFuaW1hdGlvbl0sXG4gIHN0eWxlVXJsczogWycuL2xpZ2h0Ym94LmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGdhbGxlcnkgW2lkXT1cImlkXCIgW2Rlc3Ryb3lSZWZdPVwiZmFsc2VcIiBbc2tpcEluaXRDb25maWddPVwidHJ1ZVwiPlxuICAgICAgPGkgY2xhc3M9XCJnLWJ0bi1jbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIChjbGljayk9XCJvdmVybGF5UmVmLmRldGFjaCgpXCJcbiAgICAgICAgIFtpbm5lckhUTUxdPVwic2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGNsb3NlSWNvbilcIj48L2k+XG4gICAgPC9nYWxsZXJ5PlxuICBgLFxuICBob3N0OiB7XG4gICAgJ3RhYmluZGV4JzogJy0xJyxcbiAgICAnYXJpYS1tb2RhbCc6ICd0cnVlJyxcbiAgICAnW2F0dHIuaWRdJzogJ1wibGlnaHRib3gtXCIgKyBpZCcsXG4gICAgJ1thdHRyLnJvbGVdJzogJ3JvbGUnLFxuICAgICdbYXR0ci5hcmlhLWxhYmVsbGVkYnldJzogJ2FyaWFMYWJlbCA/IG51bGwgOiBhcmlhTGFiZWxsZWRCeScsXG4gICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ2FyaWFMYWJlbCcsXG4gICAgJ1thdHRyLmFyaWEtZGVzY3JpYmVkYnldJzogJ2FyaWFEZXNjcmliZWRCeSB8fCBudWxsJyxcbiAgICAnW0BsaWdodGJveF0nOiAneyB2YWx1ZTogc3RhdGUsIHBhcmFtczogeyBzdGFydEFuaW1hdGlvblRpbWU6IHN0YXJ0QW5pbWF0aW9uVGltZSwgZXhpdEFuaW1hdGlvblRpbWU6IGV4aXRBbmltYXRpb25UaW1lIH0gfScsXG4gICAgJyhAbGlnaHRib3guZG9uZSknOiAnb25BbmltYXRpb25Eb25lKCRldmVudCknLFxuICB9XG59KVxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94Q29tcG9uZW50IHtcblxuICAvKiogR2FsbGVyeSByZWYgaWQgKi9cbiAgaWQ6IHN0cmluZztcblxuICAvKiogT3ZlcmxheSByZWYgdG8gY2xvc2UgdGhlIGxpZ2h0Ym94ICovXG4gIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWY7XG5cbiAgLyoqIENsb3NlIGJ1dHRvbiBzdmcgZGF0YSAqL1xuICBjbG9zZUljb246IHN0cmluZztcblxuICAvKiogU3RhdGUgb2YgdGhlIGxpZ2h0Ym94IGFuaW1hdGlvbi4gKi9cbiAgc3RhdGU6ICd2b2lkJyB8ICdlbnRlcicgfCAnZXhpdCcgPSAnZW50ZXInO1xuXG4gIC8qKiBUaGUgQVJJQSByb2xlIG9mIHRoZSBsaWdodGJveCBlbGVtZW50LiAqL1xuICByb2xlOiBzdHJpbmc7XG5cbiAgLyoqIEFyaWEgbGFiZWwgdG8gYXNzaWduIHRvIHRoZSBsaWdodGJveCBlbGVtZW50ICovXG4gIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gIC8qKiBJRCBvZiB0aGUgZWxlbWVudCB0aGF0IHNob3VsZCBiZSBjb25zaWRlcmVkIGFzIHRoZSBsaWdodGJveCdzIGxhYmVsLiAqL1xuICBhcmlhTGFiZWxsZWRCeTogc3RyaW5nO1xuXG4gIC8qKiBJRCBvZiB0aGUgZWxlbWVudCB0aGF0IGRlc2NyaWJlcyB0aGUgbGlnaHRib3guICovXG4gIGFyaWFEZXNjcmliZWRCeTogc3RyaW5nO1xuXG4gIC8qKiBUaGUgbGlnaHRib3ggc3RhcnQgYW5pbWF0aW9uIHRpbWUgaW4gbXMgKi9cbiAgc3RhcnRBbmltYXRpb25UaW1lOiBudW1iZXI7XG5cbiAgLyoqIFRoZSBsaWdodGJveCBleGl0IGFuaW1hdGlvbiB0aW1lIGluIG1zICovXG4gIGV4aXRBbmltYXRpb25UaW1lOiBudW1iZXI7XG5cbiAgLyoqIFRoZSBjbGFzcyB0aGF0IHRyYXBzIGFuZCBtYW5hZ2VzIGZvY3VzIHdpdGhpbiB0aGUgbGlnaHRib3guICovXG4gIHByaXZhdGUgX2ZvY3VzVHJhcDogRm9jdXNUcmFwO1xuXG4gIC8qKiBFbGVtZW50IHRoYXQgd2FzIGZvY3VzZWQgYmVmb3JlIHRoZSBsaWdodGJveCB3YXMgb3BlbmVkLiBTYXZlIHRoaXMgdG8gcmVzdG9yZSB1cG9uIGNsb3NlLiAqL1xuICBwcml2YXRlIF9lbGVtZW50Rm9jdXNlZEJlZm9yZURpYWxvZ1dhc09wZW5lZDogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZm9jdXNUcmFwRmFjdG9yeTogQ29uZmlndXJhYmxlRm9jdXNUcmFwRmFjdG9yeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gICAgdGhpcy5fc2F2ZVByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCgpO1xuICB9XG5cbiAgLyoqIENhbGxiYWNrLCBpbnZva2VkIHdoZW5ldmVyIGFuIGFuaW1hdGlvbiBvbiB0aGUgaG9zdCBjb21wbGV0ZXMuICovXG4gIG9uQW5pbWF0aW9uRG9uZShldmVudDogQW5pbWF0aW9uRXZlbnQpIHtcbiAgICBpZiAoZXZlbnQudG9TdGF0ZSA9PT0gJ2VudGVyJykge1xuICAgICAgdGhpcy5fdHJhcEZvY3VzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3ZlcmxheVJlZi5kaXNwb3NlKCk7XG4gICAgICB0aGlzLl9yZXN0b3JlRm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICAvKiogTW92ZXMgdGhlIGZvY3VzIGluc2lkZSB0aGUgZm9jdXMgdHJhcC4gKi9cbiAgcHJpdmF0ZSBfdHJhcEZvY3VzKCkge1xuICAgIGlmICghdGhpcy5fZm9jdXNUcmFwKSB7XG4gICAgICB0aGlzLl9mb2N1c1RyYXAgPSB0aGlzLl9mb2N1c1RyYXBGYWN0b3J5LmNyZWF0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cbiAgICAvLyBJZiB3ZXJlIHRvIGF0dGVtcHQgdG8gZm9jdXMgaW1tZWRpYXRlbHksIHRoZW4gdGhlIGNvbnRlbnQgb2YgdGhlIGxpZ2h0Ym94IHdvdWxkIG5vdCB5ZXQgYmVcbiAgICAvLyByZWFkeSBpbiBpbnN0YW5jZXMgd2hlcmUgY2hhbmdlIGRldGVjdGlvbiBoYXMgdG8gcnVuIGZpcnN0LiBUbyBkZWFsIHdpdGggdGhpcywgd2Ugc2ltcGx5XG4gICAgLy8gd2FpdCBmb3IgdGhlIG1pY3JvdGFzayBxdWV1ZSB0byBiZSBlbXB0eS5cbiAgICB0aGlzLl9mb2N1c1RyYXAuZm9jdXNJbml0aWFsRWxlbWVudFdoZW5SZWFkeSgpO1xuICB9XG5cbiAgLyoqIFNhdmVzIGEgcmVmZXJlbmNlIHRvIHRoZSBlbGVtZW50IHRoYXQgd2FzIGZvY3VzZWQgYmVmb3JlIHRoZSBsaWdodGJveCB3YXMgb3BlbmVkLiAqL1xuICBwcml2YXRlIF9zYXZlUHJldmlvdXNseUZvY3VzZWRFbGVtZW50KCkge1xuICAgIGlmICh0aGlzLl9kb2N1bWVudCkge1xuICAgICAgdGhpcy5fZWxlbWVudEZvY3VzZWRCZWZvcmVEaWFsb2dXYXNPcGVuZWQgPSB0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICAvLyBOb3RlIHRoYXQgdGhlcmUgaXMgbm8gZm9jdXMgbWV0aG9kIHdoZW4gcmVuZGVyaW5nIG9uIHRoZSBzZXJ2ZXIuXG4gICAgICBpZiAodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKSB7XG4gICAgICAgIC8vIE1vdmUgZm9jdXMgb250byB0aGUgbGlnaHRib3ggaW1tZWRpYXRlbHkgaW4gb3JkZXIgdG8gcHJldmVudCB0aGUgdXNlciBmcm9tIGFjY2lkZW50YWxseVxuICAgICAgICAvLyBvcGVuaW5nIG11bHRpcGxlIGRpYWxvZ3MgYXQgdGhlIHNhbWUgdGltZS4gTmVlZHMgdG8gYmUgYXN5bmMsIGJlY2F1c2UgdGhlIGVsZW1lbnRcbiAgICAgICAgLy8gbWF5IG5vdCBiZSBmb2N1c2FibGUgaW1tZWRpYXRlbHkuXG4gICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKiBSZXN0b3JlcyBmb2N1cyB0byB0aGUgZWxlbWVudCB0aGF0IHdhcyBmb2N1c2VkIGJlZm9yZSB0aGUgbGlnaHRib3ggb3BlbmVkLiAqL1xuICBwcml2YXRlIF9yZXN0b3JlRm9jdXMoKSB7XG4gICAgY29uc3QgdG9Gb2N1cyA9IHRoaXMuX2VsZW1lbnRGb2N1c2VkQmVmb3JlRGlhbG9nV2FzT3BlbmVkO1xuXG4gICAgLy8gV2UgbmVlZCB0aGUgZXh0cmEgY2hlY2ssIGJlY2F1c2UgSUUgY2FuIHNldCB0aGUgYGFjdGl2ZUVsZW1lbnRgIHRvIG51bGwgaW4gc29tZSBjYXNlcy5cbiAgICBpZiAodG9Gb2N1cyAmJiB0eXBlb2YgdG9Gb2N1cy5mb2N1cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdG9Gb2N1cy5mb2N1cygpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9mb2N1c1RyYXApIHtcbiAgICAgIHRoaXMuX2ZvY3VzVHJhcC5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59XG4iXX0=