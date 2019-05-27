var User = require('../models/user');

module.exports = {
  index,
  post
  // createUser,
  
}


// function createUser(req,res,next) {
  
//     User.create(req.body, function(err,user){
//       if(err) res.redirect('/users')
//       res.redirect('/feed')
//       console.log(req.body)
//     });

// }




function post(req,res,next) {
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('users/post', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
  console.log('DESIRED ROUTE PARAM'+ req.user)
}


function index(req, res, next) {
  // Make the query object to use with User.find based up
  // the user has submitted the search form or now
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // Default to sorting by name
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    res.render('users/index', {
      users,
      user: req.user,
      name: req.query.name,
      sortKey
    });
  });
  console.log(req.user)
}

