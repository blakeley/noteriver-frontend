import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'noteriver/tests/helpers/start-app';

var App;

module('Acceptance: Scores', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Visiting /scores and clicking a score', function(assert) {
  visit('/scores');
  click('tr');

  andThen(function() {
    assert.equal(currentPath(), 'score.index');
  });
});
