import Ember from 'ember';

export default Ember.ObjectController.extend({
  kv: function() {
    return 5;
  }.property(),

});
