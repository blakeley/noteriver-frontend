/* global AudioContext */

import Ember from 'ember';

export default Ember.Service.extend({
  context: new AudioContext(),
  buffers: new Ember.Map(),

  getBuffer: function(url){
    var context = this.get('context');
    var buffers = this.get('buffers');
    if(buffers.has(url)){
      return buffers.get(url);
    }
    var buffer = new Ember.RSVP.Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = "arraybuffer";
      xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error('Load audio buffer from `' + url + '` failed with status: [' + xhr.status + ']'));
          }
        }        
      };
      xhr.send();
    }).then(function(audioData){
      return new Ember.RSVP.Promise(function(resolve/*, reject*/){
        context.decodeAudioData(audioData, function(buffer){
          resolve(buffer);
        });
      });
    });

    buffers.set(url, buffer);
    return buffer;
  },




});
