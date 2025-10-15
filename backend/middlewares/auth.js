const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    let cookies = req.cookies || {};
    let token = req.body.token
        || cookies.token
        || (req.headers["authorization"]?.startsWith("Bearer ") ? req.headers["authorization"].slice(7) : null);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token not found",
        });
    }
    try {
        let payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (e) {
        console.error("JWT verification failed:", e.message);
        return res.status(401).json({
            success: false,
            message: "Token is invalid or expired",
        });
    }
};

const roleCheck = (role) => (req, res, next) => {
    try {
        if (req.user.role !== role) {
            return res.status(403).json({
                success: false,
                message: `This is a protected route for ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            });
        }
        next();
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: `Could not authorize access for ${role}`,
        });
    }
};

exports.isAdmin = roleCheck("admin");
exports.isReviewer = roleCheck("reviewer");
exports.isEmployee = roleCheck("employee");
exports.isAIAgent = roleCheck("ai_agent");
exports.isProjectLead = roleCheck("project_lead");