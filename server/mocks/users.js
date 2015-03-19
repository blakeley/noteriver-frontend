module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();
  // show
  usersRouter.get('/:id', function(req, res) {
    res.send({"user":{"id": req.params.id, "emailMd5": '205e460b479e2e5b48aec07710c08d50', "username": "beau"}});
  });
  // index
  usersRouter.get('/', function(req, res) {
    res.send({"users":[]});
  });
  usersRouter.post('/', function(req, res) {
    if(req.body.user.email == 'exists@mail.com'){
      res.status(422).send({"errors": {"email": ["has already been taken"]}})
    } else if(req.body.user.email == '') {
      res.status(422).send({"errors": {"email": ["can't be blank","must be valid"]}})      
    } else {
      res.send({
        "user": {
          "id": 1,
          "session": 1,
          "username": 'beau',
          "email_md5": '205e460b479e2e5b48aec07710c08d50',
        },
        "sessions": [{
          "id": 1,
          "auth_token": "token",
          "user": 1,
        }],
      })
    }
  });
  app.use('/api/v1/users', usersRouter);
};
