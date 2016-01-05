/* global keyboard, MidiNumber */

import Ember from 'ember';

const {computed} = Ember;

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','rx','ry','width','height','fill','stroke','stroke-opacity','stroke-width'],

  x: computed('note.number', function(){
    return new MidiNumber(this.get('note.number')).x;
  }),

  y: computed('note.number', function(){
    return this.get('note.onSecond') * this.get('timeScale');
  }),

  rx: computed('note.number', function(){
    return this.get('width') / 4;
  }),

  ry: computed('note.number', function(){
    return this.get('width') / 4;
  }),

  width: computed('note.number', function(){
    return new MidiNumber(this.get('note.number')).width;
  }),

  height: computed('note.number', function(){
    return (this.note.offSecond - this.note.onSecond) * this.get('timeScale');
  }),

  fill: computed('note.number', function(){
    if(new MidiNumber(this.get('note.number')).isEbony){
      return keyboard.EBONY_NOTE_COLORS[this.get('note.track.index') % keyboard.EBONY_NOTE_COLORS.length];
    } else {
      return keyboard.IVORY_NOTE_COLORS[this.get('note.track.index') % keyboard.IVORY_NOTE_COLORS.length];
    }
  }),
});
