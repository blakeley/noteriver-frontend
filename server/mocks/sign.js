module.exports = function(app) {
  var express = require('express');

  app.get('/sign', function(req, res){
    res.send({
      "key": "${filename}",
      "bucket": "noteriver-dev",
    });
  });
};
