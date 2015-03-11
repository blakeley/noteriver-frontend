/* global Ember */

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:application', {
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

test('.logout() clears the authToken', function(assert) {
  var controller = this.subject();
  controller.set('model', Ember.Object.create({
    authToken: 'token',
  }));
  controller.send('logout');
  assert.ok(!controller.get('model.authToken'));
});

test('.logout() disassociates the user', function(assert) {
  var controller = this.subject();
  controller.set('model', Ember.Object.create({
    user: Ember.Object.create(),
  }));
  controller.send('logout');
  assert.ok(!controller.get('model.user'));  
});

test('.logout() clears the authToken in localStorage', function(assert) {
  mockStorage.init();
  mockStorage.setItem('authToken','token');
  var controller = this.subject({storage: mockStorage});
  controller.set('model', Ember.Object.create());
  controller.send('logout');
  assert.ok(!mockStorage.getItem('authToken'));
});

test('.logout() clears the currentUserId in localStorage', function(assert) {
  mockStorage.init();
  mockStorage.setItem('currentUserId', 1337);
  var controller = this.subject({storage: mockStorage});
  controller.set('model', Ember.Object.create());
  controller.send('logout');
  assert.ok(!mockStorage.getItem('currentUserId'));
});











