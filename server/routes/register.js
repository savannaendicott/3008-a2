var express = require('express');
var crypto  = require('crypto');
var shuffle = require('shuffle-array');
var gen = require('random-seed');
var router  = express.Router();
var sqlite3 = require('sqlite3').verbose();
var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/loginsNew.log', category: 'password'}
  ]
});
/* GET grid */
router.get('/', function(req, res, next) {
    var username = req.query.user;
    var website = req.query.website;

    if (username == undefined) {
      res.json(400, {status:'error', err:'must register with username'});
      return;
    }
    if (website == undefined) {
      res.json(400, {status:'error', err:'must register with website'});
      return;
    }

    var pwgenrand = gen.create();

    var pass = [];
    var pwstring = '';
    
    for (var c = 0; c < 4; c++) {
      pass[c] = {loc:{ x:pwgenrand.range(8), y:pwgenrand.range(8)}};
      var seed;
      if (c == 0) {
        var seed = crypto.createHash('sha256').update(
        username+website+
        req.app.get('seed salt')).digest('hex');
      } else {
        seed = crypto.createHash('sha256').update(
        pass[c-1].loc.x+''+
        pass[c-1].loc.y+''+
        c+''+
        username+website+
        req.app.get('seed salt')).digest('hex');
      }
      
      var rand = gen(seed).random;
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
      pass[c].num = grid[pass[c].loc.x][pass[c].loc.y];
      pwstring += pass[c].num + ':' + pass[c].loc.x + ',' + pass[c].loc.y + ';';
      console.log(grid)
    }

    var usersalt = pwgenrand.string(24);
    // console.log(req.db);
    console.log(usersalt);
    console.log(pwstring);
    console.log(website);
    var pwhash = crypto.createHash('sha256').update(website+pwstring+usersalt).digest('hex');
    console.log(pwhash);

    // TODO: store password hash and salt with username
      req.db.run("INSERT OR REPLACE INTO users (username, website, plaintext_password, hash, salt) VALUES (?,?,?,?,?);",
      [username, website, pwstring, pwhash, usersalt], function(err){
        var log = log4js.getLogger('password');
       res.json({password: pass});
        log.info("create",website, username);
      
    });
});
module.exports = router;
