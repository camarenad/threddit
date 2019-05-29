var User = require('../models/user');
var Post = require('../models/post');

module.exports = {
    index,
    post,
    addPost,
    profile
}

function profile(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        res.render('users/profile', {
            user: user
        })
    }).populate('posts').exec((err, posts) => {
        return
    });
}

function addPost(req, res, next) {
    Post.create(req.body, function(err, post) {
        post.user = req.user._id
        post.save(function(err) {
            User.findById(req.user._id, function(err, user) {
                user.posts.unshift(post);
                user.save(function(err) {
                    res.redirect('/users')
                });
            });
        });
    });
}

function post(req, res, next) {
    res.render('users/post', {
        user: req.user,
        name: req.query.name
    });
    // console.log('DESIRED ROUTE PARAM'+ req.user)
}

function index(req, res, next) {
    // Make the query object to use with User.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? {
        name: new RegExp(req.query.name, 'i')
    } : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    User.find(modelQuery)
        .sort(sortKey).populate('posts').exec(function(err, users) {
            if (err) return next(err);
            // Passing search values, name & sortKey, for use in the EJS
            res.render('users/index', {
                users,
                user: req.user,
                name: req.query.name,
                sortKey
            });
        });
}