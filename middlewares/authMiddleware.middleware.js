// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const secretKey = "syook"; // Replace with your actual secret key

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized Access : No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden: Invalid token." });
    }
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
