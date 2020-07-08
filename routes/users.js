let express = require('express');
let router =express.Router();

let User = require('../models/users').User;  // <!-- from post1.js we are importing post class -->
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');
router.post('/login', async (req,resp)=>{

    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne().where({email : email});
    if(user)
    {
        let comparison = await bcrypt.compare(password,user.password);
        if(comparison)
        {
            let token = auth.generateToken(user);
            resp.cookie('auth_token',token);
            resp.send({
                redirectURL : '/admin'
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
        resp.send('rejected');
    }
})
router.post('/register', async (req,resp)=>{

    let email = req.body.email;
    let password = req.body.password;
    let repassword = req.body.repassword;

    let user = await User.findOne().where({email : email})
    if(!user)
    {
        let encpassword = await bcrypt.hash(password,12);
        let newUser = new User({
            email : email,
            password : encpassword
        })
        await newUser.save();
        resp.send('Registered Successfully!');
    }
    else
    {
        resp.send('Use another email!');
    }
})

module.exports = router;
