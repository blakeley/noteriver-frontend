import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('canvas-piano-roll-background', 'Integration | Component | canvas piano roll background', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{canvas-piano-roll-background}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#canvas-piano-roll-background}}
      template block text
    {{/canvas-piano-roll-background}}
  `);

  assert.equal(this.$().text().trim(), '');
});
