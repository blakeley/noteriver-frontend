/* global AudioContext */

import Ember from 'ember';

export default Ember.Service.extend({
  init: function(){
    this.set('context', new AudioContext());
  },

  getBuffer: function(url){
    var context = this.get('context');
    return new Ember.RSVP.Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = "arraybuffer";
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('Load audio buffer from `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      }
    }).then(function(audioData){
      return new Ember.RSVP.Promise(function(resolve/*, reject*/){
        context.decodeAudioData(audioData, function(buffer){
          resolve(buffer);
        });
      });
    });
  },




});
