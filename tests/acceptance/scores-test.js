/* global waitForAudioBuffers */

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'noteriver/tests/helpers/start-app';

var application;

module('Acceptance: Scores', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Visiting /scores and clicking a score', function(assert) {
  visit('/scores');
  click('tr');
  waitForAudioBuffers();
  andThen(function() {
    assert.equal(currentPath(), 'score.index');
  });
});
