/* tslint:disable:no-implicit-dependencies no-any */
/**
 * BarcodePickerGui tests
 */
import test from "ava";
import * as sinon from "sinon";
import { BarcodePicker, BrowserHelper, ImageSettings, Scanner, ScanSettings } from "..";
import { BarcodePickerGui } from "./barcodePickerGui";
const defaultBarcodePickerGuiOptions = {
    scanner: sinon.createStubInstance(Scanner, {
        getScanSettings: new ScanSettings()
    }),
    originElement: document.createElement("div"),
    singleImageMode: false,
    scanningPaused: false,
    visible: true,
    guiStyle: BarcodePicker.GuiStyle.LASER,
    videoFit: BarcodePicker.ObjectFit.CONTAIN,
    laserArea: undefined,
    viewfinderArea: undefined,
    cameraUploadCallback: () => {
        return Promise.resolve();
    },
    hideLogo: false
};
function defineConfigurableProperty(object, property, value) {
    Object.defineProperty(object, property, {
        value,
        configurable: true
    });
}
test("constructor & destroy", async (t) => {
    let gui = new BarcodePickerGui({
        ...defaultBarcodePickerGuiOptions,
        visible: false
    });
    gui.destroy();
    t.pass();
    BrowserHelper.userAgentInfo.setUA("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) " +
        "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.2 Safari/605.1.15");
    gui = new BarcodePickerGui({
        ...defaultBarcodePickerGuiOptions,
        singleImageMode: true,
        scanningPaused: true,
        guiStyle: BarcodePicker.GuiStyle.VIEWFINDER,
        videoFit: BarcodePicker.ObjectFit.COVER,
        hideLogo: true
    });
    gui.destroy();
    t.pass();
});
test("constructor visible option & isVisible & setVisible", async (t) => {
    let gui = new BarcodePickerGui(defaultBarcodePickerGuiOptions);
    t.true(gui.isVisible());
    gui.setVisible(false);
    t.false(gui.isVisible());
    gui.setVisible(true);
    t.true(gui.isVisible());
    gui = new BarcodePickerGui({
        ...defaultBarcodePickerGuiOptions,
        visible: false,
        guiStyle: BarcodePicker.GuiStyle.VIEWFINDER
    });
    t.false(gui.isVisible());
    gui.setVisible(true);
    t.true(gui.isVisible());
});
test("constructor guiStyle option & setGuiStyle", async (t) => {
    let gui = new BarcodePickerGui(defaultBarcodePickerGuiOptions);
    t.is(gui.guiStyle, BarcodePicker.GuiStyle.LASER);
    t.false(gui.laserContainerElement.classList.contains(BarcodePickerGui.hiddenClassName));
    t.true(gui.viewfinderElement.classList.contains(BarcodePickerGui.hiddenClassName));
    gui.setGuiStyle(BarcodePicker.GuiStyle.VIEWFINDER);
    t.is(gui.guiStyle, BarcodePicker.GuiStyle.VIEWFINDER);
    t.true(gui.laserContainerElement.classList.contains(BarcodePickerGui.hiddenClassName));
    t.false(gui.viewfinderElement.classList.contains(BarcodePickerGui.hiddenClassName));
    gui.setGuiStyle(BarcodePicker.GuiStyle.NONE);
    t.is(gui.guiStyle, BarcodePicker.GuiStyle.NONE);
    t.true(gui.laserContainerElement.classList.contains(BarcodePickerGui.hiddenClassName));
    t.true(gui.viewfinderElement.classList.contains(BarcodePickerGui.hiddenClassName));
    gui.setGuiStyle(BarcodePicker.GuiStyle.VIEWFINDER);
    t.is(gui.guiStyle, BarcodePicker.GuiStyle.VIEWFINDER);
    gui.setGuiStyle("invalid");
    t.is(gui.guiStyle, BarcodePicker.GuiStyle.NONE);
    t.true(gui.laserContainerElement.classList.contains(BarcodePickerGui.hiddenClassName));
    t.true(gui.viewfinderElement.classList.contains(BarcodePickerGui.hiddenClassName));
    gui = new BarcodePickerGui({
        ...defaultBarcodePickerGuiOptions,
        singleImageMode: true
    });
    gui.flashGUI();
    t.is(gui.guiStyle, BarcodePicker.GuiStyle.NONE);
    gui.setGuiStyle(BarcodePicker.GuiStyle.LASER);
    t.is(gui.guiStyle, BarcodePicker.GuiStyle.NONE);
});
test("reassignOriginElement", async (t) => {
    const originElement1 = document.createElement("div");
    const originElement2 = document.createElement("div");
    const gui = new BarcodePickerGui({
        ...defaultBarcodePickerGuiOptions,
        originElement: originElement1
    });
    t.deepEqual(gui.originElement, originElement1);
    gui.reassignOriginElement(originElement2);
    t.deepEqual(gui.originElement, originElement2);
    gui.setVisible(false);
    gui.reassignOriginElement(originElement1);
    t.deepEqual(gui.originElement, originElement1);
    t.true(originElement1.classList.contains(BarcodePickerGui.hiddenClassName));
    t.false(originElement2.classList.contains(BarcodePickerGui.hiddenClassName));
    gui.reassignOriginElement(originElement2);
    t.deepEqual(gui.originElement, originElement2);
    t.false(originElement1.classList.contains(BarcodePickerGui.hiddenClassName));
    t.true(originElement2.classList.contains(BarcodePickerGui.hiddenClassName));
});
test("flashGUI", async (t) => {
    const gui = new BarcodePickerGui({
        ...defaultBarcodePickerGuiOptions,
        guiStyle: BarcodePicker.GuiStyle.NONE
    });
    const flashLaserSpy = sinon.spy(gui, "flashLaser");
    const flashViewfinderSpy = sinon.spy(gui, "flashViewfinder");
    t.is(flashLaserSpy.callCount, 0);
    t.is(flashViewfinderSpy.callCount, 0);
    gui.flashGUI();
    t.is(flashLaserSpy.callCount, 0);
    t.is(flashViewfinderSpy.callCount, 0);
    gui.setGuiStyle(BarcodePicker.GuiStyle.LASER);
    gui.flashGUI();
    t.is(flashLaserSpy.callCount, 1);
    t.is(flashViewfinderSpy.callCount, 0);
    gui.setGuiStyle(BarcodePicker.GuiStyle.VIEWFINDER);
    gui.flashGUI();
    t.is(flashLaserSpy.callCount, 1);
    t.is(flashViewfinderSpy.callCount, 1);
});
test("setCameraSwitcherVisible", async (t) => {
    const gui = new BarcodePickerGui(defaultBarcodePickerGuiOptions);
    gui.setCameraSwitcherVisible(false);
    t.true(gui.cameraSwitcherElement.classList.contains(BarcodePickerGui.hiddenClassName));
    gui.setCameraSwitcherVisible(true);
    t.false(gui.cameraSwitcherElement.classList.contains(BarcodePickerGui.hiddenClassName));
});
test("setTorchTogglerVisible", async (t) => {
    const gui = new BarcodePickerGui(defaultBarcodePickerGuiOptions);
    gui.setTorchTogglerVisible(false);
    t.true(gui.torchTogglerElement.classList.contains(BarcodePickerGui.hiddenClassName));
    gui.setTorchTogglerVisible(true);
    t.false(gui.torchTogglerElement.classList.contains(BarcodePickerGui.hiddenClassName));
});
test("resize video", async (t) => {
    const scanSettings = new ScanSettings();
    const scanner = sinon.createStubInstance(Scanner, {
        getScanSettings: scanSettings
    });
    const originElement = document.createElement("div");
    const gui = new BarcodePickerGui({
        ...defaultBarcodePickerGuiOptions,
        originElement,
        scanner: scanner
    });
    // No video dimensions available yet
    t.is(gui.parentElement.style.maxWidth, "");
    t.is(gui.parentElement.style.maxHeight, "");
    defineConfigurableProperty(originElement, "clientWidth", 100);
    defineConfigurableProperty(originElement, "clientHeight", 100);
    defineConfigurableProperty(gui.videoElement, "videoWidth", 100);
    defineConfigurableProperty(gui.videoElement, "videoHeight", 100);
    gui.setVideoFit(BarcodePicker.ObjectFit.CONTAIN);
    t.is(gui.parentElement.style.maxWidth, "100px");
    t.is(gui.parentElement.style.maxHeight, "100px");
    defineConfigurableProperty(originElement, "clientWidth", 100);
    defineConfigurableProperty(originElement, "clientHeight", 50);
    gui.resize();
    t.is(gui.parentElement.style.maxWidth, "50px");
    t.is(gui.parentElement.style.maxHeight, "50px");
    defineConfigurableProperty(originElement, "clientWidth", 25);
    defineConfigurableProperty(originElement, "clientHeight", 100);
    gui.resize();
    t.is(gui.parentElement.style.maxWidth, "25px");
    t.is(gui.parentElement.style.maxHeight, "25px");
    defineConfigurableProperty(originElement, "clientWidth", 100);
    defineConfigurableProperty(originElement, "clientHeight", 100);
    gui.resize();
    t.is(gui.parentElement.style.maxWidth, "100px");
    t.is(gui.parentElement.style.maxHeight, "100px");
    gui.setVideoFit(BarcodePicker.ObjectFit.COVER);
    t.deepEqual(scanSettings.getBaseSearchArea(), {
        x: 0,
        y: 0,
        width: 1,
        height: 1
    });
    t.is(gui.parentElement.style.maxWidth, "");
    t.is(gui.parentElement.style.maxHeight, "");
    defineConfigurableProperty(gui.videoElement, "videoWidth", 200);
    defineConfigurableProperty(gui.videoElement, "videoHeight", 100);
    gui.setVideoFit(BarcodePicker.ObjectFit.CONTAIN);
    t.is(gui.parentElement.style.maxWidth, "100px");
    t.is(gui.parentElement.style.maxHeight, "50px");
    gui.setVideoFit(BarcodePicker.ObjectFit.COVER);
    t.deepEqual(scanSettings.getBaseSearchArea(), {
        x: 0.25,
        y: 0,
        width: 0.5,
        height: 1
    });
    t.is(gui.parentElement.style.maxWidth, "");
    t.is(gui.parentElement.style.maxHeight, "");
    defineConfigurableProperty(gui.videoElement, "videoWidth", 100);
    defineConfigurableProperty(gui.videoElement, "videoHeight", 200);
    gui.setVideoFit(BarcodePicker.ObjectFit.CONTAIN);
    t.is(gui.parentElement.style.maxWidth, "50px");
    t.is(gui.parentElement.style.maxHeight, "100px");
    gui.setVideoFit(BarcodePicker.ObjectFit.COVER);
    t.deepEqual(scanSettings.getBaseSearchArea(), {
        x: 0,
        y: 0.25,
        width: 1,
        height: 0.5
    });
    t.is(gui.parentElement.style.maxWidth, "");
    t.is(gui.parentElement.style.maxHeight, "");
});
test("resize singleImage", async (t) => {
    const originElement = document.createElement("div");
    const gui = new BarcodePickerGui({
        ...defaultBarcodePickerGuiOptions,
        originElement,
        singleImageMode: true
    });
    t.is(gui.cameraUploadLabelElement.style.transform, "scale(0)");
    defineConfigurableProperty(originElement, "clientWidth", 500);
    defineConfigurableProperty(originElement, "clientHeight", 300);
    gui.resize();
    t.is(gui.cameraUploadLabelElement.style.transform, "scale(1)");
    defineConfigurableProperty(originElement, "clientWidth", 1000);
    defineConfigurableProperty(originElement, "clientHeight", 600);
    gui.resize();
    t.is(gui.cameraUploadLabelElement.style.transform, "scale(1)");
    defineConfigurableProperty(originElement, "clientWidth", 250);
    gui.resize();
    t.is(gui.cameraUploadLabelElement.style.transform, "scale(0.5)");
    defineConfigurableProperty(originElement, "clientHeight", 30);
    gui.resize();
    t.is(gui.cameraUploadLabelElement.style.transform, "scale(0.1)");
    defineConfigurableProperty(originElement, "clientWidth", 5);
    gui.resize();
    t.is(gui.cameraUploadLabelElement.style.transform, "scale(0.01)");
});
// tslint:disable-next-line:max-func-body-length
test("cameraUploadFile", async (t) => {
    function base64StringtoPngFile(base64String) {
        const byteString = atob(base64String);
        const byteArray = new Uint8ClampedArray(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }
        return new File([byteArray], "/test", {
            type: "image/png"
        });
    }
    let imageSettings;
    const scanner = sinon.createStubInstance(Scanner, {
        getScanSettings: new ScanSettings(),
        getImageSettings: sinon.stub().callsFake(() => {
            return imageSettings;
        }),
        applyImageSettings: sinon.stub().callsFake((newImageSettings) => {
            imageSettings = newImageSettings;
            return scanner;
        })
    });
    const gui = new BarcodePickerGui({
        ...defaultBarcodePickerGuiOptions,
        scanner: scanner,
        singleImageMode: true
    });
    Object.defineProperty(Image.prototype, "onprogress", {
        set: (value) => {
            value(new ProgressEvent("progress", {
                loaded: 0,
                total: 100,
                lengthComputable: true
            }));
        }
    });
    gui.cameraUploadFile();
    let fileList = [
        // 4x4 white image
        base64StringtoPngFile("iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAQAAAAD+Fb1AAAAEElEQVR42mP8/58BDBhxMwCn1gf9tpc9tgAAAABJRU5ErkJggg==")
    ];
    defineConfigurableProperty(gui.cameraUploadInputElement, "files", fileList);
    gui.cameraUploadFile();
    await new Promise(resolve => {
        setTimeout(resolve, 200);
    });
    t.deepEqual(scanner.getImageSettings(), {
        width: 4,
        height: 4,
        format: ImageSettings.Format.RGBA_8U
    });
    fileList = [
        // 1600x100 white image
        base64StringtoPngFile(
        // tslint:disable-next-line:max-line-length
        "iVBORw0KGgoAAAANSUhEUgAABkAAAABkCAQAAAB06DQ2AAABz0lEQVR42u3XQREAAAgDINc/9Czh+YIWpB0AAIAXERAAAEBAAAAAAQEAABAQAABAQAAAAAQEAAAQEAAAQEAAAAAEBAAAEBAAAAABAQAABAQAABAQAAAAAQEAAAQEAABAQAAAAAEBAAAEBAAAQEAAAAABAQAAEBAAAEBAAAAAAQEAABAQAABAQAAAAAQEAAAQEAAAQEAAAAAEBAAAEBAAAAABAQAABAQAAEBAAAAAAQEAAAQEAABAQAAAAAEBAAAQEAAAQEAAAAABAQAAEBAAAEBAAAAABAQAABAQAABAQAAAAAQEAAAQEAAAAAEBAAAEBAAAEBAAAAABAQAABAQAAEBAAAAAAQEAAAQEAABAQAAAAAEBAAAQEAAAQEAAAAAEBAAAEBAAAEBAAAAABAQAABAQAAAAAQEAAAQEAAAQEAAAAAEBAAAEBAAAQEAAAAABAQAABAQAAEBAAAAAAQEAABAQAABAQAAAAAEBAAAQEAAAQEAAAAAEBAAAEBAAAEBAAAAABAQAABAQAAAAAQEAAAQEAAAQEAEBAAAEBAAAEBAAAAABAQAABAQAAEBAAAAAAQEAAAQEAABAQAAAAAEBAAAQEAAAQEAAAAABAQAAuLNeC8edzcWfbQAAAABJRU5ErkJggg==")
    ];
    defineConfigurableProperty(gui.cameraUploadInputElement, "files", fileList);
    gui.cameraUploadFile();
    await new Promise(resolve => {
        setTimeout(resolve, 200);
    });
    t.deepEqual(scanner.getImageSettings(), {
        width: 1440,
        height: 90,
        format: ImageSettings.Format.RGBA_8U
    });
    fileList = [
        // 100x1600 white image
        base64StringtoPngFile(
        // tslint:disable-next-line:max-line-length
        "iVBORw0KGgoAAAANSUhEUgAAAGQAAAZACAQAAAAlBi/FAAAE+UlEQVR42u3PAQ0AAAgDIN8/9M2hgwaknRciIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiJy2QLJ03p1wqRRzwAAAABJRU5ErkJggg==")
    ];
    defineConfigurableProperty(gui.cameraUploadInputElement, "files", fileList);
    gui.cameraUploadFile();
    await new Promise(resolve => {
        setTimeout(resolve, 200);
    });
    t.deepEqual(scanner.getImageSettings(), {
        width: 90,
        height: 1440,
        format: ImageSettings.Format.RGBA_8U
    });
});
//# sourceMappingURL=barcodePickerGui.spec.js.map