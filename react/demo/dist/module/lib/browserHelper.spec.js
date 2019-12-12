/* tslint:disable:no-implicit-dependencies no-any */
/**
 * BrowserHelper tests
 */
import test from "ava";
import { BrowserHelper } from "..";
Object.defineProperty(navigator, "platform", {
    value: "iPhone"
});
// tslint:disable-next-line:max-func-body-length
test("checkBrowserCompatibility", t => {
    Object.defineProperty(window, "Blob", {
        value: null
    });
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["mediaDevices", "webWorkers", "webAssembly", "blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    Object.defineProperty(navigator, "mediaDevices", {
        value: {
            getUserMedia: () => {
                return;
            }
        },
        configurable: true
    });
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["webWorkers", "webAssembly", "blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.Worker = () => {
        return;
    };
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["webAssembly", "blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.WebAssembly = {};
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["blob", "urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.Blob = (() => {
        return;
    });
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["urlObject", "offscreenCanvas", "webgl"],
        scannerSupport: false
    });
    window.URL = {
        createObjectURL: () => {
            return;
        }
    };
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: ["offscreenCanvas", "webgl"],
        scannerSupport: true
    });
    window.OffscreenCanvas = () => {
        return;
    };
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: ["webgl"],
        scannerSupport: true
    });
    window.WebGLRenderingContext = () => {
        return;
    };
    Object.defineProperty(BrowserHelper, "canvas", {
        value: {
            getContext: () => {
                return null;
            }
        }
    });
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: ["webgl"],
        scannerSupport: true
    });
    Object.defineProperty(BrowserHelper, "canvas", {
        value: {
            getContext: () => {
                return true;
            }
        }
    });
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
    BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) " +
        "AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0 Mobile/15D60 Safari/604.1");
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["webAssemblyErrorFree"],
        scannerSupport: false
    });
    BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) " +
        "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1");
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
    Object.defineProperty(navigator, "mediaDevices", {
        value: undefined,
        configurable: true
    });
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: false,
        missingFeatures: ["mediaDevices"],
        scannerSupport: true
    });
    navigator.enumerateDevices = () => {
        return Promise.resolve([]);
    };
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
    navigator.enumerateDevices = undefined;
    window.MediaStreamTrack = {
        getSources: () => {
            return;
        }
    };
    t.deepEqual(BrowserHelper.checkBrowserCompatibility(), {
        fullSupport: true,
        missingFeatures: [],
        scannerSupport: true
    });
});
test("getDeviceId", t => {
    const currentDeviceId = BrowserHelper.getDeviceId();
    t.regex(currentDeviceId, /[0-9a-f]{40}/);
    t.deepEqual(BrowserHelper.getDeviceId(), currentDeviceId);
    document.cookie = "scandit-device-id=";
    t.notDeepEqual(BrowserHelper.getDeviceId(), currentDeviceId);
});
//# sourceMappingURL=browserHelper.spec.js.map