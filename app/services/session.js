import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  storage: Ember.inject.service(),

  init: function(){
    this.set('authToken', this.get('storage').getItem('authToken'));
    this.set('currentUserId', this.get('storage').getItem('currentUserId'));
  },

  authTokenChanged: function(){
    this.get('storage').setItem('authToken', this.get('authToken'));
  }.observes('authToken'),

  currentUserIdChanged: function(){
    this.get('storage').setItem('currentUserId', this.get('currentUserId'));
  }.observes('currentUserId'),

  isAuthenticated: function(){
    return !!this.get('authToken') && !!this.get('currentUserId');
  }.property('authToken', 'currentUserId'),

  currentUser: function(){
    return this.get('store').find('user', this.get('currentUserId'));
  }.property('currentUserId'),

  logout: function(){
    this.set('authToken', null);
    this.set('currentUserId', null);
  },

});
