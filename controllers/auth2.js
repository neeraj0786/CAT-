let jwt = require('jsonwebtoken');
let secret = 'sdfsfwfsf';
function generateToken2(candidate)
{

    let payload ={
        email : candidate.email,
        name : candidate.name,
        college : candidate.college,
        rollno : candidate.rollno,
        invitationKey : candidate.invitationKey,
        contact : candidate.contact,
        siginTime : candidate.siginTime 
    }
     return jwt.sign(payload,secret);
}

function checkToken2(token)
{

    return jwt.verify(token,secret);
}
module.exports = { generateToken2 , checkToken2};