module.exports = function(app) {
  var express = require('express');
  var scoresRouter = express.Router();
  scoresRouter.get('/', function(req, res) {
    res.send({"scores":[
      {"id": 1, "title": "Indiana Jones", "artist": "John Williams", "file_url": "https://s3.amazonaws.com/noteriver2/jones.mid"},
      {"id": 2, "title": "Symphony 40", "artist": "Mozart", "file_url": "https://s3.amazonaws.com/noteriver2/jones.mid"},
      {"id": 3, "title": "Moonlight Sonata", "artist": "Beethoven", "file_url": "https://s3.amazonaws.com/noteriver2/jones.mid"},
      ]});
  });
  scoresRouter.get('/:id', function(req, res) {
    res.send({"score": {"id": 1, "title": "Indiana Jones", "artist": "John Williams", "file_url": "https://s3.amazonaws.com/noteriver2/jones.mid"}});
  });
  app.use('/api/v1/scores', scoresRouter);
};
