/* global Midi, MidiNumber, keyboard */

import Ember from 'ember';

const { computed, run } = Ember;

export default Ember.Component.extend({
  tagName: 'canvas',
  attributeBindings: ['height', 'width'],

  midi: new Midi(),
  lowNumber: 21,
  highNumber: 108,

  width: 1280,
  height: 720,

  lowMidiNumber: computed('lowNumber', function(){
    return new MidiNumber(this.get('lowNumber'));
  }),

  highMidiNumber: computed('highNumber', function(){
    return new MidiNumber(this.get('highNumber'));
  }),

  xScale: computed('width', 'highMidiNumber', 'lowMidiNumber', function(){
    return (this.get('width') ) / (this.get('highMidiNumber').x - this.get('lowMidiNumber').x + keyboard.IVORY_WIDTH);
  }),

  didInsertElement: function(){
    window.tt = this;
    run.next(this, function(){
      this.set('height', this.$().height() * window.devicePixelRatio);
      this.set('width', this.$().width() * window.devicePixelRatio);
      run.next(this, function(){
        this.draw();
      });
    });
  },

  draw: function(){
    if(!this.get('isDestroyed')){
      let canvas = this.element;
      let ctx = canvas.getContext('2d');

      ctx.translate(0, canvas.height);
      ctx.scale(this.get('xScale'), -this.get('xScale'));
      ctx.translate(-this.get('lowMidiNumber').x, 0);

      ctx.fillStyle = '#555555';
      for(const cMidiNumber of keyboard.C_MIDI_NUMBERS){
        const width = keyboard.IVORY_WIDTH / 20;
        const x = cMidiNumber.x - width / 2;
        const y = 0;
        const height = canvas.height / this.get('xScale');
        ctx.rect(x, y, width, height);
      }
      ctx.fill();

      ctx.fillStyle = '#444444';
      for(const cMidiNumber of keyboard.F_MIDI_NUMBERS){
        const width = keyboard.IVORY_WIDTH / 20;
        const x = cMidiNumber.x - width / 2;
        const y = 0;
        const height = canvas.height / this.get('xScale');
        ctx.rect(x, y, width, height);
      }
      ctx.fill();
    }
  }
});
