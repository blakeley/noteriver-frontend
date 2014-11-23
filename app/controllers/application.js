import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this.set("email", "");
    this.set("password", "");
  },

  token: localStorage.token,

  tokenChanged: function(){
    if(this.get('token')){
      localStorage.token = this.get('token');
    } else {
      localStorage.removeItem('token');
    }
  }.observes('token'),

  actions: {
    register: function() {
      var account = {"user": {"email": this.get('email'), "password": this.get('password')}};
      var _this = this;
      Ember.$.post('api/v1/users', account).then(
        function(response){
          Ember.run(function(){
            _this.set('token', response.session.token);            
          });
        },
        function(response){
          Ember.run(function(){
            _this.set("errorMessages", response.responseJSON.errors);
          });
        }
      );  
    }
  }
});
