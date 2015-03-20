import DS from 'ember-data';

export default DS.Model.extend({
  emailMd5: DS.attr('string'),
  username: DS.attr('string'),
  session: DS.belongsTo('session'),

  avatarUrl: function(){
    return 'http://www.gravatar.com/avatar/' + this.get('emailMd5') + '?d=identicon';
  }.property('emailMd5'),  
});