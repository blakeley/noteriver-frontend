import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('player-piano', 'PlayerPianoComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
  needs: ['component:svg-g','component:piano-key']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  equal(component._state, 'inDOM');
});
