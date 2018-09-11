const express = require('express')
    ,session = require('express-session')
    ,cors = require('cors')
    ,bodyParser = require('body-parser')
    ,massive = require('massive')
    ,controller = require('./server/controller');

require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json())

app.use(session({
    name:'session example',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        //days hours minutes seconds milseconds
        expires: 1 * 24 * 60 * 10 * 1000,
    },
  }))

  app.use((req,res,next)=>{
      console.log(req.session.user)
      next()
  })

massive(process.env.CONNECTION_STRING)
    .then((dbInstance)=>{
        app.set('db',dbInstance);
        console.log(`db is up and running`)
    })

app.post('/api/login', controller.login)

app.get('/api/getUserEmail', 

(req, res, next)=>{
    if(!req.session.user){
        res.send({isLoggedin:false});
    }else{
        next()
    }
},  

(req, res, next)=>{
    const {email, id, isLoggedin = true} = req.session.user;
    const obj = {email, id, isLoggedin} 
    res.send(obj)
})

const port = process.env.PORT || 8009;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})