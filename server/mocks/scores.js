var SCORES = [
  {"id": 1, "title": "Indiana Jones", "artist": "John Williams", "file_url": "https://s3.amazonaws.com/noteriver2/jones.mid"},
  {"id": 2, "title": "chromatic Scale", "artist": "George P. Burdell", "file_url": "https://s3.amazonaws.com/noteriver2/chromatic.mid"},
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
