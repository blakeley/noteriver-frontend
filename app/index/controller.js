import Ember from 'ember';

export default Ember.Controller.extend({


  firstScore: function(){
    return this.get('model').objectAt(0);
  }.property('model'),

  secondScore: function(){
    return this.get('model').objectAt(1);
  }.property('model'),

  thirdScore: function(){
    return this.get('model').objectAt(2);
  }.property('model'),

});
