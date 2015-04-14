import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  storage: Ember.inject.service(),

  init: function(){
    this.set('authToken', this.get('storage').getItem('authToken'));
    this.set('currentUserId', this.get('storage').getItem('currentUserId'));
  },

  isAuthenticated: function(){
    return !!this.get('authToken') && !!this.get('currentUserId');
  }.property('authToken', 'currentUserId'),

  currentUser: function(){
    return this.get('store').find('user', this.get('currentUserId'));
  }.property('currentUserId'),

});
