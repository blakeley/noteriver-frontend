import ENV from 'noteriver/config/environment';
import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  signatureUrl: '/api/v1/signatures',
  bucket: ENV.AWS_BUCKET,
  s3Key: function(file){
    return `uploads/${this.get('session.currentUserId')}/${file.name}`;
  },

  policyDocument: function(file){
    return {
      expiration: new Date(Date.now() + 60*60*1000).toISOString(),
      conditions: [
        {"bucket": this.bucket},
        {"key": this.s3Key(file)},
      ],
    };
  },

  policy: function(file){
    return btoa(JSON.stringify(this.policyDocument(file)));
  },

  sign: function(policy){
    var service = this;

    return new Ember.RSVP.Promise(function(resolve, reject){
      var xhr = new XMLHttpRequest();

      xhr.open('GET', service.get('signatureUrl') + '/' + policy);
      xhr.setRequestHeader('AUTHORIZATION', service.get('session.authToken'));
      xhr.responseType = "string";
      xhr.onreadystatechange = function(){
        if (xhr.readyState === xhr.DONE) {
          if (xhr.status === 200) {
            resolve(xhr.response);
          } else {
            reject(new Error('Sign policy failed with status: [' + xhr.status + ']'));
          }
        }
      };

      xhr.send();
    });
  },

  upload: function(file) {
    var service = this;
    var policy = service.policy(file);

    return this.sign(policy).then(function(signature){
      return new Ember.RSVP.Promise(function(resolve, reject){
        var data = new FormData();
        data.append('key', service.s3Key(file));
        data.append('AWSAccessKeyId', ENV.AWS_ACCESS_KEY_ID);
        data.append('signature', signature);
        data.append('policy', policy);
        data.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', `//${service.bucket}.s3.amazonaws.com`);
        xhr.onreadystatechange = function(){
          if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 204) {
              resolve(service.s3Key(file));
            } else {
              reject(new Error('Upload file `' + file.name + '` failed with status: [' + xhr.status + ']'));
            }
          }
        };

        xhr.send(data);
      });
    });
  },

});
