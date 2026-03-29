const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../configurations/config');

function middleware(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return  res.status(401).json({
                message: "No token provided"
            });
        }

        const decodedData = jwt.verify(token, JWT_SECRET);
        req.userId = decodedData.id;
        next();
    } catch (err) {
        res.status(401).json({
            message: "Invalid token",
            error: err.message
        });
    }
}

module.exports = {
    middleware
}