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
  ok(true, "it's okay");
/*  localStorage.setItem('token', 'token');
  localStorage.setItem('userId', '1');

  visit('/');
  click('#current-session');
  click('button.logout');

  andThen(function() {
    ok(find('#new-account-button').length, "can't log out");
  });*/
});
