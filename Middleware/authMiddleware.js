const jwt = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_SECRET;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) return res.status(401).json({ message: "Access Denied" });

  jwt.verify(token, ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; 
    next();
  });
};
