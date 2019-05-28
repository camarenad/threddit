var mongoose = require('mongoose');
var Schema = mongoose.Schema

var postSchema = new Schema({
    headline: String,
    content: String,
    date: Date,
    comment: [{type: Schema.Types.ObjectId, ref:'Comment'}],
    user: {type: Schema.Types.ObjectId, ref:'User'}
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);