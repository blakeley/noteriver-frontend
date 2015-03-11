import Ember from 'ember';

export default Ember.Controller.extend({
  storage: Ember.inject.service(),

  actions: {
    logout: function() {
      this.set('model.authToken', null);
      this.set('model.user', null);
      this.get('storage').removeItem('authToken');
      this.get('storage').removeItem('currentUserId');
    },

    login: function(){
      this.get('model').save();
      this.get('storage').setItem('authToken', this.get('model.authToken'));
      this.get('storage').setItem('currentUserId', this.get('model.user.id'));
    },
  },

});
