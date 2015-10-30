/* global File, CryptoJS */

import {
  moduleFor,
  test
} from 'ember-qunit';
import ENV from 'noteriver/config/environment';

moduleFor('service:s3', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo'],
});

var file = new File(["MThd"], "s3-test-file.mid");
var mockSession = {
  currentUserId: 7357,
  authToken: 'token'
};

// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('#bucket defaults to ENV.AWS_BUCKET', function(assert) {
  var service = this.subject();
  assert.ok(service.bucket);
  assert.equal(service.bucket, ENV.AWS_BUCKET);
});

test('#s3Key includes currentUserId as a subdirectory', function(assert) {
  var service = this.subject({
    session: {
      currentUserId: 7357
    }
  });
  assert.ok(service.s3Key(file).indexOf('7357/') > 0);
});

test('#acl is "public-read"', function(assert) {
  var service = this.subject();
  assert.equal(service.acl, 'public-read');
});

test('#policyDocument.expiration is a future ISO timestamp', function(assert) {
  var service = this.subject();
  var expiresAt = Date.parse(service.policyDocument(file).expiration);
  assert.ok(expiresAt > Date.now(), "Signature has already expired");
});

test('#policyDocument.conditions[0] is a bucket rule', function(assert) {
  var service = this.subject();
  assert.ok(service.policyDocument(file).conditions[0].bucket);
  assert.equal(service.policyDocument(file).conditions[0].bucket, service.bucket);
});

test('#policyDocument.conditions[1] is a key rule', function(assert) {
  var service = this.subject();
  assert.ok(service.policyDocument(file).conditions[1].key);
  assert.equal(service.policyDocument(file).conditions[1].key, service.s3Key(file));
});

test('#policyDocument.conditions[2] is an acl rule', function(assert) {
  var service = this.subject();
  assert.ok(service.policyDocument(file).conditions[2].acl);
  assert.equal(service.policyDocument(file).conditions[2].acl, service.acl);
});

test('#policyDocument.conditions[3] is a Content-Type rule', function(assert) {
  var service = this.subject();
  assert.equal(service.policyDocument(file).conditions[3]["Content-Type"], file.type);
});

test('#policyDocument.conditions[4] is a content-length-range rule', function(assert) {
  var service = this.subject();
  assert.equal(service.policyDocument(file).conditions[4][0], "content-length-range");
  assert.equal(service.policyDocument(file).conditions[4][1], file.size);
  assert.equal(service.policyDocument(file).conditions[4][2], file.size);
});

test('#sign returns a promise', function(assert) {
  var service = this.subject({session: mockSession});
  var policy = service.policy(file);
  return service.sign(policy).then(function(){
    assert.ok(true);
  });
});

test('#sign resolves to a valid signature when authenticated', function(assert) {
  var service = this.subject({session: mockSession});
  var policy = service.policy(file);
  var hash = CryptoJS.HmacSHA1(policy, ENV.AWS_SECRET_ACCESS_KEY);
  var expected_signature = hash.toString(CryptoJS.enc.Base64);
  return service.sign(policy).then(function(signature){
    assert.equal(signature, expected_signature);
  });
});


test('#sign rejects when not authenticated', function(assert) {
  var service = this.subject({session: {}});
  var policy = service.policy(file);

  return service.sign(policy).then(function(){
    assert.ok(false, '#sign did not reject');
  }).catch(function(){
    assert.ok(true);
  });
});

test('#upload returns a promise', function(assert) {
  var service = this.subject({session: mockSession});
  assert.ok(!!service.upload(file).then);
});

test('#upload successfully uploads a file to s3', function(assert) {
  var service = this.subject({session: mockSession});
  return service.upload(file).then(function(){
    assert.ok(true);
  });
});

test('#upload resolves to the S3 key of the uploaded file', function(assert) {
  var service = this.subject({session: mockSession});
  return service.upload(file).then(function(s3Key){
    assert.equal(s3Key, service.s3Key(file));
  });
});














