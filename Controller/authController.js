const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign({ id: user._id }, ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, { expiresIn: "7d" });

    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    // req.user contains data from JWT payload (usually user id)
    const user = await User.findById(req.user.id).select("name email _id");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {login,signup, getUserInfo};