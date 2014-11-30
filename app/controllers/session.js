import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this.set('token', localStorage.getItem('token'));
    this.set('userId', localStorage.getItem('userId'));
  },

  sessionChanged: function(){
    if(!!this.get('token') && !!this.get('userId')){
      localStorage["token"] = this.get('token');
      localStorage['userId'] = this.get('userId');
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
  }.observes('token','userId'),

  isAuthenticated: function(){
    return !!this.get('token') && !!this.get('userId');
  }.property('token','userId'),

  currentUser: function(){
    if(this.get('isAuthenticated')){
      return this.store.find('user', this.get('userId'));
    } else {
      return null;
    }
  }.property('userId'),

  avatarUrl: function(){
    return 'http://www.gravatar.com/avatar/' + this.get('currentUser.emailMd5') + '?d=identicon';
  }.property('currentUser.emailMd5'),

  actions: {
    logout: function() {
      this.set('token', null);
      this.set('userId', null);
    }
  }
});
