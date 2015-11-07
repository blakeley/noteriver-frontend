/* global ga */

import Ember from 'ember';
import ENV from 'noteriver/config/environment';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('scores', function() {});
  this.route('scores/new');
  this.route('score', {path: '/scores/:score_id'});
  this.route('scores/edit', {path: '/scores/:score_id/edit'});
  this.route('user', {path: '/users/:user_id'}, function() {
    // index = user's scores
  });

  this.route('account', function() {
    this.route('scores');
    this.route('settings');
  });
});

if(ENV.environment === 'production'){
  Router.reopen({
    notifyGoogleAnalytics: function() {
      ga('set', {
        'page': this.get('url'),
        'title': this.get('url')
      });
      return ga('send', 'pageview');
    }.on('didTransition')
  });
}

export default Router;
