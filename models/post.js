var mongoose = require('mongoose');
var Schema = mongoose.Schema

var postSchema = new Schema({
    headline: String,
    content: String,
    date: Date,
    comment: [{type: Type.Schema.ObjectId, ref:'Comment'}],
    user: {type: Type.Schema.ObjectId, ref:'User'}
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);