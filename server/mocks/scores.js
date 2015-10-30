module.exports = function(app) {
  var express = require('express');
  var scoresRouter = express.Router();

  scoresRouter.get('/', function(req, res) {
    res.send({"data":[{"id":1,"type":'score',"attributes":{"title":"C Scale","artist":"George P. Burdell","s3-key":"fixtures/c.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":1,"type":"users"}}}},{"id":2,"type":'score',"attributes":{"title":"Chromatic Scale","artist":"Bach","s3-key":"fixtures/chromatic.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":1,"type":"users"}}}},{"id":3,"type":'score',"attributes":{"title":"Ode to Joy","artist":"Beethoven","s3-key":"fixtures/ode.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":1,"type":"users"}}}},{"id":4,"type":'score',"attributes":{"title":"Pachelbel's Canon","artist":"Johann Pachelbel","s3-key":"fixtures/pachelbel.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":2,"type":"users"}}}}]});
  });

  scoresRouter.get('/:id', function(req, res) {
    if(req.params.id == 1){
      res.send({"data":{"id":1,"type":'score',"attributes":{"title":"C Scale","artist":"George P. Burdell","s3-key":"fixtures/c.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":1,"type":"users"}}}}});
    } else if (req.params.id == 2) {
      res.send({"data":{"id":2,"type":'score',"attributes":{"title":"Chromatic Scale","artist":"Bach","s3-key":"fixtures/chromatic.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":1,"type":"users"}}}}});
    } else if (req.params.id == 3) {
      res.send({"data":{"id":3,"type":'score',"attributes":{"title":"Ode to Joy","artist":"Beethoven","s3-key":"fixtures/ode.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":1,"type":"users"}}}}});
    } else if (req.params.id == 4) {
      res.send({"data":{"id":4,"type":'score',"attributes":{"title":"Pachelbel's Canon","artist":"Johann Pachelbel","s3-key":"fixtures/pachelbel.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":2,"type":"users"}}}}})
    }
  });

  scoresRouter.post('/', function(req, res) {
    res.send({
      data: {
        id: Date.now(),
        type: 'score',
      },
    });
  });

  app.use('/api/v1/scores', scoresRouter);
};
