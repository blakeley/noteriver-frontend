import Ember from 'ember';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: Registration', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
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
