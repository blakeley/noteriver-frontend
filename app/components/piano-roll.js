import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['piano-roll'],
  attributeBindings: ['viewBox', 'preserveAspectRatio'],

  // attributes
  viewBox: function(){
    return "0 0 88 1000";
  }.property(),

  preserveAspectRatio: function(){
    return "xMidYMin slice";
  }.property(),


});
