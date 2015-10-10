import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('waitForAudioBuffers', function(app) {
  return new Ember.Test.promise(function(resolve) {

    // inform the test framework that there is an async operation in
    // progress, so it shouldn't consider the test complete
    Ember.Test.adapter.asyncStart();

    var audio = app.__container__.lookup('service:audio');
    var getAudioBuffers = Ember.RSVP.allSettled(audio.get('buffersA'));
    getAudioBuffers.then(function(){
      // wait until the afterRender queue to resolve this promise,
      // to give any side effects of the promise resolving a chance
      // to occur and settle
      Ember.run.schedule('afterRender', null, resolve);

      // inform the test framework that this async operation is done
      Ember.Test.adapter.asyncEnd();
    });
  });
});
