import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:application', 'ApplicationController', {
  // Specify the other units that are required for this test.
  needs: ['service:storage'],
});

var mockStorage = {
  init: function(){
    this.hash = {};
  },
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

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('it uses service:storage', function(assert){
  var controller = this.subject();
  assert.ok(controller.get('storage'));
});

/*
test('it acquires authToken from localStorage', function(assert){
  mockStorage.init();
  mockStorage.setItem('authToken', 'token');
  var session = this.subject({storage: mockStorage});
  assert.equal(session.get('authToken'), 'token');
});

test('it acquires currentUserId from localStorage', function(assert){
  mockStorage.init();
  mockStorage.setItem('currentUserId', 1337);
  var session = this.subject({storage: mockStorage});
  assert.equal(session.get('currentUserId'), 1337);
});
*/

/*
test('#isAuthenticated is true when authToken and user exist', function(assert){
  mockStorage.init();
  var session = this.subject({storage: mockStorage});
  session.set('authToken', 'token');
  session.set('currentUserId', 1337);
  assert.equal(session.get('isAuthenticated'), true);
});

test('#isAuthenticated is false when authToken is null', function(assert){
  mockStorage.init();
  var session = this.subject({storage: mockStorage});
  session.set('authToken', 'token');
  assert.equal(session.get('isAuthenticated'), false);
});

test('#isAuthenticated is false when currentUserId is null', function(assert){
  mockStorage.init();
  var session = this.subject({storage: mockStorage});
  session.set('currentUserId', 1337);
  assert.equal(session.get('isAuthenticated'), false);
});
*/

/*
test('#currentUser returns the current user when isAuthenticated', function(assert){
  mockStorage.init();
  var session = this.subject({storage: mockStorage});
  session.set('authToken', 'token');
  session.set('currentUserId', 1337);
  assert.equal(session.get('isAuthenticated'), true);
});

test('.logout() logs the user out', function(assert){
  mockStorage.init();
  var session = this.subject({storage: mockStorage});
  session.set('authToken', 'token');
  session.set('currentUserId', 1337);
  assert.equal(session.get('isAuthenticated'), true);
  session.send('logout');
  assert.equal(session.get('isAuthenticated'), false);    
});

test('.logout() clears the authentication storage', function(assert){
  mockStorage.init();
  mockStorage.setItem('authToken', 'token');
  mockStorage.setItem('currentUserId', 1337);
  var session = this.subject({storage: mockStorage});
  session.send('logout');
  assert.ok(!mockStorage.getItem('authToken'));
  assert.ok(!mockStorage.getItem('currentUserId'));
});

test('.login() logs the user in', function(assert){
  var session = this.subject({storage: mockStorage});
  session.set('email', 'valid@mail.com');
  session.set('password', 'password');
  assert.equal(session.get('isAuthenticated'), false);
  session.send('login');
  assert.equal(session.get('isAuthenticated'), true);
});
*/





