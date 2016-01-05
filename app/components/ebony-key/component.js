/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  // parameter defaults
  notesOn: Ember.A([]),

  // element properties
  tagName: 'svg',

  attributeBindings: ['x','y','width','height', 'viewBox', 'preserveAspectRatio'],

  x: function(){
    return this.get('midiNumber').x;
  }.property('midiNumber'),

  y: keyboard.IVORY_HEIGHT - keyboard.EBONY_HEIGHT,

  width: keyboard.EBONY_WIDTH,

  height: keyboard.EBONY_HEIGHT,

  preserveAspectRatio: "xMinYMin slice",

  viewBox: function(){
    return `0 0 1 1000`;
  }.property(),

  // computed properties
  fill: function(){
    const noteOn = this.get('notesOn').findBy('number', this.get('midiNumber').number);
    if(noteOn){
      return keyboard.EBONY_KEY_COLORS[noteOn.track.index % keyboard.EBONY_KEY_COLORS.length];
    } else {
      return '#202020';
    }
  }.property('notesOn.[]', 'midiNumber'),
});
