// const sessions = require('../sessions/user.js');
const jwt = require('jsonwebtoken');


function authmiddleware (req, res, next) {
    // const sessionID = req.cookies.sessionID;
    const token= req.cookies.token;

    // if (!sessionID || !sessions[sessionID]) {
    //     return res.status(401).json({ error: "Unauthorized" });
    // }
    if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token" });
    }
    
    // req.user = sessions[sessionID];
    // next();

    try {
    const decoded = jwt.verify(token, "heythisissecretcode123@daksh"); // hardcoded secret
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}

module.exports = authmiddleware;
