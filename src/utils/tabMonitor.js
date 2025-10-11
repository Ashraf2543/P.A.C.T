export class TabMonitor {
  constructor() {
    this.isTabActive = true;
    this.tabSwitchCount = 0;
    this.maxSwitches = 3;
    this.onTabSwitchCallbacks = [];
    this.initialize();
  }

  initialize() {
    // Detect visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Detect window blur/focus
    window.addEventListener('blur', this.handleWindowBlur);
    window.addEventListener('focus', this.handleWindowFocus);
    
    // Prevent right-click context menu
    document.addEventListener('contextmenu', this.preventContextMenu);
    
    // Prevent keyboard shortcuts
    document.addEventListener('keydown', this.preventShortcuts);
  }

  handleVisibilityChange = () => {
    if (document.hidden) {
      this.handleTabSwitch();
    } else {
      this.isTabActive = true;
    }
  };

  handleWindowBlur = () => {
    this.handleTabSwitch();
  };

  handleWindowFocus = () => {
    this.isTabActive = true;
  };

  handleTabSwitch = () => {
    if (this.isTabActive) {
      this.tabSwitchCount++;
      this.isTabActive = false;
      
      console.log(`🚨 Tab switch detected! Count: ${this.tabSwitchCount}`);
      
      // Notify callbacks
      this.onTabSwitchCallbacks.forEach(callback => {
        callback(this.tabSwitchCount);
      });

      // Record violation in backend
      this.recordViolation('TAB_SWITCH', `User switched away from exam tab`);
      
      if (this.tabSwitchCount >= this.maxSwitches) {
        this.triggerExamTermination();
      }
    }
  };

  preventContextMenu = (e) => {
    e.preventDefault();
    this.recordViolation('CONTEXT_MENU', 'Right-click context menu attempted');
    return false;
  };

  preventShortcuts = (e) => {
    const forbiddenKeys = [
      'F12',           // DevTools
      'F5',            // Refresh
      'F11',           // Fullscreen toggle
      'Escape'         // Exit fullscreen
    ];

    const ctrlCombos = [
      'r',             // Refresh
      'R',
      'n',             // New window
      'N', 
      't',             // New tab
      'T',
      'w',             // Close tab
      'W',
      'Tab'            // Tab switch
    ];

    // Block function keys
    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault();
      this.recordViolation('KEYBOARD_SHORTCUT', `Forbidden key: ${e.key}`);
      return false;
    }

    // Block Ctrl+key combinations
    if (e.ctrlKey && ctrlCombos.includes(e.key)) {
      e.preventDefault();
      this.recordViolation('KEYBOARD_SHORTCUT', `Forbidden combo: Ctrl+${e.key}`);
      return false;
    }
  };

  onTabSwitch(callback) {
    this.onTabSwitchCallbacks.push(callback);
  }

  recordViolation(type, message) {
    // Send to backend
    if (window.examAttemptId) {
      fetch(`/api/exams/attempts/${window.examAttemptId}/violation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          type,
          message,
          severity: 'high'
        })
      }).catch(console.error);
    }
  }

  triggerExamTermination() {
    alert('❌ Exam terminated due to multiple tab switching violations!');
    // Implement exam termination logic here
    if (window.submitExam) {
      window.submitExam();
    }
  }

  destroy() {
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('blur', this.handleWindowBlur);
    window.removeEventListener('focus', this.handleWindowFocus);
    document.removeEventListener('contextmenu', this.preventContextMenu);
    document.removeEventListener('keydown', this.preventShortcuts);
  }
}

export const tabMonitor = new TabMonitor();