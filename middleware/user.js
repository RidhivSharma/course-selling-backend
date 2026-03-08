const jwt = require("jsonwebtoken");

const JWT_USER_SECRET = "kritisanon";

function userMiddleware(req, res, next) {
    const token = req.headers.token;

    try {
        const decoded = jwt.verify(token, JWT_USER_SECRET);

        req.userId = decoded.id;

        next();

    } catch (e) {

        return res.status(403).json({
            msg: "Invalid or expired token"
        });

    }
}

module.exports = {
    userMiddleware
};