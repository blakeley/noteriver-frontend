import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('waitForAudioBuffers', function(app) {
  return new Ember.Test.promise(function(resolve) {

    // inform the test framework that there is an async operation in
    // progress, so it shouldn't consider the test complete
    Ember.Test.adapter.asyncStart();

    var audio = app.__container__.lookup('service:audio');
    audio.get('buffersA').forEach(function(promise){
      promise.then(function(){
        if(audio.get('percentLoaded') === 1){
          // wait until the afterRender queue to resolve this promise,
          // to give any side effects of the promise resolving a chance
          // to occur and settle
          Ember.run.schedule('afterRender', null, resolve);

          // inform the test framework that this async operation is done
          Ember.Test.adapter.asyncEnd();
        }
      });
    });
  });
});
