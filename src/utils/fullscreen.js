export class FullscreenManager {
  constructor() {
    this.isFullscreen = false;
    this.onChangeCallbacks = [];
    this.initialize();
  }

  initialize() {
    document.addEventListener('fullscreenchange', this.handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', this.handleFullscreenChange);
  }

  handleFullscreenChange = () => {
    this.isFullscreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );

    this.notifyChange();
  };

  async enter() {
    try {
      const element = document.documentElement;

      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      } else {
        throw new Error('Fullscreen API not supported');
      }

      this.isFullscreen = true;
      this.notifyChange();
      return true;
    } catch (error) {
      console.error('Error entering fullscreen:', error);
      return false;
    }
  }

  async exit() {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen();
      } else {
        throw new Error('Fullscreen API not supported');
      }

      this.isFullscreen = false;
      this.notifyChange();
      return true;
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
      return false;
    }
  }

  toggle() {
    if (this.isFullscreen) {
      return this.exit();
    } else {
      return this.enter();
    }
  }

  isSupported() {
    return !!(
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  }

  onChange(callback) {
    this.onChangeCallbacks.push(callback);
    
    // Return unsubscribe function
    return () => {
      const index = this.onChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.onChangeCallbacks.splice(index, 1);
      }
    };
  }

  notifyChange() {
    this.onChangeCallbacks.forEach(callback => {
      callback(this.isFullscreen);
    });
  }

  // Lock orientation in fullscreen (mobile devices)
  async lockOrientation(orientation = 'landscape') {
    if (!this.isFullscreen) return false;

    try {
      const screen = window.screen;
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock(orientation);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error locking orientation:', error);
      return false;
    }
  }

  unlockOrientation() {
    if (window.screen.orientation && window.screen.orientation.unlock) {
      window.screen.orientation.unlock();
    }
  }

  // Prevent exiting fullscreen
  preventExit() {
    const eventHandler = (e) => {
      if (
        e.key === 'Escape' ||
        (e.key === 'F11') ||
        (e.ctrlKey && e.key === 'Enter')
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', eventHandler);
    
    // Return function to remove event listener
    return () => {
      document.removeEventListener('keydown', eventHandler);
    };
  }

  getCurrentElement() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  destroy() {
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenChange);
    
    this.onChangeCallbacks = [];
  }
}

// Singleton instance
export const fullscreenManager = new FullscreenManager();