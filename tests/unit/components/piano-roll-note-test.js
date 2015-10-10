import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('piano-roll-note', 'PianoRollNoteComponent', {
  // specify the other units that are required for this test
  needs: []
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance

  var component = this.subject();
  component.set('note', {onSecond: 0, offSecond: 1, pitch: 60});
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
