import Ember from 'ember';
import Synthesizer from 'noteriver/mixins/synthesizer';

const { computed } = Ember;
const { alias } = computed;

export default Ember.Component.extend(Synthesizer, {
  animation: Ember.inject.service(),

  classNames: ['midi-player'],

  midi: alias('score.midi'),
  time: 0.0,
  isPlaying: false,
  isInterrupted: false,
  settingsPanelIsOpen: false,
  loadMidiFailed: false,
  loadMidiSucceeded: false,
  lowNumber: 21,
  highNumber: 108,

  loadMidi: function(){
    this.get('score').loadMidi().then((midi) => {
      this.set('loadMidiSucceeded', true);
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

  boundHighNumber: function(){
    if(parseInt(this.get('lowNumber')) >= parseInt(this.get('highNumber'))){
      this.set('highNumber', parseInt(this.get('lowNumber')) + 1);
    }
  }.observes('lowNumber'),

  boundLowNumber: function(){
    if(parseInt(this.get('lowNumber')) >= parseInt(this.get('highNumber'))){
      this.set('lowNumber', parseInt(this.get('highNumber')) - 1);
    }
  }.observes('highNumber'),

  willInsertElement: function(){
    window.tt = this;
    this.loadMidi();
  },

  willDestroyElement: function(){
    this.set('isPlaying', false);
    this.stopAudio();
  },

  actions: {
    loadMidi: function(){
      this.loadMidi();
    },

    toggleIsPlaying: function(){
      this.toggleProperty('isPlaying');
    },

    toggleSettingsPanelIsOpen: function(){
      this.toggleProperty('settingsPanelIsOpen');
    },

    toggleFullscreen: function() {
      this.fullscreen.toggle(this.element);
    },
  },
});
