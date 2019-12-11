"use strict";
/* tslint:disable:no-implicit-dependencies no-any */
/**
 * BrowserHelper tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = tslib_1.__importDefault(require("ava"));
var __1 = require("..");
Object.defineProperty(navigator, "platform", {
    value: "iPhone"
});
// tslint:disable-next-line:max-func-body-length
ava_1.default("checkBrowserCompatibility", function (t) {
    Object.defineProperty(window, "Blob", {
        value: null
    });
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["mediaDevices", "webWorkers", "webAssembly", "blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    Object.defineProperty(navigator, "mediaDevices", {
        value: {
            getUserMedia: function () {
                return;
            }
        },
        configurable: true
    });
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["webWorkers", "webAssembly", "blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.Worker = function () {
        return;
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["webAssembly", "blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.WebAssembly = {};
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.Blob = (function () {
        return;
    });
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.URL = {
        createObjectURL: function () {
            return;
        }
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: ["offscreenCanvas", "webgl"],
        scannerSupport: true
    });
    window.OffscreenCanvas = function () {
        return;
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: ["webgl"],
        scannerSupport: true
    });
    window.WebGLRenderingContext = function () {
        return;
    };
    Object.defineProperty(__1.BrowserHelper, "canvas", {
        value: {
            getContext: function () {
                return null;
            }
        }
    });
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: ["webgl"],
        scannerSupport: true
    });
    Object.defineProperty(__1.BrowserHelper, "canvas", {
        value: {
            getContext: function () {
                return true;
            }
        }
    });
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
    __1.BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) " +
        "AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D60 Safari/604.1");
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["webAssemblyErrorFree"],
        scannerSupport: false
    });
    __1.BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) " +
        "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1");
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
    Object.defineProperty(navigator, "mediaDevices", {
        value: undefined,
        configurable: true
    });
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["mediaDevices"],
        scannerSupport: true
    });
    navigator.enumerateDevices = function () {
        return Promise.resolve([]);
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
    navigator.enumerateDevices = undefined;
    window.MediaStreamTrack = {
        getSources: function () {
            return;
        }
    };
    t.deepEqual(__1.BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
});
ava_1.default("getDeviceId", function (t) {
    var currentDeviceId = __1.BrowserHelper.getDeviceId();
    t.regex(currentDeviceId, /[0-9a-f]{40}/);
    t.deepEqual(__1.BrowserHelper.getDeviceId(), currentDeviceId);
    document.cookie = "scandit-device-id=";
    t.notDeepEqual(__1.BrowserHelper.getDeviceId(), currentDeviceId);
});
//# sourceMappingURL=browserHelper.spec.js.map