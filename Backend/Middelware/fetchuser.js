const jwt = require('jsonwebtoken');
const JWT_SECRET = 'EccomerceSiteForArtisans';

const fetchuser = (req,res,next)=>{
    const token = req.header('auth-token');
    if(!token)
    {
        return res.status(401).json({error:"Please authenticate using valid token"});
    }

    try {
    const data= jwt.verify(token,JWT_SECRET)
    req.user = data.user;
    next();
    } catch (error) {
        return res.status(401).json({error:"Please authenticate using valid token"});
    }
}

module.exports = fetchuser