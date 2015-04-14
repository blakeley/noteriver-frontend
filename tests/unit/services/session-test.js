/* global Ember */

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:session', {
  // Specify the other units that are required for this test.
  needs: ['service:storage'],
  beforeEach: function(){
    mockStorage.hash = {};
  },
});

var mockStorage = {
  hash: {},
  getItem: function(key) {
    return this.hash[key];
  },
  setItem: function(key, value) {
    this.hash[key] = value;
  },
  removeItem: function(key) {
    delete this.hash[key];
  },
};

var mockStore = {
  createRecord: function(name){
    return Ember.Object.create({});
  },
  find: function(name, id){
    return Ember.Object.create({id: id});
  },
};

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('it uses service:storage', function(assert){
  var service = this.subject();
  assert.ok(service.get('storage'));
});

test('it sets authToken from localStorage on initialization', function(assert){
  mockStorage.setItem('authToken','token');
  var service = this.subject({storage: mockStorage});
  assert.equal(service.get('authToken'), 'token');
});

test('it sets currentUserId from localStorage on initialization', function(assert){
  mockStorage.setItem('currentUserId',1337);
  var service = this.subject({storage: mockStorage});
  assert.equal(service.get('currentUserId'), 1337);
});

test('#isAuthenticated is false when authToken is undefined', function(assert){
  var service = this.subject({storage: mockStorage});
  service.set('token', 1337);
  assert.ok(!service.get('isAuthenticated'));
});

test('#isAuthenticated is false when currentUserId is undefined', function(assert){
  var service = this.subject({storage: mockStorage});
  service.set('authToken', 'token');
  assert.ok(!service.get('isAuthenticated'));
});

test('#isAuthenticated is true when both authToken and currentUserId are defined', function(assert){
  var service = this.subject({storage: mockStorage});
  service.set('authToken', 'token');
  service.set('currentUserId', 1337);
  assert.ok(service.get('isAuthenticated'));
});

test('#currentUser returns the user currently authenticated', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.set('authToken', 'token');
  service.set('currentUserId', 1337);
  assert.ok(service.get('currentUser'));
  assert.equal(service.get('currentUser.id'), 1337);
});












