import Ember from 'ember';

var EBONIES = [1,3,6,8,10];

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','rx','ry','width','height','fill','stroke', 'stroke-width'],

  x: function(){
    return keyboard.note(this.get('note.pitch')).x() / keyboard.IVORY_WIDTH;
  }.property(),

  y: function(){
    return this.get('note.onSecond') * 20;
  }.property(),

  rx: function(){
    return this.get('width') / 4;
  }.property(),

  ry: function(){
    return this.get('width') / 4;
  }.property(),

  width: function(){
    return keyboard.note(this.get('note.pitch')).width() / keyboard.IVORY_WIDTH;
  }.property(),

  height: function(){
    return (this.note.offSecond - this.note.onSecond) * 20;
  }.property(),

  fill: function(){
    if(keyboard.note(this.get('note.pitch')).isEbony()){
      return '#4B76AC';
    } else {
      return '#96B8D9';
    }
  }.property(),

  stroke: '#5E5E5E',
  "stroke-width": function(){
    return this.get('width') / 8;
  }.property(),

});

