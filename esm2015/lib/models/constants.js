export var GalleryAction;
(function (GalleryAction) {
    GalleryAction["INITIALIZED"] = "initialized";
    GalleryAction["ITEMS_CHANGED"] = "itemsChanged";
    GalleryAction["INDEX_CHANGED"] = "indexChanged";
    GalleryAction["PLAY"] = "play";
    GalleryAction["STOP"] = "stop";
})(GalleryAction || (GalleryAction = {}));
export var ImageSize;
(function (ImageSize) {
    ImageSize["Cover"] = "cover";
    ImageSize["Contain"] = "contain";
})(ImageSize || (ImageSize = {}));
export var LoadingStrategy;
(function (LoadingStrategy) {
    LoadingStrategy["Preload"] = "preload";
    LoadingStrategy["Lazy"] = "lazy";
    LoadingStrategy["Default"] = "default";
})(LoadingStrategy || (LoadingStrategy = {}));
export var ThumbnailsPosition;
(function (ThumbnailsPosition) {
    ThumbnailsPosition["Top"] = "top";
    ThumbnailsPosition["Left"] = "left";
    ThumbnailsPosition["LeftTop"] = "left-top";
    ThumbnailsPosition["Right"] = "right";
    ThumbnailsPosition["Bottom"] = "bottom";
})(ThumbnailsPosition || (ThumbnailsPosition = {}));
export var ImageLoaderMode;
(function (ImageLoaderMode) {
    ImageLoaderMode["Determinate"] = "determinate";
    ImageLoaderMode["Indeterminate"] = "indeterminate";
})(ImageLoaderMode || (ImageLoaderMode = {}));
export var DotsPosition;
(function (DotsPosition) {
    DotsPosition["Top"] = "top";
    DotsPosition["Bottom"] = "bottom";
})(DotsPosition || (DotsPosition = {}));
export var CounterPosition;
(function (CounterPosition) {
    CounterPosition["Top"] = "top";
    CounterPosition["Bottom"] = "bottom";
})(CounterPosition || (CounterPosition = {}));
export var ThumbnailsMode;
(function (ThumbnailsMode) {
    ThumbnailsMode["Free"] = "free";
    ThumbnailsMode["Strict"] = "strict";
})(ThumbnailsMode || (ThumbnailsMode = {}));
export var SlidingDirection;
(function (SlidingDirection) {
    SlidingDirection["Horizontal"] = "horizontal";
    SlidingDirection["Vertical"] = "vertical";
})(SlidingDirection || (SlidingDirection = {}));
export var GalleryItemType;
(function (GalleryItemType) {
    GalleryItemType["Image"] = "image";
    GalleryItemType["Video"] = "video";
    GalleryItemType["Youtube"] = "youtube";
    GalleryItemType["Iframe"] = "iframe";
})(GalleryItemType || (GalleryItemType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL21vZGVscy9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFOLElBQVksYUFNWDtBQU5ELFdBQVksYUFBYTtJQUN2Qiw0Q0FBMkIsQ0FBQTtJQUMzQiwrQ0FBOEIsQ0FBQTtJQUM5QiwrQ0FBOEIsQ0FBQTtJQUM5Qiw4QkFBYSxDQUFBO0lBQ2IsOEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFOVyxhQUFhLEtBQWIsYUFBYSxRQU14QjtBQUVELE1BQU0sQ0FBTixJQUFZLFNBR1g7QUFIRCxXQUFZLFNBQVM7SUFDbkIsNEJBQWUsQ0FBQTtJQUNmLGdDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFIVyxTQUFTLEtBQVQsU0FBUyxRQUdwQjtBQUVELE1BQU0sQ0FBTixJQUFZLGVBSVg7QUFKRCxXQUFZLGVBQWU7SUFDekIsc0NBQW1CLENBQUE7SUFDbkIsZ0NBQWEsQ0FBQTtJQUNiLHNDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFKVyxlQUFlLEtBQWYsZUFBZSxRQUkxQjtBQUVELE1BQU0sQ0FBTixJQUFZLGtCQU1YO0FBTkQsV0FBWSxrQkFBa0I7SUFDNUIsaUNBQVcsQ0FBQTtJQUNYLG1DQUFhLENBQUE7SUFDYiwwQ0FBb0IsQ0FBQTtJQUNwQixxQ0FBZSxDQUFBO0lBQ2YsdUNBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQU5XLGtCQUFrQixLQUFsQixrQkFBa0IsUUFNN0I7QUFFRCxNQUFNLENBQU4sSUFBWSxlQUdYO0FBSEQsV0FBWSxlQUFlO0lBQ3pCLDhDQUEwQixDQUFBO0lBQzFCLGtEQUE4QixDQUFBO0FBQ2hDLENBQUMsRUFIVyxlQUFlLEtBQWYsZUFBZSxRQUcxQjtBQUVELE1BQU0sQ0FBTixJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFDdEIsMkJBQVcsQ0FBQTtJQUNYLGlDQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxZQUFZLEtBQVosWUFBWSxRQUd2QjtBQUVELE1BQU0sQ0FBTixJQUFZLGVBR1g7QUFIRCxXQUFZLGVBQWU7SUFDekIsOEJBQVcsQ0FBQTtJQUNYLG9DQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxlQUFlLEtBQWYsZUFBZSxRQUcxQjtBQUVELE1BQU0sQ0FBTixJQUFZLGNBR1g7QUFIRCxXQUFZLGNBQWM7SUFDeEIsK0JBQWEsQ0FBQTtJQUNiLG1DQUFpQixDQUFBO0FBQ25CLENBQUMsRUFIVyxjQUFjLEtBQWQsY0FBYyxRQUd6QjtBQUVELE1BQU0sQ0FBTixJQUFZLGdCQUdYO0FBSEQsV0FBWSxnQkFBZ0I7SUFDMUIsNkNBQXlCLENBQUE7SUFDekIseUNBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQUhXLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFHM0I7QUFFRCxNQUFNLENBQU4sSUFBWSxlQUtYO0FBTEQsV0FBWSxlQUFlO0lBQ3pCLGtDQUFlLENBQUE7SUFDZixrQ0FBZSxDQUFBO0lBQ2Ysc0NBQW1CLENBQUE7SUFDbkIsb0NBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUxXLGVBQWUsS0FBZixlQUFlLFFBSzFCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gR2FsbGVyeUFjdGlvbiB7XG4gIElOSVRJQUxJWkVEID0gJ2luaXRpYWxpemVkJyxcbiAgSVRFTVNfQ0hBTkdFRCA9ICdpdGVtc0NoYW5nZWQnLFxuICBJTkRFWF9DSEFOR0VEID0gJ2luZGV4Q2hhbmdlZCcsXG4gIFBMQVkgPSAncGxheScsXG4gIFNUT1AgPSAnc3RvcCdcbn1cblxuZXhwb3J0IGVudW0gSW1hZ2VTaXplIHtcbiAgQ292ZXIgPSAnY292ZXInLFxuICBDb250YWluID0gJ2NvbnRhaW4nXG59XG5cbmV4cG9ydCBlbnVtIExvYWRpbmdTdHJhdGVneSB7XG4gIFByZWxvYWQgPSAncHJlbG9hZCcsXG4gIExhenkgPSAnbGF6eScsXG4gIERlZmF1bHQgPSAnZGVmYXVsdCdcbn1cblxuZXhwb3J0IGVudW0gVGh1bWJuYWlsc1Bvc2l0aW9uIHtcbiAgVG9wID0gJ3RvcCcsXG4gIExlZnQgPSAnbGVmdCcsXG4gIExlZnRUb3AgPSAnbGVmdC10b3AnLFxuICBSaWdodCA9ICdyaWdodCcsXG4gIEJvdHRvbSA9ICdib3R0b20nLFxufVxuXG5leHBvcnQgZW51bSBJbWFnZUxvYWRlck1vZGUge1xuICBEZXRlcm1pbmF0ZT0gJ2RldGVybWluYXRlJyxcbiAgSW5kZXRlcm1pbmF0ZT0gJ2luZGV0ZXJtaW5hdGUnXG59XG5cbmV4cG9ydCBlbnVtIERvdHNQb3NpdGlvbiB7XG4gIFRvcCA9ICd0b3AnLFxuICBCb3R0b20gPSAnYm90dG9tJ1xufVxuXG5leHBvcnQgZW51bSBDb3VudGVyUG9zaXRpb24ge1xuICBUb3AgPSAndG9wJyxcbiAgQm90dG9tID0gJ2JvdHRvbSdcbn1cblxuZXhwb3J0IGVudW0gVGh1bWJuYWlsc01vZGUge1xuICBGcmVlID0gJ2ZyZWUnLFxuICBTdHJpY3QgPSAnc3RyaWN0J1xufVxuXG5leHBvcnQgZW51bSBTbGlkaW5nRGlyZWN0aW9uIHtcbiAgSG9yaXpvbnRhbCA9ICdob3Jpem9udGFsJyxcbiAgVmVydGljYWwgPSAndmVydGljYWwnXG59XG5cbmV4cG9ydCBlbnVtIEdhbGxlcnlJdGVtVHlwZSB7XG4gIEltYWdlID0gJ2ltYWdlJyxcbiAgVmlkZW8gPSAndmlkZW8nLFxuICBZb3V0dWJlID0gJ3lvdXR1YmUnLFxuICBJZnJhbWUgPSAnaWZyYW1lJ1xufVxuIl19