module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();
  usersRouter.get('/', function(req, res) {
    res.send({"users":[]});
  });
  usersRouter.post('/', function(req, res) {
    res.send({"session":{"token":"token"}});
  })
  app.use('/api/v1/users', usersRouter);
};
