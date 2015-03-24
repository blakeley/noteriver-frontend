/* global AudioContext */

import Ember from 'ember';

export default Ember.Service.extend({
  context: new AudioContext(),
  buffers: new Ember.Map(),
  buffersA: Ember.A([]), // https://github.com/emberjs/ember.js/issues/10209

  totalLoaded: 0,
  percentLoaded: function(){
    if(this.get('buffersA.length') < 1){
      return 0;
    } else {
      return this.get('totalLoaded') / this.get('buffersA.length');
    }
  }.property('buffersA.length', 'totalLoaded'),

  getBuffer: function(url){
    var context = this.get('context');
    var buffers = this.get('buffers');
    var buffersA = this.get('buffersA');
    var _this = this;
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
          _this.incrementProperty('totalLoaded');
          resolve(buffer);
        });
      });
    });

    buffers.set(url, buffer);
    buffersA.pushObject(buffer);

    return buffer;
  },
});










