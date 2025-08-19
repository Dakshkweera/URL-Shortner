const express = require ('express');
const mongoose = require('mongoose');
const session = require('express-session');

const URL = require('./model/url');
require("dotenv").config();


const staticRouter = require('./routes/staticRouter');
const url = require('./routes/url');
const authrouter = require('./routes/auth');


const app = express();
const path = require('path');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));
// mongoose.connect('mongodb://127.0.0.1:27017/urlshortener')
// .then(()=>{
//     console.log('Connected to MongoDB');
// })
// .catch((err)=>{
//     console.error('Error connecting to MongoDB:', err);
// });

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


const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

