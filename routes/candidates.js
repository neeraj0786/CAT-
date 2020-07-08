let express = require('express');
let router =express.Router();
let uniqid = require('uniqid'); 
let Candidate = require('../models/candidates').Candidate;  // <!-- from post1.js we are importing post class -->
let bcrypt = require('bcrypt');
let auth2 = require('../controllers/auth2');
let authMiddleware = require('../middleware/auth');
let id =1;
router.get('/',authMiddleware , async (req,resp)=>{
    let candidates = await Candidate.find();   // getting array of candidates
    resp.send(candidates);
})

router.get('/:id',authMiddleware , async (req, resp) => {
    let id = req.params.id;
    let candidate= await Candidate.findOne({id: id});
    resp.send(candidate);
})
router.put('/score', async (req,resp)=>{
    let user = req.session.user;
    let id = user.id;
    await Candidate.updateOne({id :id},req.body);
    resp.send('Updated!');
})
router.post('/candidatelogin', async (req,resp)=>{

    let email = req.body.email;
    let name = req.body.name;
    let college = req.body.college;
    let rollno = req.body.rollno;
    let invitationKey = req.body.invitationKey;
    let contact = req.body.contact;
    let id1 = uniqid();
    if(email&&name&&college&&rollno&&invitationKey&&contact){
    
    let flag = 0;
    let candidate = await Candidate.findOne().where({email : email});
    if(!candidate)
    {
        
        let newCandidate = new Candidate({
            id : id1,
            email : email,
            name : name,
            college : college,
            rollno : rollno,
            invitationKey : invitationKey,
            contact : contact,
            signinTime  : new Date()
        })
        await newCandidate.save();
        flag = 1;
        candidate = newCandidate;
        
    }
    else
    {
        resp.send('Use another email!');
    }
    
      
        if(flag)
        {
            
            let token = auth2.generateToken2(candidate);
            resp.cookie('auth_token2',token);
            resp.send({
                redirectURL : '/test'
            });         
        }
        else
        {
            resp.status(400);
            resp.send('Rejected!');
        }
    }
    else
    {
        resp.status(400);
        resp.send("Enter Complete Details !");  
    }
    
})


module.exports = router;
