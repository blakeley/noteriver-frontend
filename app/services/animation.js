import Ember from 'ember';

export default Ember.Service.extend({
  init: function(){
    this.frames = [];
  },

  scheduleFrame: function(frame){
    this.frames.push(frame);
    Ember.run.scheduleOnce('afterRender', this, this.scheduleAnimationFrame);
  },

  scheduleAnimationFrame: function(){
    window.requestAnimationFrame(Ember.run.bind(this, this._animateFrame));
  },

  _animateFrame: function(){
    var framesLength = this.frames.length;
    while (framesLength--) {
      var frame = this.frames.shift();
      frame();
    }
    if (this.frames.length) {
      Ember.run.scheduleOnce('afterRender', this, this.scheduleAnimationFrame);
    }
  },
});
