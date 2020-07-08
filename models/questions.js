let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let questionSchema = new Schema({
    id : String,
    date : Date,
    question: String,  // description
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    correctOption: String,
    imageURL : String
});
let Question = mongoose.model('Question',questionSchema );

module.exports ={Question}