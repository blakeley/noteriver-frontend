module.exports = function(app) {
  var express = require('express');

  app.get('/sign', function(req, res){

    var policyDocument = {
      expiration: new Date(Date.now() + 60*60*1000).toISOString(),
      conditions: [
        {"bucket": "noteriver-dev"},
        ["starts-with", "$key", ""]
      ],
    }

    var policy = new Buffer(JSON.stringify(policyDocument)).toString('base64')

    res.send({
      "bucket": "noteriver-dev",
      "key": "${filename}",
      "policy": policy,
    });
  });
};

