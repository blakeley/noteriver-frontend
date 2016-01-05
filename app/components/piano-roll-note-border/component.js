/* global MidiNumber */

import Ember from 'ember';

const {computed} = Ember;

const overreach = 4;

export default Ember.Component.extend({
  tagName: 'rect',
  attributeBindings: ['x','y','rx','ry','width','height','fill','stroke','stroke-opacity','stroke-width'],

  x: computed('note.number', function(){
    return new MidiNumber(this.get('note.number')).x + this.get('stroke-width') / overreach;
  }),

  y: computed('note.number', function(){
    return this.get('note.onSecond') * this.get('timeScale') + this.get('stroke-width') / overreach;
  }),

  rx: computed('note.number', function(){
    return this.get('width') / 4 - this.get('stroke-width') / overreach;
  }),

  ry: computed('note.number', function(){
    return this.get('width') / 4 - this.get('stroke-width') / overreach;
  }),

  width: computed('note.number', function(){
    return new MidiNumber(this.get('note.number')).width - this.get('stroke-width') * 2 / overreach;
  }),

  height: computed('note.number', function(){
    return (this.note.offSecond - this.note.onSecond) * this.get('timeScale') - this.get('stroke-width') * 2 / overreach;
  }),

  fill: 'rgba(124,240,10,0.0)',

  stroke: '#202020',
  'stroke-opacity': 0.9,
  'stroke-width': computed('note.number', function(){
    return new MidiNumber(this.get('note.number')).width / 16;
  }),

});

