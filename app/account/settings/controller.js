import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    updateUserUsername: function(){
      this.set('currentUser.username', this.get('editUserUsername'));
      this.get('currentUser').save().then(function(){
        console.log('Success!');
      }).catch(function(error){
        console.log('Failure!: ' + error);
      });
    }
  }

});
