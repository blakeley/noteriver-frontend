import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('waitForMidi', function(app) {
  return new Ember.Test.promise(function(resolve) {

    // inform the test framework that there is an async operation in
    // progress, so it shouldn't consider the test complete
    Ember.Test.adapter.asyncStart();

    var controller = app.__container__.lookup('controller:score');
    var score = controller.model;
    score.loadMidi().then(function(midi){
      // wait until the afterRender queue to resolve this promise,
      // to give any side effects of the promise resolving a chance
      // to occur and settle
      Ember.run.schedule('afterRender', null, resolve);

      // inform the test framework that this async operation is done
      Ember.Test.adapter.asyncEnd();
    });
  });
});
