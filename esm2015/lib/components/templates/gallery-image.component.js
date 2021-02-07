import { Component, Input, HostBinding, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
export class GalleryImageComponent {
    constructor(_sanitizer) {
        this._sanitizer = _sanitizer;
        /** Stream that emits the state */
        this._state = new BehaviorSubject('loading');
        this.state = this._state.asObservable();
        /** Progress value */
        this.progress = 0;
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
    }
    get imageLoadSuccess() {
        return !!this.imageUrl;
    }
    get imageLoadFailed() {
        return !!this.loadError;
    }
    ngOnInit() {
        if (this.loadingIcon) {
            this.loaderTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingIcon);
        }
        if (this.loadingError) {
            this.errorTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingError);
        }
    }
    ngOnDestroy() {
        this._state.complete();
    }
    onProgress({ loaded, total }) {
        this.progress = loaded * 100 / total;
    }
    onLoaded(blobUrl) {
        this.imageUrl = this._sanitizer.bypassSecurityTrustStyle(`url("${blobUrl}")`);
        this._state.next('success');
    }
    onError(err) {
        this.loadError = err;
        this._state.next('failed');
        this.error.emit(err);
    }
}
GalleryImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-image',
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('fadeIn', [
                        transition(':enter', [
                            style({ opacity: 0 }),
                            animate('300ms ease-in', style({ opacity: 1 }))
                        ])
                    ])
                ],
                template: `
    <ng-container [lazyImage]="src"
                  (progress)="onProgress($event)"
                  (loaded)="onLoaded($event)"
                  (error)="onError($event)"
                  [ngSwitch]="state | async">

      <div *ngSwitchCase="'success'"
           @fadeIn
           class="g-image-item"
           [style.backgroundImage]="imageUrl">
      </div>

      <div *ngSwitchCase="'failed'"
           class="g-image-error-message">
        <div *ngIf="errorTemplate; else defaultError"
             [innerHTML]="errorTemplate"></div>
        <ng-template #defaultError>
          <ng-container *ngIf="isThumbnail; else isLarge">
            <h4>⚠</h4>
          </ng-container>
          <ng-template #isLarge>
            <h2>⚠</h2>
            <p>Unable to load the image!</p>
          </ng-template>
        </ng-template>
      </div>

      <ng-container *ngSwitchCase="'loading'">
        <div *ngIf="loaderTemplate; else defaultLoader"
             class="g-loading"
             [innerHTML]="loaderTemplate">
        </div>
        <ng-template #defaultLoader>
          <div *ngIf="isThumbnail" class="g-thumb-loading"></div>
        </ng-template>
      </ng-container>
    </ng-container>
  `
            },] }
];
GalleryImageComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
GalleryImageComponent.propDecorators = {
    isThumbnail: [{ type: Input }],
    src: [{ type: Input }],
    loadingIcon: [{ type: Input }],
    loadingError: [{ type: Input }],
    error: [{ type: Output }],
    imageLoadSuccess: [{ type: HostBinding, args: ['class.g-image-loaded',] }],
    imageLoadFailed: [{ type: HostBinding, args: ['class.g-image-error',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1pbWFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvY29tcG9uZW50cy90ZW1wbGF0ZXMvZ2FsbGVyeS1pbWFnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQUUsdUJBQXVCLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDaEksT0FBTyxFQUFFLFlBQVksRUFBdUIsTUFBTSwyQkFBMkIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQXNEdkMsTUFBTSxPQUFPLHFCQUFxQjtJQXdDaEMsWUFBb0IsVUFBd0I7UUFBeEIsZUFBVSxHQUFWLFVBQVUsQ0FBYztRQXRDNUMsa0NBQWtDO1FBQ2pCLFdBQU0sR0FBRyxJQUFJLGVBQWUsQ0FBbUMsU0FBUyxDQUFDLENBQUM7UUFDbEYsVUFBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFNUMscUJBQXFCO1FBQ3JCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFvQmIsNkNBQTZDO1FBQ25DLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUyxDQUFDO0lBYTVDLENBQUM7SUFURCxJQUF5QyxnQkFBZ0I7UUFDdkQsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBd0MsZUFBZTtRQUNyRCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFLRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakY7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNqRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsVUFBVSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBb0M7UUFDM0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztJQUN2QyxDQUFDO0lBRUQsUUFBUSxDQUFDLE9BQWU7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsT0FBTyxJQUFJLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQVU7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkIsQ0FBQzs7O1lBekhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTtnQkFDekIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFVBQVUsRUFBRTtvQkFDVixPQUFPLENBQUMsUUFBUSxFQUFFO3dCQUNoQixVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNuQixLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUM7NEJBQ25CLE9BQU8sQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7eUJBQzlDLENBQUM7cUJBQ0gsQ0FBQztpQkFDSDtnQkFDRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NUO2FBQ0Y7OztZQXREUSxZQUFZOzs7MEJBa0VsQixLQUFLO2tCQUdMLEtBQUs7MEJBS0wsS0FBSzsyQkFLTCxLQUFLO29CQUtMLE1BQU07K0JBSU4sV0FBVyxTQUFDLHNCQUFzQjs4QkFJbEMsV0FBVyxTQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEhvc3RCaW5kaW5nLCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sLCBTYWZlU3R5bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IGFuaW1hdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ2FsbGVyeS1pbWFnZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmFkZUluJywgW1xuICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICBzdHlsZSh7b3BhY2l0eTogMH0pLFxuICAgICAgICBhbmltYXRlKCczMDBtcyBlYXNlLWluJywgc3R5bGUoe29wYWNpdHk6IDF9KSlcbiAgICAgIF0pXG4gICAgXSlcbiAgXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyIFtsYXp5SW1hZ2VdPVwic3JjXCJcbiAgICAgICAgICAgICAgICAgIChwcm9ncmVzcyk9XCJvblByb2dyZXNzKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgKGxvYWRlZCk9XCJvbkxvYWRlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgIChlcnJvcik9XCJvbkVycm9yKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgW25nU3dpdGNoXT1cInN0YXRlIHwgYXN5bmNcIj5cblxuICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ3N1Y2Nlc3MnXCJcbiAgICAgICAgICAgQGZhZGVJblxuICAgICAgICAgICBjbGFzcz1cImctaW1hZ2UtaXRlbVwiXG4gICAgICAgICAgIFtzdHlsZS5iYWNrZ3JvdW5kSW1hZ2VdPVwiaW1hZ2VVcmxcIj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInZmFpbGVkJ1wiXG4gICAgICAgICAgIGNsYXNzPVwiZy1pbWFnZS1lcnJvci1tZXNzYWdlXCI+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJlcnJvclRlbXBsYXRlOyBlbHNlIGRlZmF1bHRFcnJvclwiXG4gICAgICAgICAgICAgW2lubmVySFRNTF09XCJlcnJvclRlbXBsYXRlXCI+PC9kaXY+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEVycm9yPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1RodW1ibmFpbDsgZWxzZSBpc0xhcmdlXCI+XG4gICAgICAgICAgICA8aDQ+4pqgPC9oND5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2lzTGFyZ2U+XG4gICAgICAgICAgICA8aDI+4pqgPC9oMj5cbiAgICAgICAgICAgIDxwPlVuYWJsZSB0byBsb2FkIHRoZSBpbWFnZSE8L3A+XG4gICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInbG9hZGluZydcIj5cbiAgICAgICAgPGRpdiAqbmdJZj1cImxvYWRlclRlbXBsYXRlOyBlbHNlIGRlZmF1bHRMb2FkZXJcIlxuICAgICAgICAgICAgIGNsYXNzPVwiZy1sb2FkaW5nXCJcbiAgICAgICAgICAgICBbaW5uZXJIVE1MXT1cImxvYWRlclRlbXBsYXRlXCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRMb2FkZXI+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImlzVGh1bWJuYWlsXCIgY2xhc3M9XCJnLXRodW1iLWxvYWRpbmdcIj48L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuXG5leHBvcnQgY2xhc3MgR2FsbGVyeUltYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB0aGUgc3RhdGUgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfc3RhdGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PCdsb2FkaW5nJyB8ICdzdWNjZXNzJyB8ICdmYWlsZWQnPignbG9hZGluZycpO1xuICByZWFkb25seSBzdGF0ZSA9IHRoaXMuX3N0YXRlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKiBQcm9ncmVzcyB2YWx1ZSAqL1xuICBwcm9ncmVzcyA9IDA7XG5cbiAgLyoqIElzIHRodW1ibmFpbCAqL1xuICBASW5wdXQoKSBpc1RodW1ibmFpbDogYm9vbGVhbjtcblxuICAvKiogSW1hZ2Ugc291cmNlIFVSTCAqL1xuICBASW5wdXQoKSBzcmM6IHN0cmluZztcbiAgLyoqIExvYWRlZCBpbWFnZSBVUkwgKi9cbiAgaW1hZ2VVcmw6IFNhZmVTdHlsZTtcblxuICAvKiogQ3VzdG9tIGxvYWRlciB0ZW1wbGF0ZSAqL1xuICBASW5wdXQoKSBsb2FkaW5nSWNvbjogc3RyaW5nO1xuICAvKiogQ3VzdG9tIGxvYWRlciBzYWZlIHRlbXBsYXRlICovXG4gIGxvYWRlclRlbXBsYXRlOiBTYWZlSHRtbDtcblxuICAvKiogQ3VzdG9tIGVycm9yIHRlbXBsYXRlICovXG4gIEBJbnB1dCgpIGxvYWRpbmdFcnJvcjogc3RyaW5nO1xuICAvKiogQ3VzdG9tIGVycm9yIHNhZmUgdGVtcGxhdGUgKi9cbiAgZXJyb3JUZW1wbGF0ZTogU2FmZUh0bWw7XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYW4gZXJyb3Igb2NjdXJzICovXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3I+KCk7XG4gIC8qKiBsb2FkaW5nIGVycm9yICovXG4gIGxvYWRFcnJvcjogRXJyb3I7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5nLWltYWdlLWxvYWRlZCcpIGdldCBpbWFnZUxvYWRTdWNjZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuaW1hZ2VVcmw7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmctaW1hZ2UtZXJyb3InKSBnZXQgaW1hZ2VMb2FkRmFpbGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMubG9hZEVycm9yO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmxvYWRpbmdJY29uKSB7XG4gICAgICB0aGlzLmxvYWRlclRlbXBsYXRlID0gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHRoaXMubG9hZGluZ0ljb24pO1xuICAgIH1cbiAgICBpZiAodGhpcy5sb2FkaW5nRXJyb3IpIHtcbiAgICAgIHRoaXMuZXJyb3JUZW1wbGF0ZSA9IHRoaXMuX3Nhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbCh0aGlzLmxvYWRpbmdFcnJvcik7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5fc3RhdGUuY29tcGxldGUoKTtcbiAgfVxuXG4gIG9uUHJvZ3Jlc3Moe2xvYWRlZCwgdG90YWx9OiB7IGxvYWRlZDogbnVtYmVyLCB0b3RhbDogbnVtYmVyIH0pIHtcbiAgICB0aGlzLnByb2dyZXNzID0gbG9hZGVkICogMTAwIC8gdG90YWw7XG4gIH1cblxuICBvbkxvYWRlZChibG9iVXJsOiBzdHJpbmcpIHtcbiAgICB0aGlzLmltYWdlVXJsID0gdGhpcy5fc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgdXJsKFwiJHtibG9iVXJsfVwiKWApO1xuICAgIHRoaXMuX3N0YXRlLm5leHQoJ3N1Y2Nlc3MnKTtcbiAgfVxuXG4gIG9uRXJyb3IoZXJyOiBFcnJvcikge1xuICAgIHRoaXMubG9hZEVycm9yID0gZXJyO1xuICAgIHRoaXMuX3N0YXRlLm5leHQoJ2ZhaWxlZCcpO1xuICAgIHRoaXMuZXJyb3IuZW1pdChlcnIpO1xuICB9XG5cbn1cbiJdfQ==