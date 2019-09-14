let express = require('express');
let app = express();
let mongoose = require('mongoose');
let postsRouter = require('./routes/posts')
let uniqid = require('uniqid'); 
let multer = require('multer'); 
let callbackrequestsRouter = require('./routes/callback-requests');
let emailRouter = require('./routes/emails');
let userRouter = require('./routes/users')
let Post = require('./models/posts').Post;
let cookieparser = require('cookie-parser');
let auth = require('./controllers/auth');


app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost/Travels', { useNewUrlParser: true }); // connecting to database mongodb port 27017
app.use(express.json());


let imageStorage = multer.diskStorage({               //specifying the destination and filename for file 
    destination : (req,file,cb)=>cb(null ,'public/images'),
    filename : (req,file,cb)=>cb(null ,file.originalname)
});
app.use(multer({storage : imageStorage}).single('imageFile'));  // for reading the file and storing it in database using multer
let id =1;




app.use(cookieparser());
app.use(express.static('public')); //redirecting localhost 3000 to index.html
app.use('/posts',postsRouter);
app.use('/callback-requests',callbackrequestsRouter);
app.use('/emails',emailRouter);
app.use('/users',userRouter);

app.get('/sight', async (req, resp) => {
  
    let id = req.query.id;
    let post = await Post.findOne({id : id});

    resp.render('sight', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        description: post.description
    })
})
app.get('/admin', (req,resp)=>{

    let token = req.cookies['auth_token'];

    if(token && auth.checkToken(token))
    resp.render('admin');
    else
    {
        resp.redirect('/login');
    }
})
app.get('/login', (req,resp)=>{
    resp.render('login');
})
app.listen(3000,()=>console.log('Listening 3000...'));