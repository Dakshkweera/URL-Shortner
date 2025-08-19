const url = require('../model/url');
const shortid = require('shortid');

exports.createUrl = async(req,res)=>{
    try{
        if (!req.user?.userId) return res.status(401).send("Please login to shorten URLs!");
        const { urlGiven } = req.body;
        if(!urlGiven){
           return res.status(400).json({ error: 'URL is required'});
    }
    const shortID = shortid.generate();
    await url.create({
        shortid: shortID,
        urlgiven: urlGiven,
        history: [],
        createdBy: req.user.userId 
    })
    const userUrls = await url.find({ createdBy: req.user.userId });

   return res.render("home", { 
      id: shortID, 
      urls: userUrls,
    });
}
    catch(err){
        console.error("Error creating URL:", err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.geturl= async(req,res)=>{
    try{
        const shortid= req.params.shortid;
        const urldata = await url.findOne({ shortid });

        if(!urldata){
            res.status(404).json({ error: 'URL not found' });
        }

        const ipAddress =
        req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;

        await urldata.updateOne({
                $push: {
                history: { timestamp: Date.now(), ip:ipAddress }
            }
        });

        return res.status(200).redirect(urldata.urlgiven);
    }
    catch(err){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.gethistory = async(req,res)=>{
    try{
        const shortid = req.params.shortid;
        const urldata = await url.findOne({ shortid });

        if(!urldata){
            return res.status(404).json({ error: 'URL not found' });
        }

        const history = { "clicks": urldata.history.length, "history": urldata.history };

        return res.status(200).json(history);
    }
    catch(err){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
