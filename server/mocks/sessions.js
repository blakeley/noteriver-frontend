module.exports = function(app) {
  var express = require('express');
  var sessionsRouter = express.Router();

  sessionsRouter.post('/', function(req, res) {
    res.send({
      "user": {
        "id": 1,
        "username": 'brandon',
        "email_md5": '7e5ad427dbae149a81d3c82c11504b66',
      },
      "authToken": 'token',
    })
  })

  app.use('/api/v1/sessions', sessionsRouter);
};
