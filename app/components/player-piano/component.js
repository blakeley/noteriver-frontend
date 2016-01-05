/* global keyboard, Midi, MidiNumber */

import Ember from 'ember';

const { observer } = Ember;

export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['piano-roll'],
  attributeBindings: ['viewBox', 'preserveAspectRatio'],

  keyboard: keyboard,

  midi: new Midi(),
  notes: Ember.A([]),
  notesOn: Ember.A([]),
  time: 0,
  lowNumber: 21,
  highNumber: 108,
  timeScale: 10,

  midiChanged: observer('midi', function(){
    this.leadingCursor = this.get('midi').newCursor();
    this.nowCursor = this.get('midi').newCursor();
    this.leadingCursor.forward(this.get('time') + 3, {
      noteOn: (event) => {this.get('notes').pushObject(event.note);}
    });
  }),

  timeChanged: observer('time', function(){
    let time = this.get('time');
    let notes = this.get('notes');
    let notesOn = this.get('notesOn');

    if(this.nowCursor.second < time){
      this.leadingCursor.forward(time + 3, {
        noteOn: (event) => {
          notes.pushObject(event.note);
        }
      });

      this.nowCursor.forward(time, {
        noteOn: (event) => {
          notesOn.pushObject(event.note);
        },
        noteOff: (event) => {
          notes.removeObject(event.note);
          notesOn.removeObject(event.note);
        }
      });
    } else {
      this.nowCursor.backward(time, {
        noteOn: (event) => {
          notesOn.removeObject(event.note);
        },
        noteOff: (event) => {
          notes.pushObject(event.note);
          notesOn.pushObject(event.note);
        }
      });

      this.leadingCursor.backward(time + 3, {
        noteOn: (event) => {
          notes.removeObject(event.note);
        }
      });
    }
  }),

  noteTranslateY: function(){
    return keyboard.IVORY_HEIGHT - this.get('time') * this.get('timeScale');
  }.property('time'),

  // attributes
  vbx: function(){
    return new MidiNumber(this.get('lowNumber')).x;
  }.property('lowNumber'),

  vbw: function(){
    return new MidiNumber(this.get('highNumber')).x - this.get('vbx') + keyboard.IVORY_WIDTH;
  }.property('vbx', 'highNumber'),

  viewBox: function(){
    return this.get('vbx') + " 0 " + this.get('vbw') + " 1000";
  }.property('vbx','vbw'),

  preserveAspectRatio: "xMidYMin slice",
});
