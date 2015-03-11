import Ember from 'ember';

export default Ember.Controller.extend({
  storage: Ember.inject.service(),

  init: function() {
    this.set('authToken', this.get('storage').getItem('authToken'));
    this.set('currentUserId', this.get('storage').getItem('currentUserId'));
    this.set('isOpen', false);
    this.set('session', this.store.createRecord('session'));
  },

  isAuthenticated: function(){
    return !!this.get('authToken') && !!this.get('currentUserId');
  }.property('authToken','currentUserId'),

  currentUser: function(){
    if(this.get('isAuthenticated')){
      return this.store.find('user', this.get('currentUserId'));
    } else {
      return null;
    }
  }.property('currentUserId'),

  actions: {
    logout: function() {
      this.set('authToken', null);
      this.get('storage').removeItem('authToken');
      this.set('currentUserId', null);
      this.get('storage').removeItem('currentUserId');
    },

    login: function() {
      this.get('session').save();
    },

    toggleOpen: function() {
      this.set('isOpen', !this.get('isOpen'));
    }

  }
});
