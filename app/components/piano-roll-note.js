import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','rx','ry','width','height','fill','stroke'],

  x: function(){
    return this.get('note.pitch') * 10 - 400;
  }.property(),

  y: function(){
    return this.get('note.onSecond') * 40;
  }.property(),

  rx: 3,
  ry: 3,
  width: 10,

  height: function(){
    return (this.note.offSecond - this.note.onSecond) * 20;
  }.property(),

  fill: function(){
    return '#96B8D9';
  }.property(),

  stroke: '#5E5E5E',

});

