var User = require('../models/user');

module.exports = {
  // index,
  createUser,
  feed
}

// function index(req, res, next) {
//     console.log('Path hit')
//       res.render('index', {
//         users,
//         user: req.user,
//         name: req.query.name,
//         sortKey
//       });
//   }

function createUser(req,res,next) {
  
    User.create(req.body, function(err,user){
      if(err) res.redirect('/users')
      res.redirect('/feed')
      console.log(req.body)
    });

}

function feed(req,res,next){
  res.render('users/feed')
}