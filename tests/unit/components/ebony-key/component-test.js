import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('ebony-key', {
  // specify the other units that are required for this test
  needs: []
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject({
    midiNumber: {
      x: 1,
      number: 60,
    }
  });
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
