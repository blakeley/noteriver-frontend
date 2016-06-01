import Ember from 'ember';

const { computed, run, $, on } = Ember;

export default Ember.Component.extend({
  tagName: 'span',

  clickOutside(e) {
    let isOutside   = $(e.target).closest(this.get('element')).length !== 1;
    if (isOutside) {
      this.sendAction();
    }
  },

  boundClickHandler: computed(function() {
    return run.bind(this, this.clickOutside);
  }),

  _attachClickOutsideHandler: on('didInsertElement', function() {
    // attach the handler in the next runloop, so any click event currently
    // happening will not interfere
    run.next(() => {
      $(window).on('click', this.get('boundClickHandler'));
    });
  }),

  _removeClickOutsideHandler: on('willDestroyElement', function() {
    $(window).off('click', this.get('boundClickHandler'));
  })

});
