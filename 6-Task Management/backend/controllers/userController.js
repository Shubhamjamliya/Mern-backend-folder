import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Get all users (admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email role");
    res.json(users); // make sure this is an array, not { users: [...] }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Get single user by ID (admin only)
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) res.json({ user });
  else res.status(404).json({ message: "User not found" });
};

// Create new user (admin only)
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "Email already exists" });

  const user = await User.create({ name, email, password, role });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Update user (admin only)
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { name, email, role, password } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;
  if (password) user.password = password; // hashed in model

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  });
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.remove();
  res.json({ message: "User removed" });
};
