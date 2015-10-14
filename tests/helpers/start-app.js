/* exported waitForSession, waitForAudioBuffers, waitForMidi */

import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

// custom test helpers
import waitForAudioBuffers from 'noteriver/tests/helpers/wait-for-audio-buffers';
import waitForSession from 'noteriver/tests/helpers/wait-for-session';
import waitForMidi from 'noteriver/tests/helpers/wait-for-midi';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
