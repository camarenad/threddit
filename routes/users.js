var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/',userCtrl.index)
router.get('/profile/:id', userCtrl.profile,isLoggedIn)
router.post('/post', userCtrl.addPost,isLoggedIn)
router.get('/post',userCtrl.post,isLoggedIn)
router.delete('/profile/:id', userCtrl.delPost,isLoggedIn)
router.get('/edit/:id',userCtrl.show,isLoggedIn)
router.put('/edit/:id',userCtrl.updatePost,isLoggedIn)
router.get('/post/:id', userCtrl.showComments,isLoggedIn)
router.post('/comment/:id',userCtrl.newComment,isLoggedIn)

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }
  
module.exports = router;
