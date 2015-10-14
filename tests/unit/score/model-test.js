/* global Midi */

import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('score', {
  // Specify the other units that are required for this test.
  needs: ['model:user']
});

// shortest MIDI data URL I could create
var fileUrl = 'data:audio/midi;base64,TVRoZAAAAAYAAQADAAFNVHJrAAAACwD/UQMHoSAA/y8ATVRyawAAAA8AwQAAkTRfAYE0AAH/LwBNVHJrAAAABAD/LwA=';
var badFileUrl = 'http://noteriver-dev.s3.amazonaws.com/fail.mid';

test('it exists', function(assert) {
  var score = this.subject();
  // var store = this.store();
  assert.ok(!!score);
});

test('#fileUrl is a computed property depending on #s3Key', function(assert) {
  var score = this.subject({s3Key: 's3-test-file.mid'});

  assert.ok(score.get('fileUrl').indexOf(score.get('s3Key')) > 0);
});

test('#loadMidi returns a promise', function(assert) {
  var score = this.subject({fileUrl: fileUrl});

  return score.loadMidi().then(function(midi){
    assert.ok(true, 'returned a promise!');
  });
});

test('#loadMidi resolves to a Midi object', function(assert) {
  var score = this.subject({fileUrl: fileUrl});

  return score.loadMidi().then(function(midi){
    assert.ok(midi instanceof Midi);
  });
});

test('#loadMidi rejects with a bad fileUrl', function(assert) {
  var score = this.subject({fileUrl: badFileUrl});

  return score.loadMidi().catch(function(){
    assert.ok(true, 'promise rejected!');
  });
});

test('#loadMidi caches the Midi (promise) for future calls', function(assert) {
  assert.expect(2);
  var score = this.subject({fileUrl: fileUrl});

  assert.ok(!score.get('promise'));
  return score.loadMidi().then(function(midi){
    assert.ok(score.get('promise'));
  });
});

test('successive calls to #loadMidi return the same Midi (promise)', function(assert) {
  var score = this.subject({fileUrl: fileUrl});

  var first = score.loadMidi();
  var second = score.loadMidi();
  return first.then(function(){
    return second.then(function(){
      assert.equal(first, second);
    });
  });
});

test('#loadMidi retries following a rejected attempt', function(assert) {
  var score = this.subject({fileUrl: badFileUrl});

  return score.loadMidi().catch(function(reason){
    score.set('fileUrl', fileUrl);
    return score.loadMidi().then(function(midi){
      assert.ok(true, 'Retried following a rejected attempt!');
    });
  });
});



