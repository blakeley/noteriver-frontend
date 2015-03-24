import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('midi-player', 'MidiPlayerComponent', {
  // specify the other units that are required for this test
  needs: ['component:player-piano', 'component:control-bar']
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

test('#play begins animation', function(assert){
  expect(1);

  var component = this.subject({
    animation: {
      scheduleFrame: function(){
        assert.ok(true, 'animation was scheduled!');
      }
    }
  });

  component.play();
});
