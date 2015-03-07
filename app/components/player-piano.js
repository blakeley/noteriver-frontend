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
  viewBox: function(){
    return "0 0 52 1000";
  }.property(),

  preserveAspectRatio: function(){
    return "xMidYMin slice";
  }.property(),
});
