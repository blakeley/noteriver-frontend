import Ember from 'ember';

export default Ember.Controller.extend({
  storage: Ember.inject.service(),

  authTokenChanged: function(){
    this.get('storage').setItem('authToken', this.get('session.authToken'));
  }.observes('session.authToken'),

  currentUserIdChanged: function(){
    this.get('storage').setItem('currentUserId', this.get('session.user.id'));
  }.observes('session.user.id'),

  associateModels: function(user, session) {
    user.set('session', session);
    session.set('user', user);
    this.set('user', user);
    this.set('session', session);
  },

  actions: {
    logout: function() {
      var user = this.store.createRecord('user');
      var session = this.store.createRecord('session');
      this.associateModels(user, session);
    },

    login: function(){
      this.get('session').save().then((session) => {
        this.associateModels(session.get('user'), session)
        this.send('closeModal');
      });
    },

    register: function(){
      this.get('user').save().then((user) => {
        this.associateModels(user, user.get('session'))
        this.send('closeModal');
      });
    },
  },

});
