let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let candidateSchema = new Schema({
    id : String,
    name : String,
    email: String ,
    college : String,
    rollno : String,
    invitationKey : String,
    contact : String,
    signinTime : Date,
    signoutTime : Date,
    score : Number
    
});
let Candidate = mongoose.model('Candidate',candidateSchema,'candidates');

module.exports ={Candidate}