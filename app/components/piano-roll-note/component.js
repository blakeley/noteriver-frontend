/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','rx','ry','width','height','fill','stroke', 'stroke-width'],

  x: function(){
    return keyboard.note(this.get('note.pitch')).x;
  }.property(),

  y: function(){
    return this.get('note.onSecond') * this.get('timeScale');
  }.property(),

  rx: function(){
    return this.get('width') / 4;
  }.property(),

  ry: function(){
    return this.get('width') / 4;
  }.property(),

  width: function(){
    return keyboard.note(this.get('note.pitch')).width;
  }.property(),

  height: function(){
    return (this.note.offSecond - this.note.onSecond) * this.get('timeScale');
  }.property(),

  fill: function(){
    if(keyboard.note(this.get('note.pitch')).isEbony){
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
