/* global Midi, MidiNumber, keyboard */

import Ember from 'ember';

const { observer } = Ember;

export default Ember.Component.extend({
  tagName: 'canvas',
  attributeBindings: ['height', 'width'],

  midi: new Midi(),
  time: 0,
  lowNumber: 21,
  highNumber: 108,
  timeScale: 10,

  width: 640,
  height: 360,

  didInsertElement: function(){
    this.draw();
  },

  animate: observer('midi', 'time', function(){
    this.draw();
  }),

  draw: function(){
    this.set('width', this.$().width() * window.devicePixelRatio);
    this.set('height', this.$().height() * window.devicePixelRatio);

    let canvas = this.$()[0];
    canvas.width = canvas.width;
    let ctx = canvas.getContext('2d');

    const highMidiNumber = new MidiNumber(this.get('highNumber'));
    const lowMidiNumber = new MidiNumber(this.get('lowNumber'));

    const xScale = this.get('width') / (highMidiNumber.x - lowMidiNumber.x + keyboard.IVORY_WIDTH);

    ctx.translate(0, canvas.height);
    ctx.scale(xScale, -xScale);
    ctx.translate(-lowMidiNumber.x, 0);

    ctx.fillStyle = '#555555';
    for(const cMidiNumber of keyboard.C_MIDI_NUMBERS){
      ctx.rect(cMidiNumber.x, 0, keyboard.IVORY_WIDTH / 20, canvas.height / xScale);
    }
    ctx.fill();

    ctx.fillStyle = '#444444'
    for(const cMidiNumber of keyboard.F_MIDI_NUMBERS){
      ctx.rect(cMidiNumber.x, 0, keyboard.IVORY_WIDTH / 20, canvas.height / xScale);
    }
    ctx.fill();

    ctx.translate(0, keyboard.IVORY_HEIGHT);
    //ctx.scale(1, this.get('timeScale'));
    ctx.translate(0, -this.get('time') * this.get('timeScale'));
    for(const track of this.get('midi').tracks){
      for(const note of track.notesOnDuring(this.get('time'), this.get('time') + 10)){
        const midiNumber = new MidiNumber(note.number);
        ctx.fillStyle = midiNumber.noteColors[track.index % midiNumber.noteColors.length];
        ctx.strokeStyle = '#202020';

        ctx.lineWidth = midiNumber.width / 16;
        const x = midiNumber.x + ctx.lineWidth / 2;
        const y = note.onSecond * this.get('timeScale');
        const w = midiNumber.width - ctx.lineWidth;
        const h = note.duration * this.get('timeScale');
        const r = midiNumber.width / 4;

        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.arcTo(x+w, y,   x+w, y+h, r);
        ctx.arcTo(x+w, y+h, x,   y+h, r);
        ctx.arcTo(x,   y+h, x,   y,   r);
        ctx.arcTo(x,   y,   x+w, y,   r);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    }
  }
});
