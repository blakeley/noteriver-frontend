/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  // parameter defaults
  notesOn: Ember.A([]),

  // element properties
  tagName: 'svg',

  attributeBindings: ['x','y','width','height'],

  x: function(){
    return this.get('midiNumber').x;
  }.property('midiNumber'),

  y: 0,

  width: keyboard.IVORY_WIDTH,

  height: keyboard.IVORY_HEIGHT,

  // computed properties
  fill: function(){
    const noteOn = this.get('notesOn').findBy('number', this.get('midiNumber').number);
    if(noteOn){
      return keyboard.IVORY_KEY_COLORS[noteOn.track.index % keyboard.IVORY_KEY_COLORS.length];
    } else {
      return '#FFFCE5';
    }
  }.property('notesOn.[]','midiNumber'),
});
