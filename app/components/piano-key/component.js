/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','width','height','fill','stroke', 'stroke-width'],

  x: function(){
    return keyboard.note(this.get('pitch')).x;
  }.property(),

  y: function(){
    if(keyboard.note(this.get('pitch')).isEbony){
      return keyboard.IVORY_HEIGHT - keyboard.EBONY_HEIGHT;
    } else {
      return 0;
    }
  }.property(),

  width: function(){
    return keyboard.note(this.get('pitch')).width;
  }.property(),

  height: function(){
    if(keyboard.note(this.get('pitch')).isEbony){
      return keyboard.EBONY_HEIGHT;
    } else {
      return keyboard.IVORY_HEIGHT;
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
