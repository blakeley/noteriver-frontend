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

test('Visiting /scores/new', function(assert) {
  visit('/scores/new');
  andThen(function() {
    assert.equal(currentPath(), 'scores/new.index');
    assert.equal($('#new-score-title').length, 1);
    assert.equal($('#new-score-artist').length, 1);
    assert.equal($('#new-score-file').length, 1);
  });
});

