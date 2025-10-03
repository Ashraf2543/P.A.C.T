import React, { useState, useEffect } from 'react';
import { useWebcam } from '../../hooks/useWebcam';
import { useProctoring } from '../../hooks/useProctoring';
import '../../styles/proctoring.css';

const Proctoring = ({ examId, onViolation }) => {
  const { 
    webcamRef, 
    isWebcamOn, 
    startWebcam, 
    stopWebcam, 
    webcamError 
  } = useWebcam();
  
  const {
    isFullScreen,
    faceDetected,
    multipleFaces,
    noFaceTime,
    violations,
    startProctoring,
    stopProctoring
  } = useProctoring(webcamRef, onViolation);

  const [proctoringActive, setProctoringActive] = useState(false);

  useEffect(() => {
    if (proctoringActive && isWebcamOn) {
      startProctoring();
    } else {
      stopProctoring();
    }
  }, [proctoringActive, isWebcamOn]);

  const toggleProctoring = async () => {
    if (!proctoringActive) {
      const started = await startWebcam();
      if (started) {
        setProctoringActive(true);
      }
    } else {
      stopWebcam();
      stopProctoring();
      setProctoringActive(false);
    }
  };

  return (
    <div className="proctoring-panel">
      <div className="proctoring-header">
        <h3>Exam Proctoring</h3>
        <button
          onClick={toggleProctoring}
          className={`proctoring-toggle ${proctoringActive ? 'active' : ''}`}
        >
          {proctoringActive ? 'Stop Proctoring' : 'Start Proctoring'}
        </button>
      </div>

      <div className="proctoring-status">
        <div className="status-grid">
          <div className={`status-item ${isWebcamOn ? 'active' : 'inactive'}`}>
            <span className="status-dot"></span>
            Webcam: {isWebcamOn ? 'On' : 'Off'}
          </div>
          <div className={`status-item ${faceDetected ? 'active' : 'inactive'}`}>
            <span className="status-dot"></span>
            Face: {faceDetected ? 'Detected' : 'Not Detected'}
          </div>
          <div className={`status-item ${isFullScreen ? 'active' : 'inactive'}`}>
            <span className="status-dot"></span>
            Fullscreen: {isFullScreen ? 'Yes' : 'No'}
          </div>
        </div>
      </div>

      {webcamError && (
        <div className="error-message">
          ❌ {webcamError}
        </div>
      )}

      <div className="webcam-feed">
        <video
          ref={webcamRef}
          autoPlay
          muted
          playsInline
          className={`webcam-video ${!isWebcamOn ? 'hidden' : ''}`}
        />
        {!isWebcamOn && (
          <div className="webcam-placeholder">
            <div className="placeholder-icon">📷</div>
            <p>Webcam feed will appear here</p>
          </div>
        )}
      </div>

      <div className="violations-panel">
        <h4>Proctoring Alerts</h4>
        {violations.length > 0 ? (
          <div className="violations-list">
            {violations.map((violation, index) => (
              <div key={index} className="violation-item">
                <span className="violation-time">
                  {new Date(violation.timestamp).toLocaleTimeString()}
                </span>
                <span className="violation-type">{violation.type}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-violations">No violations detected</p>
        )}
      </div>

      {multipleFaces && (
        <div className="warning-banner multiple-faces">
          ⚠️ Multiple faces detected in frame
        </div>
      )}

      {noFaceTime > 10000 && ( // 10 seconds
        <div className="warning-banner no-face">
          ⚠️ No face detected for {Math.round(noFaceTime / 1000)} seconds
        </div>
      )}
    </div>
  );
};

export default Proctoring;