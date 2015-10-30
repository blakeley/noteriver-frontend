/* global keyboard */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['piano-roll'],
  attributeBindings: ['viewBox', 'preserveAspectRatio'],

  keyboard: keyboard,

  time: 0,
  lowNumber: 21,
  highNumber: 108,
  timeScale: 10,

  notes: computed('midi', 'time', function(){
    if(!!this.get('midi') && this.get('midi').notesOnDuring){
      return this.get('midi').notesOnDuring(this.get('time'), this.get('time') + 5);
    }
  }),

  notesOn: function(){
    var h = {};

    if(!!this.get('midi') && this.get('midi').notesOnAt){
      this.get('midi').notesOnAt(this.get('time')).forEach((note) => {
        if(note.onSecond < this.get('time') && this.get('time') + 0.016 < note.offSecond){
          h[note.number] = note;
        }
      });
    }

    return h;
  }.property('time','midi'),

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
