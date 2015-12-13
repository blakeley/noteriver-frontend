/* global keyboard */

import Ember from 'ember';

const { computed}  = Ember;

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','rx','ry','width','height','fill'],

  x: computed('note.number', 'width', function(){
    return keyboard.midiNumber(this.get('midiNumber')).x - this.get('width')/2;
  }),

  y: 0,

  width: keyboard.IVORY_WIDTH / 20,

  height: 100,

  fill: computed('midiNumber', function(){
    if(keyboard.midiNumber(this.get('midiNumber')).isC){
      return '#555555';
    } else {
      return '#444444';
    }
  }),
});
