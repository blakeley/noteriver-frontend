import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['control-bar'],
  actions: {
    toggleSettingsPanelIsOpen: function(){
      this.toggleProperty('settingsPanelIsOpen');
    },
  },
});
