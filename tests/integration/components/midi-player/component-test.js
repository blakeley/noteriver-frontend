/* global Midi */

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('midi-player', 'Integration | Component | midi player', {
  integration: true
});

let mockScore = {
  midi: new Midi(),
  loadMidi: function(){
    return Ember.RSVP.resolve(new Midi());
  },
};

test('it renders', function(assert) {
  this.set('score', mockScore);
  this.render(hbs`{{midi-player score=score}}`);
  assert.ok(this.$().text());
});

test('should toggle button image between pause and play on click', function(assert) {
  this.set('score', mockScore);
  this.render(hbs`{{midi-player score=score}}`);
  assert.ok(this.$('#play-toggle img').attr('src').includes('play'));
  this.$('#play-toggle').click();
  assert.ok(this.$('#play-toggle img').attr('src').includes('pause'));
  this.$('#play-toggle').click();
  assert.ok(this.$('#play-toggle img').attr('src').includes('play'));
});

