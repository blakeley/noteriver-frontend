import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Registration', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    localStorage.clear();
  }
});

test('registering successfully', function() {
  visit('/');
  fillIn('#new-account-email', "user@mail.com");
  fillIn('#new-account-password', "password");
  click('#new-account-button');
  andThen(function() {
    ok(find(".logout").length, "Log out button does not exist");
    equal(currentPath(), 'index');
  });
});

test('registering unsuccessfully', function() {
  visit('/');
  fillIn('#new-account-email', "taken@mail.com");
  fillIn('#new-account-password', "password");
  click('#new-account-button');
  andThen(function() {
    ok(find(".errorMessage").length, "Did not display unsuccessful registration error messages");
    equal(currentPath(), 'index');
  });
});

test('registering unsuccessfully', function() {
  visit('/');
  fillIn('#new-account-email', "");
  fillIn('#new-account-password', "password");
  click('#new-account-button');
  andThen(function() {
    ok(find(".errorMessage").length, "Did not display unsuccessful registration error messages");
    equal(currentPath(), 'index');
  });
});
