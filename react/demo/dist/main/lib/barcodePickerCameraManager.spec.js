"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* tslint:disable:no-implicit-dependencies no-any */
/**
 * BarcodePickerCameraManager tests
 */
var ava_1 = tslib_1.__importDefault(require("ava"));
var sinon = tslib_1.__importStar(require("sinon"));
var __1 = require("..");
var barcodePickerCameraManager_1 = require("./barcodePickerCameraManager");
var barcodePickerGui_1 = require("./barcodePickerGui");
Object.defineProperty(screen, "width", {
    writable: true
});
Object.defineProperty(screen, "height", {
    writable: true
});
screen.width = 100;
screen.height = 100;
var triggerFatalErrorSpy = sinon.spy();
// Speed up times
barcodePickerCameraManager_1.BarcodePickerCameraManager.cameraAccessTimeoutMs /= 10;
barcodePickerCameraManager_1.BarcodePickerCameraManager.cameraMetadataCheckTimeoutMs /= 10;
barcodePickerCameraManager_1.BarcodePickerCameraManager.cameraMetadataCheckIntervalMs /= 10;
barcodePickerCameraManager_1.BarcodePickerCameraManager.getCapabilitiesTimeoutMs /= 10;
barcodePickerCameraManager_1.BarcodePickerCameraManager.autofocusIntervalMs /= 10;
barcodePickerCameraManager_1.BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs /= 10;
barcodePickerCameraManager_1.BarcodePickerCameraManager.manualFocusWaitTimeoutMs /= 10;
function wait(ms) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, ms);
                })];
        });
    });
}
function fakeGetCameras(cameraAmount, cameraTypes, cameraLabels) {
    if (__1.CameraAccess.getCameras.restore != null) {
        __1.CameraAccess.getCameras.restore();
    }
    sinon.stub(__1.CameraAccess, "getCameras").resolves(
    // tslint:disable-next-line:prefer-array-literal
    Array.from(Array(cameraAmount), function (_, index) {
        var cameraType = cameraTypes == null || cameraTypes[index] == null ? __1.Camera.Type.BACK : cameraTypes[index];
        var label = cameraLabels == null || cameraLabels[index] == null
            ? "Fake Camera Device (" + cameraType + ")"
            : cameraLabels[index];
        return {
            deviceId: "unknown",
            groupId: "1",
            kind: "videoinput",
            label: label,
            cameraType: cameraType
        };
    }));
}
function fakeAccessCameraStream(facingMode, mediaTrackCapabilities) {
    if (__1.CameraAccess.accessCameraStream.restore != null) {
        __1.CameraAccess.accessCameraStream.restore();
    }
    sinon.stub(__1.CameraAccess, "accessCameraStream").callsFake(function () {
        var mediaStreamTrack = {
            stop: sinon.spy(),
            addEventListener: sinon.spy(),
            getSettings: function () {
                return {
                    width: 640,
                    height: 480,
                    deviceId: "1",
                    facingMode: facingMode
                };
            },
            label: ""
        };
        if (mediaTrackCapabilities != null) {
            mediaStreamTrack.getCapabilities = function () {
                return mediaTrackCapabilities;
            };
        }
        return Promise.resolve({
            getTracks: function () {
                return [mediaStreamTrack];
            },
            getVideoTracks: function () {
                return [mediaStreamTrack];
            }
        });
    });
}
function fakeAccessCameraStreamFailure(error) {
    if (__1.CameraAccess.accessCameraStream.restore != null) {
        __1.CameraAccess.accessCameraStream.restore();
    }
    sinon.stub(__1.CameraAccess, "accessCameraStream").rejects(error);
}
function fakeMediaStream(cameraManager, mediaTrackCapabilities) {
    var mediaStreamTrack = {
        constraints: {},
        stop: sinon.spy(),
        // tslint:disable-next-line:no-accessor-field-mismatch
        getConstraints: function () {
            return this.constraints;
        },
        applyConstraints: sinon.stub().callsFake(function (mediaTrackConstraints) {
            mediaStreamTrack.constraints = mediaTrackConstraints;
            return Promise.resolve();
        })
    };
    if (mediaTrackCapabilities != null) {
        mediaStreamTrack.getCapabilities = function () {
            return mediaTrackCapabilities;
        };
    }
    var mediaStream = {
        getVideoTracks: function () {
            return [mediaStreamTrack];
        }
    };
    cameraManager.mediaStream = mediaStream;
    cameraManager.storeStreamCapabilities();
    return mediaStream;
}
ava_1.default("isCameraSwitcherEnabled & setCameraSwitcherEnabled", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePickerGui, cameraManager;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                barcodePickerGui = sinon.createStubInstance(barcodePickerGui_1.BarcodePickerGui);
                cameraManager = new barcodePickerCameraManager_1.BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
                cameraManager.setInteractionOptions(false, false, false, false);
                t.false(cameraManager.isCameraSwitcherEnabled());
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
                fakeGetCameras(1);
                return [4 /*yield*/, cameraManager.setCameraSwitcherEnabled(true)];
            case 1:
                _a.sent();
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
                fakeGetCameras(2);
                return [4 /*yield*/, cameraManager.setCameraSwitcherEnabled(true)];
            case 2:
                _a.sent();
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 1);
                t.deepEqual(barcodePickerGui.setCameraSwitcherVisible.lastCall.args, [true]);
                t.true(cameraManager.isCameraSwitcherEnabled());
                return [4 /*yield*/, cameraManager.setCameraSwitcherEnabled(false)];
            case 3:
                _a.sent();
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 2);
                t.deepEqual(barcodePickerGui.setCameraSwitcherVisible.lastCall.args, [false]);
                t.false(cameraManager.isCameraSwitcherEnabled());
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("isTorchToggleEnabled & setTorchToggleEnabled", function (t) {
    var barcodePickerGui = sinon.createStubInstance(barcodePickerGui_1.BarcodePickerGui);
    var cameraManager = new barcodePickerCameraManager_1.BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
    cameraManager.setInteractionOptions(false, false, false, false);
    t.false(cameraManager.isTorchToggleEnabled());
    t.is(barcodePickerGui.setTorchTogglerVisible.callCount, 0);
    cameraManager.setTorchToggleEnabled(true);
    t.is(barcodePickerGui.setTorchTogglerVisible.callCount, 0);
    fakeMediaStream(cameraManager, {
        torch: true
    });
    cameraManager.setTorchToggleEnabled(true);
    t.is(barcodePickerGui.setTorchTogglerVisible.callCount, 1);
    t.deepEqual(barcodePickerGui.setTorchTogglerVisible.lastCall.args, [true]);
    t.true(cameraManager.isTorchToggleEnabled());
    cameraManager.setTorchToggleEnabled(false);
    t.is(barcodePickerGui.setTorchTogglerVisible.callCount, 2);
    t.deepEqual(barcodePickerGui.setTorchTogglerVisible.lastCall.args, [false]);
    t.false(cameraManager.isTorchToggleEnabled());
});
ava_1.default("isTapToFocusEnabled & setTapToFocusEnabled & isPinchToZoomEnabled & setPinchToZoomEnabled", function (t) {
    var barcodePickerGui = sinon.createStubInstance(barcodePickerGui_1.BarcodePickerGui);
    var videoElementAddEventListener = sinon.spy();
    var videoElementRemoveEventListener = sinon.spy();
    barcodePickerGui.videoElement = {
        addEventListener: videoElementAddEventListener,
        removeEventListener: videoElementRemoveEventListener
    };
    var cameraManager = new barcodePickerCameraManager_1.BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
    cameraManager.setInteractionOptions(false, false, false, false);
    t.false(cameraManager.isTapToFocusEnabled());
    t.false(cameraManager.isPinchToZoomEnabled());
    t.is(videoElementAddEventListener.callCount, 0);
    cameraManager.setTapToFocusEnabled(true);
    cameraManager.setPinchToZoomEnabled(true);
    t.is(videoElementAddEventListener.callCount, 0);
    fakeMediaStream(cameraManager);
    cameraManager.setTapToFocusEnabled(true);
    t.is(videoElementAddEventListener.callCount, 2);
    t.true(videoElementAddEventListener.calledWith("mousedown"));
    t.true(videoElementAddEventListener.calledWith("touchend"));
    cameraManager.setPinchToZoomEnabled(true);
    t.is(videoElementAddEventListener.callCount, 4);
    t.true(videoElementAddEventListener.calledWith("touchstart"));
    t.true(videoElementAddEventListener.calledWith("touchmove"));
    t.true(cameraManager.isTapToFocusEnabled());
    t.true(cameraManager.isPinchToZoomEnabled());
    t.is(videoElementRemoveEventListener.callCount, 0);
    cameraManager.setTapToFocusEnabled(false);
    t.is(videoElementRemoveEventListener.callCount, 2);
    t.true(videoElementRemoveEventListener.calledWith("mousedown"));
    t.true(videoElementRemoveEventListener.calledWith("touchend"));
    cameraManager.setPinchToZoomEnabled(false);
    t.is(videoElementRemoveEventListener.callCount, 4);
    t.true(videoElementRemoveEventListener.calledWith("touchstart"));
    t.true(videoElementRemoveEventListener.calledWith("touchmove"));
    t.false(cameraManager.isTapToFocusEnabled());
    t.false(cameraManager.isPinchToZoomEnabled());
});
ava_1.default("setTorchEnabled & toggleTorch", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePickerGui, cameraManager, mediaTrackCapabilities, applyConstraintsStub;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                barcodePickerGui = sinon.createStubInstance(barcodePickerGui_1.BarcodePickerGui);
                cameraManager = new barcodePickerCameraManager_1.BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
                return [4 /*yield*/, cameraManager.setTorchEnabled(true)];
            case 1:
                _a.sent();
                mediaTrackCapabilities = {
                    torch: true
                };
                applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
                t.true(applyConstraintsStub.notCalled);
                return [4 /*yield*/, cameraManager.setTorchEnabled(true)];
            case 2:
                _a.sent();
                t.true(applyConstraintsStub.calledOnce);
                t.true(applyConstraintsStub.calledWith({ advanced: [{ torch: true }] }));
                return [4 /*yield*/, cameraManager.setTorchEnabled(false)];
            case 3:
                _a.sent();
                t.true(applyConstraintsStub.calledTwice);
                t.true(applyConstraintsStub.calledWith({ advanced: [{ torch: false }] }));
                applyConstraintsStub.resetHistory();
                return [4 /*yield*/, cameraManager.toggleTorch()];
            case 4:
                _a.sent();
                t.true(applyConstraintsStub.calledOnce);
                t.true(applyConstraintsStub.calledWith({ advanced: [{ torch: true }] }));
                return [4 /*yield*/, cameraManager.toggleTorch()];
            case 5:
                _a.sent();
                t.true(applyConstraintsStub.calledTwice);
                t.true(applyConstraintsStub.calledWith({ advanced: [{ torch: false }] }));
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("setZoom", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePickerGui, cameraManager, mediaTrackCapabilities, applyConstraintsStub;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                barcodePickerGui = sinon.createStubInstance(barcodePickerGui_1.BarcodePickerGui);
                cameraManager = new barcodePickerCameraManager_1.BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
                return [4 /*yield*/, cameraManager.setZoom(2)];
            case 1:
                _a.sent();
                mediaTrackCapabilities = {
                    zoom: {
                        max: 9,
                        min: 1,
                        step: 0.1
                    }
                };
                applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
                t.true(applyConstraintsStub.notCalled);
                return [4 /*yield*/, cameraManager.setZoom(0)];
            case 2:
                _a.sent();
                t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 1 }] }]);
                return [4 /*yield*/, cameraManager.setZoom(1)];
            case 3:
                _a.sent();
                t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 9 }] }]);
                return [4 /*yield*/, cameraManager.setZoom(0.5)];
            case 4:
                _a.sent();
                t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 5 }] }]);
                return [4 /*yield*/, cameraManager.setZoom(10)];
            case 5:
                _a.sent();
                t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 9 }] }]);
                return [4 /*yield*/, cameraManager.setZoom(0.25, 5)];
            case 6:
                _a.sent();
                t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 7 }] }]);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default("triggerZoomStart & triggerZoomMove", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePickerGui, cameraManager, touchStartEvent, touchStart0xEvent, touchStart25xEvent, touchStart50xEvent, mediaTrackCapabilities, applyConstraintsStub;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                barcodePickerGui = sinon.createStubInstance(barcodePickerGui_1.BarcodePickerGui);
                cameraManager = new barcodePickerCameraManager_1.BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
                touchStartEvent = {
                    preventDefault: sinon.spy(),
                    type: "touchstart"
                };
                touchStart0xEvent = tslib_1.__assign({}, touchStartEvent, { touches: [
                        {
                            screenX: 0,
                            screenY: 0
                        },
                        {
                            screenX: 0,
                            screenY: 0
                        }
                    ] });
                touchStart25xEvent = tslib_1.__assign({}, touchStartEvent, { touches: [
                        {
                            screenX: 0,
                            screenY: 0
                        },
                        {
                            screenX: 25,
                            screenY: 0
                        }
                    ] });
                touchStart50xEvent = tslib_1.__assign({}, touchStartEvent, { touches: [
                        {
                            screenX: 0,
                            screenY: 0
                        },
                        {
                            screenX: 50,
                            screenY: 0
                        }
                    ] });
                cameraManager.triggerZoomStart(tslib_1.__assign({}, touchStartEvent, { touches: [1] }));
                cameraManager.triggerZoomMove(tslib_1.__assign({}, touchStartEvent, { touches: [1] }));
                cameraManager.triggerZoomStart(touchStart25xEvent);
                mediaTrackCapabilities = {
                    torch: true,
                    zoom: {
                        max: 9,
                        min: 1,
                        step: 0.1
                    }
                };
                applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
                t.true(applyConstraintsStub.notCalled);
                cameraManager.triggerZoomStart(touchStart0xEvent);
                return [4 /*yield*/, cameraManager.setTorchEnabled(true)];
            case 1:
                _a.sent();
                cameraManager.triggerZoomStart(touchStart0xEvent);
                cameraManager.triggerZoomMove(touchStart0xEvent);
                t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 1 }] }]);
                cameraManager.triggerZoomMove(touchStart25xEvent);
                t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 5 }] }]);
                cameraManager.triggerZoomMove(touchStart50xEvent);
                t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 9 }] }]);
                cameraManager.triggerZoomStart(touchStart25xEvent);
                cameraManager.triggerZoomMove(touchStart0xEvent);
                t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 5 }] }]);
                return [2 /*return*/];
        }
    });
}); });
// tslint:disable-next-line:max-func-body-length
ava_1.default("manual / auto focus", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePickerGui, cameraManager, mediaTrackCapabilities, applyConstraintsStub;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                barcodePickerGui = sinon.createStubInstance(barcodePickerGui_1.BarcodePickerGui);
                cameraManager = new barcodePickerCameraManager_1.BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
                cameraManager.triggerManualFocus({
                    preventDefault: sinon.spy(),
                    type: "touchend",
                    touches: [1, 2]
                });
                cameraManager.pinchToZoomDistance = 1;
                cameraManager.triggerManualFocus({
                    preventDefault: sinon.spy(),
                    type: "mousedown"
                });
                cameraManager.triggerManualFocus({
                    preventDefault: sinon.spy(),
                    type: "touchend",
                    touches: []
                });
                mediaTrackCapabilities = {};
                applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
                t.true(applyConstraintsStub.notCalled);
                cameraManager.triggerManualFocus();
                t.true(applyConstraintsStub.notCalled);
                mediaTrackCapabilities = {
                    focusMode: [barcodePickerCameraManager_1.MeteringMode.SINGLE_SHOT, barcodePickerCameraManager_1.MeteringMode.CONTINUOUS] // this is a weird mix
                };
                applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
                t.true(applyConstraintsStub.notCalled);
                cameraManager.triggerManualFocus();
                t.true(applyConstraintsStub.notCalled);
                // Trigger manual focus when single-shot only is supported
                mediaTrackCapabilities = {
                    focusMode: [barcodePickerCameraManager_1.MeteringMode.SINGLE_SHOT]
                };
                applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
                t.true(applyConstraintsStub.notCalled);
                cameraManager.triggerManualFocus();
                t.true(applyConstraintsStub.calledOnce);
                t.true(applyConstraintsStub.calledWith({ advanced: [{ focusMode: barcodePickerCameraManager_1.MeteringMode.SINGLE_SHOT }] }));
                // Enable background single-shot autofocus
                applyConstraintsStub.resetHistory();
                cameraManager.storeStreamCapabilities();
                cameraManager.setupAutofocus();
                return [4 /*yield*/, wait(barcodePickerCameraManager_1.BarcodePickerCameraManager.autofocusIntervalMs * 4)];
            case 1:
                _a.sent();
                t.true(applyConstraintsStub.callCount >= 2);
                t.true(applyConstraintsStub.alwaysCalledWith({ advanced: [{ focusMode: barcodePickerCameraManager_1.MeteringMode.SINGLE_SHOT }] }));
                // Trigger manual focus when single-shot only is supported (while background single-shot autofocus is active)
                cameraManager.triggerManualFocus();
                applyConstraintsStub.resetHistory();
                // Background single-shot autofocus should be disabled for a while
                return [4 /*yield*/, wait(barcodePickerCameraManager_1.BarcodePickerCameraManager.autofocusIntervalMs * 2)];
            case 2:
                // Background single-shot autofocus should be disabled for a while
                _a.sent();
                t.true(applyConstraintsStub.notCalled);
                return [4 /*yield*/, wait(barcodePickerCameraManager_1.BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs * 2)];
            case 3:
                _a.sent();
                // Background single-shot autofocus should be enabled now
                t.true(applyConstraintsStub.called);
                t.true(applyConstraintsStub.alwaysCalledWith({ advanced: [{ focusMode: barcodePickerCameraManager_1.MeteringMode.SINGLE_SHOT }] }));
                cameraManager.stopStream();
                // Trigger manual focus when all focus modes are supported
                mediaTrackCapabilities = {
                    focusMode: [barcodePickerCameraManager_1.MeteringMode.SINGLE_SHOT, barcodePickerCameraManager_1.MeteringMode.CONTINUOUS, barcodePickerCameraManager_1.MeteringMode.MANUAL]
                };
                applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
                cameraManager.triggerManualFocus();
                t.true(applyConstraintsStub.calledOnce);
                t.true(applyConstraintsStub.calledWith({ advanced: [{ focusMode: barcodePickerCameraManager_1.MeteringMode.CONTINUOUS }] }));
                applyConstraintsStub.resetHistory();
                return [4 /*yield*/, wait(barcodePickerCameraManager_1.BarcodePickerCameraManager.manualFocusWaitTimeoutMs * 2)];
            case 4:
                _a.sent();
                t.true(applyConstraintsStub.calledOnce);
                t.true(applyConstraintsStub.calledWith({ advanced: [{ focusMode: barcodePickerCameraManager_1.MeteringMode.MANUAL }] }));
                applyConstraintsStub.resetHistory();
                return [4 /*yield*/, wait(barcodePickerCameraManager_1.BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs * 2)];
            case 5:
                _a.sent();
                t.true(applyConstraintsStub.calledOnce);
                t.true(applyConstraintsStub.calledWith({ advanced: [{ focusMode: barcodePickerCameraManager_1.MeteringMode.CONTINUOUS }] }));
                return [2 /*return*/];
        }
    });
}); });
// tslint:disable-next-line:max-func-body-length
ava_1.default.serial("setupCameras", function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var barcodePickerGui, videoElementRemoveEventListener, cameraManager, error, mediaTrackCapabilities;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                barcodePickerGui = sinon.createStubInstance(barcodePickerGui_1.BarcodePickerGui);
                videoElementRemoveEventListener = sinon.spy();
                barcodePickerGui.videoElement = {
                    loadedmetadataEventListener: null,
                    addEventListener: function (eventType, listener) {
                        if (eventType === "loadedmetadata") {
                            this.loadedmetadataEventListener = listener;
                        }
                    },
                    removeEventListener: videoElementRemoveEventListener,
                    dispatchEvent: sinon.spy()
                };
                barcodePickerGui.videoElement.load = function () {
                    var _this = this;
                    this.loadedmetadataEventListener();
                    this.videoWidth = 640;
                    this.videoHeight = 480;
                    this.currentTime = 0;
                    this.onloadeddata();
                    setTimeout(function () {
                        _this.currentTime = 1;
                    }, barcodePickerCameraManager_1.BarcodePickerCameraManager.cameraMetadataCheckIntervalMs * 2);
                };
                cameraManager = new barcodePickerCameraManager_1.BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
                cameraManager.setInteractionOptions(true, true, true, true);
                t.true(cameraManager.isCameraSwitcherEnabled());
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
                // Intentionally make optimistic initial back camera access fail
                fakeAccessCameraStream("user");
                fakeGetCameras(2, [__1.Camera.Type.FRONT, __1.Camera.Type.FRONT]);
                return [4 /*yield*/, cameraManager.setupCameras()];
            case 1:
                _a.sent();
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 1);
                barcodePickerGui.setCameraSwitcherVisible.resetHistory();
                t.is(__1.CameraAccess.accessCameraStream.callCount, 2);
                t.is(__1.CameraAccess.getCameras.callCount, 1);
                cameraManager.selectedCamera = undefined;
                fakeAccessCameraStream("user");
                fakeGetCameras(2, [__1.Camera.Type.BACK, __1.Camera.Type.FRONT]);
                return [4 /*yield*/, cameraManager.setupCameras()];
            case 2:
                _a.sent();
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 1);
                barcodePickerGui.setCameraSwitcherVisible.resetHistory();
                t.is(__1.CameraAccess.accessCameraStream.callCount, 2);
                t.is(__1.CameraAccess.getCameras.callCount, 1);
                cameraManager.selectedCamera = undefined;
                fakeAccessCameraStream("user");
                fakeGetCameras(0);
                return [4 /*yield*/, t.throwsAsync(cameraManager.setupCameras())];
            case 3:
                error = _a.sent();
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
                t.is(error.message, "No camera available");
                // Access primary back camera in common triple camera setups
                cameraManager.selectedCamera = undefined;
                fakeAccessCameraStream("user");
                fakeGetCameras(3, [__1.Camera.Type.FRONT, __1.Camera.Type.BACK, __1.Camera.Type.BACK], ["", "camera2 2, facing back", "camera2 0, facing back"]);
                return [4 /*yield*/, cameraManager.setupCameras()];
            case 4:
                _a.sent();
                t.not(cameraManager.selectedCamera, null);
                t.is(cameraManager.selectedCamera.label, "camera2 0, facing back");
                mediaTrackCapabilities = {
                    torch: true
                };
                cameraManager.selectedCamera = undefined;
                fakeAccessCameraStream("environment", mediaTrackCapabilities);
                fakeGetCameras(1);
                barcodePickerGui.setCameraSwitcherVisible.resetHistory();
                return [4 /*yield*/, cameraManager.setupCameras()];
            case 5:
                _a.sent();
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
                t.is(__1.CameraAccess.accessCameraStream.callCount, 2);
                t.is(__1.CameraAccess.getCameras.callCount, 1);
                return [4 /*yield*/, wait(barcodePickerCameraManager_1.BarcodePickerCameraManager.getCapabilitiesTimeoutMs * 2)];
            case 6:
                _a.sent();
                t.deepEqual(cameraManager.mediaTrackCapabilities, mediaTrackCapabilities);
                mediaTrackCapabilities = {
                    torch: false,
                    focusMode: [barcodePickerCameraManager_1.MeteringMode.SINGLE_SHOT]
                };
                cameraManager.selectedCamera = undefined;
                fakeAccessCameraStream("environment", mediaTrackCapabilities);
                fakeGetCameras(2);
                return [4 /*yield*/, cameraManager.setupCameras()];
            case 7:
                _a.sent();
                t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 1);
                t.is(__1.CameraAccess.accessCameraStream.callCount, 2);
                t.is(__1.CameraAccess.getCameras.callCount, 1);
                return [4 /*yield*/, wait(barcodePickerCameraManager_1.BarcodePickerCameraManager.getCapabilitiesTimeoutMs * 2)];
            case 8:
                _a.sent();
                t.deepEqual(cameraManager.mediaTrackCapabilities, mediaTrackCapabilities);
                barcodePickerGui.videoElement.load = function () {
                    this.loadedmetadataEventListener();
                    this.videoWidth = 640;
                    this.videoHeight = 480;
                    this.currentTime = 0;
                    this.onloadeddata();
                    // Intentionally never have valid metadata
                };
                return [4 /*yield*/, t.throwsAsync(cameraManager.setupCameras())];
            case 9:
                error = _a.sent();
                t.is(error.message, "Could not initialize camera correctly");
                barcodePickerGui.videoElement.load = function () {
                    this.loadedmetadataEventListener();
                    // Intentionally never call onloadeddata()
                };
                return [4 /*yield*/, t.throwsAsync(cameraManager.setupCameras())];
            case 10:
                error = _a.sent();
                t.is(error.message, "Could not initialize camera correctly");
                fakeAccessCameraStreamFailure(new Error("Test error 1"));
                fakeGetCameras(1);
                cameraManager.selectedCamera = undefined;
                return [4 /*yield*/, t.throwsAsync(cameraManager.setupCameras())];
            case 11:
                error = _a.sent();
                t.is(error.message, "Test error 1");
                t.true(__1.CameraAccess.accessCameraStream
                    .getCall(0)
                    .calledBefore(__1.CameraAccess.getCameras.firstCall));
                t.true(__1.CameraAccess.accessCameraStream
                    .getCall(4)
                    .calledAfter(__1.CameraAccess.getCameras.firstCall));
                t.is(__1.CameraAccess.accessCameraStream.callCount, 8); // 2 times 4 calls (resolution fallbacks)
                t.is(__1.CameraAccess.getCameras.callCount, 1);
                fakeAccessCameraStreamFailure(new Error("Test error 2"));
                fakeGetCameras(1);
                return [4 /*yield*/, t.throwsAsync(cameraManager.setupCameras())];
            case 12:
                error = _a.sent();
                t.is(error.message, "Test error 2");
                t.true(__1.CameraAccess.accessCameraStream
                    .getCall(0)
                    .calledAfter(__1.CameraAccess.getCameras.firstCall));
                t.is(__1.CameraAccess.accessCameraStream.callCount, 4); // 1 time 4 calls (resolution fallbacks)
                t.is(__1.CameraAccess.getCameras.callCount, 1);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=barcodePickerCameraManager.spec.js.map