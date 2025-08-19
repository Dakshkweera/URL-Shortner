const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const User = require("../model/user");
const bycrypt = require("bcrypt");

// const { model } = require("mongoose");
// const sessions = require('../sessions/user.js');


router.get("/signup", (req, res)=>{
    return res.render("signup");
})

router.post("/signup", async (req, res) => {
    try{
        const { email,password } = req.body;
        if(!email || !password){
            return res.status(400).json({ error: "Email and password are required" });
        }
        const hashpassword = await bycrypt.hash(password,10);

        const isadmin =email === "kweera2005@gmail.com";
        const user = await User.create({
            email,
            password:hashpassword,
            role:isadmin ? "admin" :"user"
        });

        console.log("User created successfully:", user);
        res.redirect("/auth/signin");
    }
    catch(err){
        console.error("Signup error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/signin", (req,res)=>{
    return res.render("signin");
})

router.post("/signin", async (req, res) => {
    try{
        const { email ,password }=req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const isMatch = await bycrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // const sessionID = crypto.randomBytes(16).toString("hex");
        // sessions[sessionID] = user._id.toString();

        const token =jwt.sign(
            {
                userId:user._id,
                role:user.role

            },
            "heythisissecretcode123@daksh",
            {
                expiresIn:"1d"
            }
        );
        
        // res.cookie("session",sessionID, {httpOnly:true});
        res.cookie("token",token, {httpOnly:true});

        // console.log("Session created:", sessionID);
        // console.log("All sessions now:", sessions);

        return res.redirect("/");
    }
    catch(err){
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = router;