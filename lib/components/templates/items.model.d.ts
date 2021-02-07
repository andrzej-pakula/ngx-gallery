import { GalleryItem } from '../../models/gallery.model';
export declare class ImageItem implements GalleryItem {
    readonly type: string;
    readonly data: ImageItemData;
    constructor(data: ImageItemData);
}
export declare class VideoItem implements GalleryItem {
    readonly type: string;
    readonly data: VideoItemData;
    constructor(data: VideoItemData);
}
export declare class IframeItem implements GalleryItem {
    readonly type: string;
    readonly data: IframeItemData;
    constructor(data: IframeItemData);
}
export declare class YoutubeItem implements GalleryItem {
    readonly type: string;
    readonly data: YoutubeItemData;
    constructor(data: YoutubeItemData);
}
declare type GalleryItemModel = {
    type?: string;
    src?: string;
    thumb?: string;
};
export declare type ImageItemData = GalleryItemModel;
export declare type IframeItemData = GalleryItemModel & {
    params?: any;
};
export declare type YoutubeItemData = IframeItemData & {
    autoplay?: boolean;
};
export declare type VideoItemData = GalleryItemModel & {
    src?: string | {
        url: string;
        type: string;
    }[];
    thumb?: string;
    poster?: string;
    controls?: boolean;
    autoplay?: boolean;
};
export declare type GalleryItemData = ImageItemData | VideoItemData | IframeItemData | YoutubeItemData;
export {};