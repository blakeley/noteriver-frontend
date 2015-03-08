;import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['settings-panel-container'],
  classNameBindings: ['isOpen'],
  isOpen: true,
  actions: {
    toggleIsOpen: function(){
      this.toggleProperty('isOpen');
    }
  },
});
