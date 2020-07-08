
let express = require('express');
let router =express.Router();
let id =1;

let Question= require('../models/questions').Question;  // <!-- from pquestion1.js we are importing post class -->
let uniqid = require('uniqid');   // for reading binary files that cannot be passed to JSON
let authMiddleware = require('../middleware/auth');
router.get('/', async (req,resp)=>{
    let questions = await Question.find();   // getting array of questions
    resp.send(questions);
})

router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let question= await Question.findOne({id: id});
    resp.send(question);
})

router.post('/',authMiddleware, async (req,resp)=>{
    let reqBody = req.body ;
    let imgpath;
    if(reqBody.imageURL)
    {
        imgpath = reqBody.imageURL;
    }
    else
    {
        imgpath = req.file.path.substring(7,req.file.path.length);
    }
    let newQuestion = new Question({
        id : uniqid(),
        date : new Date(),
        question : reqBody.question,
        option1: reqBody.option1,
        option2: reqBody.option2,
        option3: reqBody.option3,
        option4: reqBody.option4,
        correctOption : reqBody.correctOption,
        imageURL : imgpath
    });
   // console.log(req.file);
    await newQuestion.save();
    resp.send('Created!');
    id++;
})
router.delete('/:id',authMiddleware,  async (req, resp) => {
    let id = req.params.id;
    await Question.deleteOne({id: id});
    resp.send('Deleted!');
})
router.put('/:id',authMiddleware , async (req,resp)=>{
    let id =req.params.id;
    await Question.updateOne({id :id},req.body);
    resp.send('Updated!');
})

module.exports =router;