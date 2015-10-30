module.exports = function(app) {
  var express = require('express');
  var sessionsRouter = express.Router();

  sessionsRouter.post('/', function(req, res) {
    if(req.body.data.attributes.email == "unknown"){
      res.status(422).send({
        errors: [{
          title: "Unknown email"
        }]
      });
    } else if (req.body.data.attributes.password == "incorrect") {
      res.status(422).send({
        errors: [{
          title: "Incorrect password"
        }]
      });
    } else {
      res.status(201).send({
        data: {
          type: 'user',
          id: 1,
          attributes: {
            username: 'blakeley',
            'email-md5': '7e5ad427dbae149a81d3c82c11504b66',
          }
        },
        meta: {
          authToken: 'token'
        }
      });
    }
  });

  app.use('/api/v1/sessions', sessionsRouter);
};
