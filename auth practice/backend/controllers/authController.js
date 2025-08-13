const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashed });

    res.status(201).json({ userId: user_id });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid Credentials" });

    const token = generateToken(user._id);
    res.json({ token });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};