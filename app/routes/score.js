/* global MidiFile */

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
          var t = _this.responseText || "" ;
          var ff = [];
          var mx = t.length;
          var scc = String.fromCharCode;
          for (var z = 0; z < mx; z++) {
            ff[z] = scc(t.charCodeAt(z) & 255);
          }
          window.f = new MidiFile(ff.join(""));
          controller.set('midi', new MidiFile(ff.join("")) );
        }
      });
    };
    fetch.send();


  },


});
