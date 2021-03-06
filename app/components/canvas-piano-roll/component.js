/* global Midi, MidiNumber, keyboard */

import Ember from 'ember';
import ResizeAware from 'ember-resize/mixins/resize-aware';

const { Component,
        observer,
        computed,
        run,
        inject } = Ember;

export default Component.extend(ResizeAware, {
  resizeService: inject.service('resize-service'),
  tagName: 'canvas',
  attributeBindings: ['height', 'width', 'style'],

  midi: new Midi(),
  time: 0,
  lowNumber: 21,
  highNumber: 108,
  timeScale: 10,

  width: 1280,
  height: 720,
  other: false,

  lowMidiNumber: computed('lowNumber', function(){
    return new MidiNumber(this.get('lowNumber'));
  }),

  highMidiNumber: computed('highNumber', function(){
    return new MidiNumber(this.get('highNumber'));
  }),

  scale: computed('width', 'highMidiNumber', 'lowMidiNumber', function(){
    return (this.get('width')) / (this.get('highMidiNumber').x - this.get('lowMidiNumber').x + keyboard.IVORY_WIDTH);
  }),

  duration: computed('scale', 'height', function(){
    return this.get('height') / (this.get('scale') * this.get('timeScale'));
  }),

  index: computed('time', 'duration', function(){
    let index = Math.floor(this.get('time') / this.get('duration'));

    if(this.get('indexParity') === (index % 2 === 0)){
      index += 1;
    }

    return index;
  }),

  start: computed('index', 'duration', function(){
    return this.get('index') * this.get('duration');
  }), 

  bottom: computed('time', 'duration', 'start', function(){
    return (this.get('start') - this.get('time')) / this.get('duration') * 100;
  }),

  style: computed('bottom', function(){
    return new Ember.Handlebars.SafeString(`bottom: ${this.get('bottom')}%;`);
  }),

  indexChanged: observer('index', function(){
    if(this._previousIndex !== this.get('index')){
      this._previousIndex = this.get('index');
      this.draw();
    }
  }),

  dimensionChanged: observer('height', 'width', function(){
    run.scheduleOnce('afterRender', this, function(){
      this.draw();
    });
  }),

  midiLoaded: observer('midi', function(){
    this.draw();
  }),

  didInsertElement: function(){
    this._super(...arguments);
    run.scheduleOnce('afterRender', this, function(){
      this.set('height', this.element.parentElement.clientHeight * window.devicePixelRatio);
      this.set('width', this.element.parentElement.clientWidth * window.devicePixelRatio);
    });
  },

  didResize: function(width, height) {
    this.set('height', this.element.parentElement.clientHeight * window.devicePixelRatio);
    this.set('width', this.element.parentElement.clientWidth * window.devicePixelRatio);
  },

  draw: function(){
    if(!this.get('isDestroyed')){
      let canvas = this.$()[0];
      canvas.width = canvas.width; // clear
      let ctx = canvas.getContext('2d');

      ctx.translate(0, canvas.height);
      ctx.scale(this.get('scale'), -this.get('scale'));
      ctx.translate(-this.get('lowMidiNumber').x, 0);

      ctx.translate(0, keyboard.IVORY_HEIGHT);
      ctx.translate(0, -this.get('start') * this.get('timeScale'));
      for(const track of this.get('midi').tracks){
        for(const note of track.notesOnDuring(this.get('start') - 1, this.get('start') + this.get('duration'))){
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
  },
});
