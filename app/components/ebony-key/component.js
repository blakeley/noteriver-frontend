/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: ['x','y','width','height','fill','stroke', 'stroke-width', 'viewBox', 'preserveAspectRatio'],

  x: function(){
    return keyboard.midiNumber(this.get('midiNumber')).x;
  }.property(),

  y: function(){
    return keyboard.IVORY_HEIGHT - keyboard.EBONY_HEIGHT;
  }.property(),

  width: function(){
    return keyboard.EBONY_WIDTH;
  }.property(),

  height: function(){
    return keyboard.EBONY_HEIGHT;
  }.property(),

  fill: function(){
    return '#141414';
  }.property(),

  preserveAspectRatio: "xMinYMin slice",
  viewBox: function(){
    return `0 0 1 1000`
  }.property(),





});
