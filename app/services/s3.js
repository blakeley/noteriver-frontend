import ENV from 'noteriver/config/environment';
import Ember from 'ember';

export default Ember.Service.extend({
  signUrl: '/sign',

  sign: function(file){
    var signUrl = this.get('signUrl');

    return new Ember.RSVP.Promise(function(resolve, reject){
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
  },

  upload: function(file) {
    return this.sign(file).then(function(json){
      return new Ember.RSVP.Promise(function(resolve, reject){
        var data = new FormData();

        for(var field in json) {
          if (json.hasOwnProperty(field)) {
            data.append(field, json[field]);
          }
        }

        data.append('AWSAccessKeyId', ENV.AWS_ACCESS_KEY_ID);
        data.append('file', file);

        var uploadUrl = `//${json.bucket}.s3.amazonaws.com`;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', uploadUrl);
        //xhr.responseType = "json";
        xhr.onreadystatechange = function(){
          if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 204) {
              resolve(xhr.getResponseHeader('location'));
            } else {
              window.xhr = xhr;
              reject(new Error('Upload file `' + file.name + '` failed with status: [' + xhr.status + ']'));
            }
          }
        };

        xhr.send(data);
      });
    });
  },

});
