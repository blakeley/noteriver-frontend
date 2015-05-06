/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  // parameter defaults
  notesOn: {},

  // element properties
  tagName: 'svg',

  attributeBindings: ['x','y','width','height', 'viewBox', 'preserveAspectRatio'],

  x: function(){
    return keyboard.midiNumber(this.get('midiNumber')).x;
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
    var noteOn = this.get('notesOn')[this.get('midiNumber')];
    if(noteOn){
      return keyboard.EBONY_KEY_COLORS[noteOn.track.index % keyboard.EBONY_KEY_COLORS.length];
    } else {
      return '#202020';
    }
  }.property('notesOn', 'midiNumber'),
});
