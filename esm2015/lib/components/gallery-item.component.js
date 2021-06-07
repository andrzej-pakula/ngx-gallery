import { Component, Input, ChangeDetectionStrategy, HostBinding, Output, EventEmitter } from '@angular/core';
import { LoadingStrategy, GalleryItemType } from '../models/constants';
export class GalleryItemComponent {
    constructor() {
        this.Types = GalleryItemType;
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
        this.youtubeItemClickEvent = new EventEmitter();
    }
    get isActive() {
        return this.index === this.currIndex;
    }
    get isAutoPlay() {
        if (this.isActive) {
            if (this.type === GalleryItemType.Video || this.type === GalleryItemType.Youtube) {
                return this.data.autoplay;
            }
        }
    }
    get youtubeSrc() {
        let autoplay = 0;
        if (this.isActive && this.type === GalleryItemType.Youtube && this.data.autoplay) {
            autoplay = 1;
        }
        const url = new URL(this.data.src);
        url.search = new URLSearchParams(Object.assign(Object.assign({ wmode: 'transparent' }, this.data.params), { autoplay })).toString();
        return url.href;
    }
    get load() {
        switch (this.config.loadingStrategy) {
            case LoadingStrategy.Preload:
                return true;
            case LoadingStrategy.Lazy:
                return this.currIndex === this.index;
            default:
                return this.currIndex === this.index || this.currIndex === this.index - 1 || this.currIndex === this.index + 1;
        }
    }
}
GalleryItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-item',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <ng-container *ngIf="load" [ngSwitch]="type">

      <ng-container *ngSwitchCase="Types.Image">

        <gallery-image [src]="data.src"
                       [loadingIcon]="config.loadingIcon"
                       [loadingError]="config.loadingError"
                       (error)="error.emit($event)"></gallery-image>

        <div class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

      <gallery-video *ngSwitchCase="Types.Video"
                     [src]="data.src"
                     [poster]="data.poster"
                     [controls]="data.controls"
                     [play]="isAutoPlay"
                     [pause]="currIndex !== index"
                     (error)="error.emit($event)"></gallery-video>

      <gallery-iframe
                      *ngSwitchCase="Types.Youtube"
                      [src]="youtubeSrc"
                      [autoplay]="isAutoPlay"
                      [pause]="currIndex !== index"
                      (iframeClickEvent)="youtubeItemClickEvent.emit($event)"
      ></gallery-iframe>

      <gallery-iframe *ngSwitchCase="Types.Iframe"
                      [src]="data.src"></gallery-iframe>

      <ng-container *ngSwitchDefault>

        <div class="g-template g-item-template">
          <ng-container *ngTemplateOutlet="config.itemTemplate;
          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }">
          </ng-container>
        </div>

      </ng-container>

    </ng-container>
  `
            },] }
];
GalleryItemComponent.propDecorators = {
    config: [{ type: Input }],
    index: [{ type: Input }],
    currIndex: [{ type: Input }],
    type: [{ type: Input }],
    data: [{ type: Input }],
    error: [{ type: Output }],
    youtubeItemClickEvent: [{ type: Output }],
    isActive: [{ type: HostBinding, args: ['class.g-active-item',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWdhbGxlcnkvc3JjL2xpYi9jb21wb25lbnRzL2dhbGxlcnktaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBQ0wsdUJBQXVCLEVBQ3ZCLFdBQVcsRUFDWCxNQUFNLEVBQ04sWUFBWSxFQUViLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUF1RHZFLE1BQU0sT0FBTyxvQkFBb0I7SUFyRGpDO1FBdURXLFVBQUssR0FBRyxlQUFlLENBQUM7UUFpQmpDLDZDQUE2QztRQUNuQyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVMsQ0FBQztRQUVsQywwQkFBcUIsR0FBRyxJQUFJLFlBQVksRUFBYyxDQUFDO0lBc0NuRSxDQUFDO0lBcENDLElBQXdDLFFBQVE7UUFDOUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDM0I7U0FDRjtJQUNILENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixJQUFJLFFBQVEsR0FBVSxDQUFDLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoRixRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFlLCtCQUM5QixLQUFLLEVBQUUsYUFBYSxJQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FDbkIsUUFBUSxJQUNSLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7WUFDbkMsS0FBSyxlQUFlLENBQUMsT0FBTztnQkFDMUIsT0FBTyxJQUFJLENBQUM7WUFDZCxLQUFLLGVBQWUsQ0FBQyxJQUFJO2dCQUN2QixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN2QztnQkFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbEg7SUFDSCxDQUFDOzs7WUFoSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnRFQ7YUFDRjs7O3FCQU1FLEtBQUs7b0JBR0wsS0FBSzt3QkFHTCxLQUFLO21CQUdMLEtBQUs7bUJBR0wsS0FBSztvQkFHTCxNQUFNO29DQUVOLE1BQU07dUJBRU4sV0FBVyxTQUFDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBIb3N0QmluZGluZyxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIEVsZW1lbnRSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHYWxsZXJ5Q29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL2NvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBMb2FkaW5nU3RyYXRlZ3ksIEdhbGxlcnlJdGVtVHlwZSB9IGZyb20gJy4uL21vZGVscy9jb25zdGFudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnYWxsZXJ5LWl0ZW0nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibG9hZFwiIFtuZ1N3aXRjaF09XCJ0eXBlXCI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIlR5cGVzLkltYWdlXCI+XG5cbiAgICAgICAgPGdhbGxlcnktaW1hZ2UgW3NyY109XCJkYXRhLnNyY1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtsb2FkaW5nSWNvbl09XCJjb25maWcubG9hZGluZ0ljb25cIlxuICAgICAgICAgICAgICAgICAgICAgICBbbG9hZGluZ0Vycm9yXT1cImNvbmZpZy5sb2FkaW5nRXJyb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpPVwiZXJyb3IuZW1pdCgkZXZlbnQpXCI+PC9nYWxsZXJ5LWltYWdlPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnLXRlbXBsYXRlIGctaXRlbS10ZW1wbGF0ZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb25maWcuaXRlbVRlbXBsYXRlO1xuICAgICAgICAgIGNvbnRleHQ6IHsgaW5kZXg6IHRoaXMuaW5kZXgsIGN1cnJJbmRleDogdGhpcy5jdXJySW5kZXgsIHR5cGU6IHRoaXMudHlwZSwgZGF0YTogdGhpcy5kYXRhIH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8Z2FsbGVyeS12aWRlbyAqbmdTd2l0Y2hDYXNlPVwiVHlwZXMuVmlkZW9cIlxuICAgICAgICAgICAgICAgICAgICAgW3NyY109XCJkYXRhLnNyY1wiXG4gICAgICAgICAgICAgICAgICAgICBbcG9zdGVyXT1cImRhdGEucG9zdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjb250cm9sc109XCJkYXRhLmNvbnRyb2xzXCJcbiAgICAgICAgICAgICAgICAgICAgIFtwbGF5XT1cImlzQXV0b1BsYXlcIlxuICAgICAgICAgICAgICAgICAgICAgW3BhdXNlXT1cImN1cnJJbmRleCAhPT0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgKGVycm9yKT1cImVycm9yLmVtaXQoJGV2ZW50KVwiPjwvZ2FsbGVyeS12aWRlbz5cblxuICAgICAgPGdhbGxlcnktaWZyYW1lXG4gICAgICAgICAgICAgICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIlR5cGVzLllvdXR1YmVcIlxuICAgICAgICAgICAgICAgICAgICAgIFtzcmNdPVwieW91dHViZVNyY1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2F1dG9wbGF5XT1cImlzQXV0b1BsYXlcIlxuICAgICAgICAgICAgICAgICAgICAgIFtwYXVzZV09XCJjdXJySW5kZXggIT09IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAoaWZyYW1lQ2xpY2tFdmVudCk9XCJ5b3V0dWJlSXRlbUNsaWNrRXZlbnQuZW1pdCgkZXZlbnQpXCJcbiAgICAgID48L2dhbGxlcnktaWZyYW1lPlxuXG4gICAgICA8Z2FsbGVyeS1pZnJhbWUgKm5nU3dpdGNoQ2FzZT1cIlR5cGVzLklmcmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW3NyY109XCJkYXRhLnNyY1wiPjwvZ2FsbGVyeS1pZnJhbWU+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoRGVmYXVsdD5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiZy10ZW1wbGF0ZSBnLWl0ZW0tdGVtcGxhdGVcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29uZmlnLml0ZW1UZW1wbGF0ZTtcbiAgICAgICAgICBjb250ZXh0OiB7IGluZGV4OiB0aGlzLmluZGV4LCBjdXJySW5kZXg6IHRoaXMuY3VyckluZGV4LCB0eXBlOiB0aGlzLnR5cGUsIGRhdGE6IHRoaXMuZGF0YSB9XCI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbmctY29udGFpbmVyPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlJdGVtQ29tcG9uZW50IHtcblxuICByZWFkb25seSBUeXBlcyA9IEdhbGxlcnlJdGVtVHlwZTtcblxuICAvKiogR2FsbGVyeSBjb25maWcgKi9cbiAgQElucHV0KCkgY29uZmlnOiBHYWxsZXJ5Q29uZmlnO1xuXG4gIC8qKiBJdGVtJ3MgaW5kZXggaW4gdGhlIGdhbGxlcnkgKi9cbiAgQElucHV0KCkgaW5kZXg6IG51bWJlcjtcblxuICAvKiogR2FsbGVyeSBjdXJyZW50IGluZGV4ICovXG4gIEBJbnB1dCgpIGN1cnJJbmRleDogbnVtYmVyO1xuXG4gIC8qKiBJdGVtJ3MgdHlwZSAnaW1hZ2UnLCAndmlkZW8nLCAneW91dHViZScsICdpZnJhbWUnICovXG4gIEBJbnB1dCgpIHR5cGU6IHN0cmluZztcblxuICAvKiogSXRlbSdzIGRhdGEsIHRoaXMgb2JqZWN0IGNvbnRhaW5zIHRoZSBkYXRhIHJlcXVpcmVkIHRvIGRpc3BsYXkgdGhlIGNvbnRlbnQgKGUuZy4gc3JjIHBhdGgpICovXG4gIEBJbnB1dCgpIGRhdGE6IGFueTtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBhbiBlcnJvciBvY2N1cnMgKi9cbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxFcnJvcj4oKTtcblxuICBAT3V0cHV0KCkgeW91dHViZUl0ZW1DbGlja0V2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxFbGVtZW50UmVmPigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZy1hY3RpdmUtaXRlbScpIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleCA9PT0gdGhpcy5jdXJySW5kZXg7XG4gIH1cblxuICBnZXQgaXNBdXRvUGxheSgpIHtcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gR2FsbGVyeUl0ZW1UeXBlLlZpZGVvIHx8IHRoaXMudHlwZSA9PT0gR2FsbGVyeUl0ZW1UeXBlLllvdXR1YmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5hdXRvcGxheTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgeW91dHViZVNyYygpIHtcbiAgICBsZXQgYXV0b3BsYXk6IDEgfCAwID0gMDtcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSAmJiB0aGlzLnR5cGUgPT09IEdhbGxlcnlJdGVtVHlwZS5Zb3V0dWJlICYmIHRoaXMuZGF0YS5hdXRvcGxheSkge1xuICAgICAgYXV0b3BsYXkgPSAxO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRoaXMuZGF0YS5zcmMpO1xuICAgIHVybC5zZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgIHdtb2RlOiAndHJhbnNwYXJlbnQnLFxuICAgICAgLi4udGhpcy5kYXRhLnBhcmFtcyxcbiAgICAgIGF1dG9wbGF5XG4gICAgfSkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gdXJsLmhyZWY7XG4gIH1cblxuICBnZXQgbG9hZCgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY29uZmlnLmxvYWRpbmdTdHJhdGVneSkge1xuICAgICAgY2FzZSBMb2FkaW5nU3RyYXRlZ3kuUHJlbG9hZDpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlIExvYWRpbmdTdHJhdGVneS5MYXp5OlxuICAgICAgICByZXR1cm4gdGhpcy5jdXJySW5kZXggPT09IHRoaXMuaW5kZXg7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5jdXJySW5kZXggPT09IHRoaXMuaW5kZXggfHwgdGhpcy5jdXJySW5kZXggPT09IHRoaXMuaW5kZXggLSAxIHx8IHRoaXMuY3VyckluZGV4ID09PSB0aGlzLmluZGV4ICsgMTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==