import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('canvas-piano-roll', 'Integration | Component | canvas piano roll', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{canvas-piano-roll}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#canvas-piano-roll}}
      template block text
    {{/canvas-piano-roll}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});