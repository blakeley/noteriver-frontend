/* global Midi */
import Ember from 'ember';

export default Ember.Controller.extend({
  s3: Ember.inject.service(),

  isReadingFile: false,
  isUploadingFile: false,
  isProcessingFile: Ember.computed.or('isReadingFile','isUploadingFile'),

  actions: {
    fileChanged: function(file){
      var controller = this;
      var model = this.get('model');

      controller.set('isReadingFile', true);
      var fileReader = new FileReader();
      fileReader.onload = function(/* e */){
        let midi = new Midi(fileReader.result);
        model.set('midi', midi);
        controller.set('isReadingFile', false);
      };
      fileReader.readAsBinaryString(file);

      // TODO: upload only after reading & validating file contents
      controller.set('isUploadingFile', true);
      this.get('s3').upload(file).then(function(s3Key){
        model.set('s3Key', s3Key);
        controller.set('isUploadingFile', false);
      });
    },

    createScore: function(){
      var controller = this;
      this.get('model').save().then(function(score){
        controller.transitionToRoute('score', score);
      });
    },

  },

});
