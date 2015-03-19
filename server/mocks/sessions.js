module.exports = function(app) {
  var express = require('express');
  var sessionsRouter = express.Router();
  sessionsRouter.post('/', function(req, res) {
    if(req.body.session.password == 'invalid'){
      res.status(401).send({"message": "Invalid credentials"});
    } else {
      res.send({
        "session": {
          "id": 0,
          "auth_token": "token",
          "user": 1,
        },
        "users": [{
          "id": 1,
          "username": 'beau',
          "email_md5": '205e460b479e2e5b48aec07710c08d50',
        }],
      });
    }
  })
  app.use('/api/v1/sessions', sessionsRouter);
};
