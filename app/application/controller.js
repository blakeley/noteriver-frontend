import Ember from 'ember';

export default Ember.Controller.extend({
  storage: Ember.inject.service(),

  actions: {
    logout: function() {
      this.set('session.authToken', null);
      this.set('session.user', null);
      this.get('storage').removeItem('authToken');
      this.get('storage').removeItem('currentUserId');
    },

    login: function(){
      this.get('session').save();
      this.get('storage').setItem('authToken', this.get('session.authToken'));
      this.get('storage').setItem('currentUserId', this.get('session.user.id'));
    },

    register: function(){
      this.get('session.user').save().then(() => {
        this.set('session', this.get('session.user.session'));
        this.get('storage').setItem('authToken', this.get('session.authToken'));
        this.get('storage').setItem('currentUserId', this.get('session.user.id'));
      });
    },
  },

});
