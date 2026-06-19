/**
 * src/audio.js - AudioManager singleton using the Web Audio API.
 */

/**
 * src/audio.js - AudioManager singleton using the Web Audio API.
 */
(function(global) {
  'use strict';

  /**
   * AudioManager constructor.
   * @constructor
   */
  function AudioManager() {
    this._context = null;
  }

  // Initialize the AudioContext (safe for browsers with / without webkit prefix)
  AudioManager.prototype.initializeContext = function() {
    if (typeof window !== 'undefined' && !this._context) {
      this._context = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  // Play a shoot sound (square wave tone)
  AudioManager.prototype.playShootSound = function() { /* ... synthesize square wave tone */ };

  // Play an alien death sound (white noise burst with filter)
  AudioManager.prototype.playAlienDeathSound = function() { /* ... white noise burst filter */ };

  // Other sound functions can be added here...
  // e.g. AudioManager.prototype.playExplosion = function() { ... };

  // Create a single, shared instance and expose it globally
  global.audioManager = new AudioManager();

})(typeof window !== 'undefined' ? window : this);
