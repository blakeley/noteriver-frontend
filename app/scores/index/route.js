import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    search: {
      refreshModel: true,
      replace: true
    }
  },

  model(params) {
    return this.store.query('score', params);
  }
});
