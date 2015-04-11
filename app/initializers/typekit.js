/* global Typekit */

import injectScript from 'ember-inject-script';
//import config from 'noteriver/config/environment';

export default {
  name: 'typekit',
  initialize: function() {
    var url = "//use.typekit.net/lhc1pwf.js";
    injectScript(url).then(function() {
      Typekit.load();
    });
  }
};
