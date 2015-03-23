/* global AudioContext, AudioBuffer */

import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:audio', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  setup: function(){
    this.subject().get('buffers').clear();
  },
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

test('#getBuffer memoizes the buffer (promise) for future calls', function(assert) {
  var service = this.subject();
  assert.equal(service.buffers.length, 0);
  return service.getBuffer(url).then(function(buffer){
    console.log("made it inside");
    assert.equal(service.buffers.length, 1);
    console.log("didn't make it here");
  });
});

test('successive calls to #getBuffer with the same url returns the same buffer (promise)', function(assert) {
  var service = this.subject();
  var first = service.getBuffer(url);
  return first.then(function(buffer){
    var second = service.getBuffer(url);
    assert.equal(first, second);
  });
});








