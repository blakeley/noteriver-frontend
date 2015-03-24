/* global AudioContext, AudioBuffer */

import Ember from 'ember';
import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:audio', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  setup: function(){
    this.subject().get('buffers').clear();
    this.subject().get('buffersA').clear();
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
  assert.equal(service.buffers.size, 0);
  return service.getBuffer(url).then(function(buffer){
    assert.equal(service.buffers.size, 1);
  });
});

test('successive calls to #getBuffer with the same url returns the same buffer (promise)', function(assert) {
  expect(2);
  var service = this.subject();
  var first = service.getBuffer(url);
  return first.then(function(buffer){
    var second = service.getBuffer(url);
    assert.equal(first, second);
    return second.then(function(buffer){
      assert.ok(true, "can resolve again");
    });
  });
});

test('#totalLoaded returns the number of buffers that have loaded', function(assert) {
  var service = this.subject();
  var promise = service.getBuffer(url);
  assert.equal(service.get('totalLoaded'), 0);
  return promise.then(function(buffer){
    assert.equal(service.get('totalLoaded'), 1);
  });
});

test('#percentLoaded returns the percent of buffers that have loaded', function(assert) {
  var service = this.subject();
  var resolved = Ember.RSVP.resolve();
  var resolved2 = Ember.RSVP.resolve();
  var unresolved = new Ember.RSVP.Promise(function(){});
  assert.equal(service.get('percentLoaded'), 0);
  service.buffersA.pushObject(resolved);
  service.incrementProperty('totalLoaded');
  assert.equal(service.get('percentLoaded'), 1);
  service.buffersA.pushObject(unresolved);
  assert.equal(service.get('percentLoaded'), 0.5);
  var promise = service.getBuffer(url);
  assert.equal(service.get('percentLoaded'), 1/3);
  return promise.then(function(buffer){
    assert.equal(service.get('percentLoaded'), 2/3);
  });
});

test('#playSound plays a sound', function(assert) {
  expect(2);

  var service = this.subject();
  service.set("context", {
    decodeAudioData: function(audioData, callback){
      callback();
    },
    destination: "AudioDestinationNode",
    currentTime: 0,
    createBufferSource: function(){
      return {
        connect: function(destination){
          assert.ok(true, "connected to an output!");
        },
        start: function(url, delay){
          assert.ok(true, "played a sound!");
        }
      };
    }
  });
  return service.getBuffer(url).then(function(){
    return service.playSound(url, 0);
  });
});















