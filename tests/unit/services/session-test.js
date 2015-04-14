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
  }
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













