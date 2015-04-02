import DS from 'ember-data';

export default DS.Model.extend({
  fileUrl: DS.attr('string'),
  title: DS.attr('string'),
  artist: DS.attr('string'),
});
