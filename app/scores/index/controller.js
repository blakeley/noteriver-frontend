import Ember from 'ember';

const { computed } = Ember;
const { alias } = computed;

export default Ember.Controller.extend({
  scores: alias('model'),

  queryParams: ['search'],
  search: null

});
