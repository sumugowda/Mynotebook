const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const JWT_SECRET = 'comelet$ENCRYPT&hide'


const fetchuser = (req, res, next)=>{
    //Get the user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please use a valid token..."})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"Please use a valid token..."})

    }
    
}

module.exports = fetchuser;