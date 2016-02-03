var md5 = require('md5');

SCORES = [
  {"id":1,"type":'score',"attributes":{"title":"C Scale","artist":"George P. Burdell","s3-key":"fixtures/c.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":1,"type":"users"}}}},
  {"id":2,"type":'score',"attributes":{"title":"Chromatic Scale","artist":"Bach","s3-key":"fixtures/chromatic.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":1,"type":"users"}}}},
  {"id":3,"type":'score',"attributes":{"title":"Ode to Joy","artist":"Beethoven","s3-key":"fixtures/ode.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":1,"type":"users"}}}},
  {"id":4,"type":'score',"attributes":{"title":"Pachelbel's Canon","artist":"Johann Pachelbel","s3-key":"fixtures/pachelbel.mid","created-at":"2015-10-28T22:34:24.000Z"},"relationships":{"user":{"data":{"id":2,"type":"users"}}}},
  {"id":5,"type":'score',"attributes":{"title":"The Entertainer","artist":"Scott Joplin","s3-key":"fixtures/entertainer.mid","created-at":"2015-11-01T22:34:24.000Z"},"relationships":{"user":{"data":{"id":2,"type":"users"}}}},
  {"id":6,"type":'score',"attributes":{"title":"Death Waltz","artist":"U.N. Owen Was Her?","s3-key":"fixtures/deathwaltz.mid","created-at":"2015-11-02T22:34:24.000Z"},"relationships":{"user":{"data":{"id":3,"type":"users"}}}},
]

module.exports = function(app) {
  var express = require('express');
  var scoresRouter = express.Router();

  scoresRouter.get('/', function(req, res) {
    var scores = SCORES.slice();

    if(req.query.featured === 'true'){
      scores = SCORES.slice(4,5);
    }
    if(!!req.query.search) {
      scores.unshift({
        "id":Math.floor(Math.random() * 999999),"type":'score',"attributes":{"title":req.query.search + " Score","artist":"Automaton","s3-key":"fixtures/c.mid","created-at":"2015-11-02T22:34:24.000Z"},"relationships":{"user":{"data":{"id":3,"type":"users"}}}
      })
    }

    setTimeout(function(){
      res.send({data: scores});
    }, 300);
  });

  scoresRouter.get('/:id', function(req, res) {
    res.send({"data":
      SCORES[req.params.id - 1]
    })
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
