import Ember from 'ember';

export default Ember.Controller.extend({
  storage: Ember.inject.service(),

  authTokenChanged: function(){
    console.log('authTokenChanged: ' + this.get('session.authToken'));
    this.get('storage').setItem('authToken', this.get('session.authToken'));
  }.observes('session.authToken'),

  currentUserIdChanged: function(){
    console.log('currentUserIdChanged: ' + this.get('session.user.id'));
    this.get('storage').setItem('currentUserId', this.get('session.user.id'));
  }.observes('session.user.id'),

  actions: {
    logout: function() {
      this.set('session.authToken', null);
      this.set('session.user', null);
    },

    login: function(){
      this.get('session').save();
    },

    register: function(){
      this.get('session.user').save().then(() => {
        this.set('session', this.get('session.user.session'));
      });
    },
  },

});
