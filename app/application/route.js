import Ember from 'ember';

export default Ember.Route.extend({
  storage: Ember.inject.service(),

  model: function(){
    var currentUserId = this.get('storage').getItem('currentUserId');
    var authToken = this.get('storage').getItem('authToken');
    if(!!currentUserId && !!authToken) {
      return this.store.createRecord('session', {
        authToken: this.get('storage').getItem('authToken'),
        userId: this.store.find('user', this.get('storage').getItem('currentUserId')),
      });
    } else {
      return this.store.createRecord('session');
    }
  },

});
