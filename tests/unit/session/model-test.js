/* global Ember */

import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('session', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('#isAuthenticated is false when not associated with a user', function(assert){
  var model = this.subject();
  Ember.run(function(){
    model.set('authToken', 'token');
  });
  assert.equal(model.get('isAuthenticated'), false);
});

test('#isAuthenticated is false when authToken is undefined', function(assert){
  var model = this.subject();
  Ember.run(() => {
    model.set('user', this.store().createRecord('user'));
  });
  assert.equal(model.get('isAuthenticated'), false);
});

test('isAuthenticated is true when associated with a user and authToken is defined', function(assert){
  var model = this.subject();
  Ember.run(() => {
    model.set('authToken', 'token');
    model.set('user', this.store().createRecord('user'));
  });
  assert.equal(model.get('isAuthenticated'), true);
});

