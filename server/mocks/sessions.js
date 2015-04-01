module.exports = function(app) {
  var express = require('express');
  var sessionsRouter = express.Router();
  sessionsRouter.post('/', function(req, res) {
    if(req.body.session.password == 'invalid'){
      res.status(401).send({"message": "Invalid credentials"});
    } else {
      res.send({
        "session": {
          "id": 2,
          "auth_token": "token",
          "user": 2,
        },
        "users": [{
          "id": 2,
          "username": 'brandon',
          "email_md5": '7e5ad427dbae149a81d3c82c11504b66',
          "session": 2,
        }],
      });
    }
  })
  app.use('/api/v1/sessions', sessionsRouter);
};
