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
  click('#new-account-button');
  fillIn('#new-account-email', "user@mail.com");
  fillIn('#new-account-password', "password");
  click('#create-account-button');
  andThen(function() {
    ok(find(".logout").length, "Log out button does not exist");
    equal(currentPath(), 'index');
  });
});

test('registering unsuccessfully', function() {
  visit('/');
  click('#new-account-button');
  fillIn('#new-account-email', "exists@mail.com");
  fillIn('#new-account-password', "password");
  click('#create-account-button');
  andThen(function() {
    ok(find(".errorMessage").length, "Did not display unsuccessful registration error messages");
    equal(currentPath(), 'index');
  });
});

test('registering unsuccessfully', function() {
  visit('/');
  click('#new-account-button');
  fillIn('#new-account-email', "");
  fillIn('#new-account-password', "password");
  click('#create-account-button');
  andThen(function() {
    ok(find(".errorMessage").length, "Did not display unsuccessful registration error messages");
    equal(currentPath(), 'index');
  });
});
