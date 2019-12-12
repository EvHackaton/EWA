/* tslint:disable:no-implicit-dependencies no-any */
/**
 * BarcodePickerCameraManager tests
 */
import test from "ava";
import * as sinon from "sinon";
import { Camera, CameraAccess } from "..";
import { BarcodePickerCameraManager, MeteringMode } from "./barcodePickerCameraManager";
import { BarcodePickerGui } from "./barcodePickerGui";
Object.defineProperty(screen, "width", {
    writable: true
});
Object.defineProperty(screen, "height", {
    writable: true
});
screen.width = 100;
screen.height = 100;
const triggerFatalErrorSpy = sinon.spy();
// Speed up times
BarcodePickerCameraManager.cameraAccessTimeoutMs /= 10;
BarcodePickerCameraManager.cameraMetadataCheckTimeoutMs /= 10;
BarcodePickerCameraManager.cameraMetadataCheckIntervalMs /= 10;
BarcodePickerCameraManager.getCapabilitiesTimeoutMs /= 10;
BarcodePickerCameraManager.autofocusIntervalMs /= 10;
BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs /= 10;
BarcodePickerCameraManager.manualFocusWaitTimeoutMs /= 10;
async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
function fakeGetCameras(cameraAmount, cameraTypes, cameraLabels) {
    if (CameraAccess.getCameras.restore != null) {
        CameraAccess.getCameras.restore();
    }
    sinon.stub(CameraAccess, "getCameras").resolves(
    // tslint:disable-next-line:prefer-array-literal
    Array.from(Array(cameraAmount), (_, index) => {
        const cameraType = cameraTypes == null || cameraTypes[index] == null ? Camera.Type.BACK : cameraTypes[index];
        const label = cameraLabels == null || cameraLabels[index] == null
            ? `Fake Camera Device (${cameraType})`
            : cameraLabels[index];
        return {
            deviceId: "unknown",
            groupId: "1",
            kind: "videoinput",
            label,
            cameraType
        };
    }));
}
function fakeAccessCameraStream(facingMode, mediaTrackCapabilities) {
    if (CameraAccess.accessCameraStream.restore != null) {
        CameraAccess.accessCameraStream.restore();
    }
    sinon.stub(CameraAccess, "accessCameraStream").callsFake(() => {
        const mediaStreamTrack = {
            stop: sinon.spy(),
            addEventListener: sinon.spy(),
            getSettings: () => {
                return {
                    width: 640,
                    height: 480,
                    deviceId: "1",
                    facingMode
                };
            },
            label: ""
        };
        if (mediaTrackCapabilities != null) {
            mediaStreamTrack.getCapabilities = () => {
                return mediaTrackCapabilities;
            };
        }
        return Promise.resolve({
            getTracks: () => {
                return [mediaStreamTrack];
            },
            getVideoTracks: () => {
                return [mediaStreamTrack];
            }
        });
    });
}
function fakeAccessCameraStreamFailure(error) {
    if (CameraAccess.accessCameraStream.restore != null) {
        CameraAccess.accessCameraStream.restore();
    }
    sinon.stub(CameraAccess, "accessCameraStream").rejects(error);
}
function fakeMediaStream(cameraManager, mediaTrackCapabilities) {
    const mediaStreamTrack = {
        constraints: {},
        stop: sinon.spy(),
        // tslint:disable-next-line:no-accessor-field-mismatch
        getConstraints() {
            return this.constraints;
        },
        applyConstraints: sinon.stub().callsFake((mediaTrackConstraints) => {
            mediaStreamTrack.constraints = mediaTrackConstraints;
            return Promise.resolve();
        })
    };
    if (mediaTrackCapabilities != null) {
        mediaStreamTrack.getCapabilities = () => {
            return mediaTrackCapabilities;
        };
    }
    const mediaStream = {
        getVideoTracks: () => {
            return [mediaStreamTrack];
        }
    };
    cameraManager.mediaStream = mediaStream;
    cameraManager.storeStreamCapabilities();
    return mediaStream;
}
test("isCameraSwitcherEnabled & setCameraSwitcherEnabled", async (t) => {
    const barcodePickerGui = sinon.createStubInstance(BarcodePickerGui);
    const cameraManager = new BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
    cameraManager.setInteractionOptions(false, false, false, false);
    t.false(cameraManager.isCameraSwitcherEnabled());
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
    fakeGetCameras(1);
    await cameraManager.setCameraSwitcherEnabled(true);
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
    fakeGetCameras(2);
    await cameraManager.setCameraSwitcherEnabled(true);
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 1);
    t.deepEqual(barcodePickerGui.setCameraSwitcherVisible.lastCall.args, [true]);
    t.true(cameraManager.isCameraSwitcherEnabled());
    await cameraManager.setCameraSwitcherEnabled(false);
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 2);
    t.deepEqual(barcodePickerGui.setCameraSwitcherVisible.lastCall.args, [false]);
    t.false(cameraManager.isCameraSwitcherEnabled());
});
test("isTorchToggleEnabled & setTorchToggleEnabled", t => {
    const barcodePickerGui = sinon.createStubInstance(BarcodePickerGui);
    const cameraManager = new BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
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
test("isTapToFocusEnabled & setTapToFocusEnabled & isPinchToZoomEnabled & setPinchToZoomEnabled", t => {
    const barcodePickerGui = sinon.createStubInstance(BarcodePickerGui);
    const videoElementAddEventListener = sinon.spy();
    const videoElementRemoveEventListener = sinon.spy();
    barcodePickerGui.videoElement = {
        addEventListener: videoElementAddEventListener,
        removeEventListener: videoElementRemoveEventListener
    };
    const cameraManager = new BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
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
test("setTorchEnabled & toggleTorch", async (t) => {
    const barcodePickerGui = sinon.createStubInstance(BarcodePickerGui);
    const cameraManager = new BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
    await cameraManager.setTorchEnabled(true);
    const mediaTrackCapabilities = {
        torch: true
    };
    const applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
    t.true(applyConstraintsStub.notCalled);
    await cameraManager.setTorchEnabled(true);
    t.true(applyConstraintsStub.calledOnce);
    t.true(applyConstraintsStub.calledWith({ advanced: [{ torch: true }] }));
    await cameraManager.setTorchEnabled(false);
    t.true(applyConstraintsStub.calledTwice);
    t.true(applyConstraintsStub.calledWith({ advanced: [{ torch: false }] }));
    applyConstraintsStub.resetHistory();
    await cameraManager.toggleTorch();
    t.true(applyConstraintsStub.calledOnce);
    t.true(applyConstraintsStub.calledWith({ advanced: [{ torch: true }] }));
    await cameraManager.toggleTorch();
    t.true(applyConstraintsStub.calledTwice);
    t.true(applyConstraintsStub.calledWith({ advanced: [{ torch: false }] }));
});
test("setZoom", async (t) => {
    const barcodePickerGui = sinon.createStubInstance(BarcodePickerGui);
    const cameraManager = new BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
    await cameraManager.setZoom(2);
    const mediaTrackCapabilities = {
        zoom: {
            max: 9,
            min: 1,
            step: 0.1
        }
    };
    const applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
    t.true(applyConstraintsStub.notCalled);
    await cameraManager.setZoom(0);
    t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 1 }] }]);
    await cameraManager.setZoom(1);
    t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 9 }] }]);
    await cameraManager.setZoom(0.5);
    t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 5 }] }]);
    await cameraManager.setZoom(10);
    t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 9 }] }]);
    await cameraManager.setZoom(0.25, 5);
    t.deepEqual(applyConstraintsStub.lastCall.args, [{ advanced: [{ zoom: 7 }] }]);
});
test("triggerZoomStart & triggerZoomMove", async (t) => {
    const barcodePickerGui = sinon.createStubInstance(BarcodePickerGui);
    const cameraManager = new BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
    const touchStartEvent = {
        preventDefault: sinon.spy(),
        type: "touchstart"
    };
    const touchStart0xEvent = {
        ...touchStartEvent,
        touches: [
            {
                screenX: 0,
                screenY: 0
            },
            {
                screenX: 0,
                screenY: 0
            }
        ]
    };
    const touchStart25xEvent = {
        ...touchStartEvent,
        touches: [
            {
                screenX: 0,
                screenY: 0
            },
            {
                screenX: 25,
                screenY: 0
            }
        ]
    };
    const touchStart50xEvent = {
        ...touchStartEvent,
        touches: [
            {
                screenX: 0,
                screenY: 0
            },
            {
                screenX: 50,
                screenY: 0
            }
        ]
    };
    cameraManager.triggerZoomStart({
        ...touchStartEvent,
        touches: [1]
    });
    cameraManager.triggerZoomMove({
        ...touchStartEvent,
        touches: [1]
    });
    cameraManager.triggerZoomStart(touchStart25xEvent);
    const mediaTrackCapabilities = {
        torch: true,
        zoom: {
            max: 9,
            min: 1,
            step: 0.1
        }
    };
    const applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
    t.true(applyConstraintsStub.notCalled);
    cameraManager.triggerZoomStart(touchStart0xEvent);
    await cameraManager.setTorchEnabled(true);
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
});
// tslint:disable-next-line:max-func-body-length
test("manual / auto focus", async (t) => {
    const barcodePickerGui = sinon.createStubInstance(BarcodePickerGui);
    const cameraManager = new BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
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
    // Trigger manual focus when not supported
    let mediaTrackCapabilities = {};
    let applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
    t.true(applyConstraintsStub.notCalled);
    cameraManager.triggerManualFocus();
    t.true(applyConstraintsStub.notCalled);
    mediaTrackCapabilities = {
        focusMode: [MeteringMode.SINGLE_SHOT, MeteringMode.CONTINUOUS] // this is a weird mix
    };
    applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
    t.true(applyConstraintsStub.notCalled);
    cameraManager.triggerManualFocus();
    t.true(applyConstraintsStub.notCalled);
    // Trigger manual focus when single-shot only is supported
    mediaTrackCapabilities = {
        focusMode: [MeteringMode.SINGLE_SHOT]
    };
    applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
    t.true(applyConstraintsStub.notCalled);
    cameraManager.triggerManualFocus();
    t.true(applyConstraintsStub.calledOnce);
    t.true(applyConstraintsStub.calledWith({ advanced: [{ focusMode: MeteringMode.SINGLE_SHOT }] }));
    // Enable background single-shot autofocus
    applyConstraintsStub.resetHistory();
    cameraManager.storeStreamCapabilities();
    cameraManager.setupAutofocus();
    await wait(BarcodePickerCameraManager.autofocusIntervalMs * 4);
    t.true(applyConstraintsStub.callCount >= 2);
    t.true(applyConstraintsStub.alwaysCalledWith({ advanced: [{ focusMode: MeteringMode.SINGLE_SHOT }] }));
    // Trigger manual focus when single-shot only is supported (while background single-shot autofocus is active)
    cameraManager.triggerManualFocus();
    applyConstraintsStub.resetHistory();
    // Background single-shot autofocus should be disabled for a while
    await wait(BarcodePickerCameraManager.autofocusIntervalMs * 2);
    t.true(applyConstraintsStub.notCalled);
    await wait(BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs * 2);
    // Background single-shot autofocus should be enabled now
    t.true(applyConstraintsStub.called);
    t.true(applyConstraintsStub.alwaysCalledWith({ advanced: [{ focusMode: MeteringMode.SINGLE_SHOT }] }));
    cameraManager.stopStream();
    // Trigger manual focus when all focus modes are supported
    mediaTrackCapabilities = {
        focusMode: [MeteringMode.SINGLE_SHOT, MeteringMode.CONTINUOUS, MeteringMode.MANUAL]
    };
    applyConstraintsStub = (fakeMediaStream(cameraManager, mediaTrackCapabilities).getVideoTracks()[0].applyConstraints);
    cameraManager.triggerManualFocus();
    t.true(applyConstraintsStub.calledOnce);
    t.true(applyConstraintsStub.calledWith({ advanced: [{ focusMode: MeteringMode.CONTINUOUS }] }));
    applyConstraintsStub.resetHistory();
    await wait(BarcodePickerCameraManager.manualFocusWaitTimeoutMs * 2);
    t.true(applyConstraintsStub.calledOnce);
    t.true(applyConstraintsStub.calledWith({ advanced: [{ focusMode: MeteringMode.MANUAL }] }));
    applyConstraintsStub.resetHistory();
    await wait(BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs * 2);
    t.true(applyConstraintsStub.calledOnce);
    t.true(applyConstraintsStub.calledWith({ advanced: [{ focusMode: MeteringMode.CONTINUOUS }] }));
});
// tslint:disable-next-line:max-func-body-length
test.serial("setupCameras", async (t) => {
    const barcodePickerGui = sinon.createStubInstance(BarcodePickerGui);
    const videoElementRemoveEventListener = sinon.spy();
    barcodePickerGui.videoElement = {
        loadedmetadataEventListener: null,
        addEventListener(eventType, listener) {
            if (eventType === "loadedmetadata") {
                this.loadedmetadataEventListener = listener;
            }
        },
        removeEventListener: videoElementRemoveEventListener,
        dispatchEvent: sinon.spy()
    };
    barcodePickerGui.videoElement.load = function () {
        this.loadedmetadataEventListener();
        this.videoWidth = 640;
        this.videoHeight = 480;
        this.currentTime = 0;
        this.onloadeddata();
        setTimeout(() => {
            this.currentTime = 1;
        }, BarcodePickerCameraManager.cameraMetadataCheckIntervalMs * 2);
    };
    const cameraManager = new BarcodePickerCameraManager(triggerFatalErrorSpy, barcodePickerGui);
    cameraManager.setInteractionOptions(true, true, true, true);
    t.true(cameraManager.isCameraSwitcherEnabled());
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
    // Intentionally make optimistic initial back camera access fail
    fakeAccessCameraStream("user");
    fakeGetCameras(2, [Camera.Type.FRONT, Camera.Type.FRONT]);
    await cameraManager.setupCameras();
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 1);
    barcodePickerGui.setCameraSwitcherVisible.resetHistory();
    t.is(CameraAccess.accessCameraStream.callCount, 2);
    t.is(CameraAccess.getCameras.callCount, 1);
    cameraManager.selectedCamera = undefined;
    fakeAccessCameraStream("user");
    fakeGetCameras(2, [Camera.Type.BACK, Camera.Type.FRONT]);
    await cameraManager.setupCameras();
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 1);
    barcodePickerGui.setCameraSwitcherVisible.resetHistory();
    t.is(CameraAccess.accessCameraStream.callCount, 2);
    t.is(CameraAccess.getCameras.callCount, 1);
    cameraManager.selectedCamera = undefined;
    fakeAccessCameraStream("user");
    fakeGetCameras(0);
    let error = await t.throwsAsync(cameraManager.setupCameras());
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
    t.is(error.message, "No camera available");
    // Access primary back camera in common triple camera setups
    cameraManager.selectedCamera = undefined;
    fakeAccessCameraStream("user");
    fakeGetCameras(3, [Camera.Type.FRONT, Camera.Type.BACK, Camera.Type.BACK], ["", "camera2 2, facing back", "camera2 0, facing back"]);
    await cameraManager.setupCameras();
    t.not(cameraManager.selectedCamera, null);
    t.is(cameraManager.selectedCamera.label, "camera2 0, facing back");
    let mediaTrackCapabilities = {
        torch: true
    };
    cameraManager.selectedCamera = undefined;
    fakeAccessCameraStream("environment", mediaTrackCapabilities);
    fakeGetCameras(1);
    barcodePickerGui.setCameraSwitcherVisible.resetHistory();
    await cameraManager.setupCameras();
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 0);
    t.is(CameraAccess.accessCameraStream.callCount, 2);
    t.is(CameraAccess.getCameras.callCount, 1);
    await wait(BarcodePickerCameraManager.getCapabilitiesTimeoutMs * 2);
    t.deepEqual(cameraManager.mediaTrackCapabilities, mediaTrackCapabilities);
    mediaTrackCapabilities = {
        torch: false,
        focusMode: [MeteringMode.SINGLE_SHOT]
    };
    cameraManager.selectedCamera = undefined;
    fakeAccessCameraStream("environment", mediaTrackCapabilities);
    fakeGetCameras(2);
    await cameraManager.setupCameras();
    t.is(barcodePickerGui.setCameraSwitcherVisible.callCount, 1);
    t.is(CameraAccess.accessCameraStream.callCount, 2);
    t.is(CameraAccess.getCameras.callCount, 1);
    await wait(BarcodePickerCameraManager.getCapabilitiesTimeoutMs * 2);
    t.deepEqual(cameraManager.mediaTrackCapabilities, mediaTrackCapabilities);
    barcodePickerGui.videoElement.load = function () {
        this.loadedmetadataEventListener();
        this.videoWidth = 640;
        this.videoHeight = 480;
        this.currentTime = 0;
        this.onloadeddata();
        // Intentionally never have valid metadata
    };
    error = await t.throwsAsync(cameraManager.setupCameras());
    t.is(error.message, "Could not initialize camera correctly");
    barcodePickerGui.videoElement.load = function () {
        this.loadedmetadataEventListener();
        // Intentionally never call onloadeddata()
    };
    error = await t.throwsAsync(cameraManager.setupCameras());
    t.is(error.message, "Could not initialize camera correctly");
    fakeAccessCameraStreamFailure(new Error("Test error 1"));
    fakeGetCameras(1);
    cameraManager.selectedCamera = undefined;
    error = await t.throwsAsync(cameraManager.setupCameras());
    t.is(error.message, "Test error 1");
    t.true(CameraAccess.accessCameraStream
        .getCall(0)
        .calledBefore(CameraAccess.getCameras.firstCall));
    t.true(CameraAccess.accessCameraStream
        .getCall(4)
        .calledAfter(CameraAccess.getCameras.firstCall));
    t.is(CameraAccess.accessCameraStream.callCount, 8); // 2 times 4 calls (resolution fallbacks)
    t.is(CameraAccess.getCameras.callCount, 1);
    fakeAccessCameraStreamFailure(new Error("Test error 2"));
    fakeGetCameras(1);
    error = await t.throwsAsync(cameraManager.setupCameras());
    t.is(error.message, "Test error 2");
    t.true(CameraAccess.accessCameraStream
        .getCall(0)
        .calledAfter(CameraAccess.getCameras.firstCall));
    t.is(CameraAccess.accessCameraStream.callCount, 4); // 1 time 4 calls (resolution fallbacks)
    t.is(CameraAccess.getCameras.callCount, 1);
});
//# sourceMappingURL=barcodePickerCameraManager.spec.js.map