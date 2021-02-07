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
                    TapClick
                ],
                exports: [
                    GalleryComponent,
                    LazyImage,
                    TapClick
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvZ2FsbGVyeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBaUIsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFFakYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDdkYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFFekYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3BELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQTRCbEQsTUFBTSxPQUFPLGFBQWE7SUFDeEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFxQjtRQUVyQyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxjQUFjO29CQUN2QixRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUF0Q0YsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUNiO2dCQUNELFlBQVksRUFBRTtvQkFDWixnQkFBZ0I7b0JBQ2hCLG1CQUFtQjtvQkFDbkIsb0JBQW9CO29CQUNwQixvQkFBb0I7b0JBQ3BCLHNCQUFzQjtvQkFDdEIsdUJBQXVCO29CQUN2QixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsb0JBQW9CO29CQUNwQixxQkFBcUI7b0JBQ3JCLHFCQUFxQjtvQkFDckIsc0JBQXNCO29CQUN0QixTQUFTO29CQUNULFFBQVE7aUJBQ1Q7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGdCQUFnQjtvQkFDaEIsU0FBUztvQkFDVCxRQUFRO2lCQUNUO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgR2FsbGVyeUNvbmZpZywgR0FMTEVSWV9DT05GSUcgfSBmcm9tICcuL21vZGVscy9jb25maWcubW9kZWwnO1xuXG5pbXBvcnQgeyBHYWxsZXJ5Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2dhbGxlcnkuY29tcG9uZW50JztcbmltcG9ydCB7IEdhbGxlcnlOYXZDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FsbGVyeS1uYXYuY29tcG9uZW50JztcbmltcG9ydCB7IEdhbGxlcnlDb3JlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2dhbGxlcnktY29yZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2FsbGVyeURvdHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FsbGVyeS1kb3RzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5VGh1bWJzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2dhbGxlcnktdGh1bWJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5U2xpZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2dhbGxlcnktc2xpZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5Q291bnRlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9nYWxsZXJ5LWNvdW50ZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgR2FsbGVyeUl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FsbGVyeS1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5VGh1bWJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZ2FsbGVyeS10aHVtYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2FsbGVyeUltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RlbXBsYXRlcy9nYWxsZXJ5LWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBHYWxsZXJ5VmlkZW9Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGVtcGxhdGVzL2dhbGxlcnktdmlkZW8uY29tcG9uZW50JztcbmltcG9ydCB7IEdhbGxlcnlJZnJhbWVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGVtcGxhdGVzL2dhbGxlcnktaWZyYW1lLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IExhenlJbWFnZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9sYXp5LWltYWdlJztcbmltcG9ydCB7IFRhcENsaWNrIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3RhcC1jbGljayc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR2FsbGVyeUNvbXBvbmVudCxcbiAgICBHYWxsZXJ5TmF2Q29tcG9uZW50LFxuICAgIEdhbGxlcnlEb3RzQ29tcG9uZW50LFxuICAgIEdhbGxlcnlDb3JlQ29tcG9uZW50LFxuICAgIEdhbGxlcnlTbGlkZXJDb21wb25lbnQsXG4gICAgR2FsbGVyeUNvdW50ZXJDb21wb25lbnQsXG4gICAgR2FsbGVyeVRodW1ic0NvbXBvbmVudCxcbiAgICBHYWxsZXJ5VGh1bWJDb21wb25lbnQsXG4gICAgR2FsbGVyeUl0ZW1Db21wb25lbnQsXG4gICAgR2FsbGVyeUltYWdlQ29tcG9uZW50LFxuICAgIEdhbGxlcnlWaWRlb0NvbXBvbmVudCxcbiAgICBHYWxsZXJ5SWZyYW1lQ29tcG9uZW50LFxuICAgIExhenlJbWFnZSxcbiAgICBUYXBDbGlja1xuICBdLFxuICBleHBvcnRzOiBbXG4gICAgR2FsbGVyeUNvbXBvbmVudCxcbiAgICBMYXp5SW1hZ2UsXG4gICAgVGFwQ2xpY2tcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5TW9kdWxlIHtcbiAgc3RhdGljIHdpdGhDb25maWcoY29uZmlnOiBHYWxsZXJ5Q29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVyczxHYWxsZXJ5TW9kdWxlPiB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEdhbGxlcnlNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IEdBTExFUllfQ09ORklHLFxuICAgICAgICAgIHVzZVZhbHVlOiBjb25maWdcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==