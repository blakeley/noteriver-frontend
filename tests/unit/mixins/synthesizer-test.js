/* global AudioContext */

import Ember from 'ember';
import SynthesizerMixin from '../../../mixins/synthesizer';
import { module, test } from 'qunit';

module('Unit | Mixin | synthesizer');

// Replace this with your real tests.
test('it works', function(assert) {
  let SynthesizerObject = Ember.Object.extend(SynthesizerMixin);
  let subject = SynthesizerObject.create({
    audio: {
      context: new AudioContext(),
      getBuffer: function(){
        return Ember.RSVP.resolve();
      }
    }
  });
  assert.ok(subject);
});

test('#noteToURL returns the URL for a given note', function(assert) {
  let SynthesizerObject = Ember.Object.extend(SynthesizerMixin);
  let subject = SynthesizerObject.create({
    audio: {
      context: new AudioContext(),
      getBuffer: function(){
        return Ember.RSVP.resolve();
      }
    }
  });

  const note = {number: 60};
  assert.ok(subject.noteToURL({note}).indexOf('assets') > 0);
});
