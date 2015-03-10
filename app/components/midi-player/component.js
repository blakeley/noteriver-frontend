import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['midi-player'],
  time: 1,
  settingsPanelIsOpen: true,

  lowNumber: 0,
  highNumber: 88,
  actions: {
    toggleSettingsPanelIsOpen: function(){
      this.toggleProperty('settingsPanelIsOpen');
    },
  },

  lowNumberChanged: function(){
    if(parseInt(this.get('lowNumber')) >= parseInt(this.get('highNumber'))){
      this.set('highNumber', parseInt(this.get('lowNumber')) + 1);
    }
  }.observes('lowNumber'),

  highNumberChanged: function(){
    if(parseInt(this.get('lowNumber')) >= parseInt(this.get('highNumber'))){
      this.set('lowNumber', parseInt(this.get('highNumber')) - 1);
    }
  }.observes('highNumber'),

});
