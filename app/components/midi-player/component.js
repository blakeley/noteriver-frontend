/* global Midi */

import Ember from 'ember';

const { observer } = Ember;

export default Ember.Component.extend({
  animation: Ember.inject.service(),
  audio: Ember.inject.service(),
  synthesizer: Ember.inject.service(),

  classNames: ['midi-player'],

  midi: new Midi(),
  time: 0.0,
  isPlaying: false,
  isInterrupted: false,
  settingsPanelIsOpen: false,
  loadMidiFailed: false,
  loadMidiSucceeded: false,
  lowNumber: 21,
  highNumber: 108,

  audioBufferSourceNodes: Ember.A([]),
  masterGainValue: 0.10,
  playbackSpeed: 1.00,

  init: function(){
    this._super.apply(this, arguments);
    const audio = this.get('audio');

    this.masterGain = audio.context.createGain();
    this.masterGain.gain.value = this.get('masterGainValue');
    this.masterGain.connect(audio.context.destination);
  },

  masterGainValueChanged: observer('masterGainValue', function(){
    this.masterGain.gain.value = this.get('masterGainValue');
  }),

  playbackSpeedChanged: observer('playbackSpeed', function(){
    this.stop();
    this.initialPosition = parseFloat(this.get('time'));
    this.initialDateNow = Date.now();

    this.audioCursor.backward(this.initialPosition);
    this.audioCursor.forward(this.initialPosition);
  }),

  loadMidi: function(){
    this.get('score').loadMidi().then((midi) => {
      this.set('loadMidiSucceeded', true);
    }).catch((reason) => {
      this.set('loadMidiFailed', true);
    });
  },

  midiChanged: observer('score.midi', function(){
    const midi = this.get('score.midi');

    for(const note of midi.notes){
      const url = this.get('synthesizer').noteToURL(note);
      this.get('audio').getBuffer(url);
    }

    this.audioCursor = midi.newCursor();
  }),

  stop: function(){
    this.get('audioBufferSourceNodes').forEach(function(audioBufferSourceNode){
      audioBufferSourceNode.stop();
    });
    this.get('audioBufferSourceNodes').clear();
  },

  play: function(){
    this.stop();
    this.initialPosition = parseFloat(this.get('time'));
    this.initialDateNow = Date.now();
    this.audioCursor.backward(this.initialPosition);
    this.audioCursor.forward(this.initialPosition);

    const audio = this.get('audio');
    if(this.get('isPlaying') & !this.get('isInterrupted')){
      for(const note of this.get('score.midi').notesOnAt(this.initialPosition)){
        const url = this.get('synthesizer').noteToURL(note);

        audio.getBuffer(url).then((buffer) => {
          const audioBufferSourceNode = audio.context.createBufferSource();
          audioBufferSourceNode.buffer = buffer;

          const gainNode = audio.context.createGain();
          gainNode.gain.value = 1.0;

          audioBufferSourceNode.connect(gainNode);
          gainNode.connect(this.masterGain);

          const remainingSeconds = note.offSecond - this.initialPosition;
          const startPosition = this.initialPosition - note.onSecond;
          audioBufferSourceNode.start(audio.context.currentTime, startPosition);
          gainNode.gain.setValueAtTime(1.0, audio.context.currentTime + remainingSeconds / this.get('playbackSpeed'));
          gainNode.gain.exponentialRampToValueAtTime(0.1, audio.context.currentTime + (remainingSeconds + 0.25) / this.get('playbackSpeed'));

          this.audioBufferSourceNodes.pushObject(audioBufferSourceNode);
        });
      }
    }

    this.sonate();
    this.animate();
  }.observes('isPlaying','isInterrupted'),

  sonate: function(){
    let component = this;
    let audio = this.get('audio');
    const audioBufferDuration = 1.10 * component.get('playbackSpeed'); // MUST be > 1.0 because browsers cap setTimeout at 1000ms for inactive tabs

    if(component.get('isPlaying') & !component.get('isInterrupted')){
      const elapsedSeconds = (Date.now() - this.initialDateNow) / 1000;
      const currentPosition = this.initialPosition + elapsedSeconds * component.get('playbackSpeed');

      component.audioCursor.forward(currentPosition + audioBufferDuration, {
        noteOn: (event) => {
          const note = event.note;
          const url = component.get('synthesizer').noteToURL(note);
          const secondsDelay = note.onSecond - currentPosition;

          audio.getBuffer(url).then(function(buffer){
            const audioBufferSourceNode = audio.context.createBufferSource();
            audioBufferSourceNode.buffer = buffer;

            const gainNode = audio.context.createGain();
            gainNode.gain.value = 1.0;

            audioBufferSourceNode.connect(gainNode);
            gainNode.connect(component.masterGain);

            audioBufferSourceNode.start(audio.context.currentTime + secondsDelay / component.get('playbackSpeed'));
            gainNode.gain.setValueAtTime(1.0, audio.context.currentTime + (secondsDelay + note.duration) / component.get('playbackSpeed'));
            gainNode.gain.exponentialRampToValueAtTime(0.1, audio.context.currentTime + (secondsDelay + note.duration + 0.25) / component.get('playbackSpeed'));

            component.audioBufferSourceNodes.pushObject(audioBufferSourceNode);
          });
        }
      });

      // can't use requestAnimationFrame because inactive tabs pause animation
      Ember.run.later(this, this.sonate, audioBufferDuration / 2);
    }
  },

  animate: function(){
    const component = this; 

    if(component.get('isPlaying') & !component.get('isInterrupted')){
      const elapsedSeconds = (Date.now() - component.initialDateNow) / 1000;
      const currentPosition = component.initialPosition + elapsedSeconds * component.get('playbackSpeed');
      component.set('time', currentPosition);

      component.get('animation').scheduleFrame(component.animate.bind(component));
    } else {
      component.stop();
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
    this.loadMidi();
  },

  willDestroyElement: function(){
    this.set('isPlaying', false);
    this.stop();
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
  },
});
