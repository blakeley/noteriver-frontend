import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Log in', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    localStorage.clear();
  }
});

test('logging in successfully', function() {
  visit('/');
  click('#new-session-button');
  fillIn('#new-session-email', "exists@mail.com");
  fillIn('#new-session-password', "password");
  click('#create-session-button');
  click('#current-session');
  andThen(function() {
    ok(find(".logout").length, "Log out button does not exist");
    equal(currentPath(), 'index');
  });
});

test('logging in unsuccessfully', function() {
  visit('/');
  click('#new-session-button');
  fillIn('#new-session-email', "exists@mail.com");
  fillIn('#new-session-password', "wrong password");
  click('#create-session-button');
  andThen(function() {
    ok(find(".errorMessage").length, "Did not display error message");
    equal(currentPath(), 'index');
  });
});

