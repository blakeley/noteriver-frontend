import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['midi-player'],

  time: 1,
  isPlaying: false,
  settingsPanelIsOpen: true,
  lowNumber: 0,
  highNumber: 88,

  play: function(){
    var component = this;
    var lastAnimateTime = Date.now();
    function animate(){
      if(component.get('isPlaying')){
        var now = Date.now();
        var deltaTime = (now - lastAnimateTime) / 1000;
        lastAnimateTime = now;
        console.log(deltaTime);
        component.set('time', parseFloat(component.get('time')) + deltaTime);
        window.requestAnimationFrame(animate);
      }
    }
    window.requestAnimationFrame(animate);
  }.observes('isPlaying'),

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
