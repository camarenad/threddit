var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    googleId: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
})


module.exports = mongoose.model('User', userSchema);
