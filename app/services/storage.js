import Ember from 'ember';

export default Ember.Object.extend({
  getItem: function(key) {
    return localStorage.getItem(key);
  },

  setItem: function(key, value) {
    localStorage.setItem(key, value);
  },

  removeItem: function(key) {
    localStorage.removeItem(key);
  },

});
