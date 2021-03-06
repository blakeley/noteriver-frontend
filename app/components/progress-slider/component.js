import Ember from 'ember';

export default Ember.Component.extend({
  value: 0,
  min: 0,
  max: 100,

  progress: 0,

  percent: function(){
    const min = this.get('min');
    const max = this.get('max');
    let value = this.get('value') || min;
    value = Math.max(value, min);
    value = Math.min(value, max);

    return value / (max - min) * 100;
  }.property('value', 'max', 'min'),

  progressStyle: function(){
    return ('width: ' + this.get('percent') + '%').htmlSafe();
  }.property('percent'),

  mouseDown: function(){
    this.set('isInterrupted', true);

    const component = this;
    const element = this.$();

    const progress = (event.pageX - element.offset().left) / element.width();
    component.set('value', progress * (component.get('max') - component.get('min')));

    Ember.$(document).bind("mousemove.slider", function(event){
      const progress = (event.pageX - element.offset().left) / element.width();
      component.set('value', progress * (component.get('max') - component.get('min')));
      return false; // temporarily disables text selection
    });

    Ember.$(document).bind("mouseup.slider", function(){
      component.set('isInterrupted', false);
      Ember.$(document).unbind(".slider");
    });
  },


});
