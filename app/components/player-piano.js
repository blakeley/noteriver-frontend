/* global keyboard */

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'svg',
  classNames: ['piano-roll'],
  attributeBindings: ['viewBox', 'preserveAspectRatio'],

  keyboard: keyboard,

  timeScale: 10,

  noteTranslateY: function(){
    return keyboard.IVORY_HEIGHT - this.get('time') * this.get('timeScale');
  }.property('time'),

  // attributes
  vbx: function(){
    return keyboard.note(this.get('lowNumber')).x;
  }.property('lowNumber'),

  vbw: function(){
    return keyboard.note(this.get('highNumber')).x - this.get('vbx') + keyboard.IVORY_WIDTH;
  }.property('vbx', 'highNumber'),

  viewBox: function(){
    return this.get('vbx') + " 0 "+this.get('vbw')+" 1000";
  }.property('vbx','vbw'),

  // Because jQuery disregards case in .attr(), Ember fails to update
  // the viewBox attribute correctly. This workaround fixes this issue.
  viewBoxChanged: function(){
    this.$().get(0).setAttribute('viewBox', this.get('viewBox'));
  }.observes('viewBox'),

  preserveAspectRatio: "xMidYMin slice",
});
