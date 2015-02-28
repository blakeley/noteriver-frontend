import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','width','height','fill','stroke', 'stroke-width'],

  x: function(){
    return keyboard.note(this.get('pitch')).x / keyboard.IVORY_WIDTH;
  }.property(),

  y: function(){
    if(keyboard.note(this.get('pitch')).isEbony){
      return 1;
    } else {
      return 0;
    }
  }.property(),

  width: function(){
    return keyboard.note(this.get('pitch')).width / keyboard.IVORY_WIDTH;
  }.property(),

  height: function(){
    if(keyboard.note(this.get('pitch')).isEbony){
      return 3;
    } else {
      return 4;
    }
  }.property(),

  fill: function(){
    if(keyboard.note(this.get('pitch')).isEbony) {
      return '#141414';
    } else {
      return '#FFFCE5';
    }
  }.property(),



});
