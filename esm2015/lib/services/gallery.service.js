import { Inject, Injectable, Optional } from '@angular/core';
import { GalleryRef } from './gallery-ref';
import { GALLERY_CONFIG } from '../models/config.model';
import { defaultConfig } from '../utils/gallery.default';
import * as i0 from "@angular/core";
import * as i1 from "../models/config.model";
export class Gallery {
    constructor(config) {
        /** Store gallery instances */
        this._instances = new Map();
        this.config = config ? Object.assign(Object.assign({}, defaultConfig), config) : defaultConfig;
    }
    /**
     * Get or create gallery by ID
     * @param id
     * @param config
     */
    ref(id = 'root', config) {
        if (this._instances.has(id)) {
            const galleryRef = this._instances.get(id);
            if (config) {
                galleryRef.setConfig(Object.assign(Object.assign({}, this.config), config));
            }
            return galleryRef;
        }
        else {
            return this._instances.set(id, new GalleryRef(Object.assign(Object.assign({}, this.config), config), this.deleteInstance(id))).get(id);
        }
    }
    /**
     * Destroy all gallery instances
     */
    destroyAll() {
        this._instances.forEach((ref) => ref.destroy());
    }
    /**
     * Reset all gallery instances
     */
    resetAll() {
        this._instances.forEach((ref) => ref.reset());
    }
    /**
     * A destroyer function for each gallery instance
     */
    deleteInstance(id) {
        return () => {
            if (this._instances.has(id)) {
                this._instances.delete(id);
            }
        };
    }
}
Gallery.ɵprov = i0.ɵɵdefineInjectable({ factory: function Gallery_Factory() { return new Gallery(i0.ɵɵinject(i1.GALLERY_CONFIG, 8)); }, token: Gallery, providedIn: "root" });
Gallery.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
Gallery.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [GALLERY_CONFIG,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FsbGVyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctZ2FsbGVyeS9zcmMvbGliL3NlcnZpY2VzL2dhbGxlcnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWlCLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7O0FBS3pELE1BQU0sT0FBTyxPQUFPO0lBUWxCLFlBQWdELE1BQXFCO1FBTnJFLDhCQUE4QjtRQUNiLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBc0IsQ0FBQztRQU0xRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLGlDQUFLLGFBQWEsR0FBSyxNQUFNLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxFQUFFLE1BQXNCO1FBQ3JDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDM0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsVUFBVSxDQUFDLFNBQVMsaUNBQUssSUFBSSxDQUFDLE1BQU0sR0FBSyxNQUFNLEVBQUUsQ0FBQzthQUNuRDtZQUNELE9BQU8sVUFBVSxDQUFDO1NBQ25CO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxJQUFJLFVBQVUsaUNBQUssSUFBSSxDQUFDLE1BQU0sR0FBSyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzlHO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBZSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFlLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7T0FFRztJQUNLLGNBQWMsQ0FBQyxFQUFVO1FBQy9CLE9BQU8sR0FBRyxFQUFFO1lBQ1YsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDOzs7O1lBdkRGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OzRDQVNjLFFBQVEsWUFBSSxNQUFNLFNBQUMsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgR2FsbGVyeVJlZiB9IGZyb20gJy4vZ2FsbGVyeS1yZWYnO1xuaW1wb3J0IHsgR2FsbGVyeUNvbmZpZywgR0FMTEVSWV9DT05GSUcgfSBmcm9tICcuLi9tb2RlbHMvY29uZmlnLm1vZGVsJztcbmltcG9ydCB7IGRlZmF1bHRDb25maWcgfSBmcm9tICcuLi91dGlscy9nYWxsZXJ5LmRlZmF1bHQnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5IHtcblxuICAvKiogU3RvcmUgZ2FsbGVyeSBpbnN0YW5jZXMgKi9cbiAgcHJpdmF0ZSByZWFkb25seSBfaW5zdGFuY2VzID0gbmV3IE1hcDxzdHJpbmcsIEdhbGxlcnlSZWY+KCk7XG5cbiAgLyoqIEdsb2JhbCBjb25maWcgKi9cbiAgY29uZmlnOiBHYWxsZXJ5Q29uZmlnO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoR0FMTEVSWV9DT05GSUcpIGNvbmZpZzogR2FsbGVyeUNvbmZpZykge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnID8gey4uLmRlZmF1bHRDb25maWcsIC4uLmNvbmZpZ30gOiBkZWZhdWx0Q29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBvciBjcmVhdGUgZ2FsbGVyeSBieSBJRFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGNvbmZpZ1xuICAgKi9cbiAgcmVmKGlkID0gJ3Jvb3QnLCBjb25maWc/OiBHYWxsZXJ5Q29uZmlnKTogR2FsbGVyeVJlZiB7XG4gICAgaWYgKHRoaXMuX2luc3RhbmNlcy5oYXMoaWQpKSB7XG4gICAgICBjb25zdCBnYWxsZXJ5UmVmID0gdGhpcy5faW5zdGFuY2VzLmdldChpZCk7XG4gICAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgIGdhbGxlcnlSZWYuc2V0Q29uZmlnKHsuLi50aGlzLmNvbmZpZywgLi4uY29uZmlnfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2FsbGVyeVJlZjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlcy5zZXQoaWQsIG5ldyBHYWxsZXJ5UmVmKHsuLi50aGlzLmNvbmZpZywgLi4uY29uZmlnfSwgdGhpcy5kZWxldGVJbnN0YW5jZShpZCkpKS5nZXQoaWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGFsbCBnYWxsZXJ5IGluc3RhbmNlc1xuICAgKi9cbiAgZGVzdHJveUFsbCgpIHtcbiAgICB0aGlzLl9pbnN0YW5jZXMuZm9yRWFjaCgocmVmOiBHYWxsZXJ5UmVmKSA9PiByZWYuZGVzdHJveSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBhbGwgZ2FsbGVyeSBpbnN0YW5jZXNcbiAgICovXG4gIHJlc2V0QWxsKCkge1xuICAgIHRoaXMuX2luc3RhbmNlcy5mb3JFYWNoKChyZWY6IEdhbGxlcnlSZWYpID0+IHJlZi5yZXNldCgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGRlc3Ryb3llciBmdW5jdGlvbiBmb3IgZWFjaCBnYWxsZXJ5IGluc3RhbmNlXG4gICAqL1xuICBwcml2YXRlIGRlbGV0ZUluc3RhbmNlKGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2luc3RhbmNlcy5oYXMoaWQpKSB7XG4gICAgICAgIHRoaXMuX2luc3RhbmNlcy5kZWxldGUoaWQpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxufVxuIl19