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

      controller.set('isUploadingFile', true);
      this.get('s3').upload(file).then(function(fileUrl){
        model.set('fileUrl', fileUrl);
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
