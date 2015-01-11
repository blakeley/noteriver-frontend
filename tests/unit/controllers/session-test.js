import Ember from 'ember';

import {
  moduleFor,
  test
} from 'ember-qunit';

var mockStorage = {
  hash: {},
  getItem: function(key) {
    console.log('get item');
    return this.hash[key];
  },
  setItem: function(key, value) {
    console.log('set item');
    this.hash[key] = value;
  },
  removeItem: function(key) {
    console.log('remove item');
    delete this.hash[key];
  },
};

moduleFor('controller:session', 'SessionController', {
  subject: function(options, klass, container) {
    return klass.create(Ember.merge({ 
      storage: mockStorage
    }, options));
  },
});

test('authToken returns the auth token', function() {
  mockStorage.setItem('authToken', 'token');
  equal('token', this.subject().get('authToken'));
});

test('isAuthenticated returns true when we have an authToken', function() {
  mockStorage.setItem('authToken', 'token');
  mockStorage.setItem('currentUserId', 1337);
  equal(true, this.subject().get('isAuthenticated'));
});

test('isAuthenticated returns false when we do not have an authToken', function() {
  mockStorage.removeItem('authToken');
  equal(false, this.subject().get('isAuthenticated'));
});

test('currentUserId returns the current user\'s ID', function() {
  mockStorage.setItem('currentUserId', 1337);
  equal(1337, this.subject().get('currentUserId'));
});

