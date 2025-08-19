
const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:{type: String , required: true, enum:["admin","user"],default:"user"},
});

const User = mongoose.model("users", userschema);
module.exports = User;
