/* global moment */

import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('li-score', 'Integration | Component | li score', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('score',
    Ember.Object.create({
      title: 'title',
      artist: 'artist',
      createdAt: moment().subtract(1, 'day')._d,
    })
  );

  this.render(hbs`{{li-score score=score}}`);

  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), 'title - artist a day ago');
});
