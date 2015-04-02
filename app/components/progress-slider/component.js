import Ember from 'ember';

export default Ember.Component.extend(Ember.TextSupport, {
  value: 0,
  min: 0,
  max: 100,

  progress: 0,

  percent: function(){
    return this.get('value') / (this.get('max')||100 - this.get('min')) * 100;
  }.property('value', 'max', 'min'),

  progressStyle: function(){
    return ('width: ' + this.get('percent') + '%').htmlSafe();
  }.property('percent'),

  mouseDown: function(){
    this.set('isInterrupted', true);

    var component = this;
    var element = this.$();

    var progress = (event.pageX - element.offset().left) / element.width();
    component.set('value', progress * (component.get('max') - component.get('min')));

    Ember.$(document).bind("mousemove.slider", function(event){
      var progress = (event.pageX - element.offset().left) / element.width();
      component.set('value', progress * (component.get('max') - component.get('min')));
      return false; // temporarily disables text selection
    });

    Ember.$(document).bind("mouseup.slider", function(){
      component.set('isInterrupted', false);
      Ember.$(document).unbind(".slider");
    });
  },


});
