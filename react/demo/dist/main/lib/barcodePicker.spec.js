"use strict";
/* tslint:disable:no-implicit-dependencies no-any */
/**
 * BarcodePicker tests
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ava_1 = tslib_1.__importDefault(require("ava"));
var sinon = tslib_1.__importStar(require("sinon"));
var webworker_threads_1 = require("webworker-threads");
var __1 = require("..");
var barcodePickerCameraManager_1 = require("./barcodePickerCameraManager");
HTMLVideoElement.prototype.load = function () {
    return;
};
HTMLVideoElement.prototype.play = function () {
    Object.defineProperty(this, "videoWidth", {
        value: 4
    });
    Object.defineProperty(this, "videoHeight", {
        value: 4
    });
    this.currentTime = 1;
    this.dispatchEvent(new Event("loadstart"));
    this.dispatchEvent(new Event("loadeddata"));
    return Promise.resolve();
};
var fakeCamera1 = {
    deviceId: "1",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (back)",
    toJSON: function () {
        return this;
    }
};
var fakeCamera2 = {
    deviceId: "2",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (front)",
    toJSON: function () {
        return this;
    }
};
var fakeCamera1Object = {
    deviceId: fakeCamera1.deviceId,
    label: fakeCamera1.label,
    cameraType: __1.Camera.Type.BACK,
    currentResolution: {
        width: 4,
        height: 4
    }
};
var fakeCamera2Object = {
    deviceId: fakeCamera2.deviceId,
    label: fakeCamera2.label,
    cameraType: __1.Camera.Type.FRONT,
    currentResolution: {
        width: 4,
        height: 4
    }
};
var sampleBarcode = {
    symbology: __1.Barcode.Symbology.QR,
    compositeFlag: __1.Barcode.CompositeFlag.NONE,
    isGs1DataCarrier: false,
    encodingArray: [],
    location: {
        topLeft: { x: 0, y: 0 },
        topRight: { x: 1, y: 0 },
        bottomRight: { x: 1, y: 1 },
        bottomLeft: { x: 0, y: 1 }
    },
    data: "",
    rawData: new Uint8Array()
};
function fakePartialCompatibleBrowser() {
    __1.BrowserHelper.checkBrowserCompatibility = function () {
        return {
            fullSupport: false,
            scannerSupport: true,
            missingFeatures: [__1.BrowserCompatibility.Feature.MEDIA_DEVICES]
        };
    };
}
function fakeFullCompatibleBrowser(configureLibrary) {
    if (configureLibrary === void 0) { configureLibrary = true; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mediaStreamTrack;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mediaStreamTrack = {
                        stop: sinon.spy(),
                        addEventListener: sinon.spy(),
                        getSettings: function () {
                            return {
                                width: 4,
                                height: 4,
                                deviceId: "1",
                                facingMode: "environment"
                            };
                        }
                    };
                    Object.defineProperty(navigator, "mediaDevices", {
                        value: {
                            getUserMedia: function () {
                                return Promise.resolve({
                                    getTracks: function () {
                                        return [mediaStreamTrack];
                                    },
                                    getVideoTracks: function () {
                                        return [mediaStreamTrack];
                                    }
                                });
                            }
                        },
                        configurable: true
                    });
                    navigator.enumerateDevices = function () {
                        return Promise.resolve([fakeCamera1, fakeCamera2]);
                    };
                    URL.createObjectURL = sinon.stub();
                    __1.BrowserHelper.checkBrowserCompatibility = function () {
                        return {
                            fullSupport: true,
                            scannerSupport: true,
                            missingFeatures: []
                        };
                    };
                    if (!configureLibrary) return [3 /*break*/, 2];
                    return [4 /*yield*/, __1.configure("#".repeat(64))];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function wait(ms) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, ms);
                })];
        });
    });
}
function prepareBarcodePickerForEvents() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var s, imageSettings, barcodePicker;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    s = new __1.Scanner();
                    imageSettings = {
                        width: 2,
                        height: 2,
                        format: __1.ImageSettings.Format.GRAY_8U
                    };
                    s.applyImageSettings(imageSettings);
                    return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                            accessCamera: false,
                            scanner: s,
                            playSoundOnScan: true,
                            vibrateOnScan: true
                        })];
                case 1:
                    barcodePicker = _a.sent();
                    sinon.stub(barcodePicker.barcodePickerGui, "getVideoImageData").returns(new Uint8ClampedArray(4));
                    s.engineWorkerOnMessage({
                        data: ["status", "ready"]
                    });
                    sinon.stub(s, "processImage").callsFake(function () {
                        return Promise.resolve(new __1.ScanResult([], new Uint8ClampedArray(4), imageSettings));
                    });
                    return [2 /*return*/, barcodePicker];
            }
        });
    });
}
global.Worker = webworker_threads_1.Worker;
global.URL = {
    createObjectURL: function () {
        return __1.engineWorkerFunction;
    }
};
ava_1.default.serial("constructor & destroy", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var error, barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, t.throwsAsync(__1.BarcodePicker.create(document.createElement("div")))];
            case 1:
                error = _a.sent();
                t.is(error.name, "UnsupportedBrowserError");
                return [4 /*yield*/, fakeFullCompatibleBrowser(false)];
            case 2:
                _a.sent();
                return [4 /*yield*/, t.throwsAsync(__1.BarcodePicker.create(document.createElement("div")))];
            case 3:
                error = _a.sent();
                t.is(error.name, "LibraryNotConfiguredError");
                return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 4:
                _a.sent();
                return [4 /*yield*/, t.throwsAsync(__1.BarcodePicker.create("wrong-argument"))];
            case 5:
                error = _a.sent();
                t.is(error.name, "NoOriginElementError");
                return [4 /*yield*/, t.throwsAsync(__1.BarcodePicker.create({}))];
            case 6:
                error = _a.sent();
                t.is(error.name, "NoOriginElementError");
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        singleImageMode: {
                            desktop: { always: true, allowFallback: true },
                            mobile: { always: true, allowFallback: true }
                        }
                    })];
            case 7:
                barcodePicker = _a.sent();
                barcodePicker.destroy();
                fakePartialCompatibleBrowser();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        singleImageMode: {
                            desktop: { always: false, allowFallback: true },
                            mobile: { always: false, allowFallback: true }
                        }
                    })];
            case 8:
                barcodePicker = _a.sent();
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"))];
            case 9:
                barcodePicker = _a.sent();
                barcodePicker.destroy(false);
                barcodePicker.getScanner().destroy();
                return [4 /*yield*/, t.throwsAsync(__1.BarcodePicker.create(document.createElement("div"), {
                        singleImageMode: {
                            desktop: { always: false, allowFallback: false },
                            mobile: { always: false, allowFallback: false }
                        }
                    }))];
            case 10:
                error = _a.sent();
                t.is(error.name, "UnsupportedBrowserError");
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        targetScanningFPS: -1
                    })];
            case 11:
                barcodePicker = _a.sent();
                barcodePicker.destroy();
                t.pass();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        scanner: new __1.Scanner()
                    })];
            case 12:
                barcodePicker = _a.sent();
                barcodePicker.destroy();
                t.pass();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 13:
                barcodePicker = _a.sent();
                barcodePicker.destroy();
                t.pass();
                __1.BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) " +
                    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1");
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"))];
            case 14:
                barcodePicker = _a.sent();
                barcodePicker.destroy();
                t.pass();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("constructor & destroy (with fake camera)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        scanner: s
                    })];
            case 2:
                barcodePicker = _a.sent();
                s.engineWorkerOnMessage({
                    data: ["status", "ready"]
                });
                barcodePicker.destroy();
                t.pass();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("constructor interaction options", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var setInteractionOptionsSpy, barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                setInteractionOptionsSpy = sinon.spy(barcodePickerCameraManager_1.BarcodePickerCameraManager.prototype, "setInteractionOptions");
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.is(setInteractionOptionsSpy.callCount, 1);
                t.deepEqual(setInteractionOptionsSpy.getCall(0).args, [true, true, true, true]);
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        enableCameraSwitcher: false,
                        enableTorchToggle: false,
                        enableTapToFocus: false,
                        enablePinchToZoom: false
                    })];
            case 3:
                barcodePicker = _a.sent();
                t.is(setInteractionOptionsSpy.callCount, 2);
                t.deepEqual(setInteractionOptionsSpy.getCall(1).args, [false, false, false, false]);
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        enableCameraSwitcher: false,
                        enableTorchToggle: true,
                        enableTapToFocus: false,
                        enablePinchToZoom: true
                    })];
            case 4:
                barcodePicker = _a.sent();
                t.is(setInteractionOptionsSpy.callCount, 3);
                t.deepEqual(setInteractionOptionsSpy.getCall(2).args, [false, true, false, true]);
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        enableCameraSwitcher: true,
                        enableTorchToggle: false,
                        enableTapToFocus: true,
                        enablePinchToZoom: false
                    })];
            case 5:
                barcodePicker = _a.sent();
                t.is(setInteractionOptionsSpy.callCount, 4);
                t.deepEqual(setInteractionOptionsSpy.getCall(3).args, [true, false, true, false]);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("constructor scanningPaused & isScanningPaused & pauseScanning & resumeScanning (with fake camera)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        scanner: s
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.false(barcodePicker.isScanningPaused());
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 3:
                _a.sent();
                t.false(barcodePicker.isScanningPaused());
                s.engineWorkerOnMessage({
                    data: ["status", "ready"]
                });
                barcodePicker.pauseScanning();
                t.true(barcodePicker.isScanningPaused());
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 4:
                _a.sent();
                t.false(barcodePicker.isScanningPaused());
                barcodePicker.destroy(false);
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        scanner: s,
                        scanningPaused: true
                    })];
            case 5:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isScanningPaused());
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 6:
                _a.sent();
                t.false(barcodePicker.isScanningPaused());
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("accessCamera & getActiveCamera & setActiveCamera (with fake camera)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.is(barcodePicker.getActiveCamera(), undefined);
                return [4 /*yield*/, barcodePicker.accessCamera()];
            case 3:
                _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
                barcodePicker.pauseScanning();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
                barcodePicker.pauseScanning(true);
                t.is(barcodePicker.getActiveCamera(), undefined);
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 4:
                _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
                return [4 /*yield*/, barcodePicker.setActiveCamera(fakeCamera2Object)];
            case 5:
                _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera2Object);
                return [4 /*yield*/, barcodePicker.setActiveCamera()];
            case 6:
                _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"))];
            case 7:
                barcodePicker = _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
                return [4 /*yield*/, barcodePicker.accessCamera()];
            case 8:
                _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 9:
                barcodePicker = _a.sent();
                return [4 /*yield*/, barcodePicker.setActiveCamera(fakeCamera2Object)];
            case 10:
                _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), undefined);
                return [4 /*yield*/, barcodePicker.accessCamera()];
            case 11:
                _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera2Object);
                __1.BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
                    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36");
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"))];
            case 12:
                barcodePicker = _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
                return [4 /*yield*/, barcodePicker.accessCamera()];
            case 13:
                _a.sent();
                t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("applyCameraSettings (with fake camera)", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, cs, setSelectedCameraSettingsSpy, applyCameraSettingsSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                cs = {
                    resolutionPreference: __1.CameraSettings.ResolutionPreference.FULL_HD
                };
                setSelectedCameraSettingsSpy = sinon.spy(barcodePicker.cameraManager, "setSelectedCameraSettings");
                applyCameraSettingsSpy = sinon.spy(barcodePicker.cameraManager, "applyCameraSettings");
                t.is(setSelectedCameraSettingsSpy.callCount, 0);
                t.is(applyCameraSettingsSpy.callCount, 0);
                return [4 /*yield*/, barcodePicker.applyCameraSettings(cs)];
            case 3:
                _a.sent();
                t.is(barcodePicker.getActiveCamera(), undefined);
                t.is(setSelectedCameraSettingsSpy.callCount, 1);
                t.is(applyCameraSettingsSpy.callCount, 0);
                t.deepEqual(setSelectedCameraSettingsSpy.getCall(0).args, [cs]);
                return [4 /*yield*/, barcodePicker.applyCameraSettings()];
            case 4:
                _a.sent();
                t.is(barcodePicker.getActiveCamera(), undefined);
                t.is(setSelectedCameraSettingsSpy.callCount, 2);
                t.deepEqual(setSelectedCameraSettingsSpy.getCall(1).args, [undefined]);
                return [4 /*yield*/, barcodePicker.accessCamera()];
            case 5:
                _a.sent();
                return [4 /*yield*/, barcodePicker.applyCameraSettings(cs)];
            case 6:
                _a.sent();
                t.is(applyCameraSettingsSpy.callCount, 1);
                t.deepEqual(applyCameraSettingsSpy.getCall(0).args, [cs]);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("constructor scanSettings & applyScanSettings", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, barcodePicker, ss, applyScanSettingsSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        scanner: s
                    })];
            case 2:
                barcodePicker = _a.sent();
                ss = new __1.ScanSettings({
                    enabledSymbologies: __1.Barcode.Symbology.QR,
                    codeDuplicateFilter: 10,
                    maxNumberOfCodesPerFrame: 10,
                    searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 }
                });
                applyScanSettingsSpy = sinon.spy(s, "applyScanSettings");
                t.is(applyScanSettingsSpy.callCount, 0);
                barcodePicker.applyScanSettings(ss);
                t.is(applyScanSettingsSpy.callCount, 1);
                t.deepEqual(applyScanSettingsSpy.getCall(0).args, [ss]);
                barcodePicker.destroy(false);
                applyScanSettingsSpy.resetHistory();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        scanner: s,
                        scanSettings: ss
                    })];
            case 3:
                barcodePicker = _a.sent();
                t.deepEqual(applyScanSettingsSpy.getCall(0).args, [ss]);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isVisible & setVisible", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isVisible());
                barcodePicker.setVisible(false);
                t.false(barcodePicker.isVisible());
                barcodePicker.setVisible(true);
                t.true(barcodePicker.isVisible());
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        visible: false
                    })];
            case 3:
                barcodePicker = _a.sent();
                t.false(barcodePicker.isVisible());
                barcodePicker.setVisible(true);
                t.true(barcodePicker.isVisible());
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isMirrorImageEnabled & setMirrorImageEnabled", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.false(barcodePicker.isMirrorImageEnabled());
                barcodePicker.setMirrorImageEnabled(true);
                t.false(barcodePicker.isMirrorImageEnabled()); // No camera has been accessed yet
                return [4 /*yield*/, barcodePicker.accessCamera()];
            case 3:
                _a.sent();
                t.false(barcodePicker.isMirrorImageEnabled());
                barcodePicker.setMirrorImageEnabled(true);
                t.true(barcodePicker.isMirrorImageEnabled());
                return [4 /*yield*/, barcodePicker.setActiveCamera(fakeCamera2Object)];
            case 4:
                _a.sent();
                t.true(barcodePicker.isMirrorImageEnabled()); // Front camera
                barcodePicker.setMirrorImageEnabled(false);
                t.false(barcodePicker.isMirrorImageEnabled());
                return [4 /*yield*/, barcodePicker.setActiveCamera()];
            case 5:
                _a.sent();
                t.true(barcodePicker.isMirrorImageEnabled());
                return [4 /*yield*/, barcodePicker.setActiveCamera(fakeCamera2Object)];
            case 6:
                _a.sent();
                t.false(barcodePicker.isMirrorImageEnabled());
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        camera: fakeCamera2Object
                    })];
            case 7:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isMirrorImageEnabled());
                barcodePicker.setMirrorImageEnabled(false);
                t.false(barcodePicker.isMirrorImageEnabled());
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        camera: fakeCamera2Object
                    })];
            case 8:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isMirrorImageEnabled());
                barcodePicker.pauseScanning(true);
                t.false(barcodePicker.isMirrorImageEnabled());
                barcodePicker.setMirrorImageEnabled(true);
                t.false(barcodePicker.isMirrorImageEnabled());
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 9:
                _a.sent();
                t.true(barcodePicker.isMirrorImageEnabled());
                barcodePicker.pauseScanning(true);
                return [4 /*yield*/, barcodePicker.setActiveCamera(fakeCamera1Object)];
            case 10:
                _a.sent();
                t.false(barcodePicker.isMirrorImageEnabled());
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 11:
                _a.sent();
                t.false(barcodePicker.isMirrorImageEnabled());
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isPlaySoundOnScanEnabled & setPlaySoundOnScanEnabled", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.false(barcodePicker.isPlaySoundOnScanEnabled());
                barcodePicker.setPlaySoundOnScanEnabled(true);
                t.true(barcodePicker.isPlaySoundOnScanEnabled());
                barcodePicker.setPlaySoundOnScanEnabled(false);
                t.false(barcodePicker.isPlaySoundOnScanEnabled());
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        playSoundOnScan: true
                    })];
            case 3:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isPlaySoundOnScanEnabled());
                barcodePicker.setPlaySoundOnScanEnabled(false);
                t.false(barcodePicker.isPlaySoundOnScanEnabled());
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isVibrateOnScanEnabled & setVibrateOnScanEnabled", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.false(barcodePicker.isVibrateOnScanEnabled());
                barcodePicker.setVibrateOnScanEnabled(true);
                t.true(barcodePicker.isVibrateOnScanEnabled());
                barcodePicker.setVibrateOnScanEnabled(false);
                t.false(barcodePicker.isVibrateOnScanEnabled());
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        vibrateOnScan: true
                    })];
            case 3:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isVibrateOnScanEnabled());
                barcodePicker.setVibrateOnScanEnabled(false);
                t.false(barcodePicker.isVibrateOnScanEnabled());
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isCameraSwitcherEnabled & setCameraSwitcherEnabled", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isCameraSwitcherEnabled());
                barcodePicker.setCameraSwitcherEnabled(false);
                t.false(barcodePicker.isCameraSwitcherEnabled());
                barcodePicker.setCameraSwitcherEnabled(true);
                t.true(barcodePicker.isCameraSwitcherEnabled());
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isTorchToggleEnabled & setTorchToggleEnabled", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isTorchToggleEnabled());
                barcodePicker.setTorchToggleEnabled(false);
                t.false(barcodePicker.isTorchToggleEnabled());
                barcodePicker.setTorchToggleEnabled(true);
                t.true(barcodePicker.isTorchToggleEnabled());
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isTapToFocusEnabled & setTapToFocusEnabled", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isTapToFocusEnabled());
                barcodePicker.setTapToFocusEnabled(false);
                t.false(barcodePicker.isTapToFocusEnabled());
                barcodePicker.setTapToFocusEnabled(true);
                t.true(barcodePicker.isTapToFocusEnabled());
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isPinchToZoomEnabled & setPinchToZoomEnabled", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.true(barcodePicker.isPinchToZoomEnabled());
                barcodePicker.setPinchToZoomEnabled(false);
                t.false(barcodePicker.isPinchToZoomEnabled());
                barcodePicker.setPinchToZoomEnabled(true);
                t.true(barcodePicker.isPinchToZoomEnabled());
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("setTorchEnabled", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                barcodePicker.setTorchEnabled(true);
                barcodePicker.setTorchEnabled(false);
                barcodePicker.destroy();
                t.pass();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("setZoom", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                barcodePicker.setZoom(0.1);
                barcodePicker.setZoom(1);
                barcodePicker.destroy();
                t.pass();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("constructor guiStyle option & setGuiStyle", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, setGuiStyleSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                setGuiStyleSpy = sinon.spy(barcodePicker.barcodePickerGui, "setGuiStyle");
                t.is(barcodePicker.barcodePickerGui.guiStyle, __1.BarcodePicker.GuiStyle.LASER);
                barcodePicker.setGuiStyle(__1.BarcodePicker.GuiStyle.NONE);
                t.is(setGuiStyleSpy.callCount, 1);
                t.deepEqual(setGuiStyleSpy.getCall(0).args, [__1.BarcodePicker.GuiStyle.NONE]);
                barcodePicker.setGuiStyle(__1.BarcodePicker.GuiStyle.LASER);
                t.is(setGuiStyleSpy.callCount, 2);
                t.deepEqual(setGuiStyleSpy.getCall(1).args, [__1.BarcodePicker.GuiStyle.LASER]);
                barcodePicker.setGuiStyle(__1.BarcodePicker.GuiStyle.VIEWFINDER);
                t.is(setGuiStyleSpy.callCount, 3);
                t.deepEqual(setGuiStyleSpy.getCall(2).args, [__1.BarcodePicker.GuiStyle.VIEWFINDER]);
                barcodePicker.setGuiStyle(__1.BarcodePicker.GuiStyle.NONE);
                t.is(setGuiStyleSpy.callCount, 4);
                t.deepEqual(setGuiStyleSpy.getCall(3).args, [__1.BarcodePicker.GuiStyle.NONE]);
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        guiStyle: __1.BarcodePicker.GuiStyle.NONE
                    })];
            case 3:
                barcodePicker = _a.sent();
                t.is(barcodePicker.barcodePickerGui.guiStyle, __1.BarcodePicker.GuiStyle.NONE);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("constructor videoFit option & setVideoFit", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, setVideoFitSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                setVideoFitSpy = sinon.spy(barcodePicker.barcodePickerGui, "setVideoFit");
                t.is(barcodePicker.barcodePickerGui.videoFit, __1.BarcodePicker.ObjectFit.CONTAIN);
                barcodePicker.setVideoFit(__1.BarcodePicker.ObjectFit.COVER);
                t.is(setVideoFitSpy.callCount, 1);
                t.deepEqual(setVideoFitSpy.getCall(0).args, [__1.BarcodePicker.ObjectFit.COVER]);
                barcodePicker.setVideoFit(__1.BarcodePicker.ObjectFit.CONTAIN);
                t.is(setVideoFitSpy.callCount, 2);
                t.deepEqual(setVideoFitSpy.getCall(1).args, [__1.BarcodePicker.ObjectFit.CONTAIN]);
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        videoFit: __1.BarcodePicker.ObjectFit.COVER
                    })];
            case 3:
                barcodePicker = _a.sent();
                t.is(barcodePicker.barcodePickerGui.videoFit, __1.BarcodePicker.ObjectFit.COVER);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("constructor laserArea option & setLaserArea", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, setLaserAreaSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                setLaserAreaSpy = sinon.spy(barcodePicker.barcodePickerGui, "setLaserArea");
                t.is(barcodePicker.barcodePickerGui.customLaserArea, undefined);
                barcodePicker.setLaserArea({
                    x: 0.25,
                    y: 0.25,
                    width: 0.5,
                    height: 0.5
                });
                t.is(setLaserAreaSpy.callCount, 1);
                t.deepEqual(setLaserAreaSpy.getCall(0).args, [
                    {
                        x: 0.25,
                        y: 0.25,
                        width: 0.5,
                        height: 0.5
                    }
                ]);
                barcodePicker.setLaserArea();
                t.is(setLaserAreaSpy.callCount, 2);
                t.deepEqual(setLaserAreaSpy.getCall(1).args, [undefined]);
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        laserArea: {
                            x: 0.25,
                            y: 0.25,
                            width: 0.5,
                            height: 0.5
                        }
                    })];
            case 3:
                barcodePicker = _a.sent();
                t.deepEqual(barcodePicker.barcodePickerGui.customLaserArea, {
                    x: 0.25,
                    y: 0.25,
                    width: 0.5,
                    height: 0.5
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("constructor viewfinderArea option & setViewfinderArea", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, setViewfinderAreaSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                setViewfinderAreaSpy = sinon.spy(barcodePicker.barcodePickerGui, "setViewfinderArea");
                t.is(barcodePicker.barcodePickerGui.customViewfinderArea, undefined);
                barcodePicker.setViewfinderArea({
                    x: 0.25,
                    y: 0.25,
                    width: 0.5,
                    height: 0.5
                });
                t.is(setViewfinderAreaSpy.callCount, 1);
                t.deepEqual(setViewfinderAreaSpy.getCall(0).args, [
                    {
                        x: 0.25,
                        y: 0.25,
                        width: 0.5,
                        height: 0.5
                    }
                ]);
                barcodePicker.setViewfinderArea();
                t.is(setViewfinderAreaSpy.callCount, 2);
                t.deepEqual(setViewfinderAreaSpy.getCall(1).args, [undefined]);
                barcodePicker.destroy();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        viewfinderArea: {
                            x: 0.25,
                            y: 0.25,
                            width: 0.5,
                            height: 0.5
                        }
                    })];
            case 3:
                barcodePicker = _a.sent();
                t.deepEqual(barcodePicker.barcodePickerGui.customViewfinderArea, {
                    x: 0.25,
                    y: 0.25,
                    width: 0.5,
                    height: 0.5
                });
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("createParserForFormat", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, parser;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                parser = barcodePicker.createParserForFormat(__1.Parser.DataFormat.DLID);
                t.truthy(parser);
                parser = barcodePicker.createParserForFormat(__1.Parser.DataFormat.GS1_AI);
                t.truthy(parser);
                parser = barcodePicker.createParserForFormat(__1.Parser.DataFormat.HIBC);
                t.truthy(parser);
                parser = barcodePicker.createParserForFormat(__1.Parser.DataFormat.MRTD);
                t.truthy(parser);
                parser = barcodePicker.createParserForFormat(__1.Parser.DataFormat.SWISSQR);
                t.truthy(parser);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("reassignOriginElement", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var element, barcodePicker, reassignOriginElementSpy, element2;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                element = document.createElement("div");
                return [4 /*yield*/, __1.BarcodePicker.create(element, {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.deepEqual(barcodePicker.barcodePickerGui.originElement, element);
                t.throws(function () {
                    return barcodePicker.reassignOriginElement("wrong-argument");
                }, __1.CustomError, "A valid origin HTML element must be given");
                t.throws(function () {
                    return barcodePicker.reassignOriginElement({});
                }, __1.CustomError, "A valid origin HTML element must be given");
                reassignOriginElementSpy = sinon.spy(barcodePicker.barcodePickerGui, "reassignOriginElement");
                element2 = document.createElement("div");
                barcodePicker.reassignOriginElement(element2);
                t.true(reassignOriginElementSpy.calledOnceWithExactly(element2));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("setTargetScanningFPS", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, scheduleVideoProcessingStub, videoProcessingStub;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.is(barcodePicker.targetScanningFPS, 30);
                t.is(barcodePicker.averageProcessingTime, undefined);
                barcodePicker.setTargetScanningFPS(60);
                t.is(barcodePicker.targetScanningFPS, 60);
                barcodePicker.scheduleNextVideoProcessing(performance.now());
                t.is(barcodePicker.averageProcessingTime, undefined);
                barcodePicker.setTargetScanningFPS(30);
                t.is(barcodePicker.targetScanningFPS, 30);
                barcodePicker.scheduleNextVideoProcessing(performance.now());
                t.true(barcodePicker.averageProcessingTime < 10);
                barcodePicker.setTargetScanningFPS(10);
                t.is(barcodePicker.targetScanningFPS, 10);
                scheduleVideoProcessingStub = sinon.stub(barcodePicker, "scheduleVideoProcessing");
                barcodePicker.scheduleNextVideoProcessing(performance.now());
                t.true(barcodePicker.averageProcessingTime < 10);
                t.is(scheduleVideoProcessingStub.callCount, 1);
                t.true(scheduleVideoProcessingStub.lastCall.args[0] > 90);
                videoProcessingStub = sinon.stub(barcodePicker, "videoProcessing");
                barcodePicker.scheduleNextVideoProcessing(performance.now() - 10000);
                t.true(barcodePicker.averageProcessingTime > 100);
                t.is(scheduleVideoProcessingStub.callCount, 1);
                t.is(videoProcessingStub.callCount, 1);
                barcodePicker.setTargetScanningFPS(0);
                t.is(barcodePicker.targetScanningFPS, 30);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("clearSession", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, barcodePicker, clearSessionSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        scanner: s
                    })];
            case 2:
                barcodePicker = _a.sent();
                clearSessionSpy = sinon.spy(s, "clearSession");
                t.is(clearSessionSpy.callCount, 0);
                barcodePicker.clearSession();
                t.is(clearSessionSpy.callCount, 1);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("addListener", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, onSpy, callbackSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                onSpy = sinon.spy(barcodePicker, "on");
                callbackSpy = sinon.spy();
                barcodePicker.addListener("ready", callbackSpy);
                t.true(onSpy.calledOnceWithExactly("ready", callbackSpy, undefined));
                return [2 /*return*/];
        }
    });
}); });
// Deprecated method
ava_1.default.serial("onReady", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, onSpy, callbackSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                onSpy = sinon.spy(barcodePicker, "on");
                callbackSpy = sinon.spy();
                barcodePicker.onReady(callbackSpy);
                t.true(onSpy.calledOnceWithExactly("ready", callbackSpy));
                return [2 /*return*/];
        }
    });
}); });
// Deprecated methods
ava_1.default.serial("onScan & removeScanListener & removeScanListeners", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, onSpy, callbackSpy, removeListenerSpy, removeAllListenersSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                onSpy = sinon.spy(barcodePicker, "on");
                callbackSpy = sinon.spy();
                barcodePicker.onScan(callbackSpy);
                t.true(onSpy.calledOnceWithExactly("scan", callbackSpy, false));
                onSpy.resetHistory();
                barcodePicker.onScan(callbackSpy, false);
                t.true(onSpy.calledOnceWithExactly("scan", callbackSpy, false));
                onSpy.resetHistory();
                barcodePicker.onScan(callbackSpy, true);
                t.true(onSpy.calledOnceWithExactly("scan", callbackSpy, true));
                removeListenerSpy = sinon.spy(barcodePicker, "removeListener");
                barcodePicker.removeScanListener(callbackSpy);
                t.true(removeListenerSpy.calledOnceWithExactly("scan", callbackSpy));
                removeAllListenersSpy = sinon.spy(barcodePicker, "removeAllListeners");
                barcodePicker.removeScanListeners();
                t.true(removeAllListenersSpy.calledOnceWithExactly("scan"));
                return [2 /*return*/];
        }
    });
}); });
// Deprecated methods
ava_1.default.serial("onSubmitFrame & removeSubmitFrameListener & removeSubmitFrameListeners", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, onSpy, callbackSpy, removeListenerSpy, removeAllListenersSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                onSpy = sinon.spy(barcodePicker, "on");
                callbackSpy = sinon.spy();
                barcodePicker.onSubmitFrame(callbackSpy);
                t.true(onSpy.calledOnceWithExactly("submitFrame", callbackSpy, false));
                onSpy.resetHistory();
                barcodePicker.onSubmitFrame(callbackSpy, false);
                t.true(onSpy.calledOnceWithExactly("submitFrame", callbackSpy, false));
                onSpy.resetHistory();
                barcodePicker.onSubmitFrame(callbackSpy, true);
                t.true(onSpy.calledOnceWithExactly("submitFrame", callbackSpy, true));
                removeListenerSpy = sinon.spy(barcodePicker, "removeListener");
                barcodePicker.removeSubmitFrameListener(callbackSpy);
                t.true(removeListenerSpy.calledOnceWithExactly("submitFrame", callbackSpy));
                removeAllListenersSpy = sinon.spy(barcodePicker, "removeAllListeners");
                barcodePicker.removeSubmitFrameListeners();
                t.true(removeAllListenersSpy.calledOnceWithExactly("submitFrame"));
                return [2 /*return*/];
        }
    });
}); });
// Deprecated methods
ava_1.default.serial("onProcessFrame & removeProcessFrameListener & removeProcessFrameListeners", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, onSpy, callbackSpy, removeListenerSpy, removeAllListenersSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                onSpy = sinon.spy(barcodePicker, "on");
                callbackSpy = sinon.spy();
                barcodePicker.onProcessFrame(callbackSpy);
                t.true(onSpy.calledOnceWithExactly("processFrame", callbackSpy, false));
                onSpy.resetHistory();
                barcodePicker.onProcessFrame(callbackSpy, false);
                t.true(onSpy.calledOnceWithExactly("processFrame", callbackSpy, false));
                onSpy.resetHistory();
                barcodePicker.onProcessFrame(callbackSpy, true);
                t.true(onSpy.calledOnceWithExactly("processFrame", callbackSpy, true));
                removeListenerSpy = sinon.spy(barcodePicker, "removeListener");
                barcodePicker.removeProcessFrameListener(callbackSpy);
                t.true(removeListenerSpy.calledOnceWithExactly("processFrame", callbackSpy));
                removeAllListenersSpy = sinon.spy(barcodePicker, "removeAllListeners");
                barcodePicker.removeProcessFrameListeners();
                t.true(removeAllListenersSpy.calledOnceWithExactly("processFrame"));
                return [2 /*return*/];
        }
    });
}); });
// Deprecated methods
ava_1.default.serial("onScanError & removeScanErrorListener & removeScanErrorListeners", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, onSpy, callbackSpy, removeListenerSpy, removeAllListenersSpy;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                onSpy = sinon.spy(barcodePicker, "on");
                callbackSpy = sinon.spy();
                barcodePicker.onScanError(callbackSpy);
                t.true(onSpy.calledOnceWithExactly("scanError", callbackSpy, false));
                onSpy.resetHistory();
                barcodePicker.onScanError(callbackSpy, false);
                t.true(onSpy.calledOnceWithExactly("scanError", callbackSpy, false));
                onSpy.resetHistory();
                barcodePicker.onScanError(callbackSpy, true);
                t.true(onSpy.calledOnceWithExactly("scanError", callbackSpy, true));
                removeListenerSpy = sinon.spy(barcodePicker, "removeListener");
                barcodePicker.removeScanErrorListener(callbackSpy);
                t.true(removeListenerSpy.calledOnceWithExactly("scanError", callbackSpy));
                removeAllListenersSpy = sinon.spy(barcodePicker, "removeAllListeners");
                barcodePicker.removeScanErrorListeners();
                t.true(removeAllListenersSpy.calledOnceWithExactly("scanError"));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("isReady & ready event", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var s, barcodePicker, onReadyCallbackSpy0, onReadyCallbackSpy1, onReadyCallbackSpy2, onReadyCallbackSpy3, onReadyCallbackSpy4, onReadyCallbackSpy5;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                s = new __1.Scanner();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false,
                        scanner: s
                    })];
            case 2:
                barcodePicker = _a.sent();
                onReadyCallbackSpy0 = sinon.spy();
                onReadyCallbackSpy1 = sinon.spy();
                onReadyCallbackSpy2 = sinon.spy();
                onReadyCallbackSpy3 = sinon.spy();
                onReadyCallbackSpy4 = sinon.spy();
                onReadyCallbackSpy5 = sinon.spy();
                t.false(s.isReady());
                t.false(barcodePicker.isReady());
                barcodePicker.on("ready", onReadyCallbackSpy0);
                barcodePicker.removeAllListeners("ready");
                s.on("ready", onReadyCallbackSpy1);
                barcodePicker.on("ready", onReadyCallbackSpy2);
                barcodePicker.on("ready", onReadyCallbackSpy3);
                barcodePicker.on("ready", onReadyCallbackSpy4);
                barcodePicker.removeListener("ready", onReadyCallbackSpy4);
                t.false(onReadyCallbackSpy0.called);
                t.false(onReadyCallbackSpy1.called);
                t.false(onReadyCallbackSpy2.called);
                t.false(onReadyCallbackSpy3.called);
                t.false(onReadyCallbackSpy4.called);
                s.engineWorkerOnMessage({
                    data: ["status", "ready"]
                });
                t.true(s.isReady());
                t.true(barcodePicker.isReady());
                t.false(onReadyCallbackSpy0.called);
                t.true(onReadyCallbackSpy1.called);
                t.true(onReadyCallbackSpy2.called);
                t.true(onReadyCallbackSpy3.called);
                t.false(onReadyCallbackSpy4.called);
                t.true(onReadyCallbackSpy3.calledAfter(onReadyCallbackSpy2));
                t.true(onReadyCallbackSpy1.calledAfter(onReadyCallbackSpy3));
                barcodePicker.on("ready", onReadyCallbackSpy5);
                t.true(onReadyCallbackSpy5.called);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("scan event", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, onScanCallbackSpy1, onScanCallbackSpy2, onScanCallbackSpy3, scanResult;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prepareBarcodePickerForEvents()];
            case 2:
                barcodePicker = _a.sent();
                onScanCallbackSpy1 = sinon.spy();
                onScanCallbackSpy2 = sinon.spy();
                onScanCallbackSpy3 = sinon.spy();
                barcodePicker.on("scan", onScanCallbackSpy1);
                barcodePicker.on("scan", onScanCallbackSpy2);
                barcodePicker.on("scan", onScanCallbackSpy3, true);
                t.false(onScanCallbackSpy1.called);
                t.false(onScanCallbackSpy2.called);
                t.false(onScanCallbackSpy3.called);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 3:
                _a.sent();
                t.is(onScanCallbackSpy1.callCount, 0);
                t.is(onScanCallbackSpy2.callCount, 0);
                t.is(onScanCallbackSpy3.callCount, 0);
                scanResult = new __1.ScanResult([sampleBarcode], new Uint8ClampedArray(4), (barcodePicker.getScanner().getImageSettings()));
                barcodePicker.getScanner().processImage.restore();
                barcodePicker.pauseScanning();
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 4:
                _a.sent();
                t.is(onScanCallbackSpy1.callCount, 0);
                t.is(onScanCallbackSpy2.callCount, 0);
                t.is(onScanCallbackSpy3.callCount, 0);
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 5:
                _a.sent();
                sinon.stub(barcodePicker.getScanner(), "processImage").resolves(scanResult);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 6:
                _a.sent();
                t.is(onScanCallbackSpy1.callCount, 1);
                t.is(onScanCallbackSpy2.callCount, 1);
                t.is(onScanCallbackSpy3.callCount, 1);
                t.deepEqual(onScanCallbackSpy1.getCall(0).args, [scanResult]);
                t.deepEqual(onScanCallbackSpy2.getCall(0).args, [scanResult]);
                t.deepEqual(onScanCallbackSpy3.getCall(0).args, [scanResult]);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 7:
                _a.sent();
                t.is(onScanCallbackSpy1.callCount, 2);
                t.is(onScanCallbackSpy2.callCount, 2);
                t.is(onScanCallbackSpy3.callCount, 1);
                barcodePicker.removeListener("scan", onScanCallbackSpy1);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 8:
                _a.sent();
                t.is(onScanCallbackSpy1.callCount, 2);
                t.is(onScanCallbackSpy2.callCount, 3);
                t.is(onScanCallbackSpy3.callCount, 1);
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 9:
                _a.sent();
                // Intentionally pause before processing is complete
                // tslint:disable-next-line: no-floating-promises
                barcodePicker.processVideoFrame(true);
                barcodePicker.pauseScanning();
                return [4 /*yield*/, wait(200)];
            case 10:
                _a.sent();
                t.is(onScanCallbackSpy1.callCount, 2);
                t.is(onScanCallbackSpy2.callCount, 3);
                t.is(onScanCallbackSpy3.callCount, 1);
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 11:
                _a.sent();
                barcodePicker.removeAllListeners("scan");
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 12:
                _a.sent();
                t.is(onScanCallbackSpy1.callCount, 2);
                t.is(onScanCallbackSpy2.callCount, 3);
                t.is(onScanCallbackSpy3.callCount, 1);
                barcodePicker.setPlaySoundOnScanEnabled(false);
                barcodePicker.setVibrateOnScanEnabled(false);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 13:
                _a.sent();
                t.is(onScanCallbackSpy1.callCount, 2);
                t.is(onScanCallbackSpy2.callCount, 3);
                t.is(onScanCallbackSpy3.callCount, 1);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("submitFrame event", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, scanResult, onSubmitFrameCallbackSpy1, onSubmitFrameCallbackSpy2, onSubmitFrameCallbackSpy3;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prepareBarcodePickerForEvents()];
            case 2:
                barcodePicker = _a.sent();
                scanResult = new __1.ScanResult([], new Uint8ClampedArray(4), (barcodePicker.getScanner().getImageSettings()));
                barcodePicker.getScanner().processImage.restore();
                sinon.stub(barcodePicker.getScanner(), "processImage").callsFake(function () {
                    return Promise.resolve(new __1.ScanResult([sampleBarcode, tslib_1.__assign({}, sampleBarcode), tslib_1.__assign({}, sampleBarcode)], new Uint8ClampedArray(4), barcodePicker.getScanner().getImageSettings()));
                });
                onSubmitFrameCallbackSpy1 = sinon.spy();
                onSubmitFrameCallbackSpy2 = sinon.spy();
                onSubmitFrameCallbackSpy3 = sinon.spy();
                barcodePicker.on("submitFrame", onSubmitFrameCallbackSpy1);
                barcodePicker.on("submitFrame", onSubmitFrameCallbackSpy2);
                barcodePicker.on("submitFrame", onSubmitFrameCallbackSpy3, true);
                t.false(onSubmitFrameCallbackSpy1.called);
                t.false(onSubmitFrameCallbackSpy2.called);
                t.false(onSubmitFrameCallbackSpy3.called);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 3:
                _a.sent();
                t.is(onSubmitFrameCallbackSpy1.callCount, 1);
                t.is(onSubmitFrameCallbackSpy2.callCount, 1);
                t.is(onSubmitFrameCallbackSpy3.callCount, 1);
                // Result will not contain barcodes yet in the submitFrame event
                t.deepEqual(onSubmitFrameCallbackSpy1.getCall(0).args, [scanResult]);
                t.deepEqual(onSubmitFrameCallbackSpy2.getCall(0).args, [scanResult]);
                t.deepEqual(onSubmitFrameCallbackSpy3.getCall(0).args, [scanResult]);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 4:
                _a.sent();
                t.is(onSubmitFrameCallbackSpy1.callCount, 2);
                t.is(onSubmitFrameCallbackSpy2.callCount, 2);
                t.is(onSubmitFrameCallbackSpy3.callCount, 1);
                barcodePicker.removeListener("submitFrame", onSubmitFrameCallbackSpy1);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 5:
                _a.sent();
                t.is(onSubmitFrameCallbackSpy1.callCount, 2);
                t.is(onSubmitFrameCallbackSpy2.callCount, 3);
                t.is(onSubmitFrameCallbackSpy3.callCount, 1);
                barcodePicker.removeAllListeners("submitFrame");
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 6:
                _a.sent();
                t.is(onSubmitFrameCallbackSpy1.callCount, 2);
                t.is(onSubmitFrameCallbackSpy2.callCount, 3);
                t.is(onSubmitFrameCallbackSpy3.callCount, 1);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("processFrame event", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, scanResult, onProcessFrameCallbackSpy1, onProcessFrameCallbackSpy2, onProcessFrameCallbackSpy3;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prepareBarcodePickerForEvents()];
            case 2:
                barcodePicker = _a.sent();
                scanResult = new __1.ScanResult([], new Uint8ClampedArray(16), (barcodePicker.getScanner().getImageSettings()));
                barcodePicker.getScanner().processImage.restore();
                sinon.stub(barcodePicker.getScanner(), "processImage").callsFake(function () {
                    return new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve(scanResult);
                        }, 100);
                    });
                });
                onProcessFrameCallbackSpy1 = sinon.spy();
                onProcessFrameCallbackSpy2 = sinon.spy();
                onProcessFrameCallbackSpy3 = sinon.spy();
                barcodePicker.on("processFrame", onProcessFrameCallbackSpy1);
                barcodePicker.on("processFrame", onProcessFrameCallbackSpy2);
                barcodePicker.on("processFrame", onProcessFrameCallbackSpy3, true);
                t.false(onProcessFrameCallbackSpy1.called);
                t.false(onProcessFrameCallbackSpy2.called);
                t.false(onProcessFrameCallbackSpy3.called);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 3:
                _a.sent();
                t.is(onProcessFrameCallbackSpy1.callCount, 1);
                t.is(onProcessFrameCallbackSpy2.callCount, 1);
                t.is(onProcessFrameCallbackSpy3.callCount, 1);
                t.deepEqual(onProcessFrameCallbackSpy1.getCall(0).args, [scanResult]);
                t.deepEqual(onProcessFrameCallbackSpy2.getCall(0).args, [scanResult]);
                t.deepEqual(onProcessFrameCallbackSpy3.getCall(0).args, [scanResult]);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 4:
                _a.sent();
                t.is(onProcessFrameCallbackSpy1.callCount, 2);
                t.is(onProcessFrameCallbackSpy2.callCount, 2);
                t.is(onProcessFrameCallbackSpy3.callCount, 1);
                barcodePicker.removeListener("processFrame", onProcessFrameCallbackSpy1);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 5:
                _a.sent();
                t.is(onProcessFrameCallbackSpy1.callCount, 2);
                t.is(onProcessFrameCallbackSpy2.callCount, 3);
                t.is(onProcessFrameCallbackSpy3.callCount, 1);
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 6:
                _a.sent();
                // Intentionally pause before processing is complete
                // tslint:disable-next-line: no-floating-promises
                barcodePicker.processVideoFrame(true);
                barcodePicker.pauseScanning();
                return [4 /*yield*/, wait(200)];
            case 7:
                _a.sent();
                t.is(onProcessFrameCallbackSpy1.callCount, 2);
                t.is(onProcessFrameCallbackSpy2.callCount, 3);
                t.is(onProcessFrameCallbackSpy3.callCount, 1);
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 8:
                _a.sent();
                barcodePicker.removeAllListeners("processFrame");
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 9:
                _a.sent();
                t.is(onProcessFrameCallbackSpy1.callCount, 2);
                t.is(onProcessFrameCallbackSpy2.callCount, 3);
                t.is(onProcessFrameCallbackSpy3.callCount, 1);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("scanError event", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, onScanErrorCallbackSpy1, onScanErrorCallbackSpy2, onScanErrorCallbackSpy3, scanError;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, prepareBarcodePickerForEvents()];
            case 2:
                barcodePicker = _a.sent();
                onScanErrorCallbackSpy1 = sinon.spy();
                onScanErrorCallbackSpy2 = sinon.spy();
                onScanErrorCallbackSpy3 = sinon.spy();
                barcodePicker.on("scanError", onScanErrorCallbackSpy1);
                barcodePicker.on("scanError", onScanErrorCallbackSpy2);
                barcodePicker.on("scanError", onScanErrorCallbackSpy3, true);
                t.false(onScanErrorCallbackSpy1.called);
                t.false(onScanErrorCallbackSpy2.called);
                t.false(onScanErrorCallbackSpy3.called);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 3:
                _a.sent();
                t.is(onScanErrorCallbackSpy1.callCount, 0);
                t.is(onScanErrorCallbackSpy2.callCount, 0);
                t.is(onScanErrorCallbackSpy3.callCount, 0);
                scanError = new __1.CustomError({
                    name: "ScanditEngineError",
                    message: "Test error"
                });
                barcodePicker.getScanner().processImage.restore();
                sinon.stub(barcodePicker.getScanner(), "processImage").rejects(scanError);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 4:
                _a.sent();
                t.is(onScanErrorCallbackSpy1.callCount, 1);
                t.is(onScanErrorCallbackSpy2.callCount, 1);
                t.is(onScanErrorCallbackSpy3.callCount, 1);
                t.deepEqual(onScanErrorCallbackSpy1.getCall(0).args, [scanError]);
                t.deepEqual(onScanErrorCallbackSpy2.getCall(0).args, [scanError]);
                t.deepEqual(onScanErrorCallbackSpy3.getCall(0).args, [scanError]);
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 5:
                _a.sent();
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 6:
                _a.sent();
                t.is(onScanErrorCallbackSpy1.callCount, 2);
                t.is(onScanErrorCallbackSpy2.callCount, 2);
                t.is(onScanErrorCallbackSpy3.callCount, 1);
                barcodePicker.removeListener("scanError", onScanErrorCallbackSpy1);
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 7:
                _a.sent();
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 8:
                _a.sent();
                t.is(onScanErrorCallbackSpy1.callCount, 2);
                t.is(onScanErrorCallbackSpy2.callCount, 3);
                t.is(onScanErrorCallbackSpy3.callCount, 1);
                barcodePicker.removeAllListeners("scanError");
                return [4 /*yield*/, barcodePicker.resumeScanning()];
            case 9:
                _a.sent();
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 10:
                _a.sent();
                t.is(onScanErrorCallbackSpy1.callCount, 2);
                t.is(onScanErrorCallbackSpy2.callCount, 3);
                t.is(onScanErrorCallbackSpy3.callCount, 1);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("ScanResult.rejectCode", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var vibrateSpy, barcodePicker;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                vibrateSpy = sinon.spy();
                navigator.vibrate = vibrateSpy;
                return [4 /*yield*/, prepareBarcodePickerForEvents()];
            case 2:
                barcodePicker = _a.sent();
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 3:
                _a.sent();
                t.is(vibrateSpy.callCount, 0);
                barcodePicker.getScanner().processImage.restore();
                sinon.stub(barcodePicker.getScanner(), "processImage").callsFake(function () {
                    return Promise.resolve(new __1.ScanResult([sampleBarcode], new Uint8ClampedArray(4), (barcodePicker.getScanner().getImageSettings())));
                });
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 4:
                _a.sent();
                t.is(vibrateSpy.callCount, 1);
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 5:
                _a.sent();
                t.is(vibrateSpy.callCount, 2);
                barcodePicker.on("scan", function (listenerScanResult) {
                    listenerScanResult.rejectCode(listenerScanResult.barcodes[0]);
                });
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 6:
                _a.sent();
                t.is(vibrateSpy.callCount, 2);
                barcodePicker.removeAllListeners("scan");
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 7:
                _a.sent();
                t.is(vibrateSpy.callCount, 3);
                barcodePicker.on("processFrame", function (listenerScanResult) {
                    listenerScanResult.rejectCode(listenerScanResult.barcodes[0]);
                });
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 8:
                _a.sent();
                t.is(vibrateSpy.callCount, 3);
                barcodePicker.removeAllListeners("processFrame");
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 9:
                _a.sent();
                t.is(vibrateSpy.callCount, 4);
                barcodePicker.getScanner().processImage.restore();
                sinon.stub(barcodePicker.getScanner(), "processImage").callsFake(function () {
                    return Promise.resolve(new __1.ScanResult([sampleBarcode, tslib_1.__assign({}, sampleBarcode)], new Uint8ClampedArray(4), (barcodePicker.getScanner().getImageSettings())));
                });
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 10:
                _a.sent();
                t.is(vibrateSpy.callCount, 5);
                barcodePicker.on("scan", function (listenerScanResult) {
                    listenerScanResult.rejectCode(listenerScanResult.barcodes[0]);
                });
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 11:
                _a.sent();
                t.is(vibrateSpy.callCount, 6);
                barcodePicker.on("scan", function (listenerScanResult) {
                    listenerScanResult.rejectCode(listenerScanResult.barcodes[1]);
                });
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 12:
                _a.sent();
                t.is(vibrateSpy.callCount, 6);
                barcodePicker.removeAllListeners("scan");
                return [4 /*yield*/, barcodePicker.processVideoFrame(true)];
            case 13:
                _a.sent();
                t.is(vibrateSpy.callCount, 7);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.serial("triggerFatalError", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePicker, error;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fakeFullCompatibleBrowser()];
            case 1:
                _a.sent();
                return [4 /*yield*/, __1.BarcodePicker.create(document.createElement("div"), {
                        accessCamera: false
                    })];
            case 2:
                barcodePicker = _a.sent();
                t.is(barcodePicker.fatalError, undefined);
                error = new Error("Test error");
                barcodePicker.triggerFatalError(error);
                t.deepEqual(barcodePicker.fatalError, error);
                barcodePicker.destroy();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=barcodePicker.spec.js.map