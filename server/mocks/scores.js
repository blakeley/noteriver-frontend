var SCORES = [
  {"id": 1, "user_id": 1, "created_at": "Sat, 11 Oct 2015 06:48:34 UTC +00:00", "title": "Indiana Jones", "artist": "John Williams", "s3_key": "fixtures/jones.mid"},
  {"id": 2, "user_id": 1, "created_at": "Sun, 12 Oct 2015 01:18:52 UTC +00:00", "title": "Canon in D", "artist": "Pachelbel", "s3_key": "fixtures/pachelbel.mid"},
  {"id": 3, "user_id": 1, "created_at": "Mon, 13 Oct 2015 06:27:30 UTC +00:00", "title": "Ode to Joy", "artist": "Beethoven", "s3_key": "fixtures/ode.mid"},
  {"id": 4, "user_id": 1, "created_at": "Wed, 14 Oct 2015 11:10:01 UTC +00:00", "title": "chromatic Scale", "artist": "George P. Burdell", "s3_key": "fixtures/chromatic.mid"},
]

module.exports = function(app) {
  var express = require('express');
  var scoresRouter = express.Router();

  scoresRouter.get('/', function(req, res) {
    res.send({"scores": SCORES});
  });

  scoresRouter.get('/:id', function(req, res) {
    res.send({"score": SCORES[req.params.id - 1]});
  });

  scoresRouter.post('/', function(req, res) {
    res.send({
      "score": {
        "id": Date.now(),
        "user": 1,
      },
    });
  });

  app.use('/api/v1/scores', scoresRouter);
};
