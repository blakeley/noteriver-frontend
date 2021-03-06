import Ember from 'ember';

export default Ember.Test.registerAsyncHelper('waitForSession', function(app) {
  return new Ember.Test.promise(function(resolve) {

    // inform the test framework that there is an async operation in
    // progress, so it shouldn't consider the test complete
    Ember.Test.adapter.asyncStart();

    var session = app.__container__.lookup('service:session');
    console.log(`Waiting for session...`);
    session.get('currentUser').then(function(user){
      console.log(`Waited for session, got user.id: ${user.id}`);
      Ember.run.schedule('afterRender', null, resolve);
      Ember.Test.adapter.asyncEnd();
    });
  });
});
