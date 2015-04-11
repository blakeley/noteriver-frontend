var crypto = require('crypto')

module.exports = function(app) {
  var express = require('express');

  app.get('/sign', function(req, res){

    var policyDocument = {
      expiration: new Date(Date.now() + 60*60*1000).toISOString(),
      conditions: [
        {"bucket": "noteriver-dev"},
        ["starts-with", "$key", "localhost:4200"]
      ],
    }

    var policy = new Buffer(JSON.stringify(policyDocument)).toString('base64')
    var signature = crypto
      .createHmac('sha1', process.env.NOTERIVER_AWS_SECRET_ACCESS_KEY)
      .update(policy)
      .digest('base64')

    res.send({
      "bucket": "noteriver-dev",
      "key": "localhost:4200/${filename}",
      "policy": policy,
      "signature": signature,
    });
  });
};

