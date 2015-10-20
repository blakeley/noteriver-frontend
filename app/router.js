import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('scores', function() {});
  this.route('scores/new');
  this.route('score', {path: '/scores/:score_id'});
  this.route('scores/edit', {path: '/scores/:score_id/edit'});
  this.route('user', {path: '/users/:user_id'});

  this.route('account', function() {
    this.route('scores');
    this.route('settings');
  });
});

export default Router;
