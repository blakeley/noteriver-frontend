module.exports = function(app) {
  var express = require('express');

  app.get('/sign', function(req, res){

    var policyDocument = {
      expiration: new Date(Date.now() + 60*60*1000).toISOString(),
    }

    var policy = new Buffer(JSON.stringify(policyDocument)).toString('base64')

    res.send({
      "key": "${filename}",
      "policy": policy,
    });
  });
};

