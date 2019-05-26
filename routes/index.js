var express = require('express');
var router = express.Router();
var passport = require('passport')
// var userCtrl = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/users');
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users',
    failureRedirect : '/users'
  }
));
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
