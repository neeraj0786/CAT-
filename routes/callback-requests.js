let CallbackRequest = require('../models/callback-requests').CallbackRequest;
let express = require('express');
let router =express.Router();
let uniqid = require('uniqid');   // for reading binary files that cannot be passed to JSON
let authMiddleware = require('../middleware/auth');

router.get('/',authMiddleware, async (req ,resp)=>{
    resp.send(await CallbackRequest.find());
});
router.post('/', async (req , resp)=>{
    
    let reqBody = req.body;
    let newRequest = new CallbackRequest({
        id : uniqid(),
        phoneNumber : reqBody.phoneNumber,
        date : new Date()
    });
    await newRequest.save();
    resp.send('Sent!');

});
router.delete('/:id',authMiddleware, async (req, resp)=>{
   await CallbackRequest.deleteOne({id : req.params.id});
   resp.send('Deleted!');
});

module.exports =router;