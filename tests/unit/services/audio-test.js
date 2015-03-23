/* global AudioContext, AudioBuffer */

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:audio', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

var url = "data:audio/mpeg;base64,/+MYxAAAAANIAAAAAExBTUUzLjk4LjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";


// Replace this with your real tests.
test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('#context is an AudioContext', function(assert) {
  var service = this.subject();
  assert.ok(AudioContext.prototype.isPrototypeOf(service.context));
});

test('#getBuffer returns a promise', function(assert) {
  var service = this.subject();
  return service.getBuffer(url).then(function(){
    assert.ok(true, 'returned a promise!');
  });
});

test('#getBuffer rejects with a bad URL', function(assert) {
  var service = this.subject();
  return service.getBuffer().then(function(){}, function(err){
    assert.ok(true, 'promise rejected!');    
  });
});

test('#getBuffer resolves to an audioBuffer', function(assert) {
  var service = this.subject();
  return service.getBuffer(url).then(function(buffer){
    assert.ok(AudioBuffer.prototype.isPrototypeOf(buffer));
  });
});

