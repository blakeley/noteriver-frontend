import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'g',
  attributeBindings: ['transform'],
  translateX: 0,
  translateY: 0,

  transform: function(){
    return "translate(" + this.get('translateX') + "," + this.get('translateY') + ")";
  }.property('translateX','translateY'),

});
