/* global keyboard, Midi */

import Ember from 'ember';

const { computed, observer } = Ember;

export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['piano-roll'],
  attributeBindings: ['viewBox', 'preserveAspectRatio'],

  keyboard: keyboard,

  midi: new Midi(),
  notesOn: Ember.A([]),
  time: 0,
  lowNumber: 21,
  highNumber: 108,
  timeScale: 10,

  cursor: computed('midi', function(){
    return this.get('midi').newCursor();
  }),

  timeChanged: observer('time', function(){
    let cursor = this.get('cursor');
    let time = this.get('time');
    let notesOn = this.get('notesOn');

    if(cursor.second < time){
      cursor.forward(time, {
        noteOn: (event) => {
          notesOn.pushObject(event.note);
        },
        noteOff: (event) => {
          notesOn.removeObject(event.note);
        }
      });
    } else {
      cursor.backward(time, {
        noteOn: (event) => {
          notesOn.removeObject(event.note);
        },
        noteOff: (event) => {
          notesOn.pushObject(event.note);
        }
      });
    }
  }),

  noteTranslateY: function(){
    return keyboard.IVORY_HEIGHT - this.get('time') * this.get('timeScale');
  }.property('time'),

  // attributes
  vbx: function(){
    return keyboard.midiNumber(this.get('lowNumber')).x;
  }.property('lowNumber'),

  vbw: function(){
    return keyboard.midiNumber(this.get('highNumber')).x - this.get('vbx') + keyboard.IVORY_WIDTH;
  }.property('vbx', 'highNumber'),

  viewBox: function(){
    return this.get('vbx') + " 0 " + this.get('vbw') + " 1000";
  }.property('vbx','vbw'),

  preserveAspectRatio: "xMidYMin slice",
});
