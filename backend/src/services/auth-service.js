const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

async function register({ name, email, password, role, linkedVolunteerId }) {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already in use');

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hash, role, linkedVolunteerId });
  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user, token };
}

async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user, token };
}

async function getMe(userId) {
  return await User.findById(userId).select('-password');
}

module.exports = { register, login, getMe };
