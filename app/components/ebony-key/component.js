/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: ['x','y','width','height', 'viewBox', 'preserveAspectRatio'],

  x: function(){
    return keyboard.midiNumber(this.get('midiNumber')).x;
  }.property(),
  y: keyboard.IVORY_HEIGHT - keyboard.EBONY_HEIGHT,
  width: keyboard.EBONY_WIDTH,
  height: keyboard.EBONY_HEIGHT,

  preserveAspectRatio: "xMinYMin slice",
  viewBox: function(){
    return `0 0 1 1000`;
  }.property(),





});
