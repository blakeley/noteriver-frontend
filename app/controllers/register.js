import Ember from 'ember';

export default Ember.Controller.extend({
  needs: "session",
  
  init: function() {
    this.set("email", "");
    this.set("password", "");
    this.set("open", false);
  },

  token: Ember.computed.alias('controllers.session.token'),

  actions: {
    register: function() {
      var account = {"user": {"email": this.get('email'), "password": this.get('password')}};
      var _this = this;
      Ember.$.post('api/v1/users', account).then(
        function(response){
          Ember.run(function(){
            _this.set('token', response.session.token);
            _this.set('errorMessages', null);
            _this.set("email", "");
            _this.set("password", "");
          });
        },
        function(response){
          Ember.run(function(){
            _this.set("errorMessages", response.responseJSON.errors);
          });
        }
      );  
    },
    toggleOpen: function() {
      this.set('open', !this.get('open'));
    }
  }
});
