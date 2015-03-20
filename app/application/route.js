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

  setupController: function(controller, models){
    var user = models['user'];
    var session = models['session'];
    controller.associateModels(user, session);
  },

  actions: {
    openModal: function(modalName){
      return this.render('modals/' + modalName, {
        into: 'application',
        outlet: 'modal',
      });
    },
    closeModal: function(){
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
  },

});
