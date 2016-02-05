/* global Midi */

import Ember from 'ember';
import ENV from 'noteriver/config/environment';

const { observer, computed } = Ember;

export default Ember.Mixin.create({
  audio: Ember.inject.service(),

  midi: new Midi(),
  time: 0.0,
  audioBufferSourceNodes: Ember.A([]),
  masterGainValue: 0.10,
  playbackSpeed: 1.00,
  transpositionInterval: 0,

  audioCursor: computed('midi', function(){
    return this.get('midi').newCursor();
  }),

  noteToURL: function(note) {
    return `${ENV.assetPrefix}/assets/audios/${note.number}.mp3`;
  },

  init: function(){
    this._super.apply(this, arguments);

    this.masterGain = this.get('audio').context.createGain();
    this.masterGain.gain.value = this.get('masterGainValue');
    this.masterGain.connect(this.get('audio').context.destination);
  },

  masterGainValueChanged: observer('masterGainValue', function(){
    this.masterGain.gain.value = this.get('masterGainValue');
  }),

  playbackSpeedChanged: observer('playbackSpeed', function(){
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
  }),

  audioBuffersChanged: observer('midi', 'transpositionInterval', function(){
    for(const note of this.get('midi').notes){
      this.get('audio').getBuffer(this.noteToURL(note));
    }
  }),

  playNote: function(note){
    return this.get('audio').getBuffer(this.noteToURL(note)).then((buffer) => {
      const audioBufferSourceNode = this.get('audio').context.createBufferSource();
      audioBufferSourceNode.buffer = buffer;

      const gainNode = this.get('audio').context.createGain();
      gainNode.gain.value = 1.0;

      audioBufferSourceNode.connect(gainNode);
      gainNode.connect(this.masterGain);

      const elapsedSeconds = (Date.now() - this.initialDateNow) / 1000;
      const currentPosition = this.initialPositionSecond + elapsedSeconds * this.get('playbackSpeed');
      const startWhen = this.get('audio').context.currentTime + Math.max(0, note.onSecond - currentPosition) / this.get('playbackSpeed');
      const startBufferOffset = Math.max(0, this.initialPositionSecond - note.onSecond);
      const startFadeWhen = this.get('audio').context.currentTime + (note.offSecond - currentPosition) / this.get('playbackSpeed');
      const endFadeWhen = startFadeWhen + 0.25 / this.get('playbackSpeed');

      audioBufferSourceNode.start(startWhen, startBufferOffset);
      gainNode.gain.setValueAtTime(1.0, startFadeWhen);
      gainNode.gain.exponentialRampToValueAtTime(0.1, endFadeWhen);

      this.audioBufferSourceNodes.pushObject(audioBufferSourceNode);
    });
  },

  stopAudio: function(){
    this.get('audioBufferSourceNodes').forEach(function(audioBufferSourceNode){
      audioBufferSourceNode.stop();
    });
    this.get('audioBufferSourceNodes').clear();
  },
});
