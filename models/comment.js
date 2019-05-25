var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    post: {type: type.Schema.ObjectId, ref: 'Post'},
    content: String,
    user: {type: type.Schema.ObjectId, ref: 'User'}
},{
    timestamps:true
})

module.exports = mongoose.model('Comment',commentsSchema)