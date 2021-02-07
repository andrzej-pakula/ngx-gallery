import { ImageSize, GalleryAction, ThumbnailsMode, LoadingStrategy, SlidingDirection, ThumbnailsPosition, DotsPosition, CounterPosition } from '../models/constants';
/** Initial state */
export const defaultState = {
    action: GalleryAction.INITIALIZED,
    isPlaying: false,
    hasNext: false,
    hasPrev: false,
    currIndex: 0,
    items: []
};
export const defaultConfig = {
    nav: true,
    loop: true,
    zoomOut: 0,
    dots: false,
    thumb: true,
    dotsSize: 30,
    counter: true,
    gestures: true,
    autoPlay: false,
    thumbWidth: 120,
    thumbHeight: 90,
    panSensitivity: 25,
    disableThumb: false,
    playerInterval: 3000,
    imageSize: ImageSize.Contain,
    thumbMode: ThumbnailsMode.Strict,
    dotsPosition: DotsPosition.Bottom,
    counterPosition: CounterPosition.Top,
    thumbPosition: ThumbnailsPosition.Bottom,
    loadingStrategy: LoadingStrategy.Default,
    slidingDirection: SlidingDirection.Horizontal,
    navIcon: `<?xml version="1.0" encoding="UTF-8"?><svg width="512px" height="512px" enable-background="new 0 0 240.823 240.823" version="1.1" viewBox="0 0 240.823 240.823" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m183.19 111.82l-108.3-108.26c-4.752-4.74-12.451-4.74-17.215 0-4.752 4.74-4.752 12.439 0 17.179l99.707 99.671-99.695 99.671c-4.752 4.74-4.752 12.439 0 17.191 4.752 4.74 12.463 4.74 17.215 0l108.3-108.26c4.68-4.691 4.68-12.511-0.012-17.19z" fill="#fff"/></svg>`,
    loadingIcon: `<?xml version="1.0" encoding="UTF-8"?><svg stroke="#fff" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd" stroke-width="2"><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="0s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle><circle cx="22" cy="22" r="1"><animate attributeName="r" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.165, 0.84, 0.44, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 20"/><animate attributeName="stroke-opacity" begin="-0.9s" calcMode="spline" dur="1.8s" keySplines="0.3, 0.61, 0.355, 1" keyTimes="0; 1" repeatCount="indefinite" values="1; 0"/></circle></g></svg>`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5kZWZhdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL3V0aWxzL2dhbGxlcnkuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGFBQWEsRUFDYixjQUFjLEVBQ2QsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixrQkFBa0IsRUFFbEIsWUFBWSxFQUNaLGVBQWUsRUFDaEIsTUFBTSxxQkFBcUIsQ0FBQztBQUk3QixvQkFBb0I7QUFDcEIsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFpQjtJQUN4QyxNQUFNLEVBQUUsYUFBYSxDQUFDLFdBQVc7SUFDakMsU0FBUyxFQUFFLEtBQUs7SUFDaEIsT0FBTyxFQUFFLEtBQUs7SUFDZCxPQUFPLEVBQUUsS0FBSztJQUNkLFNBQVMsRUFBRSxDQUFDO0lBQ1osS0FBSyxFQUFFLEVBQUU7Q0FDVixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFrQjtJQUMxQyxHQUFHLEVBQUUsSUFBSTtJQUNULElBQUksRUFBRSxJQUFJO0lBQ1YsT0FBTyxFQUFFLENBQUM7SUFDVixJQUFJLEVBQUUsS0FBSztJQUNYLEtBQUssRUFBRSxJQUFJO0lBQ1gsUUFBUSxFQUFFLEVBQUU7SUFDWixPQUFPLEVBQUUsSUFBSTtJQUNiLFFBQVEsRUFBRSxJQUFJO0lBQ2QsUUFBUSxFQUFFLEtBQUs7SUFDZixVQUFVLEVBQUUsR0FBRztJQUNmLFdBQVcsRUFBRSxFQUFFO0lBQ2YsY0FBYyxFQUFFLEVBQUU7SUFDbEIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsY0FBYyxFQUFFLElBQUk7SUFDcEIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxPQUFPO0lBQzVCLFNBQVMsRUFBRSxjQUFjLENBQUMsTUFBTTtJQUNoQyxZQUFZLEVBQUUsWUFBWSxDQUFDLE1BQU07SUFDakMsZUFBZSxFQUFFLGVBQWUsQ0FBQyxHQUFHO0lBQ3BDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxNQUFNO0lBQ3hDLGVBQWUsRUFBRSxlQUFlLENBQUMsT0FBTztJQUN4QyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxVQUFVO0lBQzdDLE9BQU8sRUFBRSxxZUFBcWU7SUFDOWUsV0FBVyxFQUFFLGs1QkFBazVCO0NBQ2g2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgSW1hZ2VTaXplLFxuICBHYWxsZXJ5QWN0aW9uLFxuICBUaHVtYm5haWxzTW9kZSxcbiAgTG9hZGluZ1N0cmF0ZWd5LFxuICBTbGlkaW5nRGlyZWN0aW9uLFxuICBUaHVtYm5haWxzUG9zaXRpb24sXG4gIEltYWdlTG9hZGVyTW9kZSxcbiAgRG90c1Bvc2l0aW9uLFxuICBDb3VudGVyUG9zaXRpb25cbn0gZnJvbSAnLi4vbW9kZWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBHYWxsZXJ5U3RhdGUgfSBmcm9tICcuLi9tb2RlbHMvZ2FsbGVyeS5tb2RlbCc7XG5pbXBvcnQgeyBHYWxsZXJ5Q29uZmlnIH0gZnJvbSAnLi4vbW9kZWxzL2NvbmZpZy5tb2RlbCc7XG5cbi8qKiBJbml0aWFsIHN0YXRlICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFN0YXRlOiBHYWxsZXJ5U3RhdGUgPSB7XG4gIGFjdGlvbjogR2FsbGVyeUFjdGlvbi5JTklUSUFMSVpFRCxcbiAgaXNQbGF5aW5nOiBmYWxzZSxcbiAgaGFzTmV4dDogZmFsc2UsXG4gIGhhc1ByZXY6IGZhbHNlLFxuICBjdXJySW5kZXg6IDAsXG4gIGl0ZW1zOiBbXVxufTtcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRDb25maWc6IEdhbGxlcnlDb25maWcgPSB7XG4gIG5hdjogdHJ1ZSxcbiAgbG9vcDogdHJ1ZSxcbiAgem9vbU91dDogMCxcbiAgZG90czogZmFsc2UsXG4gIHRodW1iOiB0cnVlLFxuICBkb3RzU2l6ZTogMzAsXG4gIGNvdW50ZXI6IHRydWUsXG4gIGdlc3R1cmVzOiB0cnVlLFxuICBhdXRvUGxheTogZmFsc2UsXG4gIHRodW1iV2lkdGg6IDEyMCxcbiAgdGh1bWJIZWlnaHQ6IDkwLFxuICBwYW5TZW5zaXRpdml0eTogMjUsXG4gIGRpc2FibGVUaHVtYjogZmFsc2UsXG4gIHBsYXllckludGVydmFsOiAzMDAwLFxuICBpbWFnZVNpemU6IEltYWdlU2l6ZS5Db250YWluLFxuICB0aHVtYk1vZGU6IFRodW1ibmFpbHNNb2RlLlN0cmljdCxcbiAgZG90c1Bvc2l0aW9uOiBEb3RzUG9zaXRpb24uQm90dG9tLFxuICBjb3VudGVyUG9zaXRpb246IENvdW50ZXJQb3NpdGlvbi5Ub3AsXG4gIHRodW1iUG9zaXRpb246IFRodW1ibmFpbHNQb3NpdGlvbi5Cb3R0b20sXG4gIGxvYWRpbmdTdHJhdGVneTogTG9hZGluZ1N0cmF0ZWd5LkRlZmF1bHQsXG4gIHNsaWRpbmdEaXJlY3Rpb246IFNsaWRpbmdEaXJlY3Rpb24uSG9yaXpvbnRhbCxcbiAgbmF2SWNvbjogYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/Pjxzdmcgd2lkdGg9XCI1MTJweFwiIGhlaWdodD1cIjUxMnB4XCIgZW5hYmxlLWJhY2tncm91bmQ9XCJuZXcgMCAwIDI0MC44MjMgMjQwLjgyM1wiIHZlcnNpb249XCIxLjFcIiB2aWV3Qm94PVwiMCAwIDI0MC44MjMgMjQwLjgyM1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJtMTgzLjE5IDExMS44MmwtMTA4LjMtMTA4LjI2Yy00Ljc1Mi00Ljc0LTEyLjQ1MS00Ljc0LTE3LjIxNSAwLTQuNzUyIDQuNzQtNC43NTIgMTIuNDM5IDAgMTcuMTc5bDk5LjcwNyA5OS42NzEtOTkuNjk1IDk5LjY3MWMtNC43NTIgNC43NC00Ljc1MiAxMi40MzkgMCAxNy4xOTEgNC43NTIgNC43NCAxMi40NjMgNC43NCAxNy4yMTUgMGwxMDguMy0xMDguMjZjNC42OC00LjY5MSA0LjY4LTEyLjUxMS0wLjAxMi0xNy4xOXpcIiBmaWxsPVwiI2ZmZlwiLz48L3N2Zz5gLFxuICBsb2FkaW5nSWNvbjogYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/Pjxzdmcgc3Ryb2tlPVwiI2ZmZlwiIHZpZXdCb3g9XCIwIDAgNDQgNDRcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PGcgZmlsbD1cIm5vbmVcIiBmaWxsLXJ1bGU9XCJldmVub2RkXCIgc3Ryb2tlLXdpZHRoPVwiMlwiPjxjaXJjbGUgY3g9XCIyMlwiIGN5PVwiMjJcIiByPVwiMVwiPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJyXCIgYmVnaW49XCIwc1wiIGNhbGNNb2RlPVwic3BsaW5lXCIgZHVyPVwiMS44c1wiIGtleVNwbGluZXM9XCIwLjE2NSwgMC44NCwgMC40NCwgMVwiIGtleVRpbWVzPVwiMDsgMVwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIHZhbHVlcz1cIjE7IDIwXCIvPjxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9XCJzdHJva2Utb3BhY2l0eVwiIGJlZ2luPVwiMHNcIiBjYWxjTW9kZT1cInNwbGluZVwiIGR1cj1cIjEuOHNcIiBrZXlTcGxpbmVzPVwiMC4zLCAwLjYxLCAwLjM1NSwgMVwiIGtleVRpbWVzPVwiMDsgMVwiIHJlcGVhdENvdW50PVwiaW5kZWZpbml0ZVwiIHZhbHVlcz1cIjE7IDBcIi8+PC9jaXJjbGU+PGNpcmNsZSBjeD1cIjIyXCIgY3k9XCIyMlwiIHI9XCIxXCI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInJcIiBiZWdpbj1cIi0wLjlzXCIgY2FsY01vZGU9XCJzcGxpbmVcIiBkdXI9XCIxLjhzXCIga2V5U3BsaW5lcz1cIjAuMTY1LCAwLjg0LCAwLjQ0LCAxXCIga2V5VGltZXM9XCIwOyAxXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgdmFsdWVzPVwiMTsgMjBcIi8+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT1cInN0cm9rZS1vcGFjaXR5XCIgYmVnaW49XCItMC45c1wiIGNhbGNNb2RlPVwic3BsaW5lXCIgZHVyPVwiMS44c1wiIGtleVNwbGluZXM9XCIwLjMsIDAuNjEsIDAuMzU1LCAxXCIga2V5VGltZXM9XCIwOyAxXCIgcmVwZWF0Q291bnQ9XCJpbmRlZmluaXRlXCIgdmFsdWVzPVwiMTsgMFwiLz48L2NpcmNsZT48L2c+PC9zdmc+YFxufTtcbiJdfQ==