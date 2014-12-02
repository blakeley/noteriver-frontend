import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Scores', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Visiting /scores and clicking a score', function() {
  visit('/scores');
  click('tr');

  andThen(function() {
    equal(currentPath(), 'score.index');
  });
});
