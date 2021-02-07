import { Component, Input, ViewChild, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
export class GalleryVideoComponent {
    constructor() {
        /** Stream that emits when an error occurs */
        this.error = new EventEmitter();
    }
    set pauseVideo(shouldPause) {
        if (this.video.nativeElement) {
            const video = this.video.nativeElement;
            if (shouldPause && !video.paused) {
                video.pause();
            }
        }
    }
    set playVideo(shouldPlay) {
        if (this.video.nativeElement) {
            const video = this.video.nativeElement;
            if (shouldPlay) {
                video.play();
            }
        }
    }
    ngOnInit() {
        if (this.src instanceof Array) {
            // If video has multiple sources
            this.videoSources = [...this.src];
        }
        else {
            this.videoSources = [{ url: this.src }];
        }
        this.controls = typeof this.controlsEnabled === 'boolean' ? this.controlsEnabled : true;
    }
}
GalleryVideoComponent.decorators = [
    { type: Component, args: [{
                selector: 'gallery-video',
                changeDetection: ChangeDetectionStrategy.OnPush,
                template: `
    <video #video [controls]="controls" [poster]="poster" (error)="error.emit($event)">
      <source *ngFor="let src of videoSources" [src]="src?.url" [type]="src?.type"/>
    </video>
  `
            },] }
];
GalleryVideoComponent.propDecorators = {
    src: [{ type: Input }],
    poster: [{ type: Input }],
    controlsEnabled: [{ type: Input, args: ['controls',] }],
    pauseVideo: [{ type: Input, args: ['pause',] }],
    playVideo: [{ type: Input, args: ['play',] }],
    error: [{ type: Output }],
    video: [{ type: ViewChild, args: ['video', { static: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS12aWRlby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1nYWxsZXJ5L3NyYy9saWIvY29tcG9uZW50cy90ZW1wbGF0ZXMvZ2FsbGVyeS12aWRlby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsU0FBUyxFQUFjLHVCQUF1QixFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFXL0gsTUFBTSxPQUFPLHFCQUFxQjtJQVRsQztRQW9DRSw2Q0FBNkM7UUFDbkMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7SUFhOUMsQ0FBQztJQWhDQyxJQUFvQixVQUFVLENBQUMsV0FBb0I7UUFDakQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUM1QixNQUFNLEtBQUssR0FBcUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7WUFDekQsSUFBSSxXQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO2dCQUNoQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDZjtTQUNGO0lBQ0gsQ0FBQztJQUVELElBQW1CLFNBQVMsQ0FBQyxVQUFtQjtRQUM5QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFO1lBQzVCLE1BQU0sS0FBSyxHQUFxQixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUN6RCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZDtTQUNGO0lBQ0gsQ0FBQztJQU9ELFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxHQUFHLFlBQVksS0FBSyxFQUFFO1lBQzdCLGdDQUFnQztZQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLENBQUMsZUFBZSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFGLENBQUM7OztZQWpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxRQUFRLEVBQUU7Ozs7R0FJVDthQUNGOzs7a0JBTUUsS0FBSztxQkFDTCxLQUFLOzhCQUNMLEtBQUssU0FBQyxVQUFVO3lCQUVoQixLQUFLLFNBQUMsT0FBTzt3QkFTYixLQUFLLFNBQUMsTUFBTTtvQkFVWixNQUFNO29CQUVOLFNBQVMsU0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnYWxsZXJ5LXZpZGVvJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHZpZGVvICN2aWRlbyBbY29udHJvbHNdPVwiY29udHJvbHNcIiBbcG9zdGVyXT1cInBvc3RlclwiIChlcnJvcik9XCJlcnJvci5lbWl0KCRldmVudClcIj5cbiAgICAgIDxzb3VyY2UgKm5nRm9yPVwibGV0IHNyYyBvZiB2aWRlb1NvdXJjZXNcIiBbc3JjXT1cInNyYz8udXJsXCIgW3R5cGVdPVwic3JjPy50eXBlXCIvPlxuICAgIDwvdmlkZW8+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeVZpZGVvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB2aWRlb1NvdXJjZXM6IHsgdXJsOiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcgfVtdO1xuICBjb250cm9sczogYm9vbGVhbjtcblxuICBASW5wdXQoKSBzcmM6IHN0cmluZyB8IHsgdXJsOiBzdHJpbmcsIHR5cGU/OiBzdHJpbmcgfVtdO1xuICBASW5wdXQoKSBwb3N0ZXI6IHN0cmluZztcbiAgQElucHV0KCdjb250cm9scycpIGNvbnRyb2xzRW5hYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoJ3BhdXNlJykgc2V0IHBhdXNlVmlkZW8oc2hvdWxkUGF1c2U6IGJvb2xlYW4pIHtcbiAgICBpZiAodGhpcy52aWRlby5uYXRpdmVFbGVtZW50KSB7XG4gICAgICBjb25zdCB2aWRlbzogSFRNTFZpZGVvRWxlbWVudCA9IHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudDtcbiAgICAgIGlmIChzaG91bGRQYXVzZSAmJiAhdmlkZW8ucGF1c2VkKSB7XG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdwbGF5Jykgc2V0IHBsYXlWaWRlbyhzaG91bGRQbGF5OiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMudmlkZW8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgY29uc3QgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQgPSB0aGlzLnZpZGVvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBpZiAoc2hvdWxkUGxheSkge1xuICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gYW4gZXJyb3Igb2NjdXJzICovXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8RXJyb3I+KCk7XG5cbiAgQFZpZXdDaGlsZCgndmlkZW8nLCB7IHN0YXRpYzogdHJ1ZSB9KSB2aWRlbzogRWxlbWVudFJlZjtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5zcmMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgLy8gSWYgdmlkZW8gaGFzIG11bHRpcGxlIHNvdXJjZXNcbiAgICAgIHRoaXMudmlkZW9Tb3VyY2VzID0gWy4uLnRoaXMuc3JjXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aWRlb1NvdXJjZXMgPSBbeyB1cmw6IHRoaXMuc3JjIH1dO1xuICAgIH1cbiAgICB0aGlzLmNvbnRyb2xzID0gdHlwZW9mIHRoaXMuY29udHJvbHNFbmFibGVkID09PSAnYm9vbGVhbicgPyB0aGlzLmNvbnRyb2xzRW5hYmxlZCA6IHRydWU7XG4gIH1cbn1cbiJdfQ==