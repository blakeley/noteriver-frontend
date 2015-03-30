/* global Midi */

import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('score', params.score_id);
  },

  setupController: function (controller, model){
    controller.set('model', model);

    var path = model.get('fileUrl');
    var fetch = new XMLHttpRequest();
    fetch.open('GET', path);
    fetch.overrideMimeType("text/plain; charset=x-user-defined");
    fetch.onreadystatechange = function() {
      var _this = this;
      Ember.run(function() {
        if(_this.readyState === 4 && _this.status === 200) {
          /* munge response into a binary string */
          var text = _this.responseText || '';
          text = text.split('')
                     .map(function(c){
                       return String.fromCharCode(c.charCodeAt() & 255);})
                     .join('');
          window.midi = new Midi(text);
          model.set('midi', new Midi(text));
        }
      });
    };
    fetch.send();


  },


});
