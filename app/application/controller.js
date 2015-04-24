import Ember from 'ember';

export default Ember.Controller.extend({
  storage: Ember.inject.service(),
  session: Ember.inject.service(),

  sessionMenuIsOpen: false,

  actions: {
    logout: function() {
      this.get('session').logout();
    },

    login: function(){
      return this.get('session').login().then(() => {
        this.set('sessionMenuIsOpen', false);
        this.send('closeModal');
      });
    },

    register: function(){
      return this.get('session').register().then(() => {
        this.set('sessionMenuIsOpen', false);
        this.send('closeModal');
      });
    },

    toggleSessionMenuIsOpen: function(){
      this.toggleProperty('sessionMenuIsOpen');
    },
  },

});
