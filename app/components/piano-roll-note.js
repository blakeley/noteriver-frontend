import Ember from 'ember';

var EBONIES = [1,3,6,8,10];

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','rx','ry','width','height','fill','stroke'],

  x: function(){
    return (this.get('note.pitch') - 36) * 20;
  }.property(),

  y: function(){
    return this.get('note.onSecond') * 200;
  }.property(),

  rx: 3,
  ry: 3,
  width: 20,

  height: function(){
    return (this.note.offSecond - this.note.onSecond) * 200;
  }.property(),

  fill: function(){
    if(this.get('isEbony')){
      return '#4B76AC';
    } else {
      return '#96B8D9';
    }
  }.property(),

  isEbony: function(){
    return EBONIES.indexOf(this.get('note.pitch') % 12) > -1;
  }.property(),

  stroke: '#5E5E5E',

});

