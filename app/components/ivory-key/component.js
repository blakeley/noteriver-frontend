/* global keyboard */

import Ember from 'ember';

const { computed}  = Ember;

export default Ember.Component.extend({
  // parameter defaults
  notesOn: Ember.A([]),

  // element properties
  tagName: 'svg',

  attributeBindings: ['x','y','width','height'],

  x: computed('midiNumber', function(){
    return keyboard.midiNumber(this.get('midiNumber')).x;
  }),

  y: 0,

  width: keyboard.IVORY_WIDTH,

  height: keyboard.IVORY_HEIGHT,

  // computed properties
  fill: function(){
    const noteOn = this.get('notesOn').findBy('number', this.get('midiNumber'));
    if(noteOn){
      return keyboard.IVORY_KEY_COLORS[noteOn.track.index % keyboard.IVORY_KEY_COLORS.length];
    } else {
      return '#FFFCE5';
    }
  }.property('notesOn.[]','midiNumber'),
});
