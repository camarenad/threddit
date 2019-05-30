var User = require('../models/user');
var Post = require('../models/post');
var Comment = require('../models/comment')

module.exports = {
    index,
    post,
    addPost,
    profile,
    delPost,
    show,
    updatePost,
    showComments,
    newComment
}

function newComment(req,res,next){
    var comment = new Comment(req.body)
    comment.save(function(err) {
        Post.findById(req.params.id, function(err,post){
            post.comments.unshift(comment);
            post.save(function(err){
                res.redirect(`back`)
            });
        });

    })
}

function showComments(req,res,next) {
    Post.findById(req.params.id)
    .populate('comments')
    .populate('user')
    .exec(function(err,post){
        res.render('users/comment',{
            post: post,
            user: req.user
        });
    });
}

function updatePost(req,res,next) {
    Post.findById(req.params.id, function(err,post) {
        post.content = req.body.content;
        post.save(function(err2,post) {
            if(err2){ 
                console.log(err2);
            }
            res.redirect(`/users/profile/${req.user.id}`);
        })
    });
}

function show(req,res,next) {
    User.find(req.user.id)
    .populate('posts')
    .exec(function(err, user){
        Post.findById(req.params.id, function(err,post) {
            res.render('users/edit', {
                post: post,
                user: req.user
            });
        });
    });
   
    console.log(req.user._id)
    console.log(req.params.id)
}

function delPost(req,res,next) {
    Post.findByIdAndDelete(req.params.id, function(err,post) {
        res.redirect('/users/profile/:id');
    });
}

function profile(req, res, next) {
    User.findById(req.user._id)
    .populate('posts').exec(function(err, user) {
    Post.find({_id: {$in: user.posts}})
    .exec(function(err, posts) {
    //   console.log(posts);
      res.render('users/profile', {
          user, posts
      });
      console.log(req.params.id)
    });
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