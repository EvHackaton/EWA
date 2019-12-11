/* tslint:disable:no-implicit-dependencies no-any */
/**
 * UnsupportedBrowserError tests
 */
import test from "ava";
import { BrowserCompatibility } from "..";
import { UnsupportedBrowserError } from "./unsupportedBrowserError";
test("constructor", t => {
    let browserCompatibility = {
        fullSupport: false,
        scannerSupport: false,
        missingFeatures: [BrowserCompatibility.Feature.BLOB]
    };
    let unsupportedBrowserError = new UnsupportedBrowserError(browserCompatibility);
    t.deepEqual(unsupportedBrowserError.name, "UnsupportedBrowserError");
    t.deepEqual(unsupportedBrowserError.message, "This OS / Browser has one or more missing features preventing it from working correctly");
    t.deepEqual(unsupportedBrowserError.data, browserCompatibility);
    browserCompatibility = {
        fullSupport: true,
        scannerSupport: true,
        missingFeatures: []
    };
    unsupportedBrowserError = new UnsupportedBrowserError(browserCompatibility);
    t.deepEqual(unsupportedBrowserError.name, "UnsupportedBrowserError");
    t.deepEqual(unsupportedBrowserError.message, "This OS / Browser has one or more missing features preventing it from working correctly");
    t.deepEqual(unsupportedBrowserError.data, browserCompatibility);
});
//# sourceMappingURL=unsupportedBrowserError.spec.js.map