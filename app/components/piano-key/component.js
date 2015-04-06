/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: ['x','y','width','height','fill','stroke', 'stroke-width'],

  x: function(){
    return keyboard.midiNumber(this.get('midiNumber')).x;
  }.property(),

  y: function(){
    if(keyboard.midiNumber(this.get('midiNumber')).isEbony){
      return keyboard.IVORY_HEIGHT - keyboard.EBONY_HEIGHT;
    } else {
      return 0;
    }
  }.property(),

  width: function(){
    return keyboard.midiNumber(this.get('midiNumber')).width;
  }.property(),

  height: function(){
    if(keyboard.midiNumber(this.get('midiNumber')).isEbony){
      return keyboard.EBONY_HEIGHT;
    } else {
      return keyboard.IVORY_HEIGHT;
    }
  }.property(),

  fill: function(){
    if(keyboard.midiNumber(this.get('midiNumber')).isEbony) {
      return '#141414';
    } else {
      return '#FFFCE5';
    }
  }.property(),



});
