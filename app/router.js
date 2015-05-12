import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('scores', function() {});
  this.route('scores/new', function() {});
  this.route('score', {path: '/scores/:score_id'}, function(){});
  this.route('scores/edit', {path: '/scores/:score_id/edit'}, function(){});
  this.route('user', {path: '/users/:user_id'}, function(){});

  this.route('account', function() {
    this.route('scores');
    this.route('settings');
  });
});
