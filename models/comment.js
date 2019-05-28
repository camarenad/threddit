var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    post: {type: Schema.Types.ObjectId, ref: 'Post'},
    content: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
},{
    timestamps:true
})

module.exports = mongoose.model('Comment',commentsSchema)