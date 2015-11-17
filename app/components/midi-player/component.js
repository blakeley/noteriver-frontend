/* global Midi */

import Ember from 'ember';

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
  midiLoadFailed: false,
  lowNumber: 21,
  highNumber: 108,

  play: function(){
    let component = this;
    let initialPosition = parseFloat(this.get('time'));
    let audioBufferPosition = initialPosition;
    let audioBufferDuration = 1.10; // MUST be > 1.0 because browsers cap setTimeout at 1000ms for inactive tabs
    let initialDateNow = Date.now();

    function sonate(){
      if(component.get('isPlaying') & !component.get('isInterrupted')){
        const elapsedSeconds = (Date.now() - initialDateNow) / 1000;
        const currentPosition = initialPosition + elapsedSeconds;

        component.get('score.midi.notes').filter(function(note){
          return audioBufferPosition <= note.onSecond && note.onSecond <= currentPosition + audioBufferDuration;
        }).forEach(function(note) {
          const url = component.get('synthesizer').noteToURL(note);
          const secondsDelay = note.onSecond - currentPosition;
          component.get('audio').playSound(url, secondsDelay, note.duration);
        });
        audioBufferPosition = currentPosition + audioBufferDuration;

        // can't use requestAnimationFrame because inactive tabs pause animation
        Ember.run.later(this, sonate, audioBufferDuration / 2);
      }
    }

    function animate(){
      if(component.get('isPlaying') & !component.get('isInterrupted')){
        const elapsedSeconds = (Date.now() - initialDateNow) / 1000;
        const currentPosition = initialPosition + elapsedSeconds;
        component.set('time', currentPosition);

        component.get('animation').scheduleFrame(animate);
      } else {
        component.get('audio').stop();
      }
    }

    sonate();
    animate();
  }.observes('isPlaying','isInterrupted'),

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
    var component = this;
    var audio = this.get('audio');

    component.get('score').loadMidi().then(function(midi){
      midi.notes.forEach(function(note){
        var url = component.get('synthesizer').noteToURL(note);
        audio.getBuffer(url);
      });
    }).catch(function(reason){
      component.set('midiLoadFailed', true);
    });
  },

  willDestroyElement: function(){
    this.set('isPlaying', false);
    this.get('audio').stop();
  },

  actions: {
    loadMidi: function(){
      var component = this;
      var audio = this.get('audio');

      this.set('midiLoadFailed', false);
      component.get('score').loadMidi().then(function(midi){
        midi.notes.forEach(function(note){
          var url = component.get('synthesizer').noteToURL(note);
          audio.getBuffer(url);
        });
      }).catch(function(reason){
        component.set('midiLoadFailed', true);
      });
    },

    toggleIsPlaying: function(){
      this.toggleProperty('isPlaying');
    },

    toggleSettingsPanelIsOpen: function(){
      this.toggleProperty('settingsPanelIsOpen');
    },
  },


});
