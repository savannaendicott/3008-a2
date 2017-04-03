var express = require('express');
var crypto  = require('crypto');
var router  = express.Router();

/* POST login */
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var usersalt = 'THIS ISNT THEIR SALT!';
  var hash = crypto.createHash('sha256').update(password+usersalt).digest('hex');

  if (hash == hash) { // TODO LOOKUP HASH!!!!
    res.json({'status': 'ok'});
  } else {
    res.json(400, {'status': 'err', 'err': 'wrong password'}); // TODO: store stats 
  }
});

module.exports = router;
