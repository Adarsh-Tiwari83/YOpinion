require('dotenv').config();
require('./db/conn.js');
const express=require("express");
const session=require('express-session');
const Opinion=require('./models/opinion.js');
const app=express();
const path=require("path");
const bcrypt=require('bcryptjs');
const bodyparser=require("body-parser");
const cookieparser=require('cookie-parser');
const { urlencoded } = require('body-parser');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));
const homerouter=require('./routes/home.js');
const loginrouter=require('./routes/login.js');
const logoutrouter=require('./routes/logout.js');
const signuprouter=require('./routes/signup.js');
const emailotprouter=require('./routes/emailOTP.js');
const profilerouter=require('./routes/userprofile.js');
const createblogrouter=require('./routes/createBlog.js');

const port=process.env.port || 3000;
app.use(cookieparser());
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'../public')));

app.set('view engine','ejs');

app.use(homerouter);
app.use(loginrouter);
app.use(logoutrouter);
app.use(emailotprouter);
app.use(signuprouter);
app.use(profilerouter);
app.use(createblogrouter);

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});