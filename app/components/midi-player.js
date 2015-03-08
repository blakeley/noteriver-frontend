import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['midi-player'],
  time: 1,
  settingsPanelIsOpen: true,

  actions: {
    toggleSettingsPanelIsOpen: function(){
      this.toggleProperty('settingsPanelIsOpen');
    },
  },

});
