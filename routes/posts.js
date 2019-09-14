
let express = require('express');
let router =express.Router();

let Post = require('../models/posts').Post;  // <!-- from post1.js we are importing post class -->
let uniqid = require('uniqid');   // for reading binary files that cannot be passed to JSON
let authMiddleware = require('../middleware/auth');
router.get('/', async (req,resp)=>{
    let posts = await Post.find();   // getting array of posts
    resp.send(posts);
})

router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
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
    let newPost = new Post({
        id : uniqid(),
        title : reqBody.title,
        date : new Date(),
        description : reqBody.description,
        country : reqBody.country,
        imageURL : imgpath
    });
   // console.log(req.file);
    await newPost.save();
    resp.send('Created!');
})
router.delete('/:id',authMiddleware,  async (req, resp) => {
    let id = req.params.id;
    await Post.deleteOne({id: id});
    resp.send('Deleted!');
})
router.put('/:id',authMiddleware , async (req,resp)=>{
    let id =req.params.id;
    await Post.updateOne({id :id},req.body);
    resp.send('Updated!');
})

module.exports =router;