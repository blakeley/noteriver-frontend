/* global Ember */

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:application', {
  // Specify the other units that are required for this test.
  needs: ['service:storage'],
  setup: function(){
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
  }
};

var mockSession = Ember.Object.create({
  email: 'valid@mail.com',
  password: 'password',
  save: function() {
    console.log("saving");
    this.set('authToken', 'token');
    this.set('user', Ember.Object.create({id: 1337}));
    return {then: function(callback) {
      return callback(mockSession);
    }};
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var controller = this.subject();
  assert.ok(controller);
});

test('it uses service:storage', function(assert){
  var controller = this.subject();
  assert.ok(controller.get('storage'));
});

test('.logout() clears the authToken', function(assert) {
  var controller = this.subject({store: mockStore});
  controller.set('session', Ember.Object.create({
    authToken: 'token',
  }));
  controller.send('logout');
  assert.ok(!controller.get('session.authToken'));
});

test('.logout() clears the authToken in localStorage', function(assert) {
  mockStorage.setItem('authToken','token');
  var controller = this.subject({storage: mockStorage, store: mockStore});
  controller.set('session', Ember.Object.create());
  controller.send('logout');
  assert.ok(!mockStorage.getItem('authToken'));
});

test('.logout() clears the currentUserId in localStorage', function(assert) {
  mockStorage.setItem('currentUserId', 1337);
  var controller = this.subject({storage: mockStorage, store: mockStore});
  controller.set('session', Ember.Object.create());
  controller.send('logout');
  assert.ok(!mockStorage.getItem('currentUserId'));
});

test('.login() with valid credentials acquires an authToken', function(assert) {
  var controller = this.subject({storage: mockStorage, store: mockStore});
  controller.set('session', mockSession);
  controller.send('login');
  assert.ok(controller.get('session.authToken'));
});

test('.login() with valid credentials associates the current user', function(assert) {
  var controller = this.subject({storage: mockStorage});
  controller.set('session', mockSession);
  controller.send('login');
  assert.ok(controller.get('session.user'));
});

test('.login() with valid credentials saves the acquired authToken in localStorage', function(assert) {
  var controller = this.subject({storage: mockStorage});
  controller.set('session', mockSession);
  controller.send('login');
  assert.ok(mockStorage.getItem('authToken'));
  assert.equal(mockStorage.getItem('authToken'), 'token');
});


test('.login() with valid credentials saves the acquired user.id in localStorage', function(assert) {
  var controller = this.subject({storage: mockStorage});
  controller.set('session', mockSession);
  controller.send('login');
  assert.equal(mockStorage.getItem('currentUserId'), 1337);
});







