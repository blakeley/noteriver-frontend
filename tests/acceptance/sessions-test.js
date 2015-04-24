/* global waitForSession */

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'noteriver/tests/helpers/start-app';

var application;

module('Acceptance: Sessions', {
  beforeEach: function() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserId');
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('logging in', function(assert) {
  visit('/');
  click('#new-session-button');
  fillIn('#new-session-email', 'valid@mail.com');
  fillIn('#new-session-password', 'password');
  click('#create-session-button');
  waitForSession();
  andThen(function(){
    assert.equal($('#current-session-button').length, 1);
  });
});

test('registering', function(assert) {
  visit('/');
  click('#new-user-button');
  fillIn('#new-user-email', 'valid@mail.com');
  fillIn('#new-user-password', 'password');
  click('#create-user-button');
  waitForSession();
  andThen(function() {
    assert.equal($('#current-session-button').length, 1);
  });
});


test('logging out', function(assert) {
  localStorage.setItem('currentUserId', 1);
  localStorage.setItem('authToken', 'token');
  visit('/');
  click('#current-session-button');
  click('#destroy-session-button');

  andThen(function() {
    assert.equal($('#current-session-button').length, 0);
  });
});




