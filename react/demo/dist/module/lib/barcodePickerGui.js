import { ResizeObserver as ResizeObserverPolyfill } from "@juggle/resize-observer";
// tslint:disable-next-line: variable-name
const ResizeObserver = 
// tslint:disable-next-line: no-any
"ResizeObserver" in window ? /* istanbul ignore next */ window.ResizeObserver : ResizeObserverPolyfill;
import { cameraImage, laserActiveImage, laserPausedImage, scanditLogoImage, switchCameraImage, toggleTorchImage } from "./assets/base64assets";
import { BarcodePicker } from "./barcodePicker";
import { BrowserHelper } from "./browserHelper";
import { Camera } from "./camera";
import { CameraAccess } from "./cameraAccess";
import { ImageSettings } from "./imageSettings";
/**
 * @hidden
 */
export class BarcodePickerGui {
    constructor(options) {
        this.scanner = options.scanner;
        this.originElement = options.originElement;
        this.singleImageMode = options.singleImageMode;
        this.scanningPaused = options.scanningPaused;
        this.cameraUploadCallback = options.cameraUploadCallback;
        this.mirrorImageOverrides = new Map();
        this.grandParentElement = document.createElement("div");
        this.grandParentElement.className = BarcodePickerGui.grandParentElementClassName;
        this.originElement.appendChild(this.grandParentElement);
        this.parentElement = document.createElement("div");
        this.parentElement.className = BarcodePickerGui.parentElementClassName;
        this.grandParentElement.appendChild(this.parentElement);
        this.videoImageCanvasContext = document.createElement("canvas").getContext("2d");
        this.videoElement = document.createElement("video");
        this.cameraSwitcherElement = document.createElement("img");
        this.torchTogglerElement = document.createElement("img");
        this.laserContainerElement = document.createElement("div");
        this.laserActiveImageElement = document.createElement("img");
        this.laserPausedImageElement = document.createElement("img");
        this.viewfinderElement = document.createElement("div");
        if (options.singleImageMode) {
            this.cameraUploadElement = document.createElement("div");
            this.cameraUploadInputElement = document.createElement("input");
            this.cameraUploadLabelElement = document.createElement("label");
            this.cameraUploadProgressElement = document.createElement("div");
            this.setupCameraUploadGuiAssets();
            this.guiStyle = BarcodePicker.GuiStyle.NONE;
        }
        else {
            this.setupVideoElement();
            this.setupCameraSwitcher();
            this.setupTorchToggler();
            this.setupFullGuiAssets();
            this.setGuiStyle(options.guiStyle);
            this.setVideoFit(options.videoFit);
            this.setLaserArea(options.laserArea);
            this.setViewfinderArea(options.viewfinderArea);
            this.visibilityListener = this.checkAndRecoverPlayback.bind(this);
            document.addEventListener("visibilitychange", this.visibilityListener);
            this.newScanSettingsListener = this.handleNewScanSettings.bind(this);
            this.scanner.onNewScanSettings(this.newScanSettingsListener);
            this.handleNewScanSettings();
            this.videoResizeListener = this.handleVideoResize.bind(this);
            this.videoElement.addEventListener("resize", this.videoResizeListener);
        }
        if (options.hideLogo) {
            this.licenseFeaturesReadyListener = this.showScanditLogo.bind(this, options.hideLogo);
            this.scanner.onLicenseFeaturesReady(this.licenseFeaturesReadyListener);
        }
        else {
            this.showScanditLogo(false);
        }
        this.resize();
        this.resizeObserver = new ResizeObserver(() => {
            this.resize();
        });
        this.resizeObserver.observe(this.originElement);
        this.setVisible(options.visible);
    }
    destroy() {
        if (this.visibilityListener != null) {
            document.removeEventListener("visibilitychange", this.visibilityListener);
        }
        if (this.newScanSettingsListener != null) {
            this.scanner.removeListener("newScanSettings", this.newScanSettingsListener);
        }
        if (this.videoResizeListener != null) {
            document.removeEventListener("resize", this.videoResizeListener);
        }
        if (this.licenseFeaturesReadyListener != null) {
            this.scanner.removeListener("licenseFeaturesReady", this.licenseFeaturesReadyListener);
        }
        this.resizeObserver.disconnect();
        this.grandParentElement.remove();
        this.originElement.classList.remove(BarcodePickerGui.hiddenClassName);
    }
    setCameraManager(cameraManager) {
        this.cameraManager = cameraManager;
    }
    pauseScanning() {
        this.scanningPaused = true;
        this.laserActiveImageElement.classList.add(BarcodePickerGui.hiddenOpacityClassName);
        this.laserPausedImageElement.classList.remove(BarcodePickerGui.hiddenOpacityClassName);
        this.viewfinderElement.classList.add(BarcodePickerGui.pausedClassName);
    }
    resumeScanning() {
        this.scanningPaused = false;
        this.laserPausedImageElement.classList.add(BarcodePickerGui.hiddenOpacityClassName);
        this.laserActiveImageElement.classList.remove(BarcodePickerGui.hiddenOpacityClassName);
        this.viewfinderElement.classList.remove(BarcodePickerGui.pausedClassName);
    }
    isVisible() {
        return this.visible;
    }
    setVisible(visible) {
        const browserName = BrowserHelper.userAgentInfo.getBrowser().name;
        if (browserName != null && browserName.includes("Safari") && this.visible != null && !this.visible && visible) {
            // Safari behaves very weirdly when displaying the video element again after being hidden:
            // it undetectably reuses video frames "buffered" from the video just before it was hidden.
            // We do this to avoid reusing old data
            this.videoElement.pause();
            this.videoElement.currentTime = 0;
            this.videoElement.load();
            this.playVideo();
        }
        this.visible = visible;
        if (visible) {
            this.originElement.classList.remove(BarcodePickerGui.hiddenClassName);
            if (this.guiStyle === BarcodePicker.GuiStyle.LASER) {
                this.laserActiveImageElement.classList.remove(BarcodePickerGui.flashColorClassName);
            }
            else if (this.guiStyle === BarcodePicker.GuiStyle.VIEWFINDER) {
                this.viewfinderElement.classList.remove(BarcodePickerGui.flashWhiteClassName);
            }
        }
        else {
            this.originElement.classList.add(BarcodePickerGui.hiddenClassName);
        }
    }
    isMirrorImageEnabled() {
        if (this.cameraManager != null &&
            this.cameraManager.selectedCamera != null &&
            this.cameraManager.activeCamera != null) {
            const mirrorImageOverride = this.mirrorImageOverrides.get(this.cameraManager.activeCamera.deviceId + this.cameraManager.activeCamera.label);
            if (mirrorImageOverride != null) {
                return mirrorImageOverride;
            }
            else {
                return this.cameraManager.activeCamera.cameraType === Camera.Type.FRONT;
            }
        }
        else {
            return false;
        }
    }
    setMirrorImageEnabled(enabled, override) {
        if (this.cameraManager != null && this.cameraManager.selectedCamera != null) {
            if (enabled) {
                this.videoElement.classList.add(BarcodePickerGui.mirroredClassName);
            }
            else {
                this.videoElement.classList.remove(BarcodePickerGui.mirroredClassName);
            }
            if (override) {
                this.mirrorImageOverrides.set(this.cameraManager.selectedCamera.deviceId + this.cameraManager.selectedCamera.label, enabled);
            }
        }
    }
    setGuiStyle(guiStyle) {
        if (this.singleImageMode) {
            return;
        }
        switch (guiStyle) {
            case BarcodePicker.GuiStyle.LASER:
                this.guiStyle = guiStyle;
                this.laserContainerElement.classList.remove(BarcodePickerGui.hiddenClassName);
                this.viewfinderElement.classList.add(BarcodePickerGui.hiddenClassName);
                break;
            case BarcodePicker.GuiStyle.VIEWFINDER:
                this.guiStyle = guiStyle;
                this.laserContainerElement.classList.add(BarcodePickerGui.hiddenClassName);
                this.viewfinderElement.classList.remove(BarcodePickerGui.hiddenClassName);
                break;
            case BarcodePicker.GuiStyle.NONE:
            default:
                this.guiStyle = BarcodePicker.GuiStyle.NONE;
                this.laserContainerElement.classList.add(BarcodePickerGui.hiddenClassName);
                this.viewfinderElement.classList.add(BarcodePickerGui.hiddenClassName);
                break;
        }
    }
    setLaserArea(area) {
        this.customLaserArea = area;
        if (area == null) {
            area = this.scanner.getScanSettings().getSearchArea();
        }
        const borderPercentage = 0.025;
        const usablePercentage = 1 - borderPercentage * 2;
        this.laserContainerElement.style.left = `${(borderPercentage + area.x * usablePercentage) * 100}%`;
        this.laserContainerElement.style.width = `${area.width * usablePercentage * 100}%`;
        this.laserContainerElement.style.top = `${(borderPercentage + area.y * usablePercentage) * 100}%`;
        this.laserContainerElement.style.height = `${area.height * usablePercentage * 100}%`;
    }
    setViewfinderArea(area) {
        this.customViewfinderArea = area;
        if (area == null) {
            area = this.scanner.getScanSettings().getSearchArea();
        }
        const borderPercentage = 0.025;
        const usablePercentage = 1 - borderPercentage * 2;
        this.viewfinderElement.style.left = `${(borderPercentage + area.x * usablePercentage) * 100}%`;
        this.viewfinderElement.style.width = `${area.width * usablePercentage * 100}%`;
        this.viewfinderElement.style.top = `${(borderPercentage + area.y * usablePercentage) * 100}%`;
        this.viewfinderElement.style.height = `${area.height * usablePercentage * 100}%`;
    }
    setVideoFit(objectFit) {
        if (this.singleImageMode) {
            return;
        }
        this.videoFit = objectFit;
        if (objectFit === BarcodePicker.ObjectFit.COVER) {
            this.videoElement.style.objectFit = "cover";
            this.videoElement.dataset.objectFit = "cover"; // used by "objectFitPolyfill" library
        }
        else {
            this.videoElement.style.objectFit = "contain";
            this.videoElement.dataset.objectFit = "contain"; // used by "objectFitPolyfill" library
            this.scanner.applyScanSettings(this.scanner.getScanSettings().setBaseSearchArea({ x: 0, y: 0, width: 1.0, height: 1.0 }));
        }
        this.resize();
    }
    reassignOriginElement(originElement) {
        if (!this.visible) {
            this.originElement.classList.remove(BarcodePickerGui.hiddenClassName);
            originElement.classList.add(BarcodePickerGui.hiddenClassName);
        }
        originElement.appendChild(this.grandParentElement);
        this.checkAndRecoverPlayback();
        this.resize();
        this.resizeObserver.disconnect();
        this.resizeObserver.observe(originElement);
        this.originElement = originElement;
    }
    flashGUI() {
        if (this.guiStyle === BarcodePicker.GuiStyle.LASER) {
            this.flashLaser();
        }
        else if (this.guiStyle === BarcodePicker.GuiStyle.VIEWFINDER) {
            this.flashViewfinder();
        }
    }
    getVideoImageData() {
        if (!this.singleImageMode) {
            // This could happen in very weird situations and should be temporary
            if (this.videoElement.readyState !== 4 ||
                this.videoImageCanvasContext.canvas.width <= 2 ||
                this.videoImageCanvasContext.canvas.height <= 2) {
                return undefined;
            }
            this.videoImageCanvasContext.drawImage(this.videoElement, 0, 0);
        }
        return this.videoImageCanvasContext.getImageData(0, 0, this.videoImageCanvasContext.canvas.width, this.videoImageCanvasContext.canvas.height).data;
    }
    getVideoCurrentTime() {
        return this.videoElement.currentTime;
    }
    setCameraSwitcherVisible(visible) {
        if (visible) {
            this.cameraSwitcherElement.classList.remove(BarcodePickerGui.hiddenClassName);
        }
        else {
            this.cameraSwitcherElement.classList.add(BarcodePickerGui.hiddenClassName);
        }
    }
    setTorchTogglerVisible(visible) {
        if (visible) {
            this.torchTogglerElement.classList.remove(BarcodePickerGui.hiddenClassName);
        }
        else {
            this.torchTogglerElement.classList.add(BarcodePickerGui.hiddenClassName);
        }
    }
    playVideo() {
        const playPromise = this.videoElement.play();
        if (playPromise != null) {
            playPromise.catch(
            /* istanbul ignore next */ () => {
                // Can sometimes cause an incorrect rejection (all is good, ignore).
            });
        }
    }
    setCameraUploadGuiAvailable(available) {
        if (available) {
            this.cameraUploadProgressElement.classList.add(BarcodePickerGui.flashWhiteInsetClassName);
            this.cameraUploadElement.classList.remove(BarcodePickerGui.opacityPulseClassName);
        }
        else {
            this.cameraUploadProgressElement.classList.remove(BarcodePickerGui.flashWhiteInsetClassName);
            this.cameraUploadElement.classList.add(BarcodePickerGui.opacityPulseClassName);
        }
    }
    setupVideoElement() {
        this.videoElement.setAttribute("autoplay", "autoplay");
        this.videoElement.setAttribute("playsinline", "true");
        this.videoElement.setAttribute("muted", "muted");
        this.videoElement.className = BarcodePickerGui.videoElementClassName;
        this.parentElement.appendChild(this.videoElement);
    }
    setupCameraUploadGuiAssets() {
        this.cameraUploadElement.className = BarcodePickerGui.cameraUploadElementClassName;
        this.parentElement.appendChild(this.cameraUploadElement);
        this.cameraUploadInputElement.type = "file";
        this.cameraUploadInputElement.accept = "image/*";
        this.cameraUploadInputElement.setAttribute("capture", "environment");
        this.cameraUploadInputElement.addEventListener("change", this.cameraUploadFile.bind(this));
        this.cameraUploadInputElement.addEventListener("click", 
        /* istanbul ignore next */ event => {
            if (this.scanningPaused || this.scanner.isBusyProcessing()) {
                event.preventDefault();
            }
        });
        this.cameraUploadLabelElement.appendChild(this.cameraUploadInputElement);
        this.cameraUploadElement.appendChild(this.cameraUploadLabelElement);
        const cameraUploadImageElement = document.createElement("img");
        cameraUploadImageElement.src = cameraImage;
        this.cameraUploadLabelElement.appendChild(cameraUploadImageElement);
        const cameraUploadTextElement = document.createElement("div");
        cameraUploadTextElement.innerText = "Scan from Camera";
        this.cameraUploadLabelElement.appendChild(cameraUploadTextElement);
        this.cameraUploadProgressElement.classList.add("radial-progress");
        this.cameraUploadElement.appendChild(this.cameraUploadProgressElement);
    }
    setupFullGuiAssets() {
        this.laserActiveImageElement.src = laserActiveImage;
        this.laserContainerElement.appendChild(this.laserActiveImageElement);
        this.laserPausedImageElement.src = laserPausedImage;
        this.laserContainerElement.appendChild(this.laserPausedImageElement);
        this.laserContainerElement.className = BarcodePickerGui.laserContainerElementClassName;
        this.parentElement.appendChild(this.laserContainerElement);
        this.viewfinderElement.className = BarcodePickerGui.viewfinderElementClassName;
        this.parentElement.appendChild(this.viewfinderElement);
        // Show inactive GUI, as for now the scanner isn't ready yet
        this.laserActiveImageElement.classList.add(BarcodePickerGui.hiddenOpacityClassName);
        this.laserPausedImageElement.classList.remove(BarcodePickerGui.hiddenOpacityClassName);
        this.viewfinderElement.classList.add(BarcodePickerGui.pausedClassName);
    }
    flashLaser() {
        this.laserActiveImageElement.classList.remove(BarcodePickerGui.flashColorClassName);
        // tslint:disable-next-line:no-unused-expression
        this.laserActiveImageElement.offsetHeight; // NOSONAR // Trigger reflow to restart animation
        this.laserActiveImageElement.classList.add(BarcodePickerGui.flashColorClassName);
    }
    flashViewfinder() {
        this.viewfinderElement.classList.remove(BarcodePickerGui.flashWhiteClassName);
        // tslint:disable-next-line:no-unused-expression
        this.viewfinderElement.offsetHeight; // NOSONAR // Trigger reflow to restart animation
        this.viewfinderElement.classList.add(BarcodePickerGui.flashWhiteClassName);
    }
    resize() {
        if (this.singleImageMode) {
            this.resizeCameraUpload();
        }
        else {
            this.resizeVideo();
        }
    }
    resizeCameraUpload() {
        const width = this.originElement.clientWidth;
        const height = this.originElement.clientHeight;
        this.cameraUploadLabelElement.style.transform = `scale(${Math.min(1, width / 500, height / 300)})`;
        this.cameraUploadProgressElement.style.transform = `scale(${Math.min(1, width / 500, height / 300)})`;
    }
    resizeVideo() {
        if (this.videoElement.videoWidth <= 2 || this.videoElement.videoHeight <= 2) {
            return;
        }
        this.parentElement.style.maxWidth = null;
        this.parentElement.style.maxHeight = null;
        let width = this.originElement.clientWidth;
        let height = this.originElement.clientHeight;
        const videoRatio = this.videoElement.videoWidth / this.videoElement.videoHeight;
        if (this.videoFit === BarcodePicker.ObjectFit.COVER) {
            let widthPercentage = 1;
            let heightPercentage = 1;
            if (videoRatio < width / height) {
                heightPercentage = Math.min(1, height / (width / videoRatio));
            }
            else {
                widthPercentage = Math.min(1, width / (height * videoRatio));
            }
            this.scanner.applyScanSettings(this.scanner.getScanSettings().setBaseSearchArea({
                x: (1 - widthPercentage) / 2,
                y: (1 - heightPercentage) / 2,
                width: widthPercentage,
                height: heightPercentage
            }));
            return;
        }
        if (videoRatio > width / height) {
            height = width / videoRatio;
        }
        else {
            width = height * videoRatio;
        }
        this.parentElement.style.maxWidth = `${Math.ceil(width)}px`;
        this.parentElement.style.maxHeight = `${Math.ceil(height)}px`;
        window.objectFitPolyfill(this.videoElement);
    }
    checkAndRecoverPlayback() {
        if (this.cameraManager != null &&
            this.cameraManager.activeCamera != null &&
            this.videoElement != null &&
            this.videoElement.srcObject != null) {
            if (!this.videoElement.srcObject.active) {
                this.cameraManager.reinitializeCamera();
            }
            else {
                this.playVideo();
            }
        }
    }
    updateCameraUploadProgress(progressPercentageValue) {
        this.cameraUploadProgressElement.setAttribute("data-progress", progressPercentageValue);
    }
    async cameraUploadImageLoad(image) {
        this.updateCameraUploadProgress("100");
        let resizedImageWidth;
        let resizedImageHeight;
        const resizedImageSizeLimit = 1440;
        if (image.naturalWidth <= resizedImageSizeLimit && image.naturalHeight <= resizedImageSizeLimit) {
            resizedImageWidth = image.naturalWidth;
            resizedImageHeight = image.naturalHeight;
        }
        else {
            if (image.naturalWidth > image.naturalHeight) {
                resizedImageWidth = resizedImageSizeLimit;
                resizedImageHeight = Math.round((image.naturalHeight / image.naturalWidth) * resizedImageSizeLimit);
            }
            else {
                resizedImageWidth = Math.round((image.naturalWidth / image.naturalHeight) * resizedImageSizeLimit);
                resizedImageHeight = resizedImageSizeLimit;
            }
        }
        await this.cameraUploadFileProcess(image, resizedImageWidth, resizedImageHeight);
    }
    async cameraUploadFileProcess(image, width, height) {
        this.videoImageCanvasContext.canvas.width = width;
        this.videoImageCanvasContext.canvas.height = height;
        this.videoImageCanvasContext.drawImage(image, 0, 0, width, height);
        this.scanner.applyImageSettings({
            width,
            height,
            format: ImageSettings.Format.RGBA_8U
        });
        this.setCameraUploadGuiAvailable(false);
        await this.cameraUploadCallback();
        this.setCameraUploadGuiAvailable(true);
    }
    cameraUploadFile() {
        const files = this.cameraUploadInputElement.files;
        if (files != null && files.length !== 0) {
            const image = new Image();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.cameraUploadInputElement.value = "";
                if (fileReader.result != null) {
                    image.onload = this.cameraUploadImageLoad.bind(this, image);
                    image.onprogress = event2 => {
                        if (event2.lengthComputable) {
                            const progress = Math.round((event2.loaded / event2.total) * 20) * 5;
                            if (progress <= 100) {
                                this.updateCameraUploadProgress(progress.toString());
                            }
                        }
                    };
                    image.src = fileReader.result;
                }
            };
            this.updateCameraUploadProgress("0");
            fileReader.readAsDataURL(files[0]);
        }
    }
    setupCameraSwitcher() {
        this.cameraSwitcherElement.src = switchCameraImage;
        this.cameraSwitcherElement.className = BarcodePickerGui.cameraSwitcherElementClassName;
        this.cameraSwitcherElement.classList.add(BarcodePickerGui.hiddenClassName);
        this.parentElement.appendChild(this.cameraSwitcherElement);
        ["touchstart", "mousedown"].forEach(eventName => {
            this.cameraSwitcherElement.addEventListener(eventName, async (event) => {
                if (this.cameraManager != null) {
                    const cameraManager = this.cameraManager;
                    event.preventDefault();
                    try {
                        const cameras = await CameraAccess.getCameras();
                        const newCameraIndex = (cameras.findIndex(camera => {
                            return (camera.deviceId ===
                                (cameraManager.activeCamera == null ? camera.deviceId : cameraManager.activeCamera.deviceId));
                        }) +
                            1) %
                            cameras.length;
                        cameraManager
                            .initializeCameraWithSettings(cameras[newCameraIndex], cameraManager.activeCameraSettings)
                            .catch(console.error);
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            });
        });
    }
    setupTorchToggler() {
        this.torchTogglerElement.src = toggleTorchImage;
        this.torchTogglerElement.className = BarcodePickerGui.torchTogglerElementClassName;
        this.torchTogglerElement.classList.add(BarcodePickerGui.hiddenClassName);
        this.parentElement.appendChild(this.torchTogglerElement);
        ["touchstart", "mousedown"].forEach(eventName => {
            this.torchTogglerElement.addEventListener(eventName, event => {
                if (this.cameraManager != null) {
                    event.preventDefault();
                    this.cameraManager.toggleTorch();
                }
            });
        });
    }
    showScanditLogo(hideLogo, licenseFeatures) {
        if (hideLogo &&
            licenseFeatures != null &&
            licenseFeatures.hiddenScanditLogoAllowed != null &&
            licenseFeatures.hiddenScanditLogoAllowed) {
            return;
        }
        const scanditLogoImageElement = document.createElement("img");
        scanditLogoImageElement.src = scanditLogoImage;
        scanditLogoImageElement.className = BarcodePickerGui.scanditLogoImageElementClassName;
        this.parentElement.appendChild(scanditLogoImageElement);
    }
    handleNewScanSettings() {
        if (this.customLaserArea == null) {
            this.setLaserArea();
        }
        if (this.customViewfinderArea == null) {
            this.setViewfinderArea();
        }
    }
    handleVideoResize() {
        if (this.videoImageCanvasContext.canvas.width === this.videoElement.videoWidth &&
            this.videoImageCanvasContext.canvas.height === this.videoElement.videoHeight) {
            return;
        }
        this.videoImageCanvasContext.canvas.width = this.videoElement.videoWidth;
        this.videoImageCanvasContext.canvas.height = this.videoElement.videoHeight;
        this.scanner.applyImageSettings({
            width: this.videoElement.videoWidth,
            height: this.videoElement.videoHeight,
            format: ImageSettings.Format.RGBA_8U
        });
        this.resize();
    }
}
BarcodePickerGui.grandParentElementClassName = "scandit scandit-container";
BarcodePickerGui.parentElementClassName = "scandit scandit-barcode-picker";
BarcodePickerGui.hiddenClassName = "scandit-hidden";
BarcodePickerGui.hiddenOpacityClassName = "scandit-hidden-opacity";
BarcodePickerGui.videoElementClassName = "scandit-video";
BarcodePickerGui.scanditLogoImageElementClassName = "scandit-logo";
BarcodePickerGui.laserContainerElementClassName = "scandit-laser";
BarcodePickerGui.viewfinderElementClassName = "scandit-viewfinder";
BarcodePickerGui.cameraSwitcherElementClassName = "scandit-camera-switcher";
BarcodePickerGui.torchTogglerElementClassName = "scandit-torch-toggle";
BarcodePickerGui.cameraUploadElementClassName = "scandit-camera-upload";
BarcodePickerGui.flashColorClassName = "scandit-flash-color";
BarcodePickerGui.flashWhiteClassName = "scandit-flash-white";
BarcodePickerGui.flashWhiteInsetClassName = "scandit-flash-white-inset";
BarcodePickerGui.opacityPulseClassName = "scandit-opacity-pulse";
BarcodePickerGui.mirroredClassName = "mirrored";
BarcodePickerGui.pausedClassName = "paused";
//# sourceMappingURL=barcodePickerGui.js.map