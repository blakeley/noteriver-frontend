/* global Midi */
import Ember from 'ember';

const { computed } = Ember;
const { alias } = computed;

export default Ember.Controller.extend({
  s3: Ember.inject.service(),
  session: Ember.inject.service(),

  isReadingFile: false,
  isUploadingFile: false,
  isProcessingFile: Ember.computed.or('isReadingFile','isUploadingFile'),

  score: alias('model'),

  actions: {
    fileChanged: function(file){
      var controller = this;
      var score = this.get('score');

      controller.set('isReadingFile', true);
      var fileReader = new FileReader();
      fileReader.onload = function(e){
        let midi = new Midi(fileReader.result);
        controller.set('filename', file.name);
        score.set('midi', midi);
        controller.set('isReadingFile', false);
      };
      fileReader.readAsBinaryString(file);

      // TODO: upload only after reading & validating file contents
      controller.set('isUploadingFile', true);
      this.get('s3').upload(file).then(function(s3Key){
        score.set('s3Key', s3Key);
        controller.set('isUploadingFile', false);
      });
    },

    createScore: function(){
      var controller = this;
      this.get('score').save().then(function(score){
        score.set('user', controller.get('session.currentUser'));
        controller.transitionToRoute('score', score);
      });
    },
  },
});
