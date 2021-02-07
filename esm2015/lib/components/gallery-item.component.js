import { Component, Input, ChangeDetectionStrategy, HostBinding, Output, EventEmitter } from '@angular/core';
import { LoadingStrategy, GalleryItemType } from '../models/constants';
export class GalleryItemComponent {
    constructor() {
        this.Types = GalleryItemType;
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
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

      <gallery-iframe *ngSwitchCase="Types.Youtube"
                      [src]="youtubeSrc"
                      [autoplay]="isAutoPlay"
                      [pause]="currIndex !== index"></gallery-iframe>

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
    isActive: [{ type: HostBinding, args: ['class.g-active-item',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWdhbGxlcnkvc3JjL2xpYi9jb21wb25lbnRzL2dhbGxlcnktaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsdUJBQXVCLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0csT0FBTyxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQW9EdkUsTUFBTSxPQUFPLG9CQUFvQjtJQWxEakM7UUFvRFcsVUFBSyxHQUFHLGVBQWUsQ0FBQztRQWlCakMsNkNBQTZDO1FBQ25DLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBUyxDQUFDO0lBdUM5QyxDQUFDO0lBckNDLElBQXdDLFFBQVE7UUFDOUMsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELElBQUksVUFBVTtRQUNaLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDM0I7U0FDRjtJQUNILENBQUM7SUFFRCxJQUFJLFVBQVU7UUFDWixJQUFJLFFBQVEsR0FBVSxDQUFDLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNoRixRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7UUFDRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFlLCtCQUM5QixLQUFLLEVBQUUsYUFBYSxJQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FDbkIsUUFBUSxJQUNSLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDZCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNOLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7WUFDbkMsS0FBSyxlQUFlLENBQUMsT0FBTztnQkFDMUIsT0FBTyxJQUFJLENBQUM7WUFDZCxLQUFLLGVBQWUsQ0FBQyxJQUFJO2dCQUN2QixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN2QztnQkFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbEg7SUFDSCxDQUFDOzs7WUEzR0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q1Q7YUFDRjs7O3FCQU1FLEtBQUs7b0JBR0wsS0FBSzt3QkFHTCxLQUFLO21CQUdMLEtBQUs7bUJBR0wsS0FBSztvQkFHTCxNQUFNO3VCQUVOLFdBQVcsU0FBQyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSG9zdEJpbmRpbmcsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHYWxsZXJ5Q29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL2NvbmZpZy5tb2RlbCc7XG5pbXBvcnQgeyBMb2FkaW5nU3RyYXRlZ3ksIEdhbGxlcnlJdGVtVHlwZSB9IGZyb20gJy4uL21vZGVscy9jb25zdGFudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnYWxsZXJ5LWl0ZW0nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibG9hZFwiIFtuZ1N3aXRjaF09XCJ0eXBlXCI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIlR5cGVzLkltYWdlXCI+XG5cbiAgICAgICAgPGdhbGxlcnktaW1hZ2UgW3NyY109XCJkYXRhLnNyY1wiXG4gICAgICAgICAgICAgICAgICAgICAgIFtsb2FkaW5nSWNvbl09XCJjb25maWcubG9hZGluZ0ljb25cIlxuICAgICAgICAgICAgICAgICAgICAgICBbbG9hZGluZ0Vycm9yXT1cImNvbmZpZy5sb2FkaW5nRXJyb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAoZXJyb3IpPVwiZXJyb3IuZW1pdCgkZXZlbnQpXCI+PC9nYWxsZXJ5LWltYWdlPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnLXRlbXBsYXRlIGctaXRlbS10ZW1wbGF0ZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb25maWcuaXRlbVRlbXBsYXRlO1xuICAgICAgICAgIGNvbnRleHQ6IHsgaW5kZXg6IHRoaXMuaW5kZXgsIGN1cnJJbmRleDogdGhpcy5jdXJySW5kZXgsIHR5cGU6IHRoaXMudHlwZSwgZGF0YTogdGhpcy5kYXRhIH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8Z2FsbGVyeS12aWRlbyAqbmdTd2l0Y2hDYXNlPVwiVHlwZXMuVmlkZW9cIlxuICAgICAgICAgICAgICAgICAgICAgW3NyY109XCJkYXRhLnNyY1wiXG4gICAgICAgICAgICAgICAgICAgICBbcG9zdGVyXT1cImRhdGEucG9zdGVyXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjb250cm9sc109XCJkYXRhLmNvbnRyb2xzXCJcbiAgICAgICAgICAgICAgICAgICAgIFtwbGF5XT1cImlzQXV0b1BsYXlcIlxuICAgICAgICAgICAgICAgICAgICAgW3BhdXNlXT1cImN1cnJJbmRleCAhPT0gaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgKGVycm9yKT1cImVycm9yLmVtaXQoJGV2ZW50KVwiPjwvZ2FsbGVyeS12aWRlbz5cblxuICAgICAgPGdhbGxlcnktaWZyYW1lICpuZ1N3aXRjaENhc2U9XCJUeXBlcy5Zb3V0dWJlXCJcbiAgICAgICAgICAgICAgICAgICAgICBbc3JjXT1cInlvdXR1YmVTcmNcIlxuICAgICAgICAgICAgICAgICAgICAgIFthdXRvcGxheV09XCJpc0F1dG9QbGF5XCJcbiAgICAgICAgICAgICAgICAgICAgICBbcGF1c2VdPVwiY3VyckluZGV4ICE9PSBpbmRleFwiPjwvZ2FsbGVyeS1pZnJhbWU+XG5cbiAgICAgIDxnYWxsZXJ5LWlmcmFtZSAqbmdTd2l0Y2hDYXNlPVwiVHlwZXMuSWZyYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICBbc3JjXT1cImRhdGEuc3JjXCI+PC9nYWxsZXJ5LWlmcmFtZT5cblxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnLXRlbXBsYXRlIGctaXRlbS10ZW1wbGF0ZVwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb25maWcuaXRlbVRlbXBsYXRlO1xuICAgICAgICAgIGNvbnRleHQ6IHsgaW5kZXg6IHRoaXMuaW5kZXgsIGN1cnJJbmRleDogdGhpcy5jdXJySW5kZXgsIHR5cGU6IHRoaXMudHlwZSwgZGF0YTogdGhpcy5kYXRhIH1cIj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPC9uZy1jb250YWluZXI+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeUl0ZW1Db21wb25lbnQge1xuXG4gIHJlYWRvbmx5IFR5cGVzID0gR2FsbGVyeUl0ZW1UeXBlO1xuXG4gIC8qKiBHYWxsZXJ5IGNvbmZpZyAqL1xuICBASW5wdXQoKSBjb25maWc6IEdhbGxlcnlDb25maWc7XG5cbiAgLyoqIEl0ZW0ncyBpbmRleCBpbiB0aGUgZ2FsbGVyeSAqL1xuICBASW5wdXQoKSBpbmRleDogbnVtYmVyO1xuXG4gIC8qKiBHYWxsZXJ5IGN1cnJlbnQgaW5kZXggKi9cbiAgQElucHV0KCkgY3VyckluZGV4OiBudW1iZXI7XG5cbiAgLyoqIEl0ZW0ncyB0eXBlICdpbWFnZScsICd2aWRlbycsICd5b3V0dWJlJywgJ2lmcmFtZScgKi9cbiAgQElucHV0KCkgdHlwZTogc3RyaW5nO1xuXG4gIC8qKiBJdGVtJ3MgZGF0YSwgdGhpcyBvYmplY3QgY29udGFpbnMgdGhlIGRhdGEgcmVxdWlyZWQgdG8gZGlzcGxheSB0aGUgY29udGVudCAoZS5nLiBzcmMgcGF0aCkgKi9cbiAgQElucHV0KCkgZGF0YTogYW55O1xuXG4gIC8qKiBTdHJlYW0gdGhhdCBlbWl0cyB3aGVuIGFuIGVycm9yIG9jY3VycyAqL1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPEVycm9yPigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZy1hY3RpdmUtaXRlbScpIGdldCBpc0FjdGl2ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbmRleCA9PT0gdGhpcy5jdXJySW5kZXg7XG4gIH1cblxuICBnZXQgaXNBdXRvUGxheSgpIHtcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSkge1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gR2FsbGVyeUl0ZW1UeXBlLlZpZGVvIHx8IHRoaXMudHlwZSA9PT0gR2FsbGVyeUl0ZW1UeXBlLllvdXR1YmUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5hdXRvcGxheTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXQgeW91dHViZVNyYygpIHtcbiAgICBsZXQgYXV0b3BsYXk6IDEgfCAwID0gMDtcbiAgICBpZiAodGhpcy5pc0FjdGl2ZSAmJiB0aGlzLnR5cGUgPT09IEdhbGxlcnlJdGVtVHlwZS5Zb3V0dWJlICYmIHRoaXMuZGF0YS5hdXRvcGxheSkge1xuICAgICAgYXV0b3BsYXkgPSAxO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRoaXMuZGF0YS5zcmMpO1xuICAgIHVybC5zZWFyY2ggPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgIHdtb2RlOiAndHJhbnNwYXJlbnQnLFxuICAgICAgLi4udGhpcy5kYXRhLnBhcmFtcyxcbiAgICAgIGF1dG9wbGF5XG4gICAgfSkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gdXJsLmhyZWY7XG4gIH1cblxuICBnZXQgbG9hZCgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuY29uZmlnLmxvYWRpbmdTdHJhdGVneSkge1xuICAgICAgY2FzZSBMb2FkaW5nU3RyYXRlZ3kuUHJlbG9hZDpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlIExvYWRpbmdTdHJhdGVneS5MYXp5OlxuICAgICAgICByZXR1cm4gdGhpcy5jdXJySW5kZXggPT09IHRoaXMuaW5kZXg7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5jdXJySW5kZXggPT09IHRoaXMuaW5kZXggfHwgdGhpcy5jdXJySW5kZXggPT09IHRoaXMuaW5kZXggLSAxIHx8IHRoaXMuY3VyckluZGV4ID09PSB0aGlzLmluZGV4ICsgMTtcbiAgICB9XG4gIH1cblxufVxuIl19