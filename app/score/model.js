/* global Midi */

import ENV from 'noteriver/config/environment';
import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.belongsTo('user'),
  s3Key: DS.attr('string'),
  title: DS.attr('string'),
  artist: DS.attr('string'),

  fileUrl: function(){
    if(this.get('s3Key')){
      return `https://s3.amazonaws.com/${ENV.AWS_BUCKET}/${this.get('s3Key')}`;
    } else {
      return undefined;
    }
  }.property('s3Key'),

  midi: function(){
    // slightly hackish: when promise resolves, it sets midi
    // so this just ensures promise settles following get('midi')
    this.get('promise');
  }.property('promise'),

  promise: function(){
    var score = this;

    if(score.get('fileUrl')){
      return new Ember.RSVP.Promise(function(resolve/*, reject*/){
        var xhr = new XMLHttpRequest();

        xhr.open('GET', score.get('fileUrl'));
        xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.onreadystatechange = function() {
          Ember.run(function() {
            if(xhr.readyState === 4 && xhr.status === 200) {
              /* munge response into a binary string */
              var text = xhr.responseText || '';
              text = text.split('')
                         .map(function(c){
                           return String.fromCharCode(c.charCodeAt() & 255);})
                         .join('');

              var midi = new Midi(text);
              score.set('midi', midi);
              resolve(midi);
            }
          });
        };
        xhr.send();
      });
    } else {
      return new Ember.RSVP.resolve();
    }
  }.property('fileUrl'),


});
