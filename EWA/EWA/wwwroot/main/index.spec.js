"use strict";
/* tslint:disable:no-implicit-dependencies no-any */
/**
 * Index tests
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = tslib_1.__importDefault(require("ava"));
var ScanditSDK = tslib_1.__importStar(require("."));
ava_1.default("configure", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var baseUrl, baseDirectory, error, fakeLicenseKey;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                baseUrl = "https://example.com/";
                baseDirectory = "file:///tmp/";
                return [4 /*yield*/, t.throwsAsync(ScanditSDK.configure(""))];
            case 1:
                error = _a.sent();
                t.is(error.name, "UnsupportedBrowserError");
                ScanditSDK.BrowserHelper.checkBrowserCompatibility = function () {
                    return {
                        fullSupport: true,
                        scannerSupport: true,
                        missingFeatures: []
                    };
                };
                return [4 /*yield*/, t.throwsAsync(ScanditSDK.configure(null))];
            case 2:
                error = _a.sent();
                t.is(error.name, "NoLicenseKeyError");
                return [4 /*yield*/, t.throwsAsync(ScanditSDK.configure(""))];
            case 3:
                error = _a.sent();
                t.is(error.name, "NoLicenseKeyError");
                return [4 /*yield*/, t.throwsAsync(ScanditSDK.configure(" "))];
            case 4:
                error = _a.sent();
                t.is(error.name, "NoLicenseKeyError");
                return [4 /*yield*/, t.throwsAsync(ScanditSDK.configure("YOUR_LICENSE_KEY_IS_NEEDED_HERE"))];
            case 5:
                error = _a.sent();
                t.is(error.name, "NoLicenseKeyError");
                fakeLicenseKey = "#".repeat(64);
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey))];
            case 6:
                _a.sent();
                t.is(ScanditSDK.userLicenseKey, fakeLicenseKey);
                t.is(ScanditSDK.scanditEngineLocation, baseUrl);
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "" }))];
            case 7:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, baseUrl);
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "/" }))];
            case 8:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, baseUrl);
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "test" }))];
            case 9:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, baseUrl + "test/");
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "https://example1.com" }))];
            case 10:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, "https://example1.com/");
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "https://example2.com/" }))];
            case 11:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, "https://example2.com/");
                Object.defineProperty(window, "location", {
                    value: {
                        href: baseDirectory + "example.html",
                        origin: "null"
                    }
                });
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "" }))];
            case 12:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, baseDirectory);
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "/" }))];
            case 13:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, baseDirectory);
                return [4 /*yield*/, t.notThrowsAsync(ScanditSDK.configure(fakeLicenseKey, { engineLocation: "test" }))];
            case 14:
                _a.sent();
                t.is(ScanditSDK.scanditEngineLocation, baseDirectory + "test/");
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.spec.js.map