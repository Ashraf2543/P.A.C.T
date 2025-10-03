import { useState, useRef, useCallback } from 'react';

export const useWebcam = () => {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [webcamError, setWebcamError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const webcamRef = useRef(null);
  const streamRef = useRef(null);

  const startWebcam = useCallback(async () => {
    try {
      setWebcamError(null);
      setPermissionDenied(false);

      // Check if browser supports media devices
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Webcam not supported in this browser');
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: false
      });

      if (webcamRef.current) {
        webcamRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsWebcamOn(true);
      }

      return true;
    } catch (error) {
      console.error('Error starting webcam:', error);
      
      let errorMessage = 'Failed to access webcam';
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = 'Camera permission denied. Please allow camera access.';
        setPermissionDenied(true);
      } else if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
        errorMessage = 'No camera found or camera constraints not met.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage = 'Webcam not supported in this browser.';
      }
      
      setWebcamError(errorMessage);
      return false;
    }
  }, []);

  const stopWebcam = useCallback(() => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (webcamRef.current) {
      webcamRef.current.srcObject = null;
    }

    setIsWebcamOn(false);
    setWebcamError(null);
  }, []);

  const takeSnapshot = useCallback(() => {
    if (!isWebcamOn || !webcamRef.current) {
      return null;
    }

    const video = webcamRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    return canvas.toDataURL('image/jpeg', 0.8);
  }, [isWebcamOn]);

  const getWebcamSettings = useCallback(() => {
    if (!streamRef.current) return null;

    const videoTrack = streamRef.current.getVideoTracks()[0];
    if (!videoTrack) return null;

    const settings = videoTrack.getSettings();
    return {
      width: settings.width,
      height: settings.height,
      frameRate: settings.frameRate,
      aspectRatio: settings.aspectRatio
    };
  }, []);

  const requestPermission = useCallback(async () => {
    try {
      // Try to get permission without actually starting the stream
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setPermissionDenied(false);
      return true;
    } catch (error) {
      setPermissionDenied(true);
      return false;
    }
  }, []);

  // Cleanup on unmount
  useState(() => {
    return () => {
      stopWebcam();
    };
  }, [stopWebcam]);

  return {
    webcamRef,
    isWebcamOn,
    webcamError,
    permissionDenied,
    startWebcam,
    stopWebcam,
    takeSnapshot,
    getWebcamSettings,
    requestPermission
  };
};