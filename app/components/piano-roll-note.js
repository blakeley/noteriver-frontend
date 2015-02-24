import Ember from 'ember';

var EBONIES = [1,3,6,8,10];

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','rx','ry','width','height','fill','stroke', 'stroke-width'],

  x: function(){
    return this.get('note.pitch');
  }.property(),

  y: function(){
    return this.get('note.onSecond');
  }.property(),

  rx: 0.25,
  ry: 0.25,
  width: 1,

  height: function(){
    return (this.note.offSecond - this.note.onSecond);
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
  "stroke-width": 0.125,

});

