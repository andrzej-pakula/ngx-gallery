(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/platform-browser'), require('@angular/animations'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-gallery', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/platform-browser', '@angular/animations', '@angular/common'], factory) :
    (global = global || self, factory(global['ng-gallery'] = {}, global.ng.core, global.rxjs, global.rxjs.operators, global.ng.platformBrowser, global.ng.animations, global.ng.common));
}(this, (function (exports, i0, rxjs, operators, platformBrowser, animations, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    ;
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    (function (GalleryAction) {
        GalleryAction["INITIALIZED"] = "initialized";
        GalleryAction["ITEMS_CHANGED"] = "itemsChanged";
        GalleryAction["INDEX_CHANGED"] = "indexChanged";
        GalleryAction["PLAY"] = "play";
        GalleryAction["STOP"] = "stop";
    })(exports.GalleryAction || (exports.GalleryAction = {}));
    (function (ImageSize) {
        ImageSize["Cover"] = "cover";
        ImageSize["Contain"] = "contain";
    })(exports.ImageSize || (exports.ImageSize = {}));
    (function (LoadingStrategy) {
        LoadingStrategy["Preload"] = "preload";
        LoadingStrategy["Lazy"] = "lazy";
        LoadingStrategy["Default"] = "default";
    })(exports.LoadingStrategy || (exports.LoadingStrategy = {}));
    (function (ThumbnailsPosition) {
        ThumbnailsPosition["Top"] = "top";
        ThumbnailsPosition["Left"] = "left";
        ThumbnailsPosition["LeftTop"] = "left-top";
        ThumbnailsPosition["Right"] = "right";
        ThumbnailsPosition["Bottom"] = "bottom";
        ThumbnailsPosition["BottomLeft"] = "bottom-left";
    })(exports.ThumbnailsPosition || (exports.ThumbnailsPosition = {}));
    (function (ImageLoaderMode) {
        ImageLoaderMode["Determinate"] = "determinate";
        ImageLoaderMode["Indeterminate"] = "indeterminate";
    })(exports.ImageLoaderMode || (exports.ImageLoaderMode = {}));
    (function (DotsPosition) {
        DotsPosition["Top"] = "top";
        DotsPosition["Bottom"] = "bottom";
    })(exports.DotsPosition || (exports.DotsPosition = {}));
    (function (CounterPosition) {
        CounterPosition["Top"] = "top";
        CounterPosition["Bottom"] = "bottom";
    })(exports.CounterPosition || (exports.CounterPosition = {}));
    (function (ThumbnailsMode) {
        ThumbnailsMode["Free"] = "free";
        ThumbnailsMode["Strict"] = "strict";
    })(exports.ThumbnailsMode || (exports.ThumbnailsMode = {}));
    (function (SlidingDirection) {
        SlidingDirection["Horizontal"] = "horizontal";
        SlidingDirection["Vertical"] = "vertical";
    })(exports.SlidingDirection || (exports.SlidingDirection = {}));
    (function (GalleryItemType) {
        GalleryItemType["Image"] = "image";
        GalleryItemType["Video"] = "video";
        GalleryItemType["Youtube"] = "youtube";
        GalleryItemType["Iframe"] = "iframe";
    })(exports.GalleryItemType || (exports.GalleryItemType = {}));

    /** Initial state */
    var defaultState = {
        action: exports.GalleryAction.INITIALIZED,
        isPlaying: false,
        hasNext: false,
        hasPrev: false,
        currIndex: 0,
        items: []
    };
    var defaultConfig = {
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
        imageSize: exports.ImageSize.Contain,
        thumbMode: exports.ThumbnailsMode.Strict,
        dotsPosition: exports.DotsPosition.Bottom,
        counterPosition: exports.CounterPosition.Top,
        thumbPosition: exports.ThumbnailsPosition.Bottom,
        loadingStrategy: exports.LoadingStrategy.Default,
        slidingDirection: exports.SlidingDirection.Horizontal,
        navIcon: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><svg width=\"512px\" height=\"512px\" enable-background=\"new 0 0 240.823 240.823\" version=\"1.1\" viewBox=\"0 0 240.823 240.823\" xml:space=\"preserve\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m183.19 111.82l-108.3-108.26c-4.752-4.74-12.451-4.74-17.215 0-4.752 4.74-4.752 12.439 0 17.179l99.707 99.671-99.695 99.671c-4.752 4.74-4.752 12.439 0 17.191 4.752 4.74 12.463 4.74 17.215 0l108.3-108.26c4.68-4.691 4.68-12.511-0.012-17.19z\" fill=\"#fff\"/></svg>",
        loadingIcon: "<?xml version=\"1.0\" encoding=\"UTF-8\"?><svg stroke=\"#fff\" viewBox=\"0 0 44 44\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\" stroke-width=\"2\"><circle cx=\"22\" cy=\"22\" r=\"1\"><animate attributeName=\"r\" begin=\"0s\" calcMode=\"spline\" dur=\"1.8s\" keySplines=\"0.165, 0.84, 0.44, 1\" keyTimes=\"0; 1\" repeatCount=\"indefinite\" values=\"1; 20\"/><animate attributeName=\"stroke-opacity\" begin=\"0s\" calcMode=\"spline\" dur=\"1.8s\" keySplines=\"0.3, 0.61, 0.355, 1\" keyTimes=\"0; 1\" repeatCount=\"indefinite\" values=\"1; 0\"/></circle><circle cx=\"22\" cy=\"22\" r=\"1\"><animate attributeName=\"r\" begin=\"-0.9s\" calcMode=\"spline\" dur=\"1.8s\" keySplines=\"0.165, 0.84, 0.44, 1\" keyTimes=\"0; 1\" repeatCount=\"indefinite\" values=\"1; 20\"/><animate attributeName=\"stroke-opacity\" begin=\"-0.9s\" calcMode=\"spline\" dur=\"1.8s\" keySplines=\"0.3, 0.61, 0.355, 1\" keyTimes=\"0; 1\" repeatCount=\"indefinite\" values=\"1; 0\"/></circle></g></svg>"
    };

    var ImageItem = /** @class */ (function () {
        function ImageItem(data) {
            this.data = data;
            this.type = exports.GalleryItemType.Image;
        }
        return ImageItem;
    }());
    var VideoItem = /** @class */ (function () {
        function VideoItem(data) {
            this.data = data;
            this.type = exports.GalleryItemType.Video;
        }
        return VideoItem;
    }());
    var IframeItem = /** @class */ (function () {
        function IframeItem(data) {
            this.data = data;
            this.type = exports.GalleryItemType.Iframe;
        }
        return IframeItem;
    }());
    var YoutubeItem = /** @class */ (function () {
        function YoutubeItem(data) {
            this.data = Object.assign(Object.assign({}, data), {
                src: "https://youtube.com/embed/" + data.src,
                thumb: data.thumb ? data.thumb : "//img.youtube.com/vi/" + data.src + "/default.jpg"
            });
            this.type = exports.GalleryItemType.Youtube;
        }
        return YoutubeItem;
    }());

    var filterActions = function (actions) {
        return operators.filter(function (state) { return actions.indexOf(state.action) > -1; });
    };
    var ɵ0 = filterActions;
    var GalleryRef = /** @class */ (function () {
        function GalleryRef(config, deleteInstance) {
            this.deleteInstance = deleteInstance;
            /** Stream that emits on item click */
            this.itemClick = new rxjs.Subject();
            /** Stream that emits on thumbnail click */
            this.thumbClick = new rxjs.Subject();
            /** Stream that emits on an error occurs */
            this.error = new rxjs.Subject();
            this._state = new rxjs.BehaviorSubject(defaultState);
            this._config = new rxjs.BehaviorSubject(config);
            this.state = this._state.asObservable();
            this.config = this._config.asObservable();
        }
        Object.defineProperty(GalleryRef.prototype, "initialized", {
            /** Stream that emits when gallery is initialized/reset */
            get: function () {
                return this.state.pipe(filterActions([exports.GalleryAction.INITIALIZED]));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryRef.prototype, "itemsChanged", {
            /** Stream that emits when items is changed (items loaded, item added, item removed) */
            get: function () {
                return this.state.pipe(filterActions([exports.GalleryAction.ITEMS_CHANGED]));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryRef.prototype, "indexChanged", {
            /** Stream that emits when current item is changed */
            get: function () {
                return this.state.pipe(filterActions([exports.GalleryAction.INDEX_CHANGED]));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryRef.prototype, "playingChanged", {
            /** Stream that emits when the player should start or stop */
            get: function () {
                return this.state.pipe(filterActions([exports.GalleryAction.PLAY, exports.GalleryAction.STOP]));
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryRef.prototype, "playerActions", {
            /** Stream that emits when the player should start or stop */
            get: function () {
                return this.state.pipe(filterActions([exports.GalleryAction.PLAY, exports.GalleryAction.STOP, exports.GalleryAction.INDEX_CHANGED]));
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Activate player actions listener
         */
        GalleryRef.prototype.activatePlayer = function () {
            var _this = this;
            return this.playerActions.pipe(operators.switchMap(function (e) { return e.isPlaying ? rxjs.of({}).pipe(operators.delay(_this._config.value.playerInterval), operators.tap(function () { return _this.next(); })) : rxjs.EMPTY; }));
        };
        /**
         * Set gallery state
         */
        GalleryRef.prototype.setState = function (state) {
            this._state.next(Object.assign(Object.assign({}, this._state.value), state));
        };
        /**
         * Set gallery config
         */
        GalleryRef.prototype.setConfig = function (config) {
            this._config.next(Object.assign(Object.assign({}, this._config.value), config));
        };
        /**
         * Add gallery item
         */
        GalleryRef.prototype.add = function (item, active) {
            var items = __spread(this._state.value.items, [item]);
            this.setState({
                action: exports.GalleryAction.ITEMS_CHANGED,
                items: items,
                hasNext: items.length > 1,
                currIndex: active ? items.length - 1 : this._state.value.currIndex
            });
        };
        /**
         * Add image item
         */
        GalleryRef.prototype.addImage = function (data, active) {
            this.add(new ImageItem(data), active);
        };
        /**
         * Add video item
         */
        GalleryRef.prototype.addVideo = function (data, active) {
            this.add(new VideoItem(data), active);
        };
        /**
         * Add iframe item
         */
        GalleryRef.prototype.addIframe = function (data, active) {
            this.add(new IframeItem(data), active);
        };
        /**
         * Add youtube item
         */
        GalleryRef.prototype.addYoutube = function (data, active) {
            this.add(new YoutubeItem(data), active);
        };
        /**
         * Remove gallery item
         */
        GalleryRef.prototype.remove = function (i) {
            var items = __spread(this._state.value.items.slice(0, i), this._state.value.items.slice(i + 1, this._state.value.items.length));
            this.setState({
                action: exports.GalleryAction.ITEMS_CHANGED,
                items: items,
                hasNext: items.length > 1,
                hasPrev: i > 0
            });
        };
        /**
         * Load items and reset the state
         */
        GalleryRef.prototype.load = function (items) {
            if (items) {
                this.setState({
                    action: exports.GalleryAction.ITEMS_CHANGED,
                    items: items,
                    hasNext: items.length > 1,
                    hasPrev: false
                });
            }
        };
        /**
         * Set active item
         */
        GalleryRef.prototype.set = function (i) {
            if (i !== this._state.value.currIndex) {
                this.setState({
                    action: exports.GalleryAction.INDEX_CHANGED,
                    currIndex: i,
                    hasNext: i < this._state.value.items.length - 1,
                    hasPrev: i > 0
                });
            }
        };
        /**
         * Next item
         */
        GalleryRef.prototype.next = function () {
            if (this._state.value.hasNext) {
                this.set(this._state.value.currIndex + 1);
            }
            else if (this._config.value.loop) {
                this.set(0);
            }
        };
        /**
         * Prev item
         */
        GalleryRef.prototype.prev = function () {
            if (this._state.value.hasPrev) {
                this.set(this._state.value.currIndex - 1);
            }
            else if (this._config.value.loop) {
                this.set(this._state.value.items.length - 1);
            }
        };
        /**
         * Start gallery player
         */
        GalleryRef.prototype.play = function (interval) {
            if (interval) {
                this.setConfig({ playerInterval: interval });
            }
            this.setState({ action: exports.GalleryAction.PLAY, isPlaying: true });
        };
        /**
         * Stop gallery player
         */
        GalleryRef.prototype.stop = function () {
            this.setState({ action: exports.GalleryAction.STOP, isPlaying: false });
        };
        /**
         * Reset gallery to initial state
         */
        GalleryRef.prototype.reset = function () {
            this.setState(defaultState);
        };
        /**
         * Destroy gallery
         */
        GalleryRef.prototype.destroy = function () {
            this._state.complete();
            this._config.complete();
            this.itemClick.complete();
            this.thumbClick.complete();
            this.deleteInstance();
        };
        return GalleryRef;
    }());

    var GALLERY_CONFIG = new i0.InjectionToken('GALLERY_CONFIG');

    var Gallery = /** @class */ (function () {
        function Gallery(config) {
            /** Store gallery instances */
            this._instances = new Map();
            this.config = config ? Object.assign(Object.assign({}, defaultConfig), config) : defaultConfig;
        }
        /**
         * Get or create gallery by ID
         * @param id
         * @param config
         */
        Gallery.prototype.ref = function (id, config) {
            if (id === void 0) { id = 'root'; }
            if (this._instances.has(id)) {
                var galleryRef = this._instances.get(id);
                if (config) {
                    galleryRef.setConfig(Object.assign(Object.assign({}, this.config), config));
                }
                return galleryRef;
            }
            else {
                return this._instances.set(id, new GalleryRef(Object.assign(Object.assign({}, this.config), config), this.deleteInstance(id))).get(id);
            }
        };
        /**
         * Destroy all gallery instances
         */
        Gallery.prototype.destroyAll = function () {
            this._instances.forEach(function (ref) { return ref.destroy(); });
        };
        /**
         * Reset all gallery instances
         */
        Gallery.prototype.resetAll = function () {
            this._instances.forEach(function (ref) { return ref.reset(); });
        };
        /**
         * A destroyer function for each gallery instance
         */
        Gallery.prototype.deleteInstance = function (id) {
            var _this = this;
            return function () {
                if (_this._instances.has(id)) {
                    _this._instances.delete(id);
                }
            };
        };
        return Gallery;
    }());
    Gallery.ɵprov = i0.ɵɵdefineInjectable({ factory: function Gallery_Factory() { return new Gallery(i0.ɵɵinject(GALLERY_CONFIG, 8)); }, token: Gallery, providedIn: "root" });
    Gallery.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    Gallery.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [GALLERY_CONFIG,] }] }
    ]; };

    var GalleryComponent = /** @class */ (function () {
        function GalleryComponent(_gallery) {
            this._gallery = _gallery;
            this.nav = this._gallery.config.nav;
            this.dots = this._gallery.config.dots;
            this.loop = this._gallery.config.loop;
            this.thumb = this._gallery.config.thumb;
            this.zoomOut = this._gallery.config.zoomOut;
            this.counter = this._gallery.config.counter;
            this.dotsSize = this._gallery.config.dotsSize;
            this.autoPlay = this._gallery.config.autoPlay;
            this.gestures = this._gallery.config.gestures;
            this.thumbWidth = this._gallery.config.thumbWidth;
            this.thumbHeight = this._gallery.config.thumbHeight;
            this.disableThumb = this._gallery.config.disableThumb;
            this.panSensitivity = this._gallery.config.panSensitivity;
            this.playerInterval = this._gallery.config.playerInterval;
            this.itemTemplate = this._gallery.config.itemTemplate;
            this.thumbTemplate = this._gallery.config.thumbTemplate;
            this.thumbMode = this._gallery.config.thumbMode;
            this.imageSize = this._gallery.config.imageSize;
            this.dotsPosition = this._gallery.config.dotsPosition;
            this.counterPosition = this._gallery.config.counterPosition;
            this.slidingDirection = this._gallery.config.slidingDirection;
            this.loadingStrategy = this._gallery.config.loadingStrategy;
            this.thumbPosition = this._gallery.config.thumbPosition;
            // Inputs used by the lightbox
            /** Destroy gallery ref on component destroy event */
            this.destroyRef = true;
            /** Skip initializing the config with components inputs (Lightbox mode) */
            this.skipInitConfig = false;
            this.itemClick = new i0.EventEmitter();
            this.thumbClick = new i0.EventEmitter();
            this.playingChange = new i0.EventEmitter();
            this.indexChange = new i0.EventEmitter();
            this.itemsChange = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
            this._itemClick$ = rxjs.Subscription.EMPTY;
            this._thumbClick$ = rxjs.Subscription.EMPTY;
            this._itemChange$ = rxjs.Subscription.EMPTY;
            this._indexChange$ = rxjs.Subscription.EMPTY;
            this._playingChange$ = rxjs.Subscription.EMPTY;
            this._playerListener$ = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(GalleryComponent.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: false,
            configurable: true
        });
        GalleryComponent.prototype.getConfig = function () {
            return {
                nav: this.nav,
                dots: this.dots,
                loop: this.loop,
                thumb: this.thumb,
                zoomOut: this.zoomOut,
                counter: this.counter,
                autoPlay: this.autoPlay,
                gestures: this.gestures,
                dotsSize: this.dotsSize,
                imageSize: this.imageSize,
                thumbMode: this.thumbMode,
                thumbWidth: this.thumbWidth,
                thumbHeight: this.thumbHeight,
                disableThumb: this.disableThumb,
                dotsPosition: this.dotsPosition,
                itemTemplate: this.itemTemplate,
                thumbTemplate: this.thumbTemplate,
                thumbPosition: this.thumbPosition,
                panSensitivity: this.panSensitivity,
                playerInterval: this.playerInterval,
                counterPosition: this.counterPosition,
                loadingStrategy: this.loadingStrategy,
                slidingDirection: this.slidingDirection
            };
        };
        GalleryComponent.prototype.onAction = function (i) {
            switch (i) {
                case 'next':
                    this.galleryRef.next();
                    break;
                case 'prev':
                    this.galleryRef.prev();
                    break;
                default:
                    this.galleryRef.set(i);
            }
        };
        GalleryComponent.prototype.ngOnChanges = function (changes) {
            if (this.galleryRef) {
                this.galleryRef.setConfig(this.getConfig());
                if (changes.items && changes.items.currentValue !== changes.items.previousValue) {
                    this.load(this.items);
                }
            }
        };
        GalleryComponent.prototype.ngOnInit = function () {
            var _this = this;
            // Get gallery instance by id
            if (this.skipInitConfig) {
                this.galleryRef = this._gallery.ref(this.id);
            }
            else {
                this.galleryRef = this._gallery.ref(this.id, this.getConfig());
            }
            // Load gallery items
            this.load(this.items);
            // Activate player listener
            this._playerListener$ = this.galleryRef.activatePlayer().subscribe();
            // Subscribes to events on demand
            if (this.indexChange.observers.length) {
                this._indexChange$ = this.galleryRef.indexChanged.subscribe(function (state) { return _this.indexChange.emit(state); });
            }
            if (this.itemsChange.observers.length) {
                this._itemChange$ = this.galleryRef.itemsChanged.subscribe(function (state) { return _this.itemsChange.emit(state); });
            }
            if (this.playingChange.observers.length) {
                this._playingChange$ = this.galleryRef.playingChanged.subscribe(function (state) { return _this.playingChange.emit(state); });
            }
            // Start playing if auto-play is set to true
            if (this.autoPlay) {
                this.play();
            }
        };
        GalleryComponent.prototype.ngOnDestroy = function () {
            this._itemClick$.unsubscribe();
            this._thumbClick$.unsubscribe();
            this._itemChange$.unsubscribe();
            this._indexChange$.unsubscribe();
            this._playingChange$.unsubscribe();
            this._playerListener$.unsubscribe();
            if (this.destroyRef) {
                this.galleryRef.destroy();
            }
        };
        GalleryComponent.prototype.onItemClick = function (i) {
            this.itemClick.emit(i);
            this.galleryRef.itemClick.next(i);
        };
        GalleryComponent.prototype.onThumbClick = function (i) {
            this.galleryRef.set(i);
            this.thumbClick.emit(i);
            this.galleryRef.thumbClick.next(i);
        };
        GalleryComponent.prototype.onError = function (err) {
            this.error.emit(err);
            this.galleryRef.error.next(err);
        };
        GalleryComponent.prototype.load = function (items) {
            this.galleryRef.load(items);
        };
        GalleryComponent.prototype.add = function (item, active) {
            this.galleryRef.add(item, active);
        };
        GalleryComponent.prototype.addImage = function (data, active) {
            this.add(new ImageItem(data), active);
        };
        GalleryComponent.prototype.addVideo = function (data, active) {
            this.add(new VideoItem(data), active);
        };
        GalleryComponent.prototype.addIframe = function (data, active) {
            this.add(new IframeItem(data), active);
        };
        GalleryComponent.prototype.addYoutube = function (data, active) {
            this.add(new YoutubeItem(data), active);
        };
        GalleryComponent.prototype.remove = function (i) {
            this.galleryRef.remove(i);
        };
        GalleryComponent.prototype.next = function () {
            this.galleryRef.next();
        };
        GalleryComponent.prototype.prev = function () {
            this.galleryRef.prev();
        };
        GalleryComponent.prototype.set = function (i) {
            this.galleryRef.set(i);
        };
        GalleryComponent.prototype.reset = function () {
            this.galleryRef.reset();
        };
        GalleryComponent.prototype.play = function (interval) {
            this.galleryRef.play(interval);
        };
        GalleryComponent.prototype.stop = function () {
            this.galleryRef.stop();
        };
        GalleryComponent.prototype.withHeight = function (height) {
            this._height = height + "px";
        };
        return GalleryComponent;
    }());
    GalleryComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <gallery-core [state]=\"galleryRef.state | async\"\n                  [config]=\"galleryRef.config | async\"\n                  (action)=\"onAction($event)\"\n                  (itemClick)=\"onItemClick($event)\"\n                  (thumbClick)=\"onThumbClick($event)\"\n                  (error)=\"onError($event)\"></gallery-core>\n    <ng-content></ng-content>\n  ",
                    styles: ["::ng-deep gallery-core[dotsPosition=top] gallery-dots{top:0}::ng-deep gallery-core[dotsPosition=bottom] gallery-dots{bottom:0}::ng-deep gallery-dots{left:50%;margin:7px;position:absolute;transform:translateX(-50%)}::ng-deep .g-dot{cursor:pointer;z-index:20}::ng-deep .g-dot:hover .g-dot-inner{opacity:1}::ng-deep .g-dot-active .g-dot-inner{opacity:1;transform:scale(1.5)!important}::ng-deep .g-dot-inner{background-color:#fff;border-radius:50%;box-shadow:0 0 1px #000;height:30%;opacity:.6;transition:all .2s ease;width:30%}::ng-deep .g-dot,::ng-deep .g-dot-inner,::ng-deep gallery-dots{align-items:center;display:flex;justify-content:center}::ng-deep .g-nav-next,::ng-deep .g-nav-prev{cursor:pointer;height:40px;position:absolute;top:50%;width:30px;z-index:999}::ng-deep .g-nav-next{right:.5em;transform:translateY(-50%) perspective(1px)}::ng-deep .g-nav-prev{left:.5em;transform:translateY(-50%) perspective(1px) scale(-1)}@media only screen and (max-width:480px){::ng-deep .g-nav-next{right:.2em}::ng-deep .g-nav-prev{left:.2em}}::ng-deep .g-items-container{height:100%}::ng-deep .g-slider{position:absolute;transition:transform .4s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-core[slidingDirection=horizontal] .g-slider{flex-direction:row}::ng-deep gallery-core[slidingDirection=vertical] .g-slider{flex-direction:column}::ng-deep gallery-thumbs{display:block;overflow:unset;z-index:1}::ng-deep .g-thumbs-container{display:flex;height:100%;left:0;overflow:unset;position:relative;top:0;width:100%;z-index:206}::ng-deep gallery-core[disableThumb=true] gallery-thumb{cursor:default}::ng-deep gallery-core[thumbPosition=bottom-left] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=bottom] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=top] gallery-thumbs .g-slider{flex-direction:row;left:50%;top:0}::ng-deep gallery-core[thumbPosition=bottom-left] gallery-thumb,::ng-deep gallery-core[thumbPosition=bottom] gallery-thumb,::ng-deep gallery-core[thumbPosition=top] gallery-thumb{padding:1px 0 1px 1px}::ng-deep gallery-core[thumbPosition=bottom-left] gallery-thumbs .g-slider{left:0}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=left] gallery-thumbs .g-slider,::ng-deep gallery-core[thumbPosition=right] gallery-thumbs .g-slider{flex-direction:column;left:0;top:50%}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumb,::ng-deep gallery-core[thumbPosition=left] gallery-thumb,::ng-deep gallery-core[thumbPosition=right] gallery-thumb{padding:0 1px 1px}::ng-deep gallery-core[thumbPosition=left-top] gallery-thumbs .g-slider{top:0}::ng-deep gallery-core[thumbPosition=top]{flex-direction:column}::ng-deep gallery-core[thumbPosition=left-top],::ng-deep gallery-core[thumbPosition=left]{flex-direction:row}::ng-deep gallery-core[thumbPosition=right]{flex-direction:row-reverse}::ng-deep gallery-core[thumbPosition=bottom-left],::ng-deep gallery-core[thumbPosition=bottom]{flex-direction:column-reverse}::ng-deep gallery-thumb.g-active-thumb .g-thumb-loading{background-color:#464646}::ng-deep .g-thumb-loading{background-color:#262626;height:100%;overflow:hidden;position:relative}::ng-deep .g-thumb-loading:before{-webkit-animation:phAnimation .8s linear infinite;animation:phAnimation .8s linear infinite;background:linear-gradient(90deg,hsla(0,0%,100%,0) 46%,hsla(0,0%,100%,.35) 50%,hsla(0,0%,100%,0) 54%) 50% 50%;bottom:0;content:\"\";left:50%;margin-left:-250%;position:absolute;right:0;top:0;width:500%;z-index:1}@-webkit-keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}@keyframes phAnimation{0%{transform:translate3d(-30%,0,0)}to{transform:translate3d(30%,0,0)}}::ng-deep gallery-core[counterPosition=top] .g-counter{border-bottom-left-radius:4px;border-bottom-right-radius:4px;top:0}::ng-deep gallery-core[counterPosition=bottom] .g-counter{border-top-left-radius:4px;border-top-right-radius:4px;bottom:0}::ng-deep .g-counter{background-color:rgba(0,0,0,.5);color:#fff;font-size:12px;left:50%;padding:4px 10px;position:absolute;transform:translateX(-50%) perspective(1px);z-index:50}::ng-deep gallery[gallerize] gallery-item{cursor:pointer}::ng-deep gallery-item,::ng-deep gallery-thumb{display:block;height:100%;overflow:hidden;position:relative;width:100%}::ng-deep gallery-item h2,::ng-deep gallery-item h4,::ng-deep gallery-thumb h2,::ng-deep gallery-thumb h4{color:coral;margin:0}::ng-deep gallery-item h2,::ng-deep gallery-thumb h2{font-size:3.5em;margin-bottom:.3em}::ng-deep gallery-item h4,::ng-deep gallery-thumb h4{font-size:1.6em}::ng-deep gallery-item{z-index:10}::ng-deep gallery-item iframe,::ng-deep gallery-item video{height:100%;position:absolute;width:100%}::ng-deep gallery-thumb{cursor:pointer;opacity:.5;transition:opacity .3s cubic-bezier(.5,0,.5,1)}::ng-deep gallery-thumb.g-active-thumb{opacity:1}::ng-deep .g-image-item{background-position:50%;background-repeat:no-repeat;background-size:cover;height:100%;width:100%}::ng-deep .g-image-error-message,::ng-deep .g-template{align-items:center;bottom:0;color:#fff;display:flex;flex-direction:column;justify-content:center;left:0;position:absolute;right:0;top:0;z-index:10}::ng-deep .g-loading{height:80px;left:50%;position:absolute;top:50%;transform:translate3d(-50%,-50%,0);width:80px}::ng-deep gallery-core[imageSize=contain] gallery-slider .g-image-item{background-size:contain}::ng-deep gallery-image{align-items:center;display:flex;height:100%;justify-content:center}::ng-deep gallery{background-color:#000;display:block;height:500px;overflow:hidden;position:relative;z-index:1}::ng-deep gallery *{box-sizing:border-box}::ng-deep gallery,::ng-deep gallery-core{overflow:hidden;position:relative}::ng-deep .g-box,::ng-deep .g-slider,::ng-deep gallery-core{display:flex;height:100%;width:100%}::ng-deep gallery[fluid]{left:50%;transform:translateX(-50vw);width:100vw}::ng-deep gallery[fluid][fluid=false]{left:auto;transform:none;width:auto}::ng-deep .g-no-transition{transition:unset!important}::ng-deep .g-box,::ng-deep gallery-slider{display:flex;flex:1;flex-direction:column;height:100%;order:1;overflow:hidden;position:relative}::ng-deep .g-btn-close svg,::ng-deep gallery-nav svg{-webkit-filter:drop-shadow(0 0 1px #000);filter:drop-shadow(0 0 1px black);height:100%;opacity:.6;transition:opacity .2s linear;width:100%}::ng-deep .g-btn-close svg:hover,::ng-deep gallery-nav svg:hover{opacity:1}"]
                },] }
    ];
    GalleryComponent.ctorParameters = function () { return [
        { type: Gallery }
    ]; };
    GalleryComponent.propDecorators = {
        id: [{ type: i0.Input }],
        items: [{ type: i0.Input }],
        nav: [{ type: i0.Input }],
        dots: [{ type: i0.Input }],
        loop: [{ type: i0.Input }],
        thumb: [{ type: i0.Input }],
        zoomOut: [{ type: i0.Input }],
        counter: [{ type: i0.Input }],
        dotsSize: [{ type: i0.Input }],
        autoPlay: [{ type: i0.Input }],
        gestures: [{ type: i0.Input }],
        thumbWidth: [{ type: i0.Input }],
        thumbHeight: [{ type: i0.Input }],
        disableThumb: [{ type: i0.Input }],
        panSensitivity: [{ type: i0.Input }],
        playerInterval: [{ type: i0.Input }],
        itemTemplate: [{ type: i0.Input }],
        thumbTemplate: [{ type: i0.Input }],
        thumbMode: [{ type: i0.Input }],
        imageSize: [{ type: i0.Input }],
        dotsPosition: [{ type: i0.Input }],
        counterPosition: [{ type: i0.Input }],
        slidingDirection: [{ type: i0.Input }],
        loadingStrategy: [{ type: i0.Input }],
        thumbPosition: [{ type: i0.Input }],
        height: [{ type: i0.HostBinding, args: ['style.height',] }],
        destroyRef: [{ type: i0.Input }],
        skipInitConfig: [{ type: i0.Input }],
        itemClick: [{ type: i0.Output }],
        thumbClick: [{ type: i0.Output }],
        playingChange: [{ type: i0.Output }],
        indexChange: [{ type: i0.Output }],
        itemsChange: [{ type: i0.Output }],
        error: [{ type: i0.Output }]
    };

    var GalleryIframeComponent = /** @class */ (function () {
        function GalleryIframeComponent(_sanitizer) {
            this._sanitizer = _sanitizer;
        }
        Object.defineProperty(GalleryIframeComponent.prototype, "src", {
            set: function (src) {
                this.iframeSrc = this._sanitizer.bypassSecurityTrustResourceUrl(src);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryIframeComponent.prototype, "pauseVideo", {
            set: function (shouldPause) {
                if (this.iframe.nativeElement) {
                    if (shouldPause) {
                        var iframe = this.iframe.nativeElement;
                        iframe.src = null;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        return GalleryIframeComponent;
    }());
    GalleryIframeComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-iframe',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <iframe #iframe\n            frameborder=\"0\"\n            allowfullscreen\n            [attr.allow]=\"autoplay ? 'autoplay' : ''\"\n            [src]=\"iframeSrc\">\n    </iframe>\n  "
                },] }
    ];
    GalleryIframeComponent.ctorParameters = function () { return [
        { type: platformBrowser.DomSanitizer }
    ]; };
    GalleryIframeComponent.propDecorators = {
        src: [{ type: i0.Input, args: ['src',] }],
        pauseVideo: [{ type: i0.Input, args: ['pause',] }],
        autoplay: [{ type: i0.Input }],
        iframe: [{ type: i0.ViewChild, args: ['iframe', { static: true },] }]
    };

    var GalleryImageComponent = /** @class */ (function () {
        function GalleryImageComponent(_sanitizer) {
            this._sanitizer = _sanitizer;
            /** Stream that emits the state */
            this._state = new rxjs.BehaviorSubject('loading');
            this.state = this._state.asObservable();
            /** Progress value */
            this.progress = 0;
            /** Stream that emits when an error occurs */
            this.error = new i0.EventEmitter();
        }
        Object.defineProperty(GalleryImageComponent.prototype, "imageLoadSuccess", {
            get: function () {
                return !!this.imageUrl;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryImageComponent.prototype, "imageLoadFailed", {
            get: function () {
                return !!this.loadError;
            },
            enumerable: false,
            configurable: true
        });
        GalleryImageComponent.prototype.ngOnInit = function () {
            if (this.loadingIcon) {
                this.loaderTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingIcon);
            }
            if (this.loadingError) {
                this.errorTemplate = this._sanitizer.bypassSecurityTrustHtml(this.loadingError);
            }
        };
        GalleryImageComponent.prototype.ngOnDestroy = function () {
            this._state.complete();
        };
        GalleryImageComponent.prototype.onProgress = function (_a) {
            var loaded = _a.loaded, total = _a.total;
            this.progress = loaded * 100 / total;
        };
        GalleryImageComponent.prototype.onLoaded = function (blobUrl) {
            this.imageUrl = this._sanitizer.bypassSecurityTrustStyle("url(\"" + blobUrl + "\")");
            this._state.next('success');
        };
        GalleryImageComponent.prototype.onError = function (err) {
            this.loadError = err;
            this._state.next('failed');
            this.error.emit(err);
        };
        return GalleryImageComponent;
    }());
    GalleryImageComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-image',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    animations: [
                        animations.trigger('fadeIn', [
                            animations.transition(':enter', [
                                animations.style({ opacity: 0 }),
                                animations.animate('300ms ease-in', animations.style({ opacity: 1 }))
                            ])
                        ])
                    ],
                    template: "\n    <ng-container [lazyImage]=\"src\"\n                  (progress)=\"onProgress($event)\"\n                  (loaded)=\"onLoaded($event)\"\n                  (error)=\"onError($event)\"\n                  [ngSwitch]=\"state | async\">\n\n      <div *ngSwitchCase=\"'success'\"\n           @fadeIn\n           class=\"g-image-item\"\n           [style.backgroundImage]=\"imageUrl\">\n      </div>\n\n      <div *ngSwitchCase=\"'failed'\"\n           class=\"g-image-error-message\">\n        <div *ngIf=\"errorTemplate; else defaultError\"\n             [innerHTML]=\"errorTemplate\"></div>\n        <ng-template #defaultError>\n          <ng-container *ngIf=\"isThumbnail; else isLarge\">\n            <h4>\u26A0</h4>\n          </ng-container>\n          <ng-template #isLarge>\n            <h2>\u26A0</h2>\n            <p>Unable to load the image!</p>\n          </ng-template>\n        </ng-template>\n      </div>\n\n      <ng-container *ngSwitchCase=\"'loading'\">\n        <div *ngIf=\"loaderTemplate; else defaultLoader\"\n             class=\"g-loading\"\n             [innerHTML]=\"loaderTemplate\">\n        </div>\n        <ng-template #defaultLoader>\n          <div *ngIf=\"isThumbnail\" class=\"g-thumb-loading\"></div>\n        </ng-template>\n      </ng-container>\n    </ng-container>\n  "
                },] }
    ];
    GalleryImageComponent.ctorParameters = function () { return [
        { type: platformBrowser.DomSanitizer }
    ]; };
    GalleryImageComponent.propDecorators = {
        isThumbnail: [{ type: i0.Input }],
        src: [{ type: i0.Input }],
        loadingIcon: [{ type: i0.Input }],
        loadingError: [{ type: i0.Input }],
        error: [{ type: i0.Output }],
        imageLoadSuccess: [{ type: i0.HostBinding, args: ['class.g-image-loaded',] }],
        imageLoadFailed: [{ type: i0.HostBinding, args: ['class.g-image-error',] }]
    };

    var GalleryVideoComponent = /** @class */ (function () {
        function GalleryVideoComponent() {
            /** Stream that emits when an error occurs */
            this.error = new i0.EventEmitter();
        }
        Object.defineProperty(GalleryVideoComponent.prototype, "pauseVideo", {
            set: function (shouldPause) {
                if (this.video.nativeElement) {
                    var video = this.video.nativeElement;
                    if (shouldPause && !video.paused) {
                        video.pause();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryVideoComponent.prototype, "playVideo", {
            set: function (shouldPlay) {
                if (this.video.nativeElement) {
                    var video = this.video.nativeElement;
                    if (shouldPlay) {
                        video.play();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        GalleryVideoComponent.prototype.ngOnInit = function () {
            if (this.src instanceof Array) {
                // If video has multiple sources
                this.videoSources = __spread(this.src);
            }
            else {
                this.videoSources = [{ url: this.src }];
            }
            this.controls = typeof this.controlsEnabled === 'boolean' ? this.controlsEnabled : true;
        };
        return GalleryVideoComponent;
    }());
    GalleryVideoComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-video',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <video #video [controls]=\"controls\" [poster]=\"poster\" (error)=\"error.emit($event)\">\n      <source *ngFor=\"let src of videoSources\" [src]=\"src?.url\" [type]=\"src?.type\"/>\n    </video>\n  "
                },] }
    ];
    GalleryVideoComponent.propDecorators = {
        src: [{ type: i0.Input }],
        poster: [{ type: i0.Input }],
        controlsEnabled: [{ type: i0.Input, args: ['controls',] }],
        pauseVideo: [{ type: i0.Input, args: ['pause',] }],
        playVideo: [{ type: i0.Input, args: ['play',] }],
        error: [{ type: i0.Output }],
        video: [{ type: i0.ViewChild, args: ['video', { static: true },] }]
    };

    var GalleryNavComponent = /** @class */ (function () {
        function GalleryNavComponent(_sanitizer) {
            this._sanitizer = _sanitizer;
            this.action = new i0.EventEmitter();
        }
        GalleryNavComponent.prototype.ngOnInit = function () {
            this.navIcon = this._sanitizer.bypassSecurityTrustHtml(this.config.navIcon);
        };
        return GalleryNavComponent;
    }());
    GalleryNavComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-nav',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <i *ngIf=\"config.loop || state.hasPrev\"\n       class=\"g-nav-prev\"\n       aria-label=\"Previous\"\n       (tapClick)=\"action.emit('prev')\"\n       [innerHtml]=\"navIcon\"></i>\n\n    <i *ngIf=\"config.loop || state.hasNext\"\n       class=\"g-nav-next\"\n       aria-label=\"Next\"\n       (tapClick)=\"action.emit('next')\"\n       [innerHtml]=\"navIcon\"></i>\n  "
                },] }
    ];
    GalleryNavComponent.ctorParameters = function () { return [
        { type: platformBrowser.DomSanitizer }
    ]; };
    GalleryNavComponent.propDecorators = {
        state: [{ type: i0.Input }],
        config: [{ type: i0.Input }],
        action: [{ type: i0.Output }]
    };

    var GalleryCoreComponent = /** @class */ (function () {
        function GalleryCoreComponent() {
            this.action = new i0.EventEmitter();
            this.itemClick = new i0.EventEmitter();
            this.thumbClick = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        Object.defineProperty(GalleryCoreComponent.prototype, "thumbPosition", {
            /** Set thumbnails position */
            get: function () {
                return this.config.thumbPosition;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryCoreComponent.prototype, "slidingDirection", {
            /** Set sliding direction */
            get: function () {
                return this.config.slidingDirection;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryCoreComponent.prototype, "disableThumb", {
            /** Disable thumbnails clicks */
            get: function () {
                return this.config.disableThumb;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryCoreComponent.prototype, "imageSize", {
            /** Set gallery image size */
            get: function () {
                return this.config.imageSize;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryCoreComponent.prototype, "dotsPosition", {
            /** Set gallery dots position */
            get: function () {
                return this.config.dotsPosition;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryCoreComponent.prototype, "counterPosition", {
            /** Set gallery counter position */
            get: function () {
                return this.config.counterPosition;
            },
            enumerable: false,
            configurable: true
        });
        return GalleryCoreComponent;
    }());
    GalleryCoreComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-core',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <gallery-thumbs *ngIf=\"config.thumb\"\n                    [state]=\"state\"\n                    [config]=\"config\"\n                    (action)=\"action.emit($event)\"\n                    (thumbClick)=\"thumbClick.emit($event)\">\n    </gallery-thumbs>\n    <div class=\"g-box\">\n      <gallery-slider [state]=\"state\"\n                      [config]=\"config\"\n                      (action)=\"action.emit($event)\"\n                      (itemClick)=\"itemClick.emit($event)\"\n                      (error)=\"error.emit($event)\">\n\n        <gallery-nav *ngIf=\"config.nav && state.items.length > 1\"\n                     [state]=\"state\"\n                     [config]=\"config\"\n                     (action)=\"action.emit($event)\">\n        </gallery-nav>\n\n      </gallery-slider>\n\n      <gallery-dots *ngIf=\"config.dots\"\n                    [state]=\"state\"\n                    [config]=\"config\"\n                    (action)=\"action.emit($event)\">\n      </gallery-dots>\n\n      <gallery-counter *ngIf=\"config.counter\"\n                       [state]=\"state\">\n      </gallery-counter>\n    </div>\n  "
                },] }
    ];
    GalleryCoreComponent.propDecorators = {
        state: [{ type: i0.Input }],
        config: [{ type: i0.Input }],
        action: [{ type: i0.Output }],
        itemClick: [{ type: i0.Output }],
        thumbClick: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        thumbPosition: [{ type: i0.HostBinding, args: ['attr.thumbPosition',] }],
        slidingDirection: [{ type: i0.HostBinding, args: ['attr.slidingDirection',] }],
        disableThumb: [{ type: i0.HostBinding, args: ['attr.disableThumb',] }],
        imageSize: [{ type: i0.HostBinding, args: ['attr.imageSize',] }],
        dotsPosition: [{ type: i0.HostBinding, args: ['attr.dotsPosition',] }],
        counterPosition: [{ type: i0.HostBinding, args: ['attr.counterPosition',] }]
    };

    var GalleryDotsComponent = /** @class */ (function () {
        function GalleryDotsComponent() {
            this.action = new i0.EventEmitter();
        }
        return GalleryDotsComponent;
    }());
    GalleryDotsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-dots',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"g-dot\"\n         *ngFor=\"let item of state.items; let i = index\"\n         [class.g-dot-active]=\"i === state.currIndex\"\n         [style.width.px]=\"config?.dotsSize\"\n         [style.height.px]=\"config?.dotsSize\"\n         (tapClick)=\"action.emit(i)\">\n      <div class=\"g-dot-inner\"></div>\n    </div>\n  "
                },] }
    ];
    GalleryDotsComponent.propDecorators = {
        state: [{ type: i0.Input }],
        config: [{ type: i0.Input }],
        action: [{ type: i0.Output }]
    };

    var GalleryThumbsComponent = /** @class */ (function () {
        function GalleryThumbsComponent(_el, _zone) {
            var _this = this;
            this._el = _el;
            this._zone = _zone;
            /** Sliding worker */
            this._slidingWorker$ = new rxjs.BehaviorSubject({ value: 0, active: false });
            /** Current slider position in free sliding mode */
            this._freeModeCurrentOffset = 0;
            /** Stream that emits when the active item should change */
            this.action = new i0.EventEmitter();
            /** Stream that emits when thumb is clicked */
            this.thumbClick = new i0.EventEmitter();
            /** Stream that emits when an error occurs */
            this.error = new i0.EventEmitter();
            // Activate sliding worker
            this.sliderState$ = this._slidingWorker$.pipe(operators.map(function (state) { return ({
                style: _this.getSliderStyles(state),
                active: state.active
            }); }));
        }
        GalleryThumbsComponent.prototype.ngOnChanges = function () {
            // Refresh the slider
            this.updateSlider({ value: 0, active: false });
            this._freeModeCurrentOffset = 0;
        };
        GalleryThumbsComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.config.gestures && !this.config.disableThumb && typeof Hammer !== 'undefined') {
                var direction = void 0;
                switch (this.config.thumbPosition) {
                    case exports.ThumbnailsPosition.Right:
                    case exports.ThumbnailsPosition.Left:
                    case exports.ThumbnailsPosition.LeftTop:
                        direction = Hammer.DIRECTION_VERTICAL;
                        break;
                    case exports.ThumbnailsPosition.Top:
                    case exports.ThumbnailsPosition.Bottom:
                    case exports.ThumbnailsPosition.BottomLeft:
                        direction = Hammer.DIRECTION_HORIZONTAL;
                        break;
                }
                // Activate gestures
                this._hammer = new Hammer(this._el.nativeElement);
                this._hammer.get('pan').set({ direction: direction });
                this._zone.runOutsideAngular(function () {
                    // Move the slider
                    switch (_this.config.thumbMode) {
                        case exports.ThumbnailsMode.Strict:
                            _this._hammer.on('pan', function (e) { return _this.strictMode(e); });
                            break;
                        case exports.ThumbnailsMode.Free:
                            _this._hammer.on('pan', function (e) { return _this.freeMode(e); });
                    }
                });
            }
        };
        GalleryThumbsComponent.prototype.ngOnDestroy = function () {
            if (this._hammer) {
                this._hammer.destroy();
            }
        };
        /**
         * Sliding strict mode
         */
        GalleryThumbsComponent.prototype.strictMode = function (e) {
            switch (this.config.thumbPosition) {
                case exports.ThumbnailsPosition.Right:
                case exports.ThumbnailsPosition.Left:
                case exports.ThumbnailsPosition.LeftTop:
                    this.updateSlider({ value: e.deltaY, active: true });
                    if (e.isFinal) {
                        this.updateSlider({ value: 0, active: false });
                        this.verticalPan(e);
                    }
                    break;
                case exports.ThumbnailsPosition.Top:
                case exports.ThumbnailsPosition.Bottom:
                case exports.ThumbnailsPosition.BottomLeft:
                    this.updateSlider({ value: e.deltaX, active: true });
                    if (e.isFinal) {
                        this.updateSlider({ value: 0, active: false });
                        this.horizontalPan(e);
                    }
            }
        };
        /**
         * Sliding free mode
         */
        GalleryThumbsComponent.prototype.freeMode = function (e) {
            switch (this.config.thumbPosition) {
                case exports.ThumbnailsPosition.Right:
                case exports.ThumbnailsPosition.Left:
                case exports.ThumbnailsPosition.LeftTop:
                    this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaY, active: true });
                    if (e.isFinal) {
                        if (this.minFreeScrollExceeded(e.deltaY, this.config.thumbWidth, this.config.thumbHeight)) {
                            this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbHeight;
                        }
                        else if (this.maxFreeScrollExceeded(e.deltaY, this.config.thumbHeight, this.config.thumbWidth)) {
                            this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbHeight;
                        }
                        else {
                            this._freeModeCurrentOffset += e.deltaY;
                        }
                        this.updateSlider({ value: this._freeModeCurrentOffset, active: false });
                    }
                    break;
                case exports.ThumbnailsPosition.Top:
                case exports.ThumbnailsPosition.Bottom:
                case exports.ThumbnailsPosition.BottomLeft:
                    this.updateSlider({ value: this._freeModeCurrentOffset + e.deltaX, active: true });
                    if (e.isFinal) {
                        if (this.minFreeScrollExceeded(e.deltaX, this.config.thumbHeight, this.config.thumbWidth)) {
                            this._freeModeCurrentOffset = -(this.state.items.length - 1 - this.state.currIndex) * this.config.thumbWidth;
                        }
                        else if (this.maxFreeScrollExceeded(e.deltaX, this.config.thumbWidth, this.config.thumbHeight)) {
                            this._freeModeCurrentOffset = this.state.currIndex * this.config.thumbWidth;
                        }
                        else {
                            this._freeModeCurrentOffset += e.deltaX;
                        }
                        this.updateSlider({ value: this._freeModeCurrentOffset, active: false });
                    }
            }
        };
        /**
         * Check if the minimum free scroll is exceeded (used in Bottom, Left directions)
         */
        GalleryThumbsComponent.prototype.minFreeScrollExceeded = function (delta, width, height) {
            return -(this._freeModeCurrentOffset + delta - width / 2) > (this.state.items.length - this.state.currIndex) * height;
        };
        /**
         * Check if the maximum free scroll is exceeded (used in Top, Right directions)
         */
        GalleryThumbsComponent.prototype.maxFreeScrollExceeded = function (delta, width, height) {
            return this._freeModeCurrentOffset + delta > (this.state.currIndex * width) + (height / 2);
        };
        /**
         * Convert sliding state to styles
         */
        GalleryThumbsComponent.prototype.getSliderStyles = function (state) {
            var value;
            switch (this.config.thumbPosition) {
                case exports.ThumbnailsPosition.Top:
                case exports.ThumbnailsPosition.Bottom:
                    this.width = '100%';
                    this.height = this.config.thumbHeight + 'px';
                    value = -(this.state.currIndex * this.config.thumbWidth) - (this.config.thumbWidth / 2 - state.value);
                    return {
                        transform: "translate3d(" + value + "px, 0, 0)",
                        width: this.state.items.length * this.config.thumbWidth + 'px',
                        height: '100%'
                    };
                case exports.ThumbnailsPosition.BottomLeft:
                    this.width = '100%';
                    this.height = this.config.thumbHeight + 'px';
                    value = -(this.state.currIndex * this.config.thumbWidth) - state.value;
                    return {
                        transform: "translate3d(" + value + "px, 0, 0)",
                        width: this.state.items.length * this.config.thumbWidth + 'px',
                        height: '100%'
                    };
                case exports.ThumbnailsPosition.Left:
                case exports.ThumbnailsPosition.Right:
                    this.width = this.config.thumbWidth + 'px';
                    this.height = '100%';
                    value = -(this.state.currIndex * this.config.thumbHeight) - (this.config.thumbHeight / 2 - state.value);
                    return {
                        transform: "translate3d(0, " + value + "px, 0)",
                        width: '100%',
                        height: this.state.items.length * this.config.thumbHeight + 'px'
                    };
                case exports.ThumbnailsPosition.LeftTop:
                    this.width = this.config.thumbWidth + 'px';
                    this.height = '100%';
                    value = -(this.state.currIndex * this.config.thumbHeight) - state.value;
                    return {
                        transform: "translate3d(0, " + value + "px, 0)",
                        width: '100%',
                        height: this.state.items.length * this.config.thumbHeight + 'px'
                    };
            }
        };
        GalleryThumbsComponent.prototype.verticalPan = function (e) {
            if (!(e.direction & Hammer.DIRECTION_UP && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) {
                return;
            }
            if (e.velocityY > 0.3) {
                this.prev();
            }
            else if (e.velocityY < -0.3) {
                this.next();
            }
            else {
                if (e.deltaY / 2 <= -this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
                    this.next();
                }
                else if (e.deltaY / 2 >= this.config.thumbHeight * this.state.items.length / this.config.panSensitivity) {
                    this.prev();
                }
                else {
                    this.action.emit(this.state.currIndex);
                }
            }
        };
        GalleryThumbsComponent.prototype.horizontalPan = function (e) {
            if (!(e.direction & Hammer.DIRECTION_HORIZONTAL && e.offsetDirection & Hammer.DIRECTION_HORIZONTAL)) {
                return;
            }
            if (e.velocityX > 0.3) {
                this.prev();
            }
            else if (e.velocityX < -0.3) {
                this.next();
            }
            else {
                if (e.deltaX / 2 <= -this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
                    this.next();
                }
                else if (e.deltaX / 2 >= this.config.thumbWidth * this.state.items.length / this.config.panSensitivity) {
                    this.prev();
                }
                else {
                    this.action.emit(this.state.currIndex);
                }
            }
        };
        GalleryThumbsComponent.prototype.next = function () {
            this.action.emit('next');
        };
        GalleryThumbsComponent.prototype.prev = function () {
            this.action.emit('prev');
        };
        GalleryThumbsComponent.prototype.updateSlider = function (state) {
            var newState = Object.assign(Object.assign({}, this._slidingWorker$.value), state);
            this._slidingWorker$.next(newState);
        };
        return GalleryThumbsComponent;
    }());
    GalleryThumbsComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-thumbs',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div *ngIf=\"sliderState$ | async; let sliderState\"\n         class=\"g-thumbs-container\">\n      <div class=\"g-slider\"\n           [class.g-no-transition]=\"sliderState.active\"\n           [ngStyle]=\"sliderState.style\">\n\n        <gallery-thumb *ngFor=\"let item of state.items;let i = index\"\n                       [type]=\"item.type\"\n                       [config]=\"config\"\n                       [data]=\"item.data\"\n                       [currIndex]=\"state.currIndex\"\n                       [index]=\"i\"\n                       [tapClickDisabled]=\"config.disableThumb\"\n                       (tapClick)=\"thumbClick.emit(i)\"\n                       (error)=\"error.emit({itemIndex: i, error: $event})\"></gallery-thumb>\n      </div>\n    </div>\n  "
                },] }
    ];
    GalleryThumbsComponent.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.NgZone }
    ]; };
    GalleryThumbsComponent.propDecorators = {
        state: [{ type: i0.Input }],
        config: [{ type: i0.Input }],
        action: [{ type: i0.Output }],
        thumbClick: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        height: [{ type: i0.HostBinding, args: ['style.height',] }],
        width: [{ type: i0.HostBinding, args: ['style.width',] }]
    };

    var GallerySliderComponent = /** @class */ (function () {
        function GallerySliderComponent(_el, _zone, platform) {
            var _this = this;
            this._el = _el;
            this._zone = _zone;
            this.platform = platform;
            /** Sliding worker */
            this._slidingWorker$ = new rxjs.BehaviorSubject({ value: 0, active: false });
            /** Stream that emits when the active item should change */
            this.action = new i0.EventEmitter();
            /** Stream that emits when item is clicked */
            this.itemClick = new i0.EventEmitter();
            /** Stream that emits when an error occurs */
            this.error = new i0.EventEmitter();
            // Activate sliding worker
            this.sliderState$ = this._slidingWorker$.pipe(operators.map(function (state) { return ({
                style: _this.getSliderStyles(state),
                active: state.active
            }); }));
        }
        Object.defineProperty(GallerySliderComponent.prototype, "zoom", {
            /** Item zoom */
            get: function () {
                return { transform: "perspective(50px) translate3d(0, 0, " + -this.config.zoomOut + "px)" };
            },
            enumerable: false,
            configurable: true
        });
        GallerySliderComponent.prototype.ngOnChanges = function () {
            // Refresh the slider
            this.updateSlider({ value: 0, active: false });
        };
        GallerySliderComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.config.gestures && typeof Hammer !== 'undefined') {
                var direction = this.config.slidingDirection === exports.SlidingDirection.Horizontal
                    ? Hammer.DIRECTION_HORIZONTAL
                    : Hammer.DIRECTION_VERTICAL;
                // Activate gestures
                this._hammer = new Hammer(this._el.nativeElement);
                this._hammer.get('pan').set({ direction: direction });
                this._zone.runOutsideAngular(function () {
                    // Move the slider
                    _this._hammer.on('pan', function (e) {
                        switch (_this.config.slidingDirection) {
                            case exports.SlidingDirection.Horizontal:
                                _this.updateSlider({ value: e.deltaX, active: true });
                                if (e.isFinal) {
                                    _this.updateSlider({ value: 0, active: false });
                                    _this.horizontalPan(e);
                                }
                                break;
                            case exports.SlidingDirection.Vertical:
                                _this.updateSlider({ value: e.deltaY, active: true });
                                if (e.isFinal) {
                                    _this.updateSlider({ value: 0, active: false });
                                    _this.verticalPan(e);
                                }
                        }
                    });
                });
            }
            // Rearrange slider on window resize
            if (common.isPlatformBrowser(this.platform)) {
                this._resizeSub$ = rxjs.fromEvent(window, 'resize').pipe(operators.debounceTime(200), operators.tap(function () { return _this.updateSlider(_this._slidingWorker$.value); })).subscribe();
            }
            setTimeout(function () { return _this.updateSlider({ value: 0, active: false }); });
        };
        GallerySliderComponent.prototype.ngOnDestroy = function () {
            if (this._hammer) {
                this._hammer.destroy();
            }
            if (this._resizeSub$) {
                this._resizeSub$.unsubscribe();
            }
            this._slidingWorker$.complete();
        };
        /**
         * Convert sliding state to styles
         */
        GallerySliderComponent.prototype.getSliderStyles = function (state) {
            switch (this.config.slidingDirection) {
                case exports.SlidingDirection.Horizontal:
                    return {
                        transform: "translate3d(" + (-(this.state.currIndex * this._el.nativeElement.offsetWidth) + state.value) + "px, 0, 0)",
                        width: "calc(100% * " + this.state.items.length + ")",
                        height: '100%'
                    };
                case exports.SlidingDirection.Vertical:
                    return {
                        transform: "translate3d(0, " + (-(this.state.currIndex * this._el.nativeElement.offsetHeight) + state.value) + "px, 0)",
                        width: '100%',
                        height: "calc(100% * " + this.state.items.length + ")",
                    };
            }
        };
        GallerySliderComponent.prototype.verticalPan = function (e) {
            if (!(e.direction & Hammer.DIRECTION_UP && e.offsetDirection & Hammer.DIRECTION_VERTICAL)) {
                return;
            }
            if (e.velocityY > 0.3) {
                this.prev();
            }
            else if (e.velocityY < -0.3) {
                this.next();
            }
            else {
                if (e.deltaY / 2 <= -this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
                    this.next();
                }
                else if (e.deltaY / 2 >= this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
                    this.prev();
                }
                else {
                    this.action.emit(this.state.currIndex);
                }
            }
        };
        GallerySliderComponent.prototype.horizontalPan = function (e) {
            if (!(e.direction & Hammer.DIRECTION_HORIZONTAL && e.offsetDirection & Hammer.DIRECTION_HORIZONTAL)) {
                return;
            }
            if (e.velocityX > 0.3) {
                this.prev();
            }
            else if (e.velocityX < -0.3) {
                this.next();
            }
            else {
                if (e.deltaX / 2 <= -this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
                    this.next();
                }
                else if (e.deltaX / 2 >= this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
                    this.prev();
                }
                else {
                    this.action.emit(this.state.currIndex);
                }
            }
        };
        GallerySliderComponent.prototype.next = function () {
            this.action.emit('next');
        };
        GallerySliderComponent.prototype.prev = function () {
            this.action.emit('prev');
        };
        GallerySliderComponent.prototype.updateSlider = function (state) {
            var newState = Object.assign(Object.assign({}, this._slidingWorker$.value), state);
            this._slidingWorker$.next(newState);
        };
        return GallerySliderComponent;
    }());
    GallerySliderComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-slider',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div *ngIf=\"sliderState$ | async; let sliderState\"\n         class=\"g-items-container\"\n         [ngStyle]=\"zoom\">\n\n      <div class=\"g-slider\"\n           [class.g-no-transition]=\"sliderState.active\"\n           [ngStyle]=\"sliderState.style\">\n\n        <gallery-item *ngFor=\"let item of state.items; let i = index\"\n                      [type]=\"item.type\"\n                      [config]=\"config\"\n                      [data]=\"item.data\"\n                      [currIndex]=\"state.currIndex\"\n                      [index]=\"i\"\n                      (tapClick)=\"itemClick.emit(i)\"\n                      (error)=\"error.emit({itemIndex: i, error: $event})\">\n        </gallery-item>\n\n      </div>\n    </div>\n    <ng-content></ng-content>\n  "
                },] }
    ];
    GallerySliderComponent.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.NgZone },
        { type: Object, decorators: [{ type: i0.Inject, args: [i0.PLATFORM_ID,] }] }
    ]; };
    GallerySliderComponent.propDecorators = {
        state: [{ type: i0.Input }],
        config: [{ type: i0.Input }],
        action: [{ type: i0.Output }],
        itemClick: [{ type: i0.Output }],
        error: [{ type: i0.Output }]
    };

    var GalleryCounterComponent = /** @class */ (function () {
        function GalleryCounterComponent() {
        }
        return GalleryCounterComponent;
    }());
    GalleryCounterComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-counter',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"g-counter\">{{(state.currIndex + 1) + '/' + state.items.length}}</div>\n  "
                },] }
    ];
    GalleryCounterComponent.propDecorators = {
        state: [{ type: i0.Input }]
    };

    var GalleryItemComponent = /** @class */ (function () {
        function GalleryItemComponent() {
            this.Types = exports.GalleryItemType;
            /** Stream that emits when an error occurs */
            this.error = new i0.EventEmitter();
        }
        Object.defineProperty(GalleryItemComponent.prototype, "isActive", {
            get: function () {
                return this.index === this.currIndex;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryItemComponent.prototype, "isAutoPlay", {
            get: function () {
                if (this.isActive) {
                    if (this.type === exports.GalleryItemType.Video || this.type === exports.GalleryItemType.Youtube) {
                        return this.data.autoplay;
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryItemComponent.prototype, "youtubeSrc", {
            get: function () {
                var autoplay = 0;
                if (this.isActive && this.type === exports.GalleryItemType.Youtube && this.data.autoplay) {
                    autoplay = 1;
                }
                var url = new URL(this.data.src);
                url.search = new URLSearchParams(Object.assign(Object.assign({ wmode: 'transparent' }, this.data.params), { autoplay: autoplay })).toString();
                return url.href;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(GalleryItemComponent.prototype, "load", {
            get: function () {
                switch (this.config.loadingStrategy) {
                    case exports.LoadingStrategy.Preload:
                        return true;
                    case exports.LoadingStrategy.Lazy:
                        return this.currIndex === this.index;
                    default:
                        return this.currIndex === this.index || this.currIndex === this.index - 1 || this.currIndex === this.index + 1;
                }
            },
            enumerable: false,
            configurable: true
        });
        return GalleryItemComponent;
    }());
    GalleryItemComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-item',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <ng-container *ngIf=\"load\" [ngSwitch]=\"type\">\n\n      <ng-container *ngSwitchCase=\"Types.Image\">\n\n        <gallery-image [src]=\"data.src\"\n                       [loadingIcon]=\"config.loadingIcon\"\n                       [loadingError]=\"config.loadingError\"\n                       (error)=\"error.emit($event)\"></gallery-image>\n\n        <div class=\"g-template g-item-template\">\n          <ng-container *ngTemplateOutlet=\"config.itemTemplate;\n          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }\">\n          </ng-container>\n        </div>\n\n      </ng-container>\n\n      <gallery-video *ngSwitchCase=\"Types.Video\"\n                     [src]=\"data.src\"\n                     [poster]=\"data.poster\"\n                     [controls]=\"data.controls\"\n                     [play]=\"isAutoPlay\"\n                     [pause]=\"currIndex !== index\"\n                     (error)=\"error.emit($event)\"></gallery-video>\n\n      <gallery-iframe *ngSwitchCase=\"Types.Youtube\"\n                      [src]=\"youtubeSrc\"\n                      [autoplay]=\"isAutoPlay\"\n                      [pause]=\"currIndex !== index\"></gallery-iframe>\n\n      <gallery-iframe *ngSwitchCase=\"Types.Iframe\"\n                      [src]=\"data.src\"></gallery-iframe>\n\n      <ng-container *ngSwitchDefault>\n\n        <div class=\"g-template g-item-template\">\n          <ng-container *ngTemplateOutlet=\"config.itemTemplate;\n          context: { index: this.index, currIndex: this.currIndex, type: this.type, data: this.data }\">\n          </ng-container>\n        </div>\n\n      </ng-container>\n\n    </ng-container>\n  "
                },] }
    ];
    GalleryItemComponent.propDecorators = {
        config: [{ type: i0.Input }],
        index: [{ type: i0.Input }],
        currIndex: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        data: [{ type: i0.Input }],
        error: [{ type: i0.Output }],
        isActive: [{ type: i0.HostBinding, args: ['class.g-active-item',] }]
    };

    var GalleryThumbComponent = /** @class */ (function () {
        function GalleryThumbComponent() {
            this.error = new i0.EventEmitter();
        }
        Object.defineProperty(GalleryThumbComponent.prototype, "isActive", {
            get: function () {
                return this.index === this.currIndex;
            },
            enumerable: false,
            configurable: true
        });
        return GalleryThumbComponent;
    }());
    GalleryThumbComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'gallery-thumb',
                    changeDetection: i0.ChangeDetectionStrategy.OnPush,
                    template: "\n    <gallery-image [src]=\"data.thumb\" \n                   mode=\"indeterminate\"\n                   [isThumbnail]=\"true\" \n                   [loadingIcon]=\"config.thumbLoadingIcon\"\n                   [loadingError]=\"config.thumbLoadingError \"\n                   (error)=\"error.emit($event)\"></gallery-image>\n\n    <div *ngIf=\"config.thumbTemplate\" class=\"g-template g-thumb-template\">\n      <ng-container\n        *ngTemplateOutlet=\"config.thumbTemplate; context: { index: this.index, type: this.type, data: this.data }\">\n      </ng-container>\n    </div>\n  "
                },] }
    ];
    GalleryThumbComponent.propDecorators = {
        config: [{ type: i0.Input }],
        index: [{ type: i0.Input }],
        currIndex: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        data: [{ type: i0.Input }],
        error: [{ type: i0.Output }],
        isActive: [{ type: i0.HostBinding, args: ['class.g-active-thumb',] }]
    };

    var LazyImage = /** @class */ (function () {
        function LazyImage(document) {
            var _this = this;
            this.document = document;
            this._imageLoader$ = new rxjs.Subject();
            this._loaderSub$ = rxjs.Subscription.EMPTY;
            this.loaded = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
            this._loaderSub$ = this._imageLoader$.pipe(operators.switchMap(function (imageSrc) { return _this.nativeLoader(imageSrc); })).subscribe();
        }
        LazyImage.prototype.ngOnChanges = function (changes) {
            if (changes['src'] && changes['src'].previousValue !== changes['src'].currentValue) {
                this.loadImage(this.src);
            }
        };
        LazyImage.prototype.ngOnDestroy = function () {
            this._loaderSub$.unsubscribe();
            this._imageLoader$.complete();
        };
        LazyImage.prototype.loadImage = function (imagePath) {
            this._imageLoader$.next(imagePath);
        };
        /**
         * Native image loader, does not emit progress
         * @param url
         */
        LazyImage.prototype.nativeLoader = function (url) {
            var _this = this;
            var img = this.document.createElement('img');
            // Stop previously loading
            img.src = url;
            // Image load success
            var loadSuccess = rxjs.fromEvent(img, 'load').pipe(operators.tap(function () { return _this.loaded.emit(url); }));
            // Image load failed
            var loadError = rxjs.fromEvent(img, 'error').pipe(operators.tap(function () { return _this.error.emit(new Error("[lazyImage]: The image " + url + " did not load")); }));
            return rxjs.zip(loadSuccess, loadError);
        };
        return LazyImage;
    }());
    LazyImage.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[lazyImage]'
                },] }
    ];
    LazyImage.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] }
    ]; };
    LazyImage.propDecorators = {
        src: [{ type: i0.Input, args: ['lazyImage',] }],
        loaded: [{ type: i0.Output }],
        error: [{ type: i0.Output }]
    };

    /**
     * This directive uses tap event if HammerJS is loaded, otherwise it falls back to normal click event
     */
    var TapClick = /** @class */ (function () {
        function TapClick(_el) {
            this._el = _el;
            this.clickListener = rxjs.Subscription.EMPTY;
            this.tapClick = new i0.EventEmitter();
        }
        TapClick.prototype.ngOnInit = function () {
            this.activateClickEvent();
        };
        TapClick.prototype.activateClickEvent = function () {
            var _this = this;
            if (typeof Hammer !== 'undefined') {
                // Use Hammer.js tap event
                this._hammer = new Hammer(this._el.nativeElement);
                this._hammer.on('tap', function () {
                    if (!_this.tapClickDisabled) {
                        _this.tapClick.emit(null);
                    }
                });
            }
            else {
                // Use normal click event
                this.clickListener = rxjs.fromEvent(this._el.nativeElement, 'click').pipe(operators.filter(function () { return !_this.tapClickDisabled; }), operators.tap(function () { return _this.tapClick.emit(null); })).subscribe();
            }
        };
        TapClick.prototype.ngOnDestroy = function () {
            if (this._hammer) {
                this._hammer.destroy();
            }
            this.clickListener.unsubscribe();
        };
        return TapClick;
    }());
    TapClick.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[tapClick]'
                },] }
    ];
    TapClick.ctorParameters = function () { return [
        { type: i0.ElementRef }
    ]; };
    TapClick.propDecorators = {
        tapClickDisabled: [{ type: i0.Input }],
        tapClick: [{ type: i0.Output }]
    };

    var GalleryModule = /** @class */ (function () {
        function GalleryModule() {
        }
        GalleryModule.withConfig = function (config) {
            return {
                ngModule: GalleryModule,
                providers: [
                    {
                        provide: GALLERY_CONFIG,
                        useValue: config
                    }
                ]
            };
        };
        return GalleryModule;
    }());
    GalleryModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [
                        GalleryComponent,
                        GalleryNavComponent,
                        GalleryDotsComponent,
                        GalleryCoreComponent,
                        GallerySliderComponent,
                        GalleryCounterComponent,
                        GalleryThumbsComponent,
                        GalleryThumbComponent,
                        GalleryItemComponent,
                        GalleryImageComponent,
                        GalleryVideoComponent,
                        GalleryIframeComponent,
                        LazyImage,
                        TapClick
                    ],
                    exports: [
                        GalleryComponent,
                        LazyImage,
                        TapClick
                    ]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.GALLERY_CONFIG = GALLERY_CONFIG;
    exports.Gallery = Gallery;
    exports.GalleryComponent = GalleryComponent;
    exports.GalleryIframeComponent = GalleryIframeComponent;
    exports.GalleryImageComponent = GalleryImageComponent;
    exports.GalleryModule = GalleryModule;
    exports.GalleryRef = GalleryRef;
    exports.GalleryVideoComponent = GalleryVideoComponent;
    exports.IframeItem = IframeItem;
    exports.ImageItem = ImageItem;
    exports.VideoItem = VideoItem;
    exports.YoutubeItem = YoutubeItem;
    exports.ɵ0 = ɵ0;
    exports.ɵa = GalleryNavComponent;
    exports.ɵb = GalleryDotsComponent;
    exports.ɵc = GalleryCoreComponent;
    exports.ɵd = GallerySliderComponent;
    exports.ɵe = GalleryCounterComponent;
    exports.ɵf = GalleryThumbsComponent;
    exports.ɵg = GalleryThumbComponent;
    exports.ɵh = GalleryItemComponent;
    exports.ɵi = LazyImage;
    exports.ɵj = TapClick;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-gallery.umd.js.map
