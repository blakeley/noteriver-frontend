var crypto = require('crypto')

module.exports = function(app) {
  var express = require('express');
  var signaturesRouter = express.Router();

  signaturesRouter.get('/:id', function(req, res) {
    var policy = req.params.id
    var signature = crypto
      .createHmac('sha1', process.env.NOTERIVER_AWS_SECRET_ACCESS_KEY)
      .update(policy)
      .digest('base64')

    if(req.header('AUTHORIZATION') != 'undefined'){
      res.send(signature);
    } else {
      res.status(401).end();
    }
  });

  app.use('/api/v1/signatures', signaturesRouter);
};
