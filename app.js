let express = require('express');
let app = express();
let mongoose = require('mongoose');
let questionsRouter = require('./routes/questions')  // changed
let uniqid = require('uniqid'); 
let multer = require('multer'); 
let callbackrequestsRouter = require('./routes/callback-requests');
let emailRouter = require('./routes/emails');
let userRouter = require('./routes/users')
let candidateRouter = require('./routes/candidates');
let Question = require('./models/questions').Question; //changed
let cookieparser = require('cookie-parser');
let auth = require('./controllers/auth');
let auth2 = require('./controllers/auth2');


app.set('view engine', 'ejs');


mongoose.connect('mongodb://localhost/Cat', { 
    useUnifiedTopology: true, // Averted DeprecationWarning [https://github.com/Automattic/mongoose/issues/8156].
    useNewUrlParser: true 
})
.then(() => console.log('DB Connected!')) // connecting to database mongodb port 27017
.catch(err => { console.log(`DB Connection Error: ${err.message}`)})
app.use(express.json());


let imageStorage = multer.diskStorage({               //specifying the destination and filename for file 
    destination : (req,file,cb)=>cb(null ,'public/images'),
    filename : (req,file,cb)=>cb(null ,file.originalname)
});
app.use(multer({storage : imageStorage}).single('imageFile'));  // for reading the file and storing it in database using multer
let id =1;




app.use(cookieparser());
app.use(express.static('public')); //redirecting localhost 3000 to index.html
app.use('/questions',questionsRouter); // changed
app.use('/callback-requests',callbackrequestsRouter);
app.use('/emails',emailRouter);
app.use('/users',userRouter);
app.use('/candidates',candidateRouter);

app.get('/sight', async (req, resp) => {    //changed
  
    let id = req.query.id;
    let question = await Question.findOne({id : id});

    resp.render('sight', {
        question : question.question,
        option1 : question.option1,
        option2 : question.option2,
        option3 : question.option3,
        option4 : question.option4,
        correct_option : question.correct_option,
        imageURL: question.imageURL,
        date: question.date
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
app.get('/test', (req,resp)=>{

    let token = req.cookies['auth_token2'];

    if(token && auth2.checkToken2(token))
    resp.render('test');
    else
    {
        resp.redirect('/login');
    }
})
app.get('/login', (req,resp)=>{
    resp.render('login');
})
app.listen(3000,()=>console.log('Listening 3000...'));
