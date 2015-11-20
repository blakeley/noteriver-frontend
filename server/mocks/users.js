var md5 = require('md5');

module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  usersRouter.get('/:id', function(req, res) {
    if(req.params.id === '1'){
      res.send({"data":{"id":"1","type":"user","attributes":{username:'blakeley','email-md5':'7e5ad427dbae149a81d3c82c11504b66'},"relationships":{"scores":{"data":[{"id":"1","type":"score"},{"id":"2","type":"score"},{"id":"3","type":"score"}]}}}
      });
    } else {
      res.send({
        data: {
          type: 'user',
          id: req.params.id,
          attributes: {
            username: "user" + req.params.id,
            'email-md5': md5(req.params.id),
          }
        },
      });
    }
  });

  usersRouter.patch('/:id', function(req, res) {
    res.status(204);
  });

  usersRouter.get('/', function(req, res) {
    res.send({"data":[
      {"id":"1","type":"user","relationships":{"scores":{"data":[
        {"id":"1","type":"score"},
        {"id":"2","type":"score"},
        {"id":"3","type":"score"},
      ]}}},
      {"id":"2","type":"user","relationships":{"scores":{"data":[
        {"id":"4","type":"score"},
        {"id":"5","type":"score"},
      ]}}},
      {"id":"3","type":"user","relationships":{"scores":{"data":[
        {"id":"6","type":"score"},
      ]}}}
    ]});
  });

  usersRouter.post('/', function(req, res) {
    if(req.body.data.attributes.email == "invalid"){
      res.status(422).send({
        errors: [{
          title: "Invalid email"
        }]
      });
    } else if (req.body.data.attributes.password == "blank") {
      res.status(422).send({
        errors: [{
          title: "Password is blank"
        }]
      });
    } else {
      var id = Date.now();

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

  app.use('/api/v1/users', usersRouter);
};
