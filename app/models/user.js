import DS from 'ember-data';

export default DS.Model.extend({
  emailMd5: DS.attr('string'),
  username: DS.attr('string'),
});
