import { useState, useEffect, useRef } from 'react';

export const useProctoring = (webcamRef, onViolation) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [multipleFaces, setMultipleFaces] = useState(false);
  const [noFaceTime, setNoFaceTime] = useState(0);
  const [violations, setViolations] = useState([]);
  const [proctoringActive, setProctoringActive] = useState(false);

  const faceDetectionRef = useRef(null);
  const noFaceTimerRef = useRef(null);
  const violationCheckRef = useRef(null);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      stopProctoring();
    };
  }, []);

  useEffect(() => {
    if (proctoringActive) {
      startViolationMonitoring();
    } else {
      stopViolationMonitoring();
    }
  }, [proctoringActive]);

  const startProctoring = () => {
    setProctoringActive(true);
    startFaceDetection();
    startViolationMonitoring();
  };

  const stopProctoring = () => {
    setProctoringActive(false);
    stopFaceDetection();
    stopViolationMonitoring();
  };

  const startFaceDetection = () => {
    // Mock face detection - in real app, integrate with face-api.js or similar
    faceDetectionRef.current = setInterval(() => {
      const randomFace = Math.random() > 0.1; // 90% chance face detected
      const randomMultiple = Math.random() > 0.95; // 5% chance multiple faces
      
      setFaceDetected(randomFace);
      setMultipleFaces(randomMultiple);

      if (!randomFace) {
        setNoFaceTime(prev => prev + 1000);
      } else {
        setNoFaceTime(0);
      }

      // Trigger violations
      if (!randomFace && noFaceTime > 5000) {
        addViolation('NO_FACE_DETECTED');
      }
      
      if (randomMultiple) {
        addViolation('MULTIPLE_FACES_DETECTED');
      }
    }, 1000);
  };

  const stopFaceDetection = () => {
    if (faceDetectionRef.current) {
      clearInterval(faceDetectionRef.current);
    }
    if (noFaceTimerRef.current) {
      clearInterval(noFaceTimerRef.current);
    }
  };

  const startViolationMonitoring = () => {
    violationCheckRef.current = setInterval(() => {
      checkForViolations();
    }, 2000);
  };

  const stopViolationMonitoring = () => {
    if (violationCheckRef.current) {
      clearInterval(violationCheckRef.current);
    }
  };

  const checkForViolations = () => {
    // Check for tab/window switching
    if (!document.hasFocus()) {
      addViolation('TAB_SWITCH');
    }

    // Check for fullscreen exit
    if (!document.fullscreenElement && isFullScreen) {
      addViolation('FULLSCREEN_EXIT');
    }

    // Check for developer tools
    if (isDevToolsOpen()) {
      addViolation('DEVTOOLS_OPEN');
    }
  };

  const isDevToolsOpen = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    return !!(widthThreshold || heightThreshold);
  };

  const addViolation = (type) => {
    const violation = {
      type,
      timestamp: new Date().toISOString(),
      message: getViolationMessage(type)
    };

    setViolations(prev => [...prev, violation]);
    
    if (onViolation) {
      onViolation(violation);
    }
  };

  const getViolationMessage = (type) => {
    const messages = {
      'NO_FACE_DETECTED': 'No face detected in webcam feed',
      'MULTIPLE_FACES_DETECTED': 'Multiple faces detected in webcam feed',
      'TAB_SWITCH': 'Switched away from exam window',
      'FULLSCREEN_EXIT': 'Exited fullscreen mode',
      'DEVTOOLS_OPEN': 'Developer tools detected'
    };
    return messages[type] || 'Unknown violation';
  };

  const clearViolations = () => {
    setViolations([]);
  };

  const getViolationStats = () => {
    const stats = {};
    violations.forEach(violation => {
      stats[violation.type] = (stats[violation.type] || 0) + 1;
    });
    return stats;
  };

  return {
    isFullScreen,
    faceDetected,
    multipleFaces,
    noFaceTime,
    violations,
    proctoringActive,
    startProctoring,
    stopProctoring,
    clearViolations,
    getViolationStats
  };
};