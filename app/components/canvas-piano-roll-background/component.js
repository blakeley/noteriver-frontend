/* global Midi, MidiNumber, keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  attributeBindings: ['height', 'width'],

  midi: new Midi(),
  lowNumber: 21,
  highNumber: 108,

  width: 1280,
  height: 720,

  didInsertElement: function(){
    this.draw();
  },

  draw: function(){
    let canvas = this.$()[0];
    let ctx = canvas.getContext('2d');

    const highMidiNumber = new MidiNumber(this.get('highNumber'));
    const lowMidiNumber = new MidiNumber(this.get('lowNumber'));

    const xScale = this.get('width') / (highMidiNumber.x - lowMidiNumber.x + keyboard.IVORY_WIDTH);

    ctx.translate(0, canvas.height);
    ctx.scale(xScale, -xScale);
    ctx.translate(-lowMidiNumber.x, 0);

    ctx.fillStyle = '#555555';
    for(const cMidiNumber of keyboard.C_MIDI_NUMBERS){
      console.log(canvas.height);
      ctx.rect(cMidiNumber.x, 0, keyboard.IVORY_WIDTH / 20, canvas.height / xScale);
    }
    ctx.fill();

    ctx.fillStyle = '#444444';
    for(const cMidiNumber of keyboard.F_MIDI_NUMBERS){
      ctx.rect(cMidiNumber.x, 0, keyboard.IVORY_WIDTH / 20, canvas.height / xScale);
    }
    ctx.fill();
  }
});
