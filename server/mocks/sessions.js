module.exports = function(app) {
  var express = require('express');
  var sessionsRouter = express.Router();
  sessionsRouter.post('/', function(req, res) {
    if(req.body.user.password == 'wrong password'){
      res.status(401).send({"message": "Invalid credentials"});
    } else {
      res.send({"session":{"token":"token"}});
    }
  })
  app.use('/api/v1/sessions', sessionsRouter);
};
