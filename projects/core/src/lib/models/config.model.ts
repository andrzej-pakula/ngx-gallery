import { TemplateRef } from '@angular/core';

export interface GalleryConfig {
  nav?: boolean;
  dots?: boolean;
  loop?: boolean;
  thumb?: boolean;
  zoomOut?: number;
  navIcon?: string;
  counter?: boolean;
  dotsSize?: number;
  gestures?: boolean;
  autoPlay?: boolean;
  thumbWidth?: number;
  thumbHeight?: number;
  loadingIcon?: string;
  loadingError?: string;
  disableThumb?: boolean;
  panSensitivity?: number;
  playerInterval?: number;
  itemTemplate?: TemplateRef<any>;
  thumbTemplate?: TemplateRef<any>;
  thumbMode?: 'strict' | 'free';
  imageSize?: 'cover' | 'contain';
  dotsPosition?: 'top' | 'bottom';
  counterPosition?: 'top' | 'bottom';
  slidingDirection?: 'horizontal' | 'vertical';
  loadingMode?: 'determinate' | 'indeterminate';
  loadingStrategy?: 'preload' | 'lazy' | 'default';
  thumbPosition?: 'top' | 'left' | 'right' | 'bottom';
}
