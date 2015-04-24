import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),
  storage: Ember.inject.service(),

  loginUrl: '/api/v1/sessions',
  registerUrl: '/api/v1/users',

  init: function(){
    this.set('authToken', this.get('storage').getItem('authToken'));
    this.set('currentUserId', this.get('storage').getItem('currentUserId'));
  },

  authTokenChanged: function(){
    this.get('storage').setItem('authToken', this.get('authToken'));
  }.observes('authToken'),

  currentUserIdChanged: function(){
    this.get('storage').setItem('currentUserId', this.get('currentUserId'));
  }.observes('currentUserId'),

  isAuthenticated: function(){
    return !!this.get('authToken') && !!this.get('currentUserId');
  }.property('authToken', 'currentUserId'),

  currentUser: function(){
    if(this.get('isAuthenticated')){
      return this.get('store').find('user', this.get('currentUserId'));
    }
  }.property('currentUserId'),

  logout: function(){
    this.set('authToken', null);
    this.set('currentUserId', null);
  },

  login: function(){
    var service = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();

      xhr.open('POST', service.get('loginUrl'));
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.responseType = "json";
      xhr.onreadystatechange = function(){
        Ember.run(function(){
          if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
              service.clearFields();
              service.get('store').pushPayload('user', {user: xhr.response.user});
              service.set('currentUserId', xhr.response.user.id);
              service.set('authToken', xhr.response.authToken);
              resolve();
            } else {
              service.clearErrors();
              if(xhr.response.errors.email && xhr.response.errors.email[0] === 'is unknown') {
                service.set('newSessionEmailError', "We don't know that email address.");
              } else if (xhr.response.errors.password && xhr.response.errors.password[0] === 'is incorrect') {
                service.set('newSessionPasswordError', "Wrong pasword - try again.");
              }
              reject();
            }
          }
        });
      };

      xhr.send(JSON.stringify({
        session: {
          email: service.get('newSessionEmail'),
          password: service.get('newSessionPassword'),
        }
      }));
    });
  },

  register: function(){
    var service = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();

      xhr.open('POST', service.get('registerUrl'));
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.responseType = "json";
      xhr.onreadystatechange = function(){
        Ember.run(function(){
          if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {
              service.clearFields();
              service.get('store').pushPayload('user', {user: xhr.response.user});
              service.set('currentUserId', xhr.response.user.id);
              service.set('authToken', xhr.response.authToken);
              resolve();
            } else {
              service.clearErrors();
              if(xhr.response.errors.email && xhr.response.errors.email[0] === 'is invalid') {
                service.set('newUserEmailError', "Enter a valid email address.");
              } else if (xhr.response.errors.password && xhr.response.errors.password[0] === "can't be blank") {
                service.set('newUserPasswordError', "Password can't be blank!");
              }
              reject();
            }
          }
        });
      };

      xhr.send(JSON.stringify({
        user: {
          email: service.get('newUserEmail'),
          password: service.get('newUserPassword'),
        }
      }));
    });
  },

  clearFields: function() {
    this.clearErrors();
    this.set('newSessionEmail', undefined);
    this.set('newSessionPassword', undefined);
    this.set('newUserEmail', undefined);
    this.set('newUserPassword', undefined);
  },

  clearErrors: function() {
    this.set('newSessionEmailError', undefined);
    this.set('newSessionPasswordError', undefined);
    this.set('newUserEmailError', undefined);
    this.set('newUserPasswordError', undefined);
  },

});
