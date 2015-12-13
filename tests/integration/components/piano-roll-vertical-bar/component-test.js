import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('piano-roll-vertical-bar', 'Integration | Component | piano roll vertical bar', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{piano-roll-vertical-bar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#piano-roll-vertical-bar}}
      template block text
    {{/piano-roll-vertical-bar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
