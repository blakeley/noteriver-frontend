/* global File */

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










