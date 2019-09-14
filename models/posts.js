let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let postSchema = new Schema({
    id : String,
    date : Date,
    description : String,
    title : String,
    country : String ,
    imageURL : String
});
let Post = mongoose.model('Post',postSchema );

module.exports ={Post}