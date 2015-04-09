var crypto = require('crypto')

module.exports = function(app) {
  var express = require('express');

  app.get('/sign', function(req, res){

    var policyDocument = {
      expiration: new Date(Date.now() + 60*60*1000).toISOString(),
      conditions: [
        {"bucket": "noteriver-test"},
        ["starts-with", "$key", ""]
      ],
    }

    var policy = new Buffer(JSON.stringify(policyDocument)).toString('base64')
    var signature = crypto
      .createHmac('sha1', process.env.NOTERIVER_AWS_SECRET_ACCESS_KEY)
      .update(policy)
      .digest('base64')

    res.send({
      "bucket": "noteriver-test",
      "key": "${filename}",
      "policy": policy,
      "signature": signature,
    });
  });
};

