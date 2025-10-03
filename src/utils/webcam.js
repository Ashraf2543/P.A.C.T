export class WebcamManager {
  constructor() {
    this.stream = null;
    this.isActive = false;
    this.permissionGranted = false;
  }

  async initialize(constraints = {}) {
    try {
      const defaultConstraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
          facingMode: 'user'
        },
        audio: false,
        ...constraints
      };

      this.stream = await navigator.mediaDevices.getUserMedia(defaultConstraints);
      this.isActive = true;
      this.permissionGranted = true;
      
      return {
        success: true,
        stream: this.stream,
        settings: this.getSettings()
      };
    } catch (error) {
      this.isActive = false;
      this.permissionGranted = false;
      
      return {
        success: false,
        error: this.getErrorMessage(error)
      };
    }
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
      this.stream = null;
    }
    this.isActive = false;
  }

  getSettings() {
    if (!this.stream) return null;
    
    const videoTrack = this.stream.getVideoTracks()[0];
    if (!videoTrack) return null;

    const settings = videoTrack.getSettings();
    return {
      width: settings.width,
      height: settings.height,
      frameRate: settings.frameRate,
      aspectRatio: settings.aspectRatio,
      deviceId: settings.deviceId
    };
  }

  takePicture(videoElement, quality = 0.8) {
    if (!videoElement || !this.isActive) {
      return null;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    return canvas.toDataURL('image/jpeg', quality);
  }

  async switchCamera() {
    if (!this.stream) return false;

    const currentSettings = this.getSettings();
    if (!currentSettings) return false;

    const currentFacingMode = currentSettings.facingMode || 'user';
    const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

    this.stop();

    try {
      const result = await this.initialize({
        video: {
          facingMode: newFacingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      return result.success;
    } catch (error) {
      console.error('Error switching camera:', error);
      return false;
    }
  }

  getErrorMessage(error) {
    const errorMap = {
      'NotAllowedError': 'Camera permission denied. Please allow camera access in your browser settings.',
      'PermissionDeniedError': 'Camera permission denied. Please allow camera access in your browser settings.',
      'NotFoundError': 'No camera found on this device.',
      'NotSupportedError': 'Webcam not supported in this browser.',
      'NotReadableError': 'Camera is already in use by another application.',
      'OverconstrainedError': 'Camera constraints could not be satisfied.',
      'ConstraintNotSatisfiedError': 'Camera constraints could not be satisfied.'
    };

    return errorMap[error.name] || `Camera error: ${error.message}`;
  }

  isSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  async getAvailableCameras() {
    if (!navigator.mediaDevices?.enumerateDevices) {
      return [];
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => 
        device.kind === 'videoinput'
      );
      
      return cameras.map(camera => ({
        deviceId: camera.deviceId,
        label: camera.label || `Camera ${camera.deviceId.slice(0, 8)}`,
        groupId: camera.groupId
      }));
    } catch (error) {
      console.error('Error getting cameras:', error);
      return [];
    }
  }

  async setCamera(deviceId) {
    this.stop();

    try {
      const result = await this.initialize({
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      return result.success;
    } catch (error) {
      console.error('Error setting camera:', error);
      return false;
    }
  }
}

// Singleton instance
export const webcamManager = new WebcamManager();