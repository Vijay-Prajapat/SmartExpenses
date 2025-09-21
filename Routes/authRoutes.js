const express = require("express");
const router = express.Router();
const {getUserInfo, signup, login } = require("../Controller/authController");
const { verifyToken } = require("../Middleware/authMiddleware");
router.post("/register", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUserInfo); 
module.exports = router;
