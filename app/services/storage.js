import Ember from 'ember';

export default Ember.Service.extend({
  getItem: function(key) {
    return localStorage.getItem(key);
  },

  setItem: function(key, value) {
    if(value === undefined || value === null){
      this.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  },

  removeItem: function(key) {
    localStorage.removeItem(key);
  },

});
