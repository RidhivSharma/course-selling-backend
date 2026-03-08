const jwt = require("jsonwebtoken")

const JWT_ADMIN_SECRET = "wamiqagabbi"

function adminMiddleware(req,res,next){

    const token = req.headers.token;

    try{

        const decoded = jwt.verify(token,JWT_ADMIN_SECRET);

        req.userId = decoded.id;

        next();

    }catch(e){

        return res.status(403).json({
            msg:"Invalid or expired token"
        });

    }

}

module.exports = {
    adminMiddleware
}