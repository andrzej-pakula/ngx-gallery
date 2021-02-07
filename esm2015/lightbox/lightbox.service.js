import { Inject, Injectable, Optional } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { LEFT_ARROW, RIGHT_ARROW, ESCAPE } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs';
import { Gallery } from 'ng-gallery';
// Uncomment the following line in development mode
// import { Gallery } from '../../src/public-api';
import { LIGHTBOX_CONFIG } from './lightbox.model';
import { defaultConfig } from './lightbox.default';
import { LightboxComponent } from './lightbox.component';
export class Lightbox {
    constructor(config, _gallery, _overlay) {
        this._gallery = _gallery;
        this._overlay = _overlay;
        /** Stream that emits when lightbox is opened */
        this.opened = new Subject();
        /** Stream that emits when lightbox is closed */
        this.closed = new Subject();
        this._config = config ? Object.assign(Object.assign({}, defaultConfig), config) : defaultConfig;
    }
    /**
     * Set Lightbox Config
     * @param config - LightboxConfig
     */
    setConfig(config) {
        this._config = Object.assign(Object.assign({}, this._config), config);
    }
    /**
     * Open Lightbox Overlay
     * @param i - Current Index
     * @param id - Gallery ID
     * @param config - Lightbox Config
     */
    open(i = 0, id = 'lightbox', config) {
        const _config = config ? Object.assign(Object.assign({}, this._config), config) : this._config;
        const overlayConfig = {
            backdropClass: _config.backdropClass,
            panelClass: _config.panelClass,
            hasBackdrop: _config.hasBackdrop,
            positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
            scrollStrategy: this._overlay.scrollStrategies.block(),
            disposeOnNavigation: true
        };
        const galleryRef = this._gallery.ref(id);
        galleryRef.set(i);
        this._overlayRef = this._overlay.create(overlayConfig);
        // overlay opened event
        this._overlayRef.attachments().subscribe(() => this.opened.next(id));
        // overlay closed event
        this._overlayRef.detachments().subscribe(() => this.closed.next(id));
        // Attach gallery to the overlay
        const galleryPortal = new ComponentPortal(LightboxComponent);
        const lightboxRef = this._overlayRef.attach(galleryPortal);
        lightboxRef.instance.id = id;
        lightboxRef.instance.overlayRef = this._overlayRef;
        lightboxRef.instance.closeIcon = this._config.closeIcon;
        lightboxRef.instance.role = this._config.role;
        lightboxRef.instance.ariaLabel = this._config.ariaLabel;
        lightboxRef.instance.ariaLabelledBy = this._config.ariaLabelledBy;
        lightboxRef.instance.ariaDescribedBy = this._config.ariaDescribedBy;
        lightboxRef.instance.startAnimationTime = this._config.startAnimationTime;
        lightboxRef.instance.exitAnimationTime = this._config.exitAnimationTime;
        if (_config.hasBackdrop) {
            this._overlayRef.backdropClick().subscribe(() => this.close());
        }
        // Add keyboard shortcuts
        if (_config.keyboardShortcuts) {
            this._overlayRef.keydownEvents().subscribe((event) => {
                switch (event.keyCode) {
                    case LEFT_ARROW:
                        galleryRef.prev();
                        break;
                    case RIGHT_ARROW:
                        galleryRef.next();
                        break;
                    case ESCAPE:
                        this.close();
                }
            });
        }
    }
    /**
     * Close Lightbox Overlay
     */
    close() {
        if (this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
    }
}
Lightbox.decorators = [
    { type: Injectable }
];
Lightbox.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [LIGHTBOX_CONFIG,] }] },
    { type: Gallery },
    { type: Overlay }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLWdhbGxlcnkvbGlnaHRib3gvc3JjL2xpZ2h0Ym94LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE9BQU8sRUFBNkIsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRS9CLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDckMsbURBQW1EO0FBQ25ELGtEQUFrRDtBQUVsRCxPQUFPLEVBQWtCLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUd6RCxNQUFNLE9BQU8sUUFBUTtJQWNuQixZQUFpRCxNQUFzQixFQUFVLFFBQWlCLEVBQVUsUUFBaUI7UUFBNUMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUFVLGFBQVEsR0FBUixRQUFRLENBQVM7UUFON0gsZ0RBQWdEO1FBQ2hELFdBQU0sR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBRS9CLGdEQUFnRDtRQUNoRCxXQUFNLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUc3QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLGlDQUFLLGFBQWEsR0FBSyxNQUFNLEVBQUUsQ0FBQyxDQUFDLGFB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QUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ2hFO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksT0FBTyxDQUFDLGlCQUFpQixFQUFFO1lBQzdCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQ3hELFFBQVEsS0FBSyxDQUFDLE9BQU8sRUFBRTtvQkFDckIsS0FBSyxVQUFVO3dCQUNiLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDbEIsTUFBTTtvQkFDUixLQUFLLFdBQVc7d0JBQ2QsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNsQixNQUFNO29CQUNSLEtBQUssTUFBTTt3QkFDVCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7aUJBQ2hCO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7OztZQW5HRixVQUFVOzs7NENBZUksUUFBUSxZQUFJLE1BQU0sU0FBQyxlQUFlO1lBdkJ4QyxPQUFPO1lBSlAsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFJlZiwgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5UmVmLCBPdmVybGF5Q29uZmlnIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIEVTQ0FQRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEdhbGxlcnkgfSBmcm9tICduZy1nYWxsZXJ5Jztcbi8vIFVuY29tbWVudCB0aGUgZm9sbG93aW5nIGxpbmUgaW4gZGV2ZWxvcG1lbnQgbW9kZVxuLy8gaW1wb3J0IHsgR2FsbGVyeSB9IGZyb20gJy4uLy4uL3NyYy9wdWJsaWMtYXBpJztcblxuaW1wb3J0IHsgTGlnaHRib3hDb25maWcsIExJR0hUQk9YX0NPTkZJRyB9IGZyb20gJy4vbGlnaHRib3gubW9kZWwnO1xuaW1wb3J0IHsgZGVmYXVsdENvbmZpZyB9IGZyb20gJy4vbGlnaHRib3guZGVmYXVsdCc7XG5pbXBvcnQgeyBMaWdodGJveENvbXBvbmVudCB9IGZyb20gJy4vbGlnaHRib3guY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94IHtcblxuICAvKiogR2FsbGVyeSBvdmVybGF5IHJlZiAqL1xuICBwcml2YXRlIF9vdmVybGF5UmVmOiBPdmVybGF5UmVmO1xuXG4gIC8qKiBHbG9iYWwgY29uZmlnICovXG4gIHByaXZhdGUgX2NvbmZpZzogTGlnaHRib3hDb25maWc7XG5cbiAgLyoqIFN0cmVhbSB0aGF0IGVtaXRzIHdoZW4gbGlnaHRib3ggaXMgb3BlbmVkICovXG4gIG9wZW5lZCA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuICAvKiogU3RyZWFtIHRoYXQgZW1pdHMgd2hlbiBsaWdodGJveCBpcyBjbG9zZWQgKi9cbiAgY2xvc2VkID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoTElHSFRCT1hfQ09ORklHKSBjb25maWc6IExpZ2h0Ym94Q29uZmlnLCBwcml2YXRlIF9nYWxsZXJ5OiBHYWxsZXJ5LCBwcml2YXRlIF9vdmVybGF5OiBPdmVybGF5KSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnID8gey4uLmRlZmF1bHRDb25maWcsIC4uLmNvbmZpZ30gOiBkZWZhdWx0Q29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBMaWdodGJveCBDb25maWdcbiAgICogQHBhcmFtIGNvbmZpZyAtIExpZ2h0Ym94Q29uZmlnXG4gICAqL1xuICBzZXRDb25maWcoY29uZmlnOiBMaWdodGJveENvbmZpZykge1xuICAgIHRoaXMuX2NvbmZpZyA9IHsuLi50aGlzLl9jb25maWcsIC4uLmNvbmZpZ307XG4gIH1cblxuICAvKipcbiAgICogT3BlbiBMaWdodGJveCBPdmVybGF5XG4gICAqIEBwYXJhbSBpIC0gQ3VycmVudCBJbmRleFxuICAgKiBAcGFyYW0gaWQgLSBHYWxsZXJ5IElEXG4gICAqIEBwYXJhbSBjb25maWcgLSBMaWdodGJveCBDb25maWdcbiAgICovXG4gIG9wZW4oaSA9IDAsIGlkID0gJ2xpZ2h0Ym94JywgY29uZmlnPzogTGlnaHRib3hDb25maWcpIHtcblxuICAgIGNvbnN0IF9jb25maWcgPSBjb25maWcgPyB7Li4udGhpcy5fY29uZmlnLCAuLi5jb25maWd9IDogdGhpcy5fY29uZmlnO1xuXG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZzogT3ZlcmxheUNvbmZpZyA9IHtcbiAgICAgIGJhY2tkcm9wQ2xhc3M6IF9jb25maWcuYmFja2Ryb3BDbGFzcyxcbiAgICAgIHBhbmVsQ2xhc3M6IF9jb25maWcucGFuZWxDbGFzcyxcbiAgICAgIGhhc0JhY2tkcm9wOiBfY29uZmlnLmhhc0JhY2tkcm9wLFxuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLmNlbnRlckhvcml6b250YWxseSgpLmNlbnRlclZlcnRpY2FsbHkoKSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMuYmxvY2soKSxcbiAgICAgIGRpc3Bvc2VPbk5hdmlnYXRpb246IHRydWVcbiAgICB9O1xuXG4gICAgY29uc3QgZ2FsbGVyeVJlZiA9IHRoaXMuX2dhbGxlcnkucmVmKGlkKTtcbiAgICBnYWxsZXJ5UmVmLnNldChpKTtcblxuICAgIHRoaXMuX292ZXJsYXlSZWYgPSB0aGlzLl9vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcblxuICAgIC8vIG92ZXJsYXkgb3BlbmVkIGV2ZW50XG4gICAgdGhpcy5fb3ZlcmxheVJlZi5hdHRhY2htZW50cygpLnN1YnNjcmliZSgoKSA9PiB0aGlzLm9wZW5lZC5uZXh0KGlkKSk7XG5cbiAgICAvLyBvdmVybGF5IGNsb3NlZCBldmVudFxuICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNobWVudHMoKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbG9zZWQubmV4dChpZCkpO1xuXG4gICAgLy8gQXR0YWNoIGdhbGxlcnkgdG8gdGhlIG92ZXJsYXlcbiAgICBjb25zdCBnYWxsZXJ5UG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChMaWdodGJveENvbXBvbmVudCk7XG4gICAgY29uc3QgbGlnaHRib3hSZWY6IENvbXBvbmVudFJlZjxMaWdodGJveENvbXBvbmVudD4gPSB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaChnYWxsZXJ5UG9ydGFsKTtcblxuICAgIGxpZ2h0Ym94UmVmLmluc3RhbmNlLmlkID0gaWQ7XG4gICAgbGlnaHRib3hSZWYuaW5zdGFuY2Uub3ZlcmxheVJlZiA9IHRoaXMuX292ZXJsYXlSZWY7XG4gICAgbGlnaHRib3hSZWYuaW5zdGFuY2UuY2xvc2VJY29uID0gdGhpcy5fY29uZmlnLmNsb3NlSWNvbjtcbiAgICBsaWdodGJveFJlZi5pbnN0YW5jZS5yb2xlID0gdGhpcy5fY29uZmlnLnJvbGU7XG4gICAgbGlnaHRib3hSZWYuaW5zdGFuY2UuYXJpYUxhYmVsID0gdGhpcy5fY29uZmlnLmFyaWFMYWJlbDtcbiAgICBsaWdodGJveFJlZi5pbnN0YW5jZS5hcmlhTGFiZWxsZWRCeSA9IHRoaXMuX2NvbmZpZy5hcmlhTGFiZWxsZWRCeTtcbiAgICBsaWdodGJveFJlZi5pbnN0YW5jZS5hcmlhRGVzY3JpYmVkQnkgPSB0aGlzLl9jb25maWcuYXJpYURlc2NyaWJlZEJ5O1xuICAgIGxpZ2h0Ym94UmVmLmluc3RhbmNlLnN0YXJ0QW5pbWF0aW9uVGltZSA9IHRoaXMuX2NvbmZpZy5zdGFydEFuaW1hdGlvblRpbWU7XG4gICAgbGlnaHRib3hSZWYuaW5zdGFuY2UuZXhpdEFuaW1hdGlvblRpbWUgPSB0aGlzLl9jb25maWcuZXhpdEFuaW1hdGlvblRpbWU7XG5cbiAgICBpZiAoX2NvbmZpZy5oYXNCYWNrZHJvcCkge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5iYWNrZHJvcENsaWNrKCkuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2xvc2UoKSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIGtleWJvYXJkIHNob3J0Y3V0c1xuICAgIGlmIChfY29uZmlnLmtleWJvYXJkU2hvcnRjdXRzKSB7XG4gICAgICB0aGlzLl9vdmVybGF5UmVmLmtleWRvd25FdmVudHMoKS5zdWJzY3JpYmUoKGV2ZW50OiBhbnkpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgY2FzZSBMRUZUX0FSUk9XOlxuICAgICAgICAgICAgZ2FsbGVyeVJlZi5wcmV2KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxuICAgICAgICAgICAgZ2FsbGVyeVJlZi5uZXh0KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEVTQ0FQRTpcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlIExpZ2h0Ym94IE92ZXJsYXlcbiAgICovXG4gIGNsb3NlKCkge1xuICAgIGlmICh0aGlzLl9vdmVybGF5UmVmLmhhc0F0dGFjaGVkKCkpIHtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgfVxuICB9XG59XG4iXX0=