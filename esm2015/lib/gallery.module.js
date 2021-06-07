import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GALLERY_CONFIG } from './models/config.model';
import { GalleryComponent } from './components/gallery.component';
import { GalleryNavComponent } from './components/gallery-nav.component';
import { GalleryCoreComponent } from './components/gallery-core.component';
import { GalleryDotsComponent } from './components/gallery-dots.component';
import { GalleryThumbsComponent } from './components/gallery-thumbs.component';
import { GallerySliderComponent } from './components/gallery-slider.component';
import { GalleryCounterComponent } from './components/gallery-counter.component';
import { GalleryItemComponent } from './components/gallery-item.component';
import { GalleryThumbComponent } from './components/gallery-thumb.component';
import { GalleryImageComponent } from './components/templates/gallery-image.component';
import { GalleryVideoComponent } from './components/templates/gallery-video.component';
import { GalleryIframeComponent } from './components/templates/gallery-iframe.component';
import { LazyImage } from './directives/lazy-image';
import { TapClick } from './directives/tap-click';
import { IframeTracker } from "./directives/iframe-tracker";
export class GalleryModule {
    static withConfig(config) {
        return {
            ngModule: GalleryModule,
            providers: [
                {
                    provide: GALLERY_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
GalleryModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    GalleryComponent,
                    GalleryNavComponent,
                    GalleryDotsComponent,
                    GalleryCoreComponent,
                    GallerySliderComponent,
                    GalleryCounterComponent,
                    GalleryThumbsComponent,
                    GalleryThumbComponent,
                    GalleryItemComponent,
                    GalleryImageComponent,
                    GalleryVideoComponent,
                    GalleryIframeComponent,
                    LazyImage,
                    TapClick,
                    IframeTracker,
                ],
                exports: [
                    GalleryComponent,
                    LazyImage,
                    TapClick,
                    IframeTracker,
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvZ2FsbGVyeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBaUIsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFFekYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUE4QjVELE1BQU0sT0FBTyxhQUFhO0lBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBcUI7UUFFckMsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUsY0FBYztvQkFDdkIsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBeENGLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osZ0JBQWdCO29CQUNoQixtQkFBbUI7b0JBQ25CLG9CQUFvQjtvQkFDcEIsb0JBQW9CO29CQUNwQixzQkFBc0I7b0JBQ3RCLHVCQUF1QjtvQkFDdkIsc0JBQXNCO29CQUN0QixxQkFBcUI7b0JBQ3JCLG9CQUFvQjtvQkFDcEIscUJBQXFCO29CQUNyQixxQkFBcUI7b0JBQ3JCLHNCQUFzQjtvQkFDdEIsU0FBUztvQkFDVCxRQUFRO29CQUNSLGFBQWE7aUJBQ2Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGdCQUFnQjtvQkFDaEIsU0FBUztvQkFDVCxRQUFRO29CQUNSLGFBQWE7aUJBQ2Q7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBHYWxsZXJ5Q29uZmlnLCBHQUxMRVJZX0NPTkZJRyB9IGZyb20gJy4vbW9kZWxzL2NvbmZpZy5tb2RlbCc7XG5cbmltcG9ydCB7IEdhbGxlcnlDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FsbGVyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2FsbGVyeU5hdkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9nYWxsZXJ5LW5hdi5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2FsbGVyeUNvcmVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FsbGVyeS1jb3JlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5RG90c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9nYWxsZXJ5LWRvdHMuY29tcG9uZW50JztcbmltcG9ydCB7IEdhbGxlcnlUaHVtYnNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FsbGVyeS10aHVtYnMuY29tcG9uZW50JztcbmltcG9ydCB7IEdhbGxlcnlTbGlkZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FsbGVyeS1zbGlkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEdhbGxlcnlDb3VudGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2dhbGxlcnktY291bnRlci5jb21wb25lbnQnO1xuXG5pbXBvcnQgeyBHYWxsZXJ5SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9nYWxsZXJ5LWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IEdhbGxlcnlUaHVtYkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9nYWxsZXJ5LXRodW1iLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5SW1hZ2VDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGVtcGxhdGVzL2dhbGxlcnktaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IEdhbGxlcnlWaWRlb0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90ZW1wbGF0ZXMvZ2FsbGVyeS12aWRlby5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2FsbGVyeUlmcmFtZUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90ZW1wbGF0ZXMvZ2FsbGVyeS1pZnJhbWUuY29tcG9uZW50JztcblxuaW1wb3J0IHsgTGF6eUltYWdlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2xhenktaW1hZ2UnO1xuaW1wb3J0IHsgVGFwQ2xpY2sgfSBmcm9tICcuL2RpcmVjdGl2ZXMvdGFwLWNsaWNrJztcbmltcG9ydCB7IElmcmFtZVRyYWNrZXIgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2lmcmFtZS10cmFja2VyXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR2FsbGVyeUNvbXBvbmVudCxcbiAgICBHYWxsZXJ5TmF2Q29tcG9uZW50LFxuICAgIEdhbGxlcnlEb3RzQ29tcG9uZW50LFxuICAgIEdhbGxlcnlDb3JlQ29tcG9uZW50LFxuICAgIEdhbGxlcnlTbGlkZXJDb21wb25lbnQsXG4gICAgR2FsbGVyeUNvdW50ZXJDb21wb25lbnQsXG4gICAgR2FsbGVyeVRodW1ic0NvbXBvbmVudCxcbiAgICBHYWxsZXJ5VGh1bWJDb21wb25lbnQsXG4gICAgR2FsbGVyeUl0ZW1Db21wb25lbnQsXG4gICAgR2FsbGVyeUltYWdlQ29tcG9uZW50LFxuICAgIEdhbGxlcnlWaWRlb0NvbXBvbmVudCxcbiAgICBHYWxsZXJ5SWZyYW1lQ29tcG9uZW50LFxuICAgIExhenlJbWFnZSxcbiAgICBUYXBDbGljayxcbiAgICBJZnJhbWVUcmFja2VyLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgR2FsbGVyeUNvbXBvbmVudCxcbiAgICBMYXp5SW1hZ2UsXG4gICAgVGFwQ2xpY2ssXG4gICAgSWZyYW1lVHJhY2tlcixcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5TW9kdWxlIHtcbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnOiBHYWxsZXJ5Q29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxHYWxsZXJ5TW9kdWxlPiB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEdhbGxlcnlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEdBTExFUllfQ09ORklHLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==