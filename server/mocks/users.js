module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();
  usersRouter.get('/', function(req, res) {
    res.send({"users":[]});
  });
  usersRouter.post('/', function(req, res) {
    if(req.body.user.email == 'exists@mail.com'){
      res.status(422).send({"errors": {"email": ["has already been taken"]}})
    } else if(req.body.user.email == '') {
      res.status(422).send({"errors": {"email": ["can't be blank","must be valid"]}})      
    } else {
      res.send({"session":{"token":"token"}});
    }
  })
  app.use('/api/v1/users', usersRouter);
};
