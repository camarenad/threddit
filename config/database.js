var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/threddit',
    {useNewUrlParser: true}
);

var db = mongoose.connection;

db.on('connected', function(){
    console.log(`Connected to Mongo at ${db.host} ${db.port}`)
});