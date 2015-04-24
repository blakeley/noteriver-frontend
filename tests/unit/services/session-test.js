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
  pushPayload: function(name, params){
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

test('it updates authToken in localStorage whenever authToken changes', function(assert){
  assert.expect(2);
  var service = this.subject({storage: mockStorage});
  service.set('authToken', 'token');
  assert.equal(mockStorage.getItem('authToken'), 'token');
  service.set('authToken', null);
  assert.equal(mockStorage.getItem('authToken'), null);
});

test('it updates currentUserId in localStorage whenever currentUserId changes', function(assert){
  assert.expect(2);
  var service = this.subject({storage: mockStorage});
  service.set('currentUserId', 1337);
  assert.equal(mockStorage.getItem('currentUserId'), 1337);
  service.set('currentUserId', null);
  assert.equal(mockStorage.getItem('currentUserId'), null);
});

test('#isAuthenticated is false when authToken is undefined', function(assert){
  var service = this.subject({storage: mockStorage});
  service.set('currentUserId', 1337);
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

test('.logout() clears the authToken', function(assert){
  mockStorage.setItem('authToken', 'token');
  mockStorage.setItem('currentUserId', 1337);
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.logout();
  assert.ok(!service.get('authToken'));
});

test('.logout() clears the currentUserId', function(assert){
  mockStorage.setItem('authToken', 'token');
  mockStorage.setItem('currentUserId', 1337);
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.logout();
  assert.ok(!service.get('currentUserId'));
});

test('.login() returns a promise', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  assert.ok(!!service.login().then);
});

test('.login() with valid credentials sets authToken', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.set('newSessionEmail', 'valid@mail.com');
  service.set('newSessionPassword', 'password');
  return service.login().then(function(){
    assert.equal(service.get('authToken'), 'token');
  });
});

test('.login() with valid credentials sets currentUserId', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.set('newSessionEmail', 'valid@mail.com');
  service.set('newSessionPassword', 'password');
  return service.login().then(function(){
    assert.equal(service.get('currentUserId'), 1);
  });
});

test('.login() with unknown email sets newSessionEmailError', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.set('newSessionEmail', 'unknown');
  service.set('newSessionPassword', 'password');
  return service.login().catch(function(){
    assert.ok(service.get('newSessionEmailError'));
  });
});

test('.login() with incorrect password sets newSessionPasswordError', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.set('newSessionEmail', 'valid@mail.com');
  service.set('newSessionPassword', 'incorrect');
  return service.login().catch(function(){
    assert.ok(service.get('newSessionPasswordError'));
  });
});

test('.register() returns a promise', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  assert.ok(!!service.register().then);
});

test('.register() with valid credentials sets authToken', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.set('newUserEmail', 'valid@mail.com');
  service.set('newUserPassword', 'password');
  return service.register().then(function(){
    assert.equal(service.get('authToken'), 'token');
  });
});

test('.register() with valid credentials sets currentUserId', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.set('newUserEmail', 'valid@mail.com');
  service.set('newUserPassword', 'password');
  return service.register().then(function(){
    assert.equal(service.get('currentUserId'), 1);
  });
});

test('.register() with invalid email sets newUserEmailError', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.set('newUserEmail', 'invalid');
  service.set('newUserPassword', 'password');
  return service.register().catch(function(){
    assert.ok(service.get('newUserEmailError'));
  });
});

test('.register() with blank password sets newUserPasswordError', function(assert){
  var service = this.subject({storage: mockStorage, store: mockStore});
  service.set('newUserEmail', 'valid@mail.com');
  service.set('newUserPassword', 'blank');
  return service.register().catch(function(){
    assert.ok(service.get('newUserPasswordError'));
  });
});










