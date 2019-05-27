var mongoose = require('mongoose');
var Schema = mongoose.Schema

var postSchema = new Schema({
    headline: String,
    content: String,
    date: Date,
    comment: [{type: Type.Schema.ObjectId, ref:'Comment'}]
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema);