/* global Midi */

import Ember from 'ember';
import ENV from 'noteriver/config/environment';
import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  s3Key: DS.attr('string'),
  title: DS.attr('string'),
  artist: DS.attr('string'),
  createdAt: DS.attr('date'),

  midi: new Midi(), // default Midi for "confident" javascript
  promise: null,

  fileUrl: Ember.computed('s3Key', function(){
    return `https://s3.amazonaws.com/${ENV.AWS_BUCKET}/${this.get('s3Key')}`;
  }),

  loadMidi: function() {
    var score = this;

    if(!this.get('promise')){ // don't try multiple times simultaneously
      var promise = new Ember.RSVP.Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();

        xhr.open('GET', score.get('fileUrl'));
        xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.onreadystatechange = function() {
          Ember.run(function() {
            if(xhr.readyState === 4){
              if(xhr.status === 200){
                /* munge response into a binary string */
                var text = xhr.responseText || '';
                text = text.split('')
                           .map(function(c){
                             return String.fromCharCode(c.charCodeAt() & 255);})
                           .join('');

                var midi = new Midi(text);
                Ember.run(function() {
                  score.set('midi', midi);
                });

                resolve(midi);
              } else {
                Ember.run(function() {
                  score.set('promise', null);
                });

                reject(new Error(`Request MIDI file from ${score.get('fileUrl')} failed with status: [${xhr.status}]`));
              }
            }
          });
        };

        xhr.send();
      });

      score.set('promise', promise);
    }

    return score.get('promise');
  },



});
