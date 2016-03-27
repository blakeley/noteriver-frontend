import Ember from 'ember';

const { observer, computed } = Ember;

export default Ember.Component.extend({
  classNames: ['scroll-overlay'],
  height: 500,
  scrollRatio: 0.0,

  style: computed('height', function(){
    return Ember.String.htmlSafe(`height: ${this.get('height')}px`);
  }),

  scrollRatioChanged: observer('scrollRatio', function(){
    const scrollTop = this.get('scrollRatio') * (this.get('height') - this.$().height());
    this.$().scrollTop(scrollTop);
  }),

  didInsertElement: function() {
    this.$().on('scroll', (e) => {
      const scrollRatio = this.$().scrollTop() / (this.get('height') - this.$().height());
      this.sendAction('onScroll', scrollRatio);
    });
  },

  willDestroyElement(){
    this.$().off('scroll');
  },
});
