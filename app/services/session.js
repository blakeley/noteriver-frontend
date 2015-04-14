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
    return this.get('store').find('user', this.get('currentUserId'));
  }.property('currentUserId'),


  logout: function(){
    this.set('authToken', null);
    this.set('currentUserId', null);
  },

  login: function(email, password){
    var service = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();

      var data = new FormData();
      data.append('email', email);
      data.append('password', password);

      xhr.open('POST', service.get('loginUrl'));
      xhr.responseType = "json";
      xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            var user = service.store.push('user', xhr.response.user);
            service.set('currentUserId', user.id);
            service.set('authToken', xhr.response.authToken);
            resolve(user);
          } else {
            reject(new Error('Login [' + email + ', ' + password + '] failed with status: [' + xhr.status + ']'));
          }
        }
      };

      xhr.send(data);
    });
  },

  register: function(email, password){
    var service = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();

      var data = new FormData();
      data.append('email', email);
      data.append('password', password);

      xhr.open('POST', service.get('registerUrl'));
      xhr.responseType = "json";
      xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            var user = service.store.push('user', xhr.response.user);
            service.set('currentUserId', user.id);
            service.set('authToken', xhr.response.authToken);
            resolve(user);
          } else {
            reject(new Error('Register [' + email + ', ' + password + '] failed with status: [' + xhr.status + ']'));
          }
        }
      };

      xhr.send(data);
    });
  },


});
