import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('midi-player', 'MidiPlayerComponent', {
  // specify the other units that are required for this test
  needs: ['component:player-piano', 'component:progress-slider']
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

test('#play begins the animation', function(assert){
  assert.expect(1);

  var component = this.subject({
    animation: {
      scheduleFrame: function(){
        assert.ok(true, 'animation was scheduled!');
      },
    },
    audio: {
      playSound: function(){},
    },
    score: {
      loadMidi: loadMidi,
      midi: {
        notes: [{onSecond: 1}],
      }
    },
    time: 0,
  });

  component.set('isPlaying', true);
});

test('#play plays a sound', function(assert){
  assert.expect(1);

  var component = this.subject({
    animation: {
      scheduleFrame: function(){}
    },
    audio: {
      playSound: function(){
        assert.ok(true, 'sound was played!');
      },
    },
    score: {
      loadMidi: loadMidi,
      midi: {
        notes: [{onSecond: 1}],
      }
    },
    time: 0,
  });

  component.set('isPlaying', true);
});



