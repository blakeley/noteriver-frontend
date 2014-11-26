import Ember from 'ember';

export default Ember.Controller.extend({
  needs: "session",

  init: function() {
    this.set("email", "");
    this.set("password", "");
    this.set("open", true);
  },

  token: Ember.computed.alias('controllers.session.token'),

  actions: {
    create: function() {
      var account = {"user": {"email": this.get('email'), "password": this.get('password')}};
      var _this = this;
      Ember.$.post('api/v1/users', account).then(
        function(response){
          Ember.run(function(){
            _this.set('token', response.session.token);
            _this.send('clear');
          });
        },
        function(response){
          Ember.run(function(){
            _this.set("errorMessages", response.responseJSON.errors);
          });
        }
      );  
    },
    open: function() {
      this.set('open', true);
    },
    close: function() {
      this.set('open', false);
    },
    clear: function() {
      this.set('errorMessages', null);
      this.set('email', '');
      this.set('password', '');
      this.set('open', false);
    },
  }
});
