import Ember from 'ember';

export default Ember.Component.extend({
  animation: Ember.inject.service(),
  audio: Ember.inject.service(),

  classNames: ['midi-player'],

  time: 1,
  isPlaying: false,
  isInterrupted: false,
  settingsPanelIsOpen: true,
  lowNumber: 0,
  highNumber: 88,

  play: function(){
    var component = this;
    var startTime = parseFloat(this.get('time'));
    var startDateNow = Date.now();
    function animate(){
      if(component.get('isPlaying') & !component.get('isInterrupted')){
        var deltaTime = (Date.now() - startDateNow) / 1000;
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

  actions: {
    toggleSettingsPanelIsOpen: function(){
      this.toggleProperty('settingsPanelIsOpen');
    },
  },


});
