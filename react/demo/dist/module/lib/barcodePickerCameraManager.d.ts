import { BarcodePickerGui } from "./barcodePickerGui";
import { Camera } from "./camera";
import { CameraManager } from "./cameraManager";
import { CameraSettings } from "./cameraSettings";
/**
 * @hidden
 */
export declare enum MeteringMode {
    CONTINUOUS = "continuous",
    MANUAL = "manual",
    NONE = "none",
    SINGLE_SHOT = "single-shot"
}
/**
 * @hidden
 */
export interface ExtendedMediaTrackCapabilities extends MediaTrackCapabilities {
    focusMode?: MeteringMode[];
    torch?: boolean;
    zoom?: {
        max: number;
        min: number;
        step: number;
    };
}
/**
 * @hidden
 */
export interface ExtendedMediaTrackConstraintSet extends MediaTrackConstraintSet {
    torch?: boolean;
    zoom?: number;
}
/**
 * @hidden
 *
 * A barcode picker utility class used to handle camera interaction.
 */
export declare class BarcodePickerCameraManager extends CameraManager {
    private static readonly cameraAccessTimeoutMs;
    private static readonly cameraMetadataCheckTimeoutMs;
    private static readonly cameraMetadataCheckIntervalMs;
    private static readonly getCapabilitiesTimeoutMs;
    private static readonly autofocusIntervalMs;
    private static readonly manualToAutofocusResumeTimeoutMs;
    private static readonly manualFocusWaitTimeoutMs;
    private static readonly noCameraErrorParameters;
    private readonly triggerFatalError;
    private readonly barcodePickerGui;
    private readonly postStreamInitializationListener;
    private readonly videoTrackUnmuteListener;
    private readonly triggerManualFocusListener;
    private readonly triggerZoomStartListener;
    private readonly triggerZoomMoveListener;
    private selectedCameraSettings?;
    private mediaStream?;
    private mediaTrackCapabilities?;
    private cameraAccessTimeout;
    private cameraMetadataCheckInterval;
    private getCapabilitiesTimeout;
    private autofocusInterval;
    private manualToAutofocusResumeTimeout;
    private manualFocusWaitTimeout;
    private cameraSwitcherEnabled;
    private torchToggleEnabled;
    private tapToFocusEnabled;
    private pinchToZoomEnabled;
    private pinchToZoomDistance?;
    private pinchToZoomInitialZoom;
    private torchEnabled;
    private cameraInitializationPromise?;
    constructor(triggerFatalError: (error: Error) => void, barcodePickerGui: BarcodePickerGui);
    setInteractionOptions(cameraSwitcherEnabled: boolean, torchToggleEnabled: boolean, tapToFocusEnabled: boolean, pinchToZoomEnabled: boolean): void;
    isCameraSwitcherEnabled(): boolean;
    setCameraSwitcherEnabled(enabled: boolean): Promise<void>;
    isTorchToggleEnabled(): boolean;
    setTorchToggleEnabled(enabled: boolean): void;
    isTapToFocusEnabled(): boolean;
    setTapToFocusEnabled(enabled: boolean): void;
    isPinchToZoomEnabled(): boolean;
    setPinchToZoomEnabled(enabled: boolean): void;
    setSelectedCamera(camera?: Camera): void;
    setSelectedCameraSettings(cameraSettings?: CameraSettings): void;
    setupCameras(): Promise<void>;
    stopStream(): void;
    applyCameraSettings(cameraSettings?: CameraSettings): Promise<void>;
    reinitializeCamera(): void;
    initializeCameraWithSettings(camera: Camera, cameraSettings?: CameraSettings): Promise<void>;
    setTorchEnabled(enabled: boolean): Promise<void>;
    toggleTorch(): Promise<void>;
    setZoom(zoomPercentage: number, currentZoom?: number): Promise<void>;
    private accessInitialCamera;
    private updateActiveCameraCurrentResolution;
    private postStreamInitialization;
    private videoTrackUnmuteRecovery;
    private triggerManualFocusForContinuous;
    private triggerManualFocusForSingleShot;
    private triggerManualFocus;
    private triggerZoomStart;
    private triggerZoomMove;
    private storeStreamCapabilities;
    private setupAutofocus;
    private triggerAutoFocus;
    private triggerFocusMode;
    private enableTapToFocusListeners;
    private enablePinchToZoomListeners;
    private disableTapToFocusListeners;
    private disablePinchToZoomListeners;
    private initializeCameraAndCheckUpdatedSettings;
    private retryInitializeCameraIfNeeded;
    private handleCameraInitializationError;
    private initializeCamera;
    private resolveInitializeCamera;
}
