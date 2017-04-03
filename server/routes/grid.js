var express = require('express');
var crypto  = require('crypto');
var shuffle = require('shuffle-array');
var gen = require('random-seed');
var router  = express.Router();

/* GET grid */
router.get('/', function(req, res, next) {
  var username = req.query.user;
  var wants = {'x': req.query.x, 'y': req.query.y, 'grid': req.query.grid};
  var hash = crypto.createHash('sha256').update(
    wants.x+''+
    wants.y+''+
    wants.grid+''+
    username+
    req.app.get('seed salt')).digest('hex');

  var rand = gen(hash).random;
  var copy = shuffle(req.app.get('glyph array'), {'rng': rand, 'copy': true});

  var grid = [];

  var count = 0;
  for (var i = 0; i < 8; i++) {
    grid[i] = [];
    for (var j = 0; j < 8; j++) {
      grid[i][j] = copy[count];
      count++;
    }
  }
  console.log(grid);
  res.json({'grid': grid});
});

module.exports = router;
