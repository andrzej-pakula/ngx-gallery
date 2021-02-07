import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { GalleryModule } from 'ng-gallery';
// Uncomment the following line in development mode
// import { GalleryModule } from '../../src/public-api';
import { Lightbox } from './lightbox.service';
import { LightboxComponent } from './lightbox.component';
import { LightboxDirective } from './lightbox.directive';
import { LIGHTBOX_CONFIG } from './lightbox.model';
import { GallerizeDirective } from './gallerize.directive';
export class LightboxModule {
    static withConfig(config) {
        return {
            ngModule: LightboxModule,
            providers: [
                {
                    provide: LIGHTBOX_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
LightboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    OverlayModule,
                    GalleryModule,
                    A11yModule
                ],
                declarations: [
                    LightboxComponent,
                    LightboxDirective,
                    GallerizeDirective
                ],
                exports: [
                    LightboxDirective,
                    GallerizeDirective
                ],
                providers: [
                    Lightbox
                ],
                entryComponents: [
                    LightboxComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9saWdodGJveC9zcmMvbGlnaHRib3gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxtREFBbUQ7QUFDbkQsd0RBQXdEO0FBRXhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQWtCLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBd0IzRCxNQUFNLE9BQU8sY0FBYztJQUN6QixNQUFNLENBQUMsVUFBVSxDQUFDLE1BQXNCO1FBQ3RDLE9BQU87WUFDTCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFFBQVEsRUFBRSxNQUFNO2lCQUNqQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWpDRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixVQUFVO2lCQUNYO2dCQUNELFlBQVksRUFBRTtvQkFDWixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtvQkFDakIsa0JBQWtCO2lCQUNuQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsaUJBQWlCO29CQUNqQixrQkFBa0I7aUJBQ25CO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxRQUFRO2lCQUNUO2dCQUNELGVBQWUsRUFBRTtvQkFDZixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3ZlcmxheU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IEExMXlNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jZGsvYTExeSc7XG5cbmltcG9ydCB7IEdhbGxlcnlNb2R1bGUgfSBmcm9tICduZy1nYWxsZXJ5Jztcbi8vIFVuY29tbWVudCB0aGUgZm9sbG93aW5nIGxpbmUgaW4gZGV2ZWxvcG1lbnQgbW9kZVxuLy8gaW1wb3J0IHsgR2FsbGVyeU1vZHVsZSB9IGZyb20gJy4uLy4uL3NyYy9wdWJsaWMtYXBpJztcblxuaW1wb3J0IHsgTGlnaHRib3ggfSBmcm9tICcuL2xpZ2h0Ym94LnNlcnZpY2UnO1xuaW1wb3J0IHsgTGlnaHRib3hDb21wb25lbnQgfSBmcm9tICcuL2xpZ2h0Ym94LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaWdodGJveERpcmVjdGl2ZSB9IGZyb20gJy4vbGlnaHRib3guZGlyZWN0aXZlJztcbmltcG9ydCB7IExpZ2h0Ym94Q29uZmlnLCBMSUdIVEJPWF9DT05GSUcgfSBmcm9tICcuL2xpZ2h0Ym94Lm1vZGVsJztcbmltcG9ydCB7IEdhbGxlcml6ZURpcmVjdGl2ZSB9IGZyb20gJy4vZ2FsbGVyaXplLmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBPdmVybGF5TW9kdWxlLFxuICAgIEdhbGxlcnlNb2R1bGUsXG4gICAgQTExeU1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBMaWdodGJveENvbXBvbmVudCxcbiAgICBMaWdodGJveERpcmVjdGl2ZSxcbiAgICBHYWxsZXJpemVEaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExpZ2h0Ym94RGlyZWN0aXZlLFxuICAgIEdhbGxlcml6ZURpcmVjdGl2ZVxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBMaWdodGJveFxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBMaWdodGJveENvbXBvbmVudFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94TW9kdWxlIHtcbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnOiBMaWdodGJveENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8TGlnaHRib3hNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IExpZ2h0Ym94TW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMSUdIVEJPWF9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19