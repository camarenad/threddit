var express = require('express');
var router = express.Router();
var passport = require('passport')
var userCtrl = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Threddit', user: req.user });
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users',
    failureRedirect : '/'
  }
));
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/feed', userCtrl.feed)

module.exports = router;
