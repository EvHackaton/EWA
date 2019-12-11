"use strict";
/* tslint:disable:no-implicit-dependencies no-any */
/**
 * UnsupportedBrowserError tests
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = tslib_1.__importDefault(require("ava"));
var __1 = require("..");
var unsupportedBrowserError_1 = require("./unsupportedBrowserError");
ava_1.default("constructor", function (t) {
    var browserCompatibility = {
        fullSupport: false,
        scannerSupport: false,
        missingFeatures: [__1.BrowserCompatibility.Feature.BLOB]
    };
    var unsupportedBrowserError = new unsupportedBrowserError_1.UnsupportedBrowserError(browserCompatibility);
    t.deepEqual(unsupportedBrowserError.name, "UnsupportedBrowserError");
    t.deepEqual(unsupportedBrowserError.message, "This OS / Browser has one or more missing features preventing it from working correctly");
    t.deepEqual(unsupportedBrowserError.data, browserCompatibility);
    browserCompatibility = {
        fullSupport: true,
        scannerSupport: true,
        missingFeatures: []
    };
    unsupportedBrowserError = new unsupportedBrowserError_1.UnsupportedBrowserError(browserCompatibility);
    t.deepEqual(unsupportedBrowserError.name, "UnsupportedBrowserError");
    t.deepEqual(unsupportedBrowserError.message, "This OS / Browser has one or more missing features preventing it from working correctly");
    t.deepEqual(unsupportedBrowserError.data, browserCompatibility);
});
//# sourceMappingURL=unsupportedBrowserError.spec.js.map