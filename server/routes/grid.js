var express = require('express');
var crypto  = require('crypto');
var shuffle = require('shuffle-array');
var gen = require('random-seed');
var router  = express.Router();

/* GET grid */
router.get('/', function(req, res, next) {
  var username = req.query.user;
  var website = req.query.website;
  var wants = {};
  if (req.query.x) {
    wants.x = req.query.x;
  } else {
    wants.x = '';
  }
  if (req.query.y) {
    wants.y = req.query.y;
  } else {
    wants.y = '';
  }
  if (req.query.grid == '0') {
    wants.grid = '';    
  } else if (req.query.grid) {
    wants.grid = req.query.grid;
  } else {
    wants.grid = '';
  }
  var hash = crypto.createHash('sha256').update(
    wants.x+''+
    wants.y+''+
    wants.grid+''+
    username+website+
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
