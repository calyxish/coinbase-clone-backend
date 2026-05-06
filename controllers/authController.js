const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const getCookieOptions = () => {
  const isProd = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
  };
};

const signToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }

  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email already in use." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  const token = signToken(user._id);

  res.cookie("token", token, getCookieOptions());

  return res.status(201).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token = signToken(user._id);
  res.cookie("token", token, getCookieOptions());

  return res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

const logout = async (req, res) => {
  res.clearCookie("token", getCookieOptions());
  return res.status(200).json({ message: "Logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
