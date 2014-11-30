import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Session', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('visiting /session', function() {
  localStorage.setItem('token', 'token');
  localStorage.setItem('userId', '1');

  visit('/');
  click('button.logout');

  andThen(function() {
    ok(find('#new-account-button').length, "can't log out");
  });
});
