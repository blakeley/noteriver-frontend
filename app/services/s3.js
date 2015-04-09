//import ENV from 'noteriver/config/environment';
import Ember from 'ember';

export default Ember.Service.extend({
  signUrl: '/sign',

  sign: function(file){
    var signUrl = this.get('signUrl');

    var signature = new Ember.RSVP.Promise(function(resolve, reject){

      var xhr = new XMLHttpRequest();

      xhr.open('GET', signUrl);
      xhr.responseType = "json";
      xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error('Sign file `' + file.name + '` failed with status: [' + xhr.status + ']'));
          }
        }
      };
      xhr.send();
    });

    return signature;
  },

});
