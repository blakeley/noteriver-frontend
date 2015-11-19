import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('midi-player', 'MidiPlayerComponent', {
  // specify the other units that are required for this test
  needs: ['component:player-piano', 'component:progress-slider', 'service:synthesizer']
});

var loadMidi = function(){
  return {
    then: function(){
      return {catch: function(){}};
    }
  };
};

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject({
    score: {
      loadMidi: loadMidi,
    },
    audio: {
      stop: function(){},
    }
  });
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
