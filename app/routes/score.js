import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('score', params.score_id);
  },

  afterModel: function() {
    var _this = this;
    console.log('in afterModel')
    return Ember.$.getJSON('http://echo.jsontest.com/key/value/one/two').then(function(json){
      _this.set('kv', json)
    });
  },

  setupController: function (controller, model){
    controller.set('model', model);
    console.log(this.get('kv'));
    controller.set('kv', this.get('kv'));
  },


});
