export class ProctoringEngine {
  constructor() {
    this.violations = [];
    this.isMonitoring = false;
    this.monitoringInterval = null;
    this.faceDetectionInterval = null;
    this.noFaceStartTime = null;
    this.violationCallbacks = [];
  }

  startMonitoring(options = {}) {
    if (this.isMonitoring) return;

    const {
      checkInterval = 2000,
      faceCheckInterval = 1000,
      maxNoFaceTime = 10000,
      maxTabSwitchTime = 5000
    } = options;

    this.isMonitoring = true;
    this.maxNoFaceTime = maxNoFaceTime;
    this.maxTabSwitchTime = maxTabSwitchTime;

    // Start violation monitoring
    this.monitoringInterval = setInterval(() => {
      this.checkForViolations();
    }, checkInterval);

    // Start face detection simulation
    this.faceDetectionInterval = setInterval(() => {
      this.simulateFaceDetection();
    }, faceCheckInterval);

    // Track visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Track fullscreen changes
    document.addEventListener('fullscreenchange', this.handleFullScreenChange);

    console.log('Proctoring monitoring started');
  }

  stopMonitoring() {
    this.isMonitoring = false;
    
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    
    if (this.faceDetectionInterval) {
      clearInterval(this.faceDetectionInterval);
      this.faceDetectionInterval = null;
    }

    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    document.removeEventListener('fullscreenchange', this.handleFullScreenChange);

    console.log('Proctoring monitoring stopped');
  }

  handleVisibilityChange = () => {
    if (document.hidden) {
      this.recordViolation('TAB_SWITCH', 'User switched away from exam tab');
    }
  };

  handleFullScreenChange = () => {
    if (!document.fullscreenElement) {
      this.recordViolation('FULLSCREEN_EXIT', 'User exited fullscreen mode');
    }
  };

  checkForViolations() {
    // Check for developer tools
    if (this.isDevToolsOpen()) {
      this.recordViolation('DEVTOOLS_OPEN', 'Developer tools detected');
    }

    // Check for context menu (right-click) attempts
    this.detectContextMenu();

    // Check for keyboard shortcuts
    this.detectKeyboardShortcuts();

    // Check for multiple windows
    this.detectMultipleWindows();
  }

  simulateFaceDetection() {
    // Mock face detection - in real implementation, integrate with face-api.js
    const faceDetected = Math.random() > 0.1; // 90% chance face detected
    const multipleFaces = Math.random() > 0.95; // 5% chance multiple faces

    if (!faceDetected) {
      if (!this.noFaceStartTime) {
        this.noFaceStartTime = Date.now();
      } else {
        const noFaceDuration = Date.now() - this.noFaceStartTime;
        if (noFaceDuration > this.maxNoFaceTime) {
          this.recordViolation('NO_FACE', `No face detected for ${Math.round(noFaceDuration / 1000)} seconds`);
        }
      }
    } else {
      this.noFaceStartTime = null;
    }

    if (multipleFaces) {
      this.recordViolation('MULTIPLE_FACES', 'Multiple faces detected in frame');
    }
  }

  isDevToolsOpen() {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    return widthThreshold || heightThreshold;
  }

  detectContextMenu() {
    // Prevent context menu and record violation
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.recordViolation('CONTEXT_MENU', 'Right-click context menu attempted');
      return false;
    });
  }

  detectKeyboardShortcuts() {
    // Monitor for common exam cheating shortcuts
    document.addEventListener('keydown', (e) => {
      const forbiddenShortcuts = [
        'F12', // DevTools
        'Ctrl+Shift+I', // DevTools
        'Ctrl+Shift+J', // Console
        'Ctrl+Shift+C', // Inspect
        'Ctrl+U', // View Source
        'Ctrl+S', // Save
        'Ctrl+P' // Print
      ];

      const keyCombo = this.getKeyCombo(e);
      
      if (forbiddenShortcuts.includes(keyCombo)) {
        e.preventDefault();
        this.recordViolation('KEYBOARD_SHORTCUT', `Forbidden keyboard shortcut: ${keyCombo}`);
      }
    });
  }

  getKeyCombo(event) {
    const keys = [];
    if (event.ctrlKey) keys.push('Ctrl');
    if (event.shiftKey) keys.push('Shift');
    if (event.altKey) keys.push('Alt');
    if (event.metaKey) keys.push('Cmd');
    
    if (event.key.length === 1) {
      keys.push(event.key.toUpperCase());
    } else {
      keys.push(event.key);
    }
    
    return keys.join('+');
  }

  detectMultipleWindows() {
    // Simple check for multiple windows - can be enhanced
    if (window.opener && !window.opener.closed) {
      this.recordViolation('MULTIPLE_WINDOWS', 'Multiple browser windows detected');
    }
  }

  recordViolation(type, message) {
    const violation = {
      type,
      message,
      timestamp: new Date().toISOString(),
      severity: this.getViolationSeverity(type)
    };

    this.violations.push(violation);
    
    // Notify callbacks
    this.violationCallbacks.forEach(callback => {
      callback(violation);
    });

    console.warn('Proctoring Violation:', violation);
  }

  getViolationSeverity(type) {
    const severityMap = {
      'NO_FACE': 'medium',
      'MULTIPLE_FACES': 'high',
      'TAB_SWITCH': 'high',
      'FULLSCREEN_EXIT': 'high',
      'DEVTOOLS_OPEN': 'critical',
      'CONTEXT_MENU': 'low',
      'KEYBOARD_SHORTCUT': 'medium',
      'MULTIPLE_WINDOWS': 'high'
    };

    return severityMap[type] || 'medium';
  }

  onViolation(callback) {
    this.violationCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.violationCallbacks.indexOf(callback);
      if (index > -1) {
        this.violationCallbacks.splice(index, 1);
      }
    };
  }

  getViolations() {
    return [...this.violations];
  }

  getViolationStats() {
    const stats = {
      total: this.violations.length,
      byType: {},
      bySeverity: {
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      }
    };

    this.violations.forEach(violation => {
      // Count by type
      stats.byType[violation.type] = (stats.byType[violation.type] || 0) + 1;
      
      // Count by severity
      stats.bySeverity[violation.severity] = (stats.bySeverity[violation.severity] || 0) + 1;
    });

    return stats;
  }

  clearViolations() {
    this.violations = [];
  }

  enableStrictMode() {
    // Disable text selection
    document.styleSheets[0].insertRule(`
      * {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    `, 0);

    // Disable dragging
    document.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Prevent back navigation
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, null, window.location.href);
      this.recordViolation('NAVIGATION_ATTEMPT', 'Back navigation attempted');
    };
  }

  disableStrictMode() {
    // Re-enable text selection
    document.styleSheets[0].deleteRule(0);
    
    // Re-enable back navigation
    window.onpopstate = null;
  }
}

// Singleton instance
export const proctoringEngine = new ProctoringEngine();