/* global Midi */

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

// stub resizeService
const resizeStub = Ember.Service.extend({
  on() {},
  off() {},
});

moduleForComponent('midi-player', 'Integration | Component | midi player', {
  integration: true,
  beforeEach: function () {
    this.register('service:resize-service', resizeStub);
    // Calling inject puts the service instance in the test's context,
    // making it accessible as "locationService" within each test
    this.inject.service('resize-service', { as: 'resizeService' });
  }
});

let mockScore = Ember.Object.create({
  midi: new Midi(),
  loadMidi: function(){
    this.set('midi', new Midi());
    return Ember.RSVP.resolve(new Midi());
  },
});

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

