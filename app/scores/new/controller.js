/* global Midi */
import Ember from 'ember';

export default Ember.Controller.extend({

  isReadingFile: false,

  actions: {
    fileChanged: function(file){
      var controller = this;
      controller.set('isReadingFile', true);

      var model = this.get('model');

      var fileReader = new FileReader();
      fileReader.onload = function(/* e */){
        let midi = new Midi(fileReader.result);
        model.set('midi', midi);
        controller.set('isReadingFile', false);
      };

      fileReader.readAsBinaryString(file);
    },
  },

});
