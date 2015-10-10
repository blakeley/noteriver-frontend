import ActiveModelAdapter from 'active-model-adapter';

export default ActiveModelAdapter.extend({
  namespace: 'api/v1',
  shouldBackgroundReloadRecord: function(){
  	return true;
  },
});
