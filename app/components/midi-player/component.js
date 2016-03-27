/* global MidiNumber, keyboard */

import Ember from 'ember';
import Synthesizer from 'noteriver/mixins/synthesizer';

const { computed, run } = Ember;
const { alias } = computed;

export default Ember.Component.extend(Synthesizer, {
  animation: Ember.inject.service(),

  classNames: ['midi-player'],

  midi: alias('score.midi'),
  time: 0.0,
  timeScale: 10,
  lowNumber: 21,
  highNumber: 108,

  width: 1280,
  height: 720,

  isPlaying: false,
  isInterrupted: false,
  settingsPanelIsOpen: false,
  loadMidiFailed: false,
  loadMidiSucceeded: false,

  scrollRatio: computed('midi', 'time', 'isPlaying', 'scrollRatioRaw', function(){
    if(this.get('isPlaying')){
      return this.get('time') / this.get('midi').duration;
    } else {
      return this.get('scrollRatioRaw');
    }
  }),

  lowMidiNumber: computed('lowNumber', function(){
    return new MidiNumber(this.get('lowNumber'));
  }),

  highMidiNumber: computed('highNumber', function(){
    return new MidiNumber(this.get('highNumber'));
  }),

  durationInPixels: computed('midi', 'timeScale', 'lowMidiNumber', 'highMidiNumber', 'height', 'width', function(){
    return this.get('midi.duration') * this.get('timeScale') * (this.get('height') / this.get('width')) * (this.get('highMidiNumber').x - this.get('lowMidiNumber').x + keyboard.IVORY_WIDTH);
  }),

  loadMidi: function(){
    this.get('score').loadMidi().then((midi) => {
      this.set('loadMidiSucceeded', true);
      this.set('progressSliderMax', this.get('score.midi.duration')); // HACK: computed properties on score.midi.duration don't update
    }).catch((reason) => {
      this.set('loadMidiFailed', true);
    });
  },

  play: function(){
    this.stopAudio();
    this.initialPositionSecond = parseFloat(this.get('time'));
    this.initialDateNow = Date.now();
    this.get('audioCursor').backward(this.initialPositionSecond);
    this.get('audioCursor').forward(this.initialPositionSecond);

    if(this.get('isPlaying') & !this.get('isInterrupted')){
      for(const note of this.get('score.midi').notesOnAt(this.initialPositionSecond)){
        this.playNote(note);
      }
    }

    this.sonate();
    this.animate();
  }.observes('isPlaying','isInterrupted'),

  sonate: function(){
    const audioBufferDuration = 1.10 * this.get('playbackSpeed'); // MUST be > 1.0 because browsers cap setTimeout at 1000ms for inactive tabs

    if(this.get('isPlaying') & !this.get('isInterrupted')){
      const elapsedSeconds = (Date.now() - this.initialDateNow) / 1000;
      const currentPosition = this.initialPositionSecond + elapsedSeconds * this.get('playbackSpeed');

      this.get('audioCursor').forward(currentPosition + audioBufferDuration, {
        noteOn: event => this.playNote(event.note)
      });

      // can't use requestAnimationFrame because inactive tabs pause animation
      Ember.run.later(this, this.sonate, audioBufferDuration / 2);
    }
  },

  animate: function(){
    if(this.get('isPlaying') & !this.get('isInterrupted')){
      const elapsedSeconds = (Date.now() - this.initialDateNow) / 1000;
      const currentPosition = this.initialPositionSecond + elapsedSeconds * this.get('playbackSpeed');
      this.set('time', currentPosition);

      this.get('animation').scheduleFrame(this.animate.bind(this));
    } else {
      this.stopAudio();
    }
  },

  willInsertElement: function(){
    this.loadMidi();
  },

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

  willDestroyElement: function(){
    this.set('isPlaying', false);
    this.stopAudio();
  },

  actions: {
    loadMidi(){
      this.loadMidi();
    },

    toggleIsPlaying() {
      this.toggleProperty('isPlaying');
    },

    toggleSettingsPanelIsOpen() {
      this.toggleProperty('settingsPanelIsOpen');
    },

    toggleFullscreen() {
      this.fullscreen.toggle(this.element);
    },

    setScrollRatioRaw(scrollRatioRaw) {
      this.set('scrollRatioRaw', scrollRatioRaw);
      this.set('time', this.get('midi').duration * scrollRatioRaw);
    },
  },
});
