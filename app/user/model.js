import DS from 'ember-data';

export default DS.Model.extend({
  scores: DS.hasMany('scores', {async: true}),
  emailMd5: DS.attr('string'),
  username: DS.attr('string'),

  avatarUrl: function(){
    return 'https://www.gravatar.com/avatar/' + this.get('emailMd5') + '?d=identicon&s=256';
  }.property('emailMd5'),
});
