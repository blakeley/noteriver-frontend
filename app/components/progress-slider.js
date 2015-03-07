import Ember from 'ember';

export default Ember.Component.extend(Ember.TextSupport, {
  tagName: 'input',
  attributeBindings: ['type','step','max','value','style'],
  type: 'range',

  min: 0,
  max: 100,

  style: function(){
    return 'background: linear-gradient(to right, #F3A42D 0%, #F3A42D '+this.get('percent')+'%, #60516E '+this.get('percent')+'%,#60516E 100%)';
  }.property('percent'),

  percent: function(){
    return this.get('value') / (this.get('max') - this.get('min')) * 100;
  }.property('value'),


});
