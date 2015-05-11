import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  beforeModel: function(){
    if(!this.get('session.isAuthenticated')){
      this.transitionTo('/');
    }
  },

  model: function(){
    return this.get('session.currentUser');
  },

  setupController: function(controller, model){
    controller.set('currentUser', model);
    controller.set('editUserUsername', model.get('username'));
  },

});
