import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  session: Ember.inject.service(),

  namespace: 'api/v1',
  headers: Ember.computed('session.authToken', function(){
    return {
      'AUTHORIZATION': this.get('session.authToken'),
    };
  }),

});
