/* tslint:disable:no-implicit-dependencies no-any */
/**
 * BarcodePicker tests
 */
import test from "ava";
import * as sinon from "sinon";
import { Worker } from "webworker-threads";
import { Barcode, BarcodePicker, BrowserCompatibility, BrowserHelper, Camera, CameraSettings, configure, CustomError, engineWorkerFunction, ImageSettings, Parser, Scanner, ScanResult, ScanSettings } from "..";
import { BarcodePickerCameraManager } from "./barcodePickerCameraManager";
HTMLVideoElement.prototype.load = () => {
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
const fakeCamera1 = {
    deviceId: "1",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (back)",
    toJSON() {
        return this;
    }
};
const fakeCamera2 = {
    deviceId: "2",
    groupId: "1",
    kind: "videoinput",
    label: "Fake Camera Device (front)",
    toJSON() {
        return this;
    }
};
const fakeCamera1Object = {
    deviceId: fakeCamera1.deviceId,
    label: fakeCamera1.label,
    cameraType: Camera.Type.BACK,
    currentResolution: {
        width: 4,
        height: 4
    }
};
const fakeCamera2Object = {
    deviceId: fakeCamera2.deviceId,
    label: fakeCamera2.label,
    cameraType: Camera.Type.FRONT,
    currentResolution: {
        width: 4,
        height: 4
    }
};
const sampleBarcode = {
    symbology: Barcode.Symbology.QR,
    compositeFlag: Barcode.CompositeFlag.NONE,
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
    BrowserHelper.checkBrowserCompatibility = () => {
        return {
            fullSupport: false,
            scannerSupport: true,
            missingFeatures: [BrowserCompatibility.Feature.MEDIA_DEVICES]
        };
    };
}
async function fakeFullCompatibleBrowser(configureLibrary = true) {
    const mediaStreamTrack = {
        stop: sinon.spy(),
        addEventListener: sinon.spy(),
        getSettings: () => {
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
            getUserMedia: () => {
                return Promise.resolve({
                    getTracks: () => {
                        return [mediaStreamTrack];
                    },
                    getVideoTracks: () => {
                        return [mediaStreamTrack];
                    }
                });
            }
        },
        configurable: true
    });
    navigator.enumerateDevices = () => {
        return Promise.resolve([fakeCamera1, fakeCamera2]);
    };
    URL.createObjectURL = sinon.stub();
    BrowserHelper.checkBrowserCompatibility = () => {
        return {
            fullSupport: true,
            scannerSupport: true,
            missingFeatures: []
        };
    };
    if (configureLibrary) {
        await configure("#".repeat(64));
    }
}
async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
async function prepareBarcodePickerForEvents() {
    const s = new Scanner();
    const imageSettings = {
        width: 2,
        height: 2,
        format: ImageSettings.Format.GRAY_8U
    };
    s.applyImageSettings(imageSettings);
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        scanner: s,
        playSoundOnScan: true,
        vibrateOnScan: true
    });
    sinon.stub(barcodePicker.barcodePickerGui, "getVideoImageData").returns(new Uint8ClampedArray(4));
    s.engineWorkerOnMessage({
        data: ["status", "ready"]
    });
    sinon.stub(s, "processImage").callsFake(() => {
        return Promise.resolve(new ScanResult([], new Uint8ClampedArray(4), imageSettings));
    });
    return barcodePicker;
}
global.Worker = Worker;
global.URL = {
    createObjectURL: () => {
        return engineWorkerFunction;
    }
};
test.serial("constructor & destroy", async (t) => {
    let error = await t.throwsAsync(BarcodePicker.create(document.createElement("div")));
    t.is(error.name, "UnsupportedBrowserError");
    await fakeFullCompatibleBrowser(false);
    error = await t.throwsAsync(BarcodePicker.create(document.createElement("div")));
    t.is(error.name, "LibraryNotConfiguredError");
    await fakeFullCompatibleBrowser();
    error = await t.throwsAsync(BarcodePicker.create("wrong-argument"));
    t.is(error.name, "NoOriginElementError");
    error = await t.throwsAsync(BarcodePicker.create({}));
    t.is(error.name, "NoOriginElementError");
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        singleImageMode: {
            desktop: { always: true, allowFallback: true },
            mobile: { always: true, allowFallback: true }
        }
    });
    barcodePicker.destroy();
    fakePartialCompatibleBrowser();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        singleImageMode: {
            desktop: { always: false, allowFallback: true },
            mobile: { always: false, allowFallback: true }
        }
    });
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"));
    barcodePicker.destroy(false);
    barcodePicker.getScanner().destroy();
    error = await t.throwsAsync(BarcodePicker.create(document.createElement("div"), {
        singleImageMode: {
            desktop: { always: false, allowFallback: false },
            mobile: { always: false, allowFallback: false }
        }
    }));
    t.is(error.name, "UnsupportedBrowserError");
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        targetScanningFPS: -1
    });
    barcodePicker.destroy();
    t.pass();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        scanner: new Scanner()
    });
    barcodePicker.destroy();
    t.pass();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    barcodePicker.destroy();
    t.pass();
    BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) " +
        "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1");
    barcodePicker = await BarcodePicker.create(document.createElement("div"));
    barcodePicker.destroy();
    t.pass();
});
test.serial("constructor & destroy (with fake camera)", async (t) => {
    await fakeFullCompatibleBrowser();
    const s = new Scanner();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        scanner: s
    });
    s.engineWorkerOnMessage({
        data: ["status", "ready"]
    });
    barcodePicker.destroy();
    t.pass();
});
test.serial("constructor interaction options", async (t) => {
    await fakeFullCompatibleBrowser();
    const setInteractionOptionsSpy = sinon.spy(BarcodePickerCameraManager.prototype, "setInteractionOptions");
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.is(setInteractionOptionsSpy.callCount, 1);
    t.deepEqual(setInteractionOptionsSpy.getCall(0).args, [true, true, true, true]);
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        enableCameraSwitcher: false,
        enableTorchToggle: false,
        enableTapToFocus: false,
        enablePinchToZoom: false
    });
    t.is(setInteractionOptionsSpy.callCount, 2);
    t.deepEqual(setInteractionOptionsSpy.getCall(1).args, [false, false, false, false]);
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        enableCameraSwitcher: false,
        enableTorchToggle: true,
        enableTapToFocus: false,
        enablePinchToZoom: true
    });
    t.is(setInteractionOptionsSpy.callCount, 3);
    t.deepEqual(setInteractionOptionsSpy.getCall(2).args, [false, true, false, true]);
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        enableCameraSwitcher: true,
        enableTorchToggle: false,
        enableTapToFocus: true,
        enablePinchToZoom: false
    });
    t.is(setInteractionOptionsSpy.callCount, 4);
    t.deepEqual(setInteractionOptionsSpy.getCall(3).args, [true, false, true, false]);
    barcodePicker.destroy();
});
test.serial("constructor scanningPaused & isScanningPaused & pauseScanning & resumeScanning (with fake camera)", async (t) => {
    await fakeFullCompatibleBrowser();
    const s = new Scanner();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        scanner: s
    });
    t.false(barcodePicker.isScanningPaused());
    await barcodePicker.resumeScanning();
    t.false(barcodePicker.isScanningPaused());
    s.engineWorkerOnMessage({
        data: ["status", "ready"]
    });
    barcodePicker.pauseScanning();
    t.true(barcodePicker.isScanningPaused());
    await barcodePicker.resumeScanning();
    t.false(barcodePicker.isScanningPaused());
    barcodePicker.destroy(false);
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        scanner: s,
        scanningPaused: true
    });
    t.true(barcodePicker.isScanningPaused());
    await barcodePicker.resumeScanning();
    t.false(barcodePicker.isScanningPaused());
});
test.serial("accessCamera & getActiveCamera & setActiveCamera (with fake camera)", async (t) => {
    await fakeFullCompatibleBrowser();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.is(barcodePicker.getActiveCamera(), undefined);
    await barcodePicker.accessCamera();
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
    barcodePicker.pauseScanning();
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
    barcodePicker.pauseScanning(true);
    t.is(barcodePicker.getActiveCamera(), undefined);
    await barcodePicker.resumeScanning();
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
    await barcodePicker.setActiveCamera(fakeCamera2Object);
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera2Object);
    await barcodePicker.setActiveCamera();
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"));
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
    await barcodePicker.accessCamera();
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    await barcodePicker.setActiveCamera(fakeCamera2Object);
    t.deepEqual(barcodePicker.getActiveCamera(), undefined);
    await barcodePicker.accessCamera();
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera2Object);
    BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36");
    barcodePicker = await BarcodePicker.create(document.createElement("div"));
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
    await barcodePicker.accessCamera();
    t.deepEqual(barcodePicker.getActiveCamera(), fakeCamera1Object);
});
test.serial("applyCameraSettings (with fake camera)", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const cs = {
        resolutionPreference: CameraSettings.ResolutionPreference.FULL_HD
    };
    const setSelectedCameraSettingsSpy = sinon.spy(barcodePicker.cameraManager, "setSelectedCameraSettings");
    const applyCameraSettingsSpy = sinon.spy(barcodePicker.cameraManager, "applyCameraSettings");
    t.is(setSelectedCameraSettingsSpy.callCount, 0);
    t.is(applyCameraSettingsSpy.callCount, 0);
    await barcodePicker.applyCameraSettings(cs);
    t.is(barcodePicker.getActiveCamera(), undefined);
    t.is(setSelectedCameraSettingsSpy.callCount, 1);
    t.is(applyCameraSettingsSpy.callCount, 0);
    t.deepEqual(setSelectedCameraSettingsSpy.getCall(0).args, [cs]);
    await barcodePicker.applyCameraSettings();
    t.is(barcodePicker.getActiveCamera(), undefined);
    t.is(setSelectedCameraSettingsSpy.callCount, 2);
    t.deepEqual(setSelectedCameraSettingsSpy.getCall(1).args, [undefined]);
    await barcodePicker.accessCamera();
    await barcodePicker.applyCameraSettings(cs);
    t.is(applyCameraSettingsSpy.callCount, 1);
    t.deepEqual(applyCameraSettingsSpy.getCall(0).args, [cs]);
    barcodePicker.destroy();
});
test.serial("constructor scanSettings & applyScanSettings", async (t) => {
    await fakeFullCompatibleBrowser();
    const s = new Scanner();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        scanner: s
    });
    const ss = new ScanSettings({
        enabledSymbologies: Barcode.Symbology.QR,
        codeDuplicateFilter: 10,
        maxNumberOfCodesPerFrame: 10,
        searchArea: { x: 0.5, y: 0.5, width: 0.5, height: 0.1 }
    });
    const applyScanSettingsSpy = sinon.spy(s, "applyScanSettings");
    t.is(applyScanSettingsSpy.callCount, 0);
    barcodePicker.applyScanSettings(ss);
    t.is(applyScanSettingsSpy.callCount, 1);
    t.deepEqual(applyScanSettingsSpy.getCall(0).args, [ss]);
    barcodePicker.destroy(false);
    applyScanSettingsSpy.resetHistory();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        scanner: s,
        scanSettings: ss
    });
    t.deepEqual(applyScanSettingsSpy.getCall(0).args, [ss]);
    barcodePicker.destroy();
});
test.serial("isVisible & setVisible", async (t) => {
    await fakeFullCompatibleBrowser();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.true(barcodePicker.isVisible());
    barcodePicker.setVisible(false);
    t.false(barcodePicker.isVisible());
    barcodePicker.setVisible(true);
    t.true(barcodePicker.isVisible());
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        visible: false
    });
    t.false(barcodePicker.isVisible());
    barcodePicker.setVisible(true);
    t.true(barcodePicker.isVisible());
    barcodePicker.destroy();
});
test.serial("isMirrorImageEnabled & setMirrorImageEnabled", async (t) => {
    await fakeFullCompatibleBrowser();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.false(barcodePicker.isMirrorImageEnabled());
    barcodePicker.setMirrorImageEnabled(true);
    t.false(barcodePicker.isMirrorImageEnabled()); // No camera has been accessed yet
    await barcodePicker.accessCamera();
    t.false(barcodePicker.isMirrorImageEnabled());
    barcodePicker.setMirrorImageEnabled(true);
    t.true(barcodePicker.isMirrorImageEnabled());
    await barcodePicker.setActiveCamera(fakeCamera2Object);
    t.true(barcodePicker.isMirrorImageEnabled()); // Front camera
    barcodePicker.setMirrorImageEnabled(false);
    t.false(barcodePicker.isMirrorImageEnabled());
    await barcodePicker.setActiveCamera();
    t.true(barcodePicker.isMirrorImageEnabled());
    await barcodePicker.setActiveCamera(fakeCamera2Object);
    t.false(barcodePicker.isMirrorImageEnabled());
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        camera: fakeCamera2Object
    });
    t.true(barcodePicker.isMirrorImageEnabled());
    barcodePicker.setMirrorImageEnabled(false);
    t.false(barcodePicker.isMirrorImageEnabled());
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        camera: fakeCamera2Object
    });
    t.true(barcodePicker.isMirrorImageEnabled());
    barcodePicker.pauseScanning(true);
    t.false(barcodePicker.isMirrorImageEnabled());
    barcodePicker.setMirrorImageEnabled(true);
    t.false(barcodePicker.isMirrorImageEnabled());
    await barcodePicker.resumeScanning();
    t.true(barcodePicker.isMirrorImageEnabled());
    barcodePicker.pauseScanning(true);
    await barcodePicker.setActiveCamera(fakeCamera1Object);
    t.false(barcodePicker.isMirrorImageEnabled());
    await barcodePicker.resumeScanning();
    t.false(barcodePicker.isMirrorImageEnabled());
    barcodePicker.destroy();
});
test.serial("isPlaySoundOnScanEnabled & setPlaySoundOnScanEnabled", async (t) => {
    await fakeFullCompatibleBrowser();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.false(barcodePicker.isPlaySoundOnScanEnabled());
    barcodePicker.setPlaySoundOnScanEnabled(true);
    t.true(barcodePicker.isPlaySoundOnScanEnabled());
    barcodePicker.setPlaySoundOnScanEnabled(false);
    t.false(barcodePicker.isPlaySoundOnScanEnabled());
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        playSoundOnScan: true
    });
    t.true(barcodePicker.isPlaySoundOnScanEnabled());
    barcodePicker.setPlaySoundOnScanEnabled(false);
    t.false(barcodePicker.isPlaySoundOnScanEnabled());
    barcodePicker.destroy();
});
test.serial("isVibrateOnScanEnabled & setVibrateOnScanEnabled", async (t) => {
    await fakeFullCompatibleBrowser();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.false(barcodePicker.isVibrateOnScanEnabled());
    barcodePicker.setVibrateOnScanEnabled(true);
    t.true(barcodePicker.isVibrateOnScanEnabled());
    barcodePicker.setVibrateOnScanEnabled(false);
    t.false(barcodePicker.isVibrateOnScanEnabled());
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        vibrateOnScan: true
    });
    t.true(barcodePicker.isVibrateOnScanEnabled());
    barcodePicker.setVibrateOnScanEnabled(false);
    t.false(barcodePicker.isVibrateOnScanEnabled());
    barcodePicker.destroy();
});
test.serial("isCameraSwitcherEnabled & setCameraSwitcherEnabled", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.true(barcodePicker.isCameraSwitcherEnabled());
    barcodePicker.setCameraSwitcherEnabled(false);
    t.false(barcodePicker.isCameraSwitcherEnabled());
    barcodePicker.setCameraSwitcherEnabled(true);
    t.true(barcodePicker.isCameraSwitcherEnabled());
    barcodePicker.destroy();
});
test.serial("isTorchToggleEnabled & setTorchToggleEnabled", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.true(barcodePicker.isTorchToggleEnabled());
    barcodePicker.setTorchToggleEnabled(false);
    t.false(barcodePicker.isTorchToggleEnabled());
    barcodePicker.setTorchToggleEnabled(true);
    t.true(barcodePicker.isTorchToggleEnabled());
    barcodePicker.destroy();
});
test.serial("isTapToFocusEnabled & setTapToFocusEnabled", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.true(barcodePicker.isTapToFocusEnabled());
    barcodePicker.setTapToFocusEnabled(false);
    t.false(barcodePicker.isTapToFocusEnabled());
    barcodePicker.setTapToFocusEnabled(true);
    t.true(barcodePicker.isTapToFocusEnabled());
    barcodePicker.destroy();
});
test.serial("isPinchToZoomEnabled & setPinchToZoomEnabled", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.true(barcodePicker.isPinchToZoomEnabled());
    barcodePicker.setPinchToZoomEnabled(false);
    t.false(barcodePicker.isPinchToZoomEnabled());
    barcodePicker.setPinchToZoomEnabled(true);
    t.true(barcodePicker.isPinchToZoomEnabled());
    barcodePicker.destroy();
});
test.serial("setTorchEnabled", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    barcodePicker.setTorchEnabled(true);
    barcodePicker.setTorchEnabled(false);
    barcodePicker.destroy();
    t.pass();
});
test.serial("setZoom", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    barcodePicker.setZoom(0.1);
    barcodePicker.setZoom(1);
    barcodePicker.destroy();
    t.pass();
});
test.serial("constructor guiStyle option & setGuiStyle", async (t) => {
    await fakeFullCompatibleBrowser();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const setGuiStyleSpy = sinon.spy(barcodePicker.barcodePickerGui, "setGuiStyle");
    t.is(barcodePicker.barcodePickerGui.guiStyle, BarcodePicker.GuiStyle.LASER);
    barcodePicker.setGuiStyle(BarcodePicker.GuiStyle.NONE);
    t.is(setGuiStyleSpy.callCount, 1);
    t.deepEqual(setGuiStyleSpy.getCall(0).args, [BarcodePicker.GuiStyle.NONE]);
    barcodePicker.setGuiStyle(BarcodePicker.GuiStyle.LASER);
    t.is(setGuiStyleSpy.callCount, 2);
    t.deepEqual(setGuiStyleSpy.getCall(1).args, [BarcodePicker.GuiStyle.LASER]);
    barcodePicker.setGuiStyle(BarcodePicker.GuiStyle.VIEWFINDER);
    t.is(setGuiStyleSpy.callCount, 3);
    t.deepEqual(setGuiStyleSpy.getCall(2).args, [BarcodePicker.GuiStyle.VIEWFINDER]);
    barcodePicker.setGuiStyle(BarcodePicker.GuiStyle.NONE);
    t.is(setGuiStyleSpy.callCount, 4);
    t.deepEqual(setGuiStyleSpy.getCall(3).args, [BarcodePicker.GuiStyle.NONE]);
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        guiStyle: BarcodePicker.GuiStyle.NONE
    });
    t.is(barcodePicker.barcodePickerGui.guiStyle, BarcodePicker.GuiStyle.NONE);
});
test.serial("constructor videoFit option & setVideoFit", async (t) => {
    await fakeFullCompatibleBrowser();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const setVideoFitSpy = sinon.spy(barcodePicker.barcodePickerGui, "setVideoFit");
    t.is(barcodePicker.barcodePickerGui.videoFit, BarcodePicker.ObjectFit.CONTAIN);
    barcodePicker.setVideoFit(BarcodePicker.ObjectFit.COVER);
    t.is(setVideoFitSpy.callCount, 1);
    t.deepEqual(setVideoFitSpy.getCall(0).args, [BarcodePicker.ObjectFit.COVER]);
    barcodePicker.setVideoFit(BarcodePicker.ObjectFit.CONTAIN);
    t.is(setVideoFitSpy.callCount, 2);
    t.deepEqual(setVideoFitSpy.getCall(1).args, [BarcodePicker.ObjectFit.CONTAIN]);
    barcodePicker.destroy();
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        videoFit: BarcodePicker.ObjectFit.COVER
    });
    t.is(barcodePicker.barcodePickerGui.videoFit, BarcodePicker.ObjectFit.COVER);
});
test.serial("constructor laserArea option & setLaserArea", async (t) => {
    await fakeFullCompatibleBrowser();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const setLaserAreaSpy = sinon.spy(barcodePicker.barcodePickerGui, "setLaserArea");
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
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        laserArea: {
            x: 0.25,
            y: 0.25,
            width: 0.5,
            height: 0.5
        }
    });
    t.deepEqual(barcodePicker.barcodePickerGui.customLaserArea, {
        x: 0.25,
        y: 0.25,
        width: 0.5,
        height: 0.5
    });
});
test.serial("constructor viewfinderArea option & setViewfinderArea", async (t) => {
    await fakeFullCompatibleBrowser();
    let barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const setViewfinderAreaSpy = sinon.spy(barcodePicker.barcodePickerGui, "setViewfinderArea");
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
    barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        viewfinderArea: {
            x: 0.25,
            y: 0.25,
            width: 0.5,
            height: 0.5
        }
    });
    t.deepEqual(barcodePicker.barcodePickerGui.customViewfinderArea, {
        x: 0.25,
        y: 0.25,
        width: 0.5,
        height: 0.5
    });
});
test.serial("createParserForFormat", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    let parser = barcodePicker.createParserForFormat(Parser.DataFormat.DLID);
    t.truthy(parser);
    parser = barcodePicker.createParserForFormat(Parser.DataFormat.GS1_AI);
    t.truthy(parser);
    parser = barcodePicker.createParserForFormat(Parser.DataFormat.HIBC);
    t.truthy(parser);
    parser = barcodePicker.createParserForFormat(Parser.DataFormat.MRTD);
    t.truthy(parser);
    parser = barcodePicker.createParserForFormat(Parser.DataFormat.SWISSQR);
    t.truthy(parser);
    barcodePicker.destroy();
});
test.serial("reassignOriginElement", async (t) => {
    await fakeFullCompatibleBrowser();
    const element = document.createElement("div");
    const barcodePicker = await BarcodePicker.create(element, {
        accessCamera: false
    });
    t.deepEqual(barcodePicker.barcodePickerGui.originElement, element);
    t.throws(() => {
        return barcodePicker.reassignOriginElement("wrong-argument");
    }, CustomError, "A valid origin HTML element must be given");
    t.throws(() => {
        return barcodePicker.reassignOriginElement({});
    }, CustomError, "A valid origin HTML element must be given");
    const reassignOriginElementSpy = sinon.spy(barcodePicker.barcodePickerGui, "reassignOriginElement");
    const element2 = document.createElement("div");
    barcodePicker.reassignOriginElement(element2);
    t.true(reassignOriginElementSpy.calledOnceWithExactly(element2));
});
test.serial("setTargetScanningFPS", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
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
    const scheduleVideoProcessingStub = sinon.stub(barcodePicker, "scheduleVideoProcessing");
    barcodePicker.scheduleNextVideoProcessing(performance.now());
    t.true(barcodePicker.averageProcessingTime < 10);
    t.is(scheduleVideoProcessingStub.callCount, 1);
    t.true(scheduleVideoProcessingStub.lastCall.args[0] > 90);
    const videoProcessingStub = sinon.stub(barcodePicker, "videoProcessing");
    barcodePicker.scheduleNextVideoProcessing(performance.now() - 10000);
    t.true(barcodePicker.averageProcessingTime > 100);
    t.is(scheduleVideoProcessingStub.callCount, 1);
    t.is(videoProcessingStub.callCount, 1);
    barcodePicker.setTargetScanningFPS(0);
    t.is(barcodePicker.targetScanningFPS, 30);
    barcodePicker.destroy();
});
test.serial("clearSession", async (t) => {
    await fakeFullCompatibleBrowser();
    const s = new Scanner();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        scanner: s
    });
    const clearSessionSpy = sinon.spy(s, "clearSession");
    t.is(clearSessionSpy.callCount, 0);
    barcodePicker.clearSession();
    t.is(clearSessionSpy.callCount, 1);
    barcodePicker.destroy();
});
test.serial("addListener", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const onSpy = sinon.spy(barcodePicker, "on");
    const callbackSpy = sinon.spy();
    barcodePicker.addListener("ready", callbackSpy);
    t.true(onSpy.calledOnceWithExactly("ready", callbackSpy, undefined));
});
// Deprecated method
test.serial("onReady", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const onSpy = sinon.spy(barcodePicker, "on");
    const callbackSpy = sinon.spy();
    barcodePicker.onReady(callbackSpy);
    t.true(onSpy.calledOnceWithExactly("ready", callbackSpy));
});
// Deprecated methods
test.serial("onScan & removeScanListener & removeScanListeners", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const onSpy = sinon.spy(barcodePicker, "on");
    const callbackSpy = sinon.spy();
    barcodePicker.onScan(callbackSpy);
    t.true(onSpy.calledOnceWithExactly("scan", callbackSpy, false));
    onSpy.resetHistory();
    barcodePicker.onScan(callbackSpy, false);
    t.true(onSpy.calledOnceWithExactly("scan", callbackSpy, false));
    onSpy.resetHistory();
    barcodePicker.onScan(callbackSpy, true);
    t.true(onSpy.calledOnceWithExactly("scan", callbackSpy, true));
    const removeListenerSpy = sinon.spy(barcodePicker, "removeListener");
    barcodePicker.removeScanListener(callbackSpy);
    t.true(removeListenerSpy.calledOnceWithExactly("scan", callbackSpy));
    const removeAllListenersSpy = sinon.spy(barcodePicker, "removeAllListeners");
    barcodePicker.removeScanListeners();
    t.true(removeAllListenersSpy.calledOnceWithExactly("scan"));
});
// Deprecated methods
test.serial("onSubmitFrame & removeSubmitFrameListener & removeSubmitFrameListeners", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const onSpy = sinon.spy(barcodePicker, "on");
    const callbackSpy = sinon.spy();
    barcodePicker.onSubmitFrame(callbackSpy);
    t.true(onSpy.calledOnceWithExactly("submitFrame", callbackSpy, false));
    onSpy.resetHistory();
    barcodePicker.onSubmitFrame(callbackSpy, false);
    t.true(onSpy.calledOnceWithExactly("submitFrame", callbackSpy, false));
    onSpy.resetHistory();
    barcodePicker.onSubmitFrame(callbackSpy, true);
    t.true(onSpy.calledOnceWithExactly("submitFrame", callbackSpy, true));
    const removeListenerSpy = sinon.spy(barcodePicker, "removeListener");
    barcodePicker.removeSubmitFrameListener(callbackSpy);
    t.true(removeListenerSpy.calledOnceWithExactly("submitFrame", callbackSpy));
    const removeAllListenersSpy = sinon.spy(barcodePicker, "removeAllListeners");
    barcodePicker.removeSubmitFrameListeners();
    t.true(removeAllListenersSpy.calledOnceWithExactly("submitFrame"));
});
// Deprecated methods
test.serial("onProcessFrame & removeProcessFrameListener & removeProcessFrameListeners", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const onSpy = sinon.spy(barcodePicker, "on");
    const callbackSpy = sinon.spy();
    barcodePicker.onProcessFrame(callbackSpy);
    t.true(onSpy.calledOnceWithExactly("processFrame", callbackSpy, false));
    onSpy.resetHistory();
    barcodePicker.onProcessFrame(callbackSpy, false);
    t.true(onSpy.calledOnceWithExactly("processFrame", callbackSpy, false));
    onSpy.resetHistory();
    barcodePicker.onProcessFrame(callbackSpy, true);
    t.true(onSpy.calledOnceWithExactly("processFrame", callbackSpy, true));
    const removeListenerSpy = sinon.spy(barcodePicker, "removeListener");
    barcodePicker.removeProcessFrameListener(callbackSpy);
    t.true(removeListenerSpy.calledOnceWithExactly("processFrame", callbackSpy));
    const removeAllListenersSpy = sinon.spy(barcodePicker, "removeAllListeners");
    barcodePicker.removeProcessFrameListeners();
    t.true(removeAllListenersSpy.calledOnceWithExactly("processFrame"));
});
// Deprecated methods
test.serial("onScanError & removeScanErrorListener & removeScanErrorListeners", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    const onSpy = sinon.spy(barcodePicker, "on");
    const callbackSpy = sinon.spy();
    barcodePicker.onScanError(callbackSpy);
    t.true(onSpy.calledOnceWithExactly("scanError", callbackSpy, false));
    onSpy.resetHistory();
    barcodePicker.onScanError(callbackSpy, false);
    t.true(onSpy.calledOnceWithExactly("scanError", callbackSpy, false));
    onSpy.resetHistory();
    barcodePicker.onScanError(callbackSpy, true);
    t.true(onSpy.calledOnceWithExactly("scanError", callbackSpy, true));
    const removeListenerSpy = sinon.spy(barcodePicker, "removeListener");
    barcodePicker.removeScanErrorListener(callbackSpy);
    t.true(removeListenerSpy.calledOnceWithExactly("scanError", callbackSpy));
    const removeAllListenersSpy = sinon.spy(barcodePicker, "removeAllListeners");
    barcodePicker.removeScanErrorListeners();
    t.true(removeAllListenersSpy.calledOnceWithExactly("scanError"));
});
test.serial("isReady & ready event", async (t) => {
    await fakeFullCompatibleBrowser();
    const s = new Scanner();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false,
        scanner: s
    });
    const onReadyCallbackSpy0 = sinon.spy();
    const onReadyCallbackSpy1 = sinon.spy();
    const onReadyCallbackSpy2 = sinon.spy();
    const onReadyCallbackSpy3 = sinon.spy();
    const onReadyCallbackSpy4 = sinon.spy();
    const onReadyCallbackSpy5 = sinon.spy();
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
});
test.serial("scan event", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await prepareBarcodePickerForEvents();
    const onScanCallbackSpy1 = sinon.spy();
    const onScanCallbackSpy2 = sinon.spy();
    const onScanCallbackSpy3 = sinon.spy();
    barcodePicker.on("scan", onScanCallbackSpy1);
    barcodePicker.on("scan", onScanCallbackSpy2);
    barcodePicker.on("scan", onScanCallbackSpy3, true);
    t.false(onScanCallbackSpy1.called);
    t.false(onScanCallbackSpy2.called);
    t.false(onScanCallbackSpy3.called);
    await barcodePicker.processVideoFrame(true);
    t.is(onScanCallbackSpy1.callCount, 0);
    t.is(onScanCallbackSpy2.callCount, 0);
    t.is(onScanCallbackSpy3.callCount, 0);
    const scanResult = new ScanResult([sampleBarcode], new Uint8ClampedArray(4), (barcodePicker.getScanner().getImageSettings()));
    barcodePicker.getScanner().processImage.restore();
    barcodePicker.pauseScanning();
    await barcodePicker.processVideoFrame(true);
    t.is(onScanCallbackSpy1.callCount, 0);
    t.is(onScanCallbackSpy2.callCount, 0);
    t.is(onScanCallbackSpy3.callCount, 0);
    await barcodePicker.resumeScanning();
    sinon.stub(barcodePicker.getScanner(), "processImage").resolves(scanResult);
    await barcodePicker.processVideoFrame(true);
    t.is(onScanCallbackSpy1.callCount, 1);
    t.is(onScanCallbackSpy2.callCount, 1);
    t.is(onScanCallbackSpy3.callCount, 1);
    t.deepEqual(onScanCallbackSpy1.getCall(0).args, [scanResult]);
    t.deepEqual(onScanCallbackSpy2.getCall(0).args, [scanResult]);
    t.deepEqual(onScanCallbackSpy3.getCall(0).args, [scanResult]);
    await barcodePicker.processVideoFrame(true);
    t.is(onScanCallbackSpy1.callCount, 2);
    t.is(onScanCallbackSpy2.callCount, 2);
    t.is(onScanCallbackSpy3.callCount, 1);
    barcodePicker.removeListener("scan", onScanCallbackSpy1);
    await barcodePicker.processVideoFrame(true);
    t.is(onScanCallbackSpy1.callCount, 2);
    t.is(onScanCallbackSpy2.callCount, 3);
    t.is(onScanCallbackSpy3.callCount, 1);
    await barcodePicker.resumeScanning();
    // Intentionally pause before processing is complete
    // tslint:disable-next-line: no-floating-promises
    barcodePicker.processVideoFrame(true);
    barcodePicker.pauseScanning();
    await wait(200);
    t.is(onScanCallbackSpy1.callCount, 2);
    t.is(onScanCallbackSpy2.callCount, 3);
    t.is(onScanCallbackSpy3.callCount, 1);
    await barcodePicker.resumeScanning();
    barcodePicker.removeAllListeners("scan");
    await barcodePicker.processVideoFrame(true);
    t.is(onScanCallbackSpy1.callCount, 2);
    t.is(onScanCallbackSpy2.callCount, 3);
    t.is(onScanCallbackSpy3.callCount, 1);
    barcodePicker.setPlaySoundOnScanEnabled(false);
    barcodePicker.setVibrateOnScanEnabled(false);
    await barcodePicker.processVideoFrame(true);
    t.is(onScanCallbackSpy1.callCount, 2);
    t.is(onScanCallbackSpy2.callCount, 3);
    t.is(onScanCallbackSpy3.callCount, 1);
    barcodePicker.destroy();
});
test.serial("submitFrame event", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await prepareBarcodePickerForEvents();
    const scanResult = new ScanResult([], new Uint8ClampedArray(4), (barcodePicker.getScanner().getImageSettings()));
    barcodePicker.getScanner().processImage.restore();
    sinon.stub(barcodePicker.getScanner(), "processImage").callsFake(() => {
        return Promise.resolve(new ScanResult([sampleBarcode, { ...sampleBarcode }, { ...sampleBarcode }], new Uint8ClampedArray(4), barcodePicker.getScanner().getImageSettings()));
    });
    const onSubmitFrameCallbackSpy1 = sinon.spy();
    const onSubmitFrameCallbackSpy2 = sinon.spy();
    const onSubmitFrameCallbackSpy3 = sinon.spy();
    barcodePicker.on("submitFrame", onSubmitFrameCallbackSpy1);
    barcodePicker.on("submitFrame", onSubmitFrameCallbackSpy2);
    barcodePicker.on("submitFrame", onSubmitFrameCallbackSpy3, true);
    t.false(onSubmitFrameCallbackSpy1.called);
    t.false(onSubmitFrameCallbackSpy2.called);
    t.false(onSubmitFrameCallbackSpy3.called);
    await barcodePicker.processVideoFrame(true);
    t.is(onSubmitFrameCallbackSpy1.callCount, 1);
    t.is(onSubmitFrameCallbackSpy2.callCount, 1);
    t.is(onSubmitFrameCallbackSpy3.callCount, 1);
    // Result will not contain barcodes yet in the submitFrame event
    t.deepEqual(onSubmitFrameCallbackSpy1.getCall(0).args, [scanResult]);
    t.deepEqual(onSubmitFrameCallbackSpy2.getCall(0).args, [scanResult]);
    t.deepEqual(onSubmitFrameCallbackSpy3.getCall(0).args, [scanResult]);
    await barcodePicker.processVideoFrame(true);
    t.is(onSubmitFrameCallbackSpy1.callCount, 2);
    t.is(onSubmitFrameCallbackSpy2.callCount, 2);
    t.is(onSubmitFrameCallbackSpy3.callCount, 1);
    barcodePicker.removeListener("submitFrame", onSubmitFrameCallbackSpy1);
    await barcodePicker.processVideoFrame(true);
    t.is(onSubmitFrameCallbackSpy1.callCount, 2);
    t.is(onSubmitFrameCallbackSpy2.callCount, 3);
    t.is(onSubmitFrameCallbackSpy3.callCount, 1);
    barcodePicker.removeAllListeners("submitFrame");
    await barcodePicker.processVideoFrame(true);
    t.is(onSubmitFrameCallbackSpy1.callCount, 2);
    t.is(onSubmitFrameCallbackSpy2.callCount, 3);
    t.is(onSubmitFrameCallbackSpy3.callCount, 1);
    barcodePicker.destroy();
});
test.serial("processFrame event", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await prepareBarcodePickerForEvents();
    const scanResult = new ScanResult([], new Uint8ClampedArray(16), (barcodePicker.getScanner().getImageSettings()));
    barcodePicker.getScanner().processImage.restore();
    sinon.stub(barcodePicker.getScanner(), "processImage").callsFake(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(scanResult);
            }, 100);
        });
    });
    const onProcessFrameCallbackSpy1 = sinon.spy();
    const onProcessFrameCallbackSpy2 = sinon.spy();
    const onProcessFrameCallbackSpy3 = sinon.spy();
    barcodePicker.on("processFrame", onProcessFrameCallbackSpy1);
    barcodePicker.on("processFrame", onProcessFrameCallbackSpy2);
    barcodePicker.on("processFrame", onProcessFrameCallbackSpy3, true);
    t.false(onProcessFrameCallbackSpy1.called);
    t.false(onProcessFrameCallbackSpy2.called);
    t.false(onProcessFrameCallbackSpy3.called);
    await barcodePicker.processVideoFrame(true);
    t.is(onProcessFrameCallbackSpy1.callCount, 1);
    t.is(onProcessFrameCallbackSpy2.callCount, 1);
    t.is(onProcessFrameCallbackSpy3.callCount, 1);
    t.deepEqual(onProcessFrameCallbackSpy1.getCall(0).args, [scanResult]);
    t.deepEqual(onProcessFrameCallbackSpy2.getCall(0).args, [scanResult]);
    t.deepEqual(onProcessFrameCallbackSpy3.getCall(0).args, [scanResult]);
    await barcodePicker.processVideoFrame(true);
    t.is(onProcessFrameCallbackSpy1.callCount, 2);
    t.is(onProcessFrameCallbackSpy2.callCount, 2);
    t.is(onProcessFrameCallbackSpy3.callCount, 1);
    barcodePicker.removeListener("processFrame", onProcessFrameCallbackSpy1);
    await barcodePicker.processVideoFrame(true);
    t.is(onProcessFrameCallbackSpy1.callCount, 2);
    t.is(onProcessFrameCallbackSpy2.callCount, 3);
    t.is(onProcessFrameCallbackSpy3.callCount, 1);
    await barcodePicker.resumeScanning();
    // Intentionally pause before processing is complete
    // tslint:disable-next-line: no-floating-promises
    barcodePicker.processVideoFrame(true);
    barcodePicker.pauseScanning();
    await wait(200);
    t.is(onProcessFrameCallbackSpy1.callCount, 2);
    t.is(onProcessFrameCallbackSpy2.callCount, 3);
    t.is(onProcessFrameCallbackSpy3.callCount, 1);
    await barcodePicker.resumeScanning();
    barcodePicker.removeAllListeners("processFrame");
    await barcodePicker.processVideoFrame(true);
    t.is(onProcessFrameCallbackSpy1.callCount, 2);
    t.is(onProcessFrameCallbackSpy2.callCount, 3);
    t.is(onProcessFrameCallbackSpy3.callCount, 1);
    barcodePicker.destroy();
});
test.serial("scanError event", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await prepareBarcodePickerForEvents();
    const onScanErrorCallbackSpy1 = sinon.spy();
    const onScanErrorCallbackSpy2 = sinon.spy();
    const onScanErrorCallbackSpy3 = sinon.spy();
    barcodePicker.on("scanError", onScanErrorCallbackSpy1);
    barcodePicker.on("scanError", onScanErrorCallbackSpy2);
    barcodePicker.on("scanError", onScanErrorCallbackSpy3, true);
    t.false(onScanErrorCallbackSpy1.called);
    t.false(onScanErrorCallbackSpy2.called);
    t.false(onScanErrorCallbackSpy3.called);
    await barcodePicker.processVideoFrame(true);
    t.is(onScanErrorCallbackSpy1.callCount, 0);
    t.is(onScanErrorCallbackSpy2.callCount, 0);
    t.is(onScanErrorCallbackSpy3.callCount, 0);
    const scanError = new CustomError({
        name: "ScanditEngineError",
        message: `Test error`
    });
    barcodePicker.getScanner().processImage.restore();
    sinon.stub(barcodePicker.getScanner(), "processImage").rejects(scanError);
    await barcodePicker.processVideoFrame(true);
    t.is(onScanErrorCallbackSpy1.callCount, 1);
    t.is(onScanErrorCallbackSpy2.callCount, 1);
    t.is(onScanErrorCallbackSpy3.callCount, 1);
    t.deepEqual(onScanErrorCallbackSpy1.getCall(0).args, [scanError]);
    t.deepEqual(onScanErrorCallbackSpy2.getCall(0).args, [scanError]);
    t.deepEqual(onScanErrorCallbackSpy3.getCall(0).args, [scanError]);
    await barcodePicker.resumeScanning();
    await barcodePicker.processVideoFrame(true);
    t.is(onScanErrorCallbackSpy1.callCount, 2);
    t.is(onScanErrorCallbackSpy2.callCount, 2);
    t.is(onScanErrorCallbackSpy3.callCount, 1);
    barcodePicker.removeListener("scanError", onScanErrorCallbackSpy1);
    await barcodePicker.resumeScanning();
    await barcodePicker.processVideoFrame(true);
    t.is(onScanErrorCallbackSpy1.callCount, 2);
    t.is(onScanErrorCallbackSpy2.callCount, 3);
    t.is(onScanErrorCallbackSpy3.callCount, 1);
    barcodePicker.removeAllListeners("scanError");
    await barcodePicker.resumeScanning();
    await barcodePicker.processVideoFrame(true);
    t.is(onScanErrorCallbackSpy1.callCount, 2);
    t.is(onScanErrorCallbackSpy2.callCount, 3);
    t.is(onScanErrorCallbackSpy3.callCount, 1);
    barcodePicker.destroy();
});
test.serial("ScanResult.rejectCode", async (t) => {
    await fakeFullCompatibleBrowser();
    const vibrateSpy = sinon.spy();
    navigator.vibrate = vibrateSpy;
    const barcodePicker = await prepareBarcodePickerForEvents();
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 0);
    barcodePicker.getScanner().processImage.restore();
    sinon.stub(barcodePicker.getScanner(), "processImage").callsFake(() => {
        return Promise.resolve(new ScanResult([sampleBarcode], new Uint8ClampedArray(4), (barcodePicker.getScanner().getImageSettings())));
    });
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 1);
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 2);
    barcodePicker.on("scan", listenerScanResult => {
        listenerScanResult.rejectCode(listenerScanResult.barcodes[0]);
    });
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 2);
    barcodePicker.removeAllListeners("scan");
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 3);
    barcodePicker.on("processFrame", listenerScanResult => {
        listenerScanResult.rejectCode(listenerScanResult.barcodes[0]);
    });
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 3);
    barcodePicker.removeAllListeners("processFrame");
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 4);
    barcodePicker.getScanner().processImage.restore();
    sinon.stub(barcodePicker.getScanner(), "processImage").callsFake(() => {
        return Promise.resolve(new ScanResult([sampleBarcode, { ...sampleBarcode }], new Uint8ClampedArray(4), (barcodePicker.getScanner().getImageSettings())));
    });
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 5);
    barcodePicker.on("scan", listenerScanResult => {
        listenerScanResult.rejectCode(listenerScanResult.barcodes[0]);
    });
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 6);
    barcodePicker.on("scan", listenerScanResult => {
        listenerScanResult.rejectCode(listenerScanResult.barcodes[1]);
    });
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 6);
    barcodePicker.removeAllListeners("scan");
    await barcodePicker.processVideoFrame(true);
    t.is(vibrateSpy.callCount, 7);
    barcodePicker.destroy();
});
test.serial("triggerFatalError", async (t) => {
    await fakeFullCompatibleBrowser();
    const barcodePicker = await BarcodePicker.create(document.createElement("div"), {
        accessCamera: false
    });
    t.is(barcodePicker.fatalError, undefined);
    const error = new Error("Test error");
    barcodePicker.triggerFatalError(error);
    t.deepEqual(barcodePicker.fatalError, error);
    barcodePicker.destroy();
});
//# sourceMappingURL=barcodePicker.spec.js.map