const express = require('express');
const router = express.Router();
const URL = require('../model/url');

router.get('/', async (req, res) => {
    if (!req.user) return res.redirect('/auth/signin'); 

    const userUrls = await URL.find({ createdBy: req.user.userId }); 

    return res.render("home", {
        urls: userUrls,
    });
});



module.exports = router;