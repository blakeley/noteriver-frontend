import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

// stub resizeService
const resizeStub = Ember.Service.extend({
  on() {},
  off() {},
});

moduleForComponent('canvas-piano-roll', 'Integration | Component | canvas piano roll', {
  integration: true,
  beforeEach: function () {
    this.register('service:resize-service', resizeStub);
    // Calling inject puts the service instance in the test's context,
    // making it accessible as "locationService" within each test
    this.inject.service('resize-service', { as: 'resizeService' });
  }
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{canvas-piano-roll}}`);

  assert.equal(this.$().text().trim(), '');
});
