/* global File, atob, CryptoJS */

import {
  moduleFor,
  test
} from 'ember-qunit';
import ENV from 'noteriver/config/environment';

moduleFor('service:s3', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

var file = new File(["MThd"], "s3-test-file.mid");

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

test('#sign resolves to json with "bucket" property', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    assert.ok(json.bucket);
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

test('#sign resolves to json with a "policy.expiration"', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    var policyDocument = JSON.parse(atob(json.policy));
    assert.ok(policyDocument.expiration);
  });
});

test('#sign resolves to json for which "policy.expiration" is a future ISO timestamp', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    var policyDocument = JSON.parse(atob(json.policy));
    var expiresAt = Date.parse(policyDocument.expiration);
    assert.ok(expiresAt > Date.now(), "Signature has already expired");
  });
});

test('#sign resolves to json with a "policy.conditions" property', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    var policyDocument = JSON.parse(atob(json.policy));
    assert.ok(policyDocument.conditions);
  });
});

test('#sign resolves to json for which "policy.conditions[0]" is a bucket rule', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    var policyDocument = JSON.parse(atob(json.policy));
    assert.ok(policyDocument.conditions[0].bucket);
  });
});

test('#sign resolves to json for which "policy.conditions[1]" is a key rule', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    var policyDocument = JSON.parse(atob(json.policy));
    assert.equal(policyDocument.conditions[1][1], "$key");
  });
});

test('#sign resolves to json with a valid "signature" property', function(assert) {
  var service = this.subject();
  return service.sign(file).then(function(json){
    var hash = CryptoJS.HmacSHA1(json.policy, ENV.AWS_SECRET_ACCESS_KEY);
    var signature = hash.toString(CryptoJS.enc.Base64);
    assert.equal(json.signature, signature);
  });
});

test('#upload returns a promise', function(assert) {
  var service = this.subject();
  assert.ok(service.upload(file).then);
});

test('#upload successfully uploads a file to s3', function(assert) {
  var service = this.subject();
  return service.upload(file).then(function(){
    assert.ok(true);
  });
});

test('#upload resolves to the URL of the uploaded file', function(assert) {
  var service = this.subject();
  return service.upload(file).then(function(url){
    assert.equal(`http://noteriver-test.s3.amazonaws.com/${file.name}`, url);
  });
});














