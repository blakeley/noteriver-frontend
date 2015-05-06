import Ember from 'ember';

export default Ember.Component.extend({
  animation: Ember.inject.service(),
  audio: Ember.inject.service(),

  classNames: ['midi-player'],

  time: 0.0,
  isPlaying: false,
  isInterrupted: false,
  settingsPanelIsOpen: false,
  lowNumber: 21,
  highNumber: 108,

  bufferSounds: function(){
    var audio = this.get('audio');
    this.get('score.midi.notes').forEach(function(note){
      var url = `/assets/audios/${note.number}.mp3`;
      audio.getBuffer(url);
    });
  }.observes('score.midi'),

  play: function(){
    var component = this;
    var startTime = parseFloat(this.get('time'));
    var initialDateNow = Date.now();

    if(component.get('isPlaying') & !component.get('isInterrupted')){
      component.get('score.midi.notes').forEach(function(note){
        var url = `/assets/audios/${note.number}.mp3`;
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

  willDestroyElement: function(){
    this.get('audio').stop();
  },

  actions: {
    toggleSettingsPanelIsOpen: function(){
      this.toggleProperty('settingsPanelIsOpen');
    },
  },


});
