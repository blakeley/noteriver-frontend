/* global Midi */
import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('score', {
  // Specify the other units that are required for this test.
  needs: []
});

// shortest MIDI data URL I could create
var fileUrl = 'data:audio/midi;base64,TVRoZAAAAAYAAQADAAFNVHJrAAAACwD/UQMHoSAA/y8ATVRyawAAAA8AwQAAkTRfAYE0AAH/LwBNVHJrAAAABAD/LwA=';

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});

test('#fileUrl is undefined when #s3Key is undefined', function(assert) {
  var model = this.subject({s3Key: undefined});
  assert.ok(!model.get('fileUrl'));
});

test('#fileUrl is a computed property depending on #s3Key', function(assert) {
  var model = this.subject({s3Key: 's3-test-file.mid'});
  assert.ok(model.get('fileUrl').indexOf(model.get('s3Key')) > 0);
});

test('#promise returns a promise', function(assert) {
  var model = this.subject({fileUrl: fileUrl});
  assert.ok(model.get('promise').then);
});

test('#promise returns a promise when fileUrl is undefined', function(assert) {
  var model = this.subject();
  assert.ok(model.get('promise').then);
});

test('#promise resolves to a Midi object', function(assert) {
  var model = this.subject({fileUrl: fileUrl});

  return model.get('promise').then(function(midi){
    assert.ok(midi instanceof Midi);
  });
});

test('#promise sets midi to the Midi object it resolves to', function(assert) {
  var model = this.subject({fileUrl: fileUrl});

  return model.get('promise').then(function(midi){
    assert.equal(model.get('midi'), midi);
  });
});

test('#midi is undefined until #promise resolves', function(assert) {
  var model = this.subject({fileUrl: fileUrl});

  assert.ok(!model.get('midi'));
  return model.get('promise').then(function(midi){
    assert.ok(!!model.get('midi'));
  });
});




