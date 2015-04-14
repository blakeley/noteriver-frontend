module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  usersRouter.get('/:id', function(req, res) {
    res.send({
      "user": {
        "id": req.params.id,
        "username": "brandon",
        "email_md5": '7e5ad427dbae149a81d3c82c11504b66',
      },
    });
  });

  usersRouter.get('/', function(req, res) {
    res.send({"users":[]});
  });

  usersRouter.post('/', function(req, res) {
    res.send({
      "user": {
        "id": 1,
        "username": 'brandon',
        "email_md5": '7e5ad427dbae149a81d3c82c11504b66',
      },
      "authToken": 'token',
    });
  });

  app.use('/api/v1/users', usersRouter);
};
