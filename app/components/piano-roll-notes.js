import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'g',
  classNames: ['piano-roll-notes'],
  attributeBindings: ['transform'],

  transform: function(){
    var translateY = keyboard.IVORY_HEIGHT - this.get('time') ;
    return "translate(0," + translateY + ")";
  }.property('time'),


});
