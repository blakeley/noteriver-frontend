import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this.set('authToken', this.storage.getItem('authToken'));
    this.set('currentUserId', this.storage.getItem('currentUserId'));
    this.set('isOpen', false);
  },

  sessionChanged: function(){
    if(!!this.get('authToken') && !!this.get('currentUserId')){
      this.storage.setItem('authToken', this.get('authToken'));
      this.storage.setItem('currentUserId', this.get('currentUserId'));
    } else {
      this.storage.removeItem('authToken');
      this.storage.removeItem('currentUserId');
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

  avatarUrl: function(){
    return 'http://www.gravatar.com/avatar/' + this.get('currentUser.emailMd5') + '?d=identicon';
  }.property('currentUser.emailMd5'),

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
