export default {
  initialize: function() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
  }
};
