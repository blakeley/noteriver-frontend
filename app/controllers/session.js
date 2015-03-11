import Ember from 'ember';

export default Ember.Controller.extend({
  storage: Ember.inject.service(),

  init: function() {
    this.set('authToken', this.get('storage').getItem('authToken'));
    this.set('currentUserId', this.get('storage').getItem('currentUserId'));
    this.set('isOpen', false);
  },

  sessionChanged: function(){
    if(!!this.get('authToken') && !!this.get('currentUserId')){
      this.get('storage').setItem('authToken', this.get('authToken'));
      this.get('storage').setItem('currentUserId', this.get('currentUserId'));
    } else {
      this.get('storage').removeItem('authToken');
      this.get('storage').removeItem('currentUserId');
    }
  }.observes('authToken','currentUserId'),

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
      this.set('currentUserId', null);
    },

    toggleOpen: function() {
      this.set('isOpen', !this.get('isOpen'));
    }

  }
});
