import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('score', params.score_id);
  },

  afterModel: function(score) {
    var _this = this;
    return Ember.$.ajax(score.get('fileUrl')).then(function(json){
      _this.set('file', json);
    });
  },

  setupController: function (controller, model){
    controller.set('model', model);
    controller.set('file', this.get('file'));
  },


});
