/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'svg',
  attributeBindings: ['x','y','width','height'],

  x: function(){
    return keyboard.midiNumber(this.get('midiNumber')).x;
  }.property(),
  y: 0,
  width: keyboard.IVORY_WIDTH,
  height: keyboard.IVORY_HEIGHT,



});
