import Ember from 'ember';

export default Ember.Route.extend({
  storage: Ember.inject.service(),

  model: function(){
    var currentUserId = this.get('storage').getItem('currentUserId');
    var authToken = this.get('storage').getItem('authToken');
    if(!!currentUserId && !!authToken) {
      return Ember.RSVP.hash({
        user: this.store.find('user', currentUserId),
        session: this.store.createRecord('session', {
          authToken: authToken,
        }),
      });
    } else {
      return Ember.RSVP.hash({
        user: this.store.createRecord('user'),
        session: this.store.createRecord('session'),
      });
    }
  },

  setupController: function(controller, model){
    var user = model['user'];
    var session = model['session'];
    session.set('user', user);
    user.set('session', session);
    controller.set('session', session);
    controller.set('user', user);
  },

});
