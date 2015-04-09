/* global File, atob */

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:s3', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

var file = new File(["MThd"], "sample.mid");

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('#signatureUrl defaults to /sign', function(assert) {
  var service = this.subject();
  assert.equal(service.get('signUrl'), '/sign');
});

test('#sign returns a promise', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(){
    assert.ok(true, 'returned a promise!');
  });
});

test('#sign resolves to json with "key" property', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    assert.ok(json.key);
  });
});

test('#sign resolves to json with a "policy" property', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    assert.ok(json.policy);
  });
});

test('#sign resolves to json with a "policy" property with an "expiration" property', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    var policyDocument = JSON.parse(atob(json.policy));
    assert.ok(policyDocument.expiration);
  });
});

test('#sign resolves to json with a "policy" with an "expiration" representing a future ISO timestamp', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    var policyDocument = JSON.parse(atob(json.policy));
    var expiresAt = Date.parse(policyDocument.expiration);
    assert.ok(expiresAt > Date.now(), "Signature has already expired");
  });
});















