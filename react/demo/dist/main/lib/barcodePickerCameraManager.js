"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var camera_1 = require("./camera");
var cameraAccess_1 = require("./cameraAccess");
var cameraManager_1 = require("./cameraManager");
var cameraSettings_1 = require("./cameraSettings");
var customError_1 = require("./customError");
/**
 * @hidden
 */
var MeteringMode;
(function (MeteringMode) {
    MeteringMode["CONTINUOUS"] = "continuous";
    MeteringMode["MANUAL"] = "manual";
    MeteringMode["NONE"] = "none";
    MeteringMode["SINGLE_SHOT"] = "single-shot";
})(MeteringMode = exports.MeteringMode || (exports.MeteringMode = {}));
/**
 * @hidden
 *
 * A barcode picker utility class used to handle camera interaction.
 */
var BarcodePickerCameraManager = /** @class */ (function (_super) {
    tslib_1.__extends(BarcodePickerCameraManager, _super);
    function BarcodePickerCameraManager(triggerFatalError, barcodePickerGui) {
        var _this = _super.call(this) || this;
        _this.postStreamInitializationListener = _this.postStreamInitialization.bind(_this);
        _this.videoTrackUnmuteListener = _this.videoTrackUnmuteRecovery.bind(_this);
        _this.triggerManualFocusListener = _this.triggerManualFocus.bind(_this);
        _this.triggerZoomStartListener = _this.triggerZoomStart.bind(_this);
        _this.triggerZoomMoveListener = _this.triggerZoomMove.bind(_this);
        _this.triggerFatalError = triggerFatalError;
        _this.barcodePickerGui = barcodePickerGui;
        return _this;
    }
    BarcodePickerCameraManager.prototype.setInteractionOptions = function (cameraSwitcherEnabled, torchToggleEnabled, tapToFocusEnabled, pinchToZoomEnabled) {
        this.cameraSwitcherEnabled = cameraSwitcherEnabled;
        this.torchToggleEnabled = torchToggleEnabled;
        this.tapToFocusEnabled = tapToFocusEnabled;
        this.pinchToZoomEnabled = pinchToZoomEnabled;
    };
    BarcodePickerCameraManager.prototype.isCameraSwitcherEnabled = function () {
        return this.cameraSwitcherEnabled;
    };
    BarcodePickerCameraManager.prototype.setCameraSwitcherEnabled = function (enabled) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cameras;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cameraSwitcherEnabled = enabled;
                        if (!this.cameraSwitcherEnabled) return [3 /*break*/, 2];
                        return [4 /*yield*/, cameraAccess_1.CameraAccess.getCameras()];
                    case 1:
                        cameras = _a.sent();
                        if (cameras.length > 1) {
                            this.barcodePickerGui.setCameraSwitcherVisible(true);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.barcodePickerGui.setCameraSwitcherVisible(false);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.isTorchToggleEnabled = function () {
        return this.torchToggleEnabled;
    };
    BarcodePickerCameraManager.prototype.setTorchToggleEnabled = function (enabled) {
        this.torchToggleEnabled = enabled;
        if (this.torchToggleEnabled) {
            if (this.mediaStream != null &&
                this.mediaTrackCapabilities != null &&
                this.mediaTrackCapabilities.torch != null &&
                this.mediaTrackCapabilities.torch) {
                this.barcodePickerGui.setTorchTogglerVisible(true);
            }
        }
        else {
            this.barcodePickerGui.setTorchTogglerVisible(false);
        }
    };
    BarcodePickerCameraManager.prototype.isTapToFocusEnabled = function () {
        return this.tapToFocusEnabled;
    };
    BarcodePickerCameraManager.prototype.setTapToFocusEnabled = function (enabled) {
        this.tapToFocusEnabled = enabled;
        if (this.mediaStream != null) {
            if (this.tapToFocusEnabled) {
                this.enableTapToFocusListeners();
            }
            else {
                this.disableTapToFocusListeners();
            }
        }
    };
    BarcodePickerCameraManager.prototype.isPinchToZoomEnabled = function () {
        return this.pinchToZoomEnabled;
    };
    BarcodePickerCameraManager.prototype.setPinchToZoomEnabled = function (enabled) {
        this.pinchToZoomEnabled = enabled;
        if (this.mediaStream != null) {
            if (this.pinchToZoomEnabled) {
                this.enablePinchToZoomListeners();
            }
            else {
                this.disablePinchToZoomListeners();
            }
        }
    };
    BarcodePickerCameraManager.prototype.setSelectedCamera = function (camera) {
        this.selectedCamera = camera;
    };
    BarcodePickerCameraManager.prototype.setSelectedCameraSettings = function (cameraSettings) {
        this.selectedCameraSettings = cameraSettings;
    };
    BarcodePickerCameraManager.prototype.setupCameras = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mediaStreamTrack, cameras, mainCamera, autoselectedCamera;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.cameraInitializationPromise != null) {
                            return [2 /*return*/, this.cameraInitializationPromise];
                        }
                        return [4 /*yield*/, this.accessInitialCamera()];
                    case 1:
                        mediaStreamTrack = _a.sent();
                        return [4 /*yield*/, cameraAccess_1.CameraAccess.getCameras()];
                    case 2:
                        cameras = _a.sent();
                        if (this.cameraSwitcherEnabled && cameras.length > 1) {
                            this.barcodePickerGui.setCameraSwitcherVisible(true);
                        }
                        if (mediaStreamTrack != null) {
                            mainCamera = cameraAccess_1.CameraAccess.adjustCamerasFromMainCameraStream(mediaStreamTrack, cameras);
                            if (mainCamera != null) {
                                this.selectedCamera = mainCamera;
                                this.updateActiveCameraCurrentResolution(mainCamera);
                                return [2 /*return*/, Promise.resolve()];
                            }
                            this.setSelectedCamera();
                        }
                        if (this.selectedCamera == null) {
                            autoselectedCamera = cameras
                                .filter(function (camera) {
                                return camera.cameraType === camera_1.Camera.Type.BACK;
                            })
                                .sort(function (camera1, camera2) {
                                return camera1.label.localeCompare(camera2.label);
                            })[0];
                            if (autoselectedCamera == null) {
                                autoselectedCamera = cameras[0];
                                if (autoselectedCamera == null) {
                                    throw new customError_1.CustomError(BarcodePickerCameraManager.noCameraErrorParameters);
                                }
                            }
                            return [2 /*return*/, this.initializeCameraWithSettings(autoselectedCamera, this.selectedCameraSettings)];
                        }
                        else {
                            return [2 /*return*/, this.initializeCameraWithSettings(this.selectedCamera, this.selectedCameraSettings)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.stopStream = function () {
        if (this.activeCamera != null) {
            this.activeCamera.currentResolution = undefined;
        }
        this.activeCamera = undefined;
        if (this.mediaStream != null) {
            window.clearTimeout(this.cameraAccessTimeout);
            window.clearInterval(this.cameraMetadataCheckInterval);
            window.clearTimeout(this.getCapabilitiesTimeout);
            window.clearTimeout(this.manualFocusWaitTimeout);
            window.clearTimeout(this.manualToAutofocusResumeTimeout);
            window.clearInterval(this.autofocusInterval);
            this.mediaStream.getVideoTracks().forEach(function (track) {
                track.stop();
            });
            this.mediaStream = undefined;
            this.mediaTrackCapabilities = undefined;
        }
    };
    BarcodePickerCameraManager.prototype.applyCameraSettings = function (cameraSettings) {
        this.selectedCameraSettings = cameraSettings;
        if (this.activeCamera == null) {
            return Promise.reject(new customError_1.CustomError(BarcodePickerCameraManager.noCameraErrorParameters));
        }
        return this.initializeCameraWithSettings(this.activeCamera, cameraSettings);
    };
    BarcodePickerCameraManager.prototype.reinitializeCamera = function () {
        if (this.activeCamera != null) {
            this.initializeCameraWithSettings(this.activeCamera, this.activeCameraSettings).catch(this.triggerFatalError);
        }
    };
    BarcodePickerCameraManager.prototype.initializeCameraWithSettings = function (camera, cameraSettings) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var existingCameraInitializationPromise;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        existingCameraInitializationPromise = Promise.resolve();
                        if (this.cameraInitializationPromise != null) {
                            existingCameraInitializationPromise = this.cameraInitializationPromise;
                        }
                        return [4 /*yield*/, existingCameraInitializationPromise];
                    case 1:
                        _a.sent();
                        this.setSelectedCamera(camera);
                        this.selectedCameraSettings = this.activeCameraSettings = cameraSettings;
                        if (cameraSettings != null && cameraSettings.resolutionPreference === cameraSettings_1.CameraSettings.ResolutionPreference.FULL_HD) {
                            this.cameraInitializationPromise = this.initializeCameraAndCheckUpdatedSettings(camera);
                        }
                        else {
                            this.cameraInitializationPromise = this.initializeCameraAndCheckUpdatedSettings(camera, 3);
                        }
                        return [2 /*return*/, this.cameraInitializationPromise];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.setTorchEnabled = function (enabled) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var videoTracks;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mediaStream != null &&
                            this.mediaTrackCapabilities != null &&
                            this.mediaTrackCapabilities.torch != null &&
                            this.mediaTrackCapabilities.torch)) return [3 /*break*/, 2];
                        this.torchEnabled = enabled;
                        videoTracks = this.mediaStream.getVideoTracks();
                        if (!(videoTracks.length !== 0 && typeof videoTracks[0].applyConstraints === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, videoTracks[0].applyConstraints({ advanced: [{ torch: enabled }] })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.toggleTorch = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.torchEnabled = !this.torchEnabled;
                        return [4 /*yield*/, this.setTorchEnabled(this.torchEnabled)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.setZoom = function (zoomPercentage, currentZoom) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var videoTracks, zoomRange, targetZoom;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.mediaStream != null && this.mediaTrackCapabilities != null && this.mediaTrackCapabilities.zoom != null)) return [3 /*break*/, 2];
                        videoTracks = this.mediaStream.getVideoTracks();
                        if (!(videoTracks.length !== 0 && typeof videoTracks[0].applyConstraints === "function")) return [3 /*break*/, 2];
                        zoomRange = this.mediaTrackCapabilities.zoom.max - this.mediaTrackCapabilities.zoom.min;
                        if (currentZoom == null) {
                            currentZoom = this.mediaTrackCapabilities.zoom.min;
                        }
                        targetZoom = Math.max(this.mediaTrackCapabilities.zoom.min, Math.min(currentZoom + zoomRange * zoomPercentage, this.mediaTrackCapabilities.zoom.max));
                        return [4 /*yield*/, videoTracks[0].applyConstraints({
                                advanced: [{ zoom: targetZoom }]
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.accessInitialCamera = function () {
        var _this = this;
        var initialCameraAccessPromise = Promise.resolve();
        if (this.selectedCamera == null) {
            // Try to directly access primary (back or only) camera
            var primaryCamera_1 = {
                deviceId: "",
                label: "",
                cameraType: camera_1.Camera.Type.BACK
            };
            initialCameraAccessPromise = new Promise(function (resolve) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var videoTracks, _a;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, 3, 4]);
                            return [4 /*yield*/, this.initializeCameraWithSettings(primaryCamera_1, this.selectedCameraSettings)];
                        case 1:
                            _b.sent();
                            if (this.mediaStream != null) {
                                videoTracks = this.mediaStream.getVideoTracks();
                                if (videoTracks.length !== 0) {
                                    return [2 /*return*/, resolve(videoTracks[0])];
                                }
                            }
                            return [3 /*break*/, 4];
                        case 2:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            resolve();
                            return [7 /*endfinally*/];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        }
        return initialCameraAccessPromise;
    };
    BarcodePickerCameraManager.prototype.updateActiveCameraCurrentResolution = function (camera) {
        this.activeCamera = camera;
        this.activeCamera.currentResolution = {
            width: this.barcodePickerGui.videoElement.videoWidth,
            height: this.barcodePickerGui.videoElement.videoHeight
        };
        this.barcodePickerGui.setMirrorImageEnabled(this.barcodePickerGui.isMirrorImageEnabled(), false);
    };
    BarcodePickerCameraManager.prototype.postStreamInitialization = function () {
        var _this = this;
        window.clearTimeout(this.getCapabilitiesTimeout);
        this.getCapabilitiesTimeout = window.setTimeout(function () {
            _this.storeStreamCapabilities();
            _this.setupAutofocus();
            if (_this.torchToggleEnabled &&
                _this.mediaStream != null &&
                _this.mediaTrackCapabilities != null &&
                _this.mediaTrackCapabilities.torch != null &&
                _this.mediaTrackCapabilities.torch) {
                _this.barcodePickerGui.setTorchTogglerVisible(true);
            }
        }, BarcodePickerCameraManager.getCapabilitiesTimeoutMs);
    };
    BarcodePickerCameraManager.prototype.videoTrackUnmuteRecovery = function () {
        this.reinitializeCamera();
    };
    BarcodePickerCameraManager.prototype.triggerManualFocusForContinuous = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.manualToAutofocusResumeTimeout = window.setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.triggerFocusMode(MeteringMode.CONTINUOUS)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.triggerFocusMode(MeteringMode.CONTINUOUS)];
                    case 2:
                        _b.sent();
                        this.manualFocusWaitTimeout = window.setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.triggerFocusMode(MeteringMode.MANUAL)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, BarcodePickerCameraManager.manualFocusWaitTimeoutMs);
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.triggerManualFocusForSingleShot = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        window.clearInterval(this.autofocusInterval);
                        this.manualToAutofocusResumeTimeout = window.setTimeout(function () {
                            _this.autofocusInterval = window.setInterval(_this.triggerAutoFocus.bind(_this), BarcodePickerCameraManager.autofocusIntervalMs);
                        }, BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.triggerFocusMode(MeteringMode.SINGLE_SHOT)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.triggerManualFocus = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var focusModeCapability;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (event != null) {
                            event.preventDefault();
                            if (event.type === "touchend" && event.touches.length !== 0) {
                                return [2 /*return*/];
                            }
                            // Check if we were using pinch-to-zoom
                            if (this.pinchToZoomDistance != null) {
                                this.pinchToZoomDistance = undefined;
                                return [2 /*return*/];
                            }
                        }
                        window.clearTimeout(this.manualFocusWaitTimeout);
                        window.clearTimeout(this.manualToAutofocusResumeTimeout);
                        if (!(this.mediaStream != null && this.mediaTrackCapabilities != null)) return [3 /*break*/, 4];
                        focusModeCapability = this.mediaTrackCapabilities.focusMode;
                        if (!(focusModeCapability instanceof Array && focusModeCapability.includes(MeteringMode.SINGLE_SHOT))) return [3 /*break*/, 4];
                        if (!(focusModeCapability.includes(MeteringMode.CONTINUOUS) &&
                            focusModeCapability.includes(MeteringMode.MANUAL))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.triggerManualFocusForContinuous()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        if (!!focusModeCapability.includes(MeteringMode.CONTINUOUS)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.triggerManualFocusForSingleShot()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.triggerZoomStart = function (event) {
        if (event == null || event.touches.length !== 2) {
            return;
        }
        event.preventDefault();
        this.pinchToZoomDistance = Math.hypot((event.touches[1].screenX - event.touches[0].screenX) / screen.width, (event.touches[1].screenY - event.touches[0].screenY) / screen.height);
        if (this.mediaStream != null && this.mediaTrackCapabilities != null && this.mediaTrackCapabilities.zoom != null) {
            var videoTracks = this.mediaStream.getVideoTracks();
            // istanbul ignore else
            if (videoTracks.length !== 0 && typeof videoTracks[0].getConstraints === "function") {
                this.pinchToZoomInitialZoom = this.mediaTrackCapabilities.zoom.min;
                var currentConstraints = videoTracks[0].getConstraints();
                if (currentConstraints.advanced != null) {
                    var currentZoomConstraint = currentConstraints.advanced.find(function (constraint) {
                        return "zoom" in constraint;
                    });
                    if (currentZoomConstraint != null && currentZoomConstraint.zoom != null) {
                        this.pinchToZoomInitialZoom = currentZoomConstraint.zoom;
                    }
                }
            }
        }
    };
    BarcodePickerCameraManager.prototype.triggerZoomMove = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pinchToZoomDistance == null || event == null || event.touches.length !== 2) {
                            return [2 /*return*/];
                        }
                        event.preventDefault();
                        return [4 /*yield*/, this.setZoom((Math.hypot((event.touches[1].screenX - event.touches[0].screenX) / screen.width, (event.touches[1].screenY - event.touches[0].screenY) / screen.height) -
                                this.pinchToZoomDistance) *
                                2, this.pinchToZoomInitialZoom)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.storeStreamCapabilities = function () {
        // istanbul ignore else
        if (this.mediaStream != null) {
            var videoTracks = this.mediaStream.getVideoTracks();
            // istanbul ignore else
            if (videoTracks.length !== 0 && typeof videoTracks[0].getCapabilities === "function") {
                this.mediaTrackCapabilities = videoTracks[0].getCapabilities();
            }
        }
    };
    BarcodePickerCameraManager.prototype.setupAutofocus = function () {
        window.clearTimeout(this.manualFocusWaitTimeout);
        window.clearTimeout(this.manualToAutofocusResumeTimeout);
        // istanbul ignore else
        if (this.mediaStream != null && this.mediaTrackCapabilities != null) {
            var focusModeCapability = this.mediaTrackCapabilities.focusMode;
            if (focusModeCapability instanceof Array &&
                !focusModeCapability.includes(MeteringMode.CONTINUOUS) &&
                focusModeCapability.includes(MeteringMode.SINGLE_SHOT)) {
                window.clearInterval(this.autofocusInterval);
                this.autofocusInterval = window.setInterval(this.triggerAutoFocus.bind(this), BarcodePickerCameraManager.autofocusIntervalMs);
            }
        }
    };
    BarcodePickerCameraManager.prototype.triggerAutoFocus = function () {
        this.triggerFocusMode(MeteringMode.SINGLE_SHOT).catch(
        /* istanbul ignore next */ function () {
            // Ignored
        });
    };
    BarcodePickerCameraManager.prototype.triggerFocusMode = function (focusMode) {
        // istanbul ignore else
        if (this.mediaStream != null) {
            var videoTracks = this.mediaStream.getVideoTracks();
            if (videoTracks.length !== 0 && typeof videoTracks[0].applyConstraints === "function") {
                return videoTracks[0].applyConstraints({ advanced: [{ focusMode: focusMode }] });
            }
        }
        return Promise.reject(undefined);
    };
    BarcodePickerCameraManager.prototype.enableTapToFocusListeners = function () {
        var _this = this;
        ["touchend", "mousedown"].forEach(function (eventName) {
            _this.barcodePickerGui.videoElement.addEventListener(eventName, _this.triggerManualFocusListener);
        });
    };
    BarcodePickerCameraManager.prototype.enablePinchToZoomListeners = function () {
        this.barcodePickerGui.videoElement.addEventListener("touchstart", this.triggerZoomStartListener);
        this.barcodePickerGui.videoElement.addEventListener("touchmove", this.triggerZoomMoveListener);
    };
    BarcodePickerCameraManager.prototype.disableTapToFocusListeners = function () {
        var _this = this;
        ["touchend", "mousedown"].forEach(function (eventName) {
            _this.barcodePickerGui.videoElement.removeEventListener(eventName, _this.triggerManualFocusListener);
        });
    };
    BarcodePickerCameraManager.prototype.disablePinchToZoomListeners = function () {
        this.barcodePickerGui.videoElement.removeEventListener("touchstart", this.triggerZoomStartListener);
        this.barcodePickerGui.videoElement.removeEventListener("touchmove", this.triggerZoomMoveListener);
    };
    BarcodePickerCameraManager.prototype.initializeCameraAndCheckUpdatedSettings = function (camera, resolutionFallbackLevel) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 2, 3]);
                        return [4 /*yield*/, this.initializeCamera(camera, resolutionFallbackLevel)];
                    case 1:
                        _a.sent();
                        // Check if due to asynchronous behaviour camera settings were changed while camera was initialized
                        if (this.selectedCameraSettings !== this.activeCameraSettings &&
                            (this.selectedCameraSettings == null ||
                                this.activeCameraSettings == null ||
                                Object.keys(this.selectedCameraSettings).some(function (cameraSettingsProperty) {
                                    return (_this.selectedCameraSettings[cameraSettingsProperty] !==
                                        _this.activeCameraSettings[cameraSettingsProperty]);
                                }))) {
                            this.activeCameraSettings = this.selectedCameraSettings;
                            return [2 /*return*/, this.initializeCameraAndCheckUpdatedSettings(camera, resolutionFallbackLevel)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.cameraInitializationPromise = undefined;
                        return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.retryInitializeCameraIfNeeded = function (camera, resolutionFallbackLevel, resolve, reject, error) {
        if (resolutionFallbackLevel < 6) {
            return this.initializeCamera(camera, resolutionFallbackLevel + 1)
                .then(resolve)
                .catch(reject);
        }
        else {
            return reject(error);
        }
    };
    BarcodePickerCameraManager.prototype.handleCameraInitializationError = function (error, resolutionFallbackLevel, camera, resolve, reject) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cameras, newCamera;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // istanbul ignore if
                        if (error.name === "SourceUnavailableError") {
                            error.name = "NotReadableError";
                        }
                        if (!(error.message === "Invalid constraint" ||
                            // tslint:disable-next-line:no-any
                            (error.name === "OverconstrainedError" && error.constraint === "deviceId"))) return [3 /*break*/, 2];
                        return [4 /*yield*/, cameraAccess_1.CameraAccess.getCameras()];
                    case 1:
                        cameras = _a.sent();
                        newCamera = cameras.find(function (currentCamera) {
                            return (currentCamera.label === camera.label &&
                                currentCamera.cameraType === camera.cameraType &&
                                currentCamera.deviceId !== camera.deviceId);
                        });
                        if (newCamera == null) {
                            return [2 /*return*/, this.retryInitializeCameraIfNeeded(camera, resolutionFallbackLevel, resolve, reject, error)];
                        }
                        else {
                            return [2 /*return*/, this.initializeCamera(newCamera, resolutionFallbackLevel)
                                    .then(resolve)
                                    .catch(reject)];
                        }
                        _a.label = 2;
                    case 2:
                        if (["PermissionDeniedError", "PermissionDismissedError", "NotAllowedError", "NotFoundError", "AbortError"].includes(error.name)) {
                            // Camera is not accessible at all
                            return [2 /*return*/, reject(error)];
                        }
                        return [2 /*return*/, this.retryInitializeCameraIfNeeded(camera, resolutionFallbackLevel, resolve, reject, error)];
                }
            });
        });
    };
    BarcodePickerCameraManager.prototype.initializeCamera = function (camera, resolutionFallbackLevel) {
        var _this = this;
        if (resolutionFallbackLevel === void 0) { resolutionFallbackLevel = 0; }
        if (camera == null) {
            return Promise.reject(new customError_1.CustomError(BarcodePickerCameraManager.noCameraErrorParameters));
        }
        this.stopStream();
        this.torchEnabled = false;
        this.barcodePickerGui.setTorchTogglerVisible(false);
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var stream, mediaTrackSettings, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 4]);
                        return [4 /*yield*/, cameraAccess_1.CameraAccess.accessCameraStream(resolutionFallbackLevel, camera)];
                    case 1:
                        stream = _a.sent();
                        // Detect weird browser behaviour that on unsupported resolution returns a 2x2 video instead
                        if (typeof stream.getTracks()[0].getSettings === "function") {
                            mediaTrackSettings = stream.getTracks()[0].getSettings();
                            if (mediaTrackSettings.width != null &&
                                mediaTrackSettings.height != null &&
                                (mediaTrackSettings.width === 2 || mediaTrackSettings.height === 2)) {
                                if (resolutionFallbackLevel === 6) {
                                    return [2 /*return*/, reject(new customError_1.CustomError({ name: "NotReadableError", message: "Could not initialize camera correctly" }))];
                                }
                                else {
                                    return [2 /*return*/, this.initializeCamera(camera, resolutionFallbackLevel + 1)
                                            .then(resolve)
                                            .catch(reject)];
                                }
                            }
                        }
                        this.mediaStream = stream;
                        this.mediaStream.getVideoTracks().forEach(function (track) {
                            // Reinitialize camera on weird pause/resumption coming from the OS
                            // This will add the listener only once in the case of multiple calls, identical listeners are ignored
                            track.addEventListener("unmute", _this.videoTrackUnmuteListener);
                        });
                        // This will add the listener only once in the case of multiple calls, identical listeners are ignored
                        this.barcodePickerGui.videoElement.addEventListener("loadedmetadata", this.postStreamInitializationListener);
                        if (this.tapToFocusEnabled) {
                            this.enableTapToFocusListeners();
                        }
                        if (this.pinchToZoomEnabled) {
                            this.enablePinchToZoomListeners();
                        }
                        this.resolveInitializeCamera(camera, resolve, reject);
                        this.barcodePickerGui.videoElement.srcObject = stream;
                        this.barcodePickerGui.videoElement.load();
                        this.barcodePickerGui.playVideo();
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        return [4 /*yield*/, this.handleCameraInitializationError(error_1, resolutionFallbackLevel, camera, resolve, reject)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    BarcodePickerCameraManager.prototype.resolveInitializeCamera = function (camera, resolve, reject) {
        var _this = this;
        var cameraNotReadableError = new customError_1.CustomError({
            name: "NotReadableError",
            message: "Could not initialize camera correctly"
        });
        window.clearTimeout(this.cameraAccessTimeout);
        this.cameraAccessTimeout = window.setTimeout(function () {
            _this.stopStream();
            reject(cameraNotReadableError);
        }, BarcodePickerCameraManager.cameraAccessTimeoutMs);
        this.barcodePickerGui.videoElement.onresize = function () {
            _this.updateActiveCameraCurrentResolution(camera);
        };
        this.barcodePickerGui.videoElement.onloadeddata = function () {
            _this.barcodePickerGui.videoElement.onloadeddata = null;
            window.clearTimeout(_this.cameraAccessTimeout);
            // Detect weird browser behaviour that on unsupported resolution returns a 2x2 video instead
            // Also detect failed camera access with no error but also no video stream provided
            if (_this.barcodePickerGui.videoElement.videoWidth > 2 &&
                _this.barcodePickerGui.videoElement.videoHeight > 2 &&
                _this.barcodePickerGui.videoElement.currentTime > 0) {
                if (camera.deviceId !== "") {
                    _this.updateActiveCameraCurrentResolution(camera);
                }
                return resolve();
            }
            var cameraMetadataCheckStartTime = performance.now();
            window.clearInterval(_this.cameraMetadataCheckInterval);
            _this.cameraMetadataCheckInterval = window.setInterval(function () {
                // Detect weird browser behaviour that on unsupported resolution returns a 2x2 video instead
                // Also detect failed camera access with no error but also no video stream provided
                if (_this.barcodePickerGui.videoElement.videoWidth === 2 ||
                    _this.barcodePickerGui.videoElement.videoHeight === 2 ||
                    _this.barcodePickerGui.videoElement.currentTime === 0) {
                    if (performance.now() - cameraMetadataCheckStartTime >
                        BarcodePickerCameraManager.cameraMetadataCheckTimeoutMs) {
                        window.clearInterval(_this.cameraMetadataCheckInterval);
                        _this.stopStream();
                        return reject(cameraNotReadableError);
                    }
                    return;
                }
                window.clearInterval(_this.cameraMetadataCheckInterval);
                if (camera.deviceId !== "") {
                    _this.updateActiveCameraCurrentResolution(camera);
                    _this.barcodePickerGui.videoElement.dispatchEvent(new Event("canplay"));
                }
                return resolve();
            }, BarcodePickerCameraManager.cameraMetadataCheckIntervalMs);
        };
    };
    BarcodePickerCameraManager.cameraAccessTimeoutMs = 4000;
    BarcodePickerCameraManager.cameraMetadataCheckTimeoutMs = 4000;
    BarcodePickerCameraManager.cameraMetadataCheckIntervalMs = 50;
    BarcodePickerCameraManager.getCapabilitiesTimeoutMs = 500;
    BarcodePickerCameraManager.autofocusIntervalMs = 1500;
    BarcodePickerCameraManager.manualToAutofocusResumeTimeoutMs = 5000;
    BarcodePickerCameraManager.manualFocusWaitTimeoutMs = 400;
    BarcodePickerCameraManager.noCameraErrorParameters = {
        name: "NoCameraAvailableError",
        message: "No camera available"
    };
    return BarcodePickerCameraManager;
}(cameraManager_1.CameraManager));
exports.BarcodePickerCameraManager = BarcodePickerCameraManager;
//# sourceMappingURL=barcodePickerCameraManager.js.map