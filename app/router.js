import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('scores', function() {});
  this.resource('score', {path: '/scores/:score_id'}, function(){});
  this.route('session');
});

export default Router;
