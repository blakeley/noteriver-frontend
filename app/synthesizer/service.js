import Ember from 'ember';
import ENV from 'noteriver/config/environment';

export default Ember.Service.extend({
  noteToURL: function(note) {
    var url;

    // necessary until https://github.com/ember-cli/ember-cli-deploy/issues/219 is resolved
    if(ENV.environment === 'production') {
      url = `https://s3.amazonaws.com/noteriver/assets/audios/${note.number}.mp3`;      
    } else {
      url = `/assets/audios/${note.number}.mp3`;
    }

    return url;
  },
});
