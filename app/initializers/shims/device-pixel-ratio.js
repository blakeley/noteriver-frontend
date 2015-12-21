export default {
  name: 'device-pixel-ratio',
  initialize: function() {
    window.devicePixelRatio = window.devicePixelRatio || 1;
  }
};
