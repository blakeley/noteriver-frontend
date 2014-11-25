import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this.set("token", localStorage.getItem("token"));
  },

  tokenChanged: function(){
    if(this.get('token')){
      localStorage["token"] = this.get('token');
    } else {
      localStorage.removeItem('token');
    }
  }.observes('token'),

  isAuthenticated: function(){
    return !!this.get('token');
  }.property('token'),

  actions: {
    logout: function() {
      this.set('token', null);
    }
  }
});
