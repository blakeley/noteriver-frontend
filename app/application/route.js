import Ember from 'ember';

export default Ember.Route.extend({
  storage: Ember.inject.service(),

  model: function(){
    var currentUserId = this.get('storage').getItem('currentUserId');
    var authToken = this.get('storage').getItem('authToken');
    if(!!currentUserId && !!authToken) {
      return this.store.createRecord('session', {
        authToken: authToken,
        user: this.store.find('user', currentUserId),
      });
    } else {
      return this.store.createRecord('session', {
        user: this.store.createRecord('user')
      });
    }
  },

  setupController: function(controller, model){
    controller.set('session', model);
  },

  afterModel: function(model){
    window.mm = model;
  },

});
