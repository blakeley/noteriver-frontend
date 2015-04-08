import Ember from 'ember';

export default Ember.TextField.extend({
  type: 'file',
  classNames: ['hidden'],
  change: function(e){
    if (e.target.files.length < 1){return;}
    this.sendAction('fileChanged', e.target.files[0]);
  },
});
