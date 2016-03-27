import Ember from 'ember';

export default Ember.Route.extend({
  // uncomment after implementing score.loading
  /*afterModel: function(score){
    return score.get('promise');
  },*/
  setupController(controller,model){
    controller.set('model', model);
    window.score = model;
  },
});
