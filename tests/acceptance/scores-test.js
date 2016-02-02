import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'noteriver/tests/helpers/start-app';

module('Acceptance | scores', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Visiting /scores and clicking a score', function(assert) {
  visit('/scores');
  click('li.score a:first');
  waitForMidi();
  waitForAudioBuffers();
  andThen(function() {
    assert.equal(currentPath(), 'score');
  });
});

test('Visiting /scores and searching for a score', function(assert) {
  visit('/scores');
  fillIn('#scores-search-query', 'Test');
  andThen(() => {
    assert.equal(currentURL(), '/scores?search=Test'); // updates URL
    assert.equal(find('li.score a:first').text().trim(), 'Test Score - Automaton'); // updates model (scores)
  });
});

// Should be moved to integration test
test('Visiting /scores/new', function(assert) {
  visit('/scores/new');
  andThen(function() {
    assert.equal(currentPath(), 'scores/new');
    assert.equal($('#new-score-title').length, 1);
    assert.equal($('#new-score-artist').length, 1);
    assert.equal($('#new-score-file').length, 1);
    assert.ok($('#new-score-file').is(":hidden"));
  });
});

/*
test('Visiting /scores/new and creating a score transitions to that score\'s show route', function(assert) {
  visit('/scores/new');
  click('#create-score');
  andThen(function() {
    assert.equal(currentPath(), 'score.index');
  });
});
*/
