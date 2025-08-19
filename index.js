const express = require ('express');
const mongoose = require('mongoose');
const session = require('express-session');

const URL = require('./model/url');


const staticRouter = require('./routes/staticRouter');
const url = require('./routes/url');
const authrouter = require('./routes/auth');


const app = express();
const path = require('path');

mongoose.connect('mongodb://127.0.0.1:27017/urlshortener')
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const authmiddleware = require('./middleware/user.js');

const sessionStore = require('./sessions/user.js');
const crypto = require("crypto");

app.set("view engine", "ejs");
app.set("views",path.resolve("./view"));

app.use('/auth', authrouter);
app.use('/users', authmiddleware, url);
app.use('/',authmiddleware, staticRouter);



app.listen(8001,()=>{
    console.log('Server is running on port 8001');
})
