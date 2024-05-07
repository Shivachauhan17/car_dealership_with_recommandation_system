const jwt = require('jsonwebtoken');
const jwtSecret = "mynameisajayshakyaIamFrommyownw"


function verifyToken(req,res,next) {
    if(req.user===undefined || req.user===null){
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            const user=jwt.verify(token, jwtSecret)
            if(user){
                req.user={}
                req.user.email=user.username
                req.user.type=user.type
            }
            next()
        } else {
            return res.status(401).json({ error: 'Authorization header is missing' });
        }
    }
    else{
        next()
        
    }
}

module.exports = verifyToken;

