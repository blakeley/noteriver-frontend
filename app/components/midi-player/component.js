import Ember from 'ember';

export default Ember.Component.extend({
  animation: Ember.inject.service(),
  audio: Ember.inject.service(),
  synthesizer: Ember.inject.service(),

  classNames: ['midi-player'],

  time: 0.0,
  isPlaying: false,
  isInterrupted: false,
  settingsPanelIsOpen: false,
  midiLoadFailed: false,
  lowNumber: 21,
  highNumber: 108,

  play: function(){
    var component = this;
    var startTime = parseFloat(this.get('time'));
    var initialDateNow = Date.now();

    if(component.get('isPlaying') & !component.get('isInterrupted')){
      component.get('score.midi.notes').forEach(function(note){
        var url = component.get('synthesizer').noteToURL(note);

        var secondsDelay = note.onSecond - startTime;
        if(secondsDelay >= 0){
          component.get('audio').playSound(url, secondsDelay);
        }
      });
    } else {
      component.get('audio').stop();
    }

    function animate(){
      if(component.get('isPlaying') & !component.get('isInterrupted')){
        var deltaTime = (Date.now() - initialDateNow) / 1000;
        component.set('time', startTime + deltaTime);
        component.get('animation').scheduleFrame(animate);
      }
    }
    this.get('animation').scheduleFrame(animate);
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
