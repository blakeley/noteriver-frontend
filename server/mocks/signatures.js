var crypto = require('crypto')

module.exports = function(app) {
  var express = require('express');
  var signaturesRouter = express.Router();

  console.log("Signature: " + process.env.NOTERIVER_AWS_SECRET_ACCESS_KEY);

  signaturesRouter.get('/:id', function(req, res) {
    var policy = req.params.id
    var signature = crypto
      .createHmac('sha1', process.env.NOTERIVER_AWS_SECRET_ACCESS_KEY)
      .update(policy)
      .digest('base64')
    res.send(signature);
  });

  app.use('/api/v1/signatures', signaturesRouter);
};
