const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  avatar: { type: String },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
});
const User = mongoose.model('User', UserSchema);

const router = express.Router();

// Temp email blocklist
const tempDomains = [
  'tempmail', 'mailinator', '10minutemail', 'guerrillamail', 'yopmail', 'dispostable', 'maildrop', 'fakeinbox', 'trashmail', 'getnada', 'mintemail', 'sharklasers', 'spamgourmet', 'mailnesia', 'mailnull', 'throwawaymail', 'mailtemp', 'moakt', 'mytempemail', 'tempemail', 'emailondeck', 'mailcatch', 'spambox', 'mailbox52', 'spam4.me', 'mailinator2', 'mailinator.com', 'maildrop.cc', 'mailnesia.com', 'yopmail.com', '10minutemail.com', 'guerrillamail.com', 'dispostable.com', 'getnada.com', 'mintemail.com', 'sharklasers.com', 'spamgourmet.com', 'mailnull.com', 'throwawaymail.com', 'mailtemp.com', 'moakt.com', 'mytempemail.com', 'emailondeck.com', 'mailcatch.com', 'spambox.us', 'mailbox52.com', 'spam4.me'
];
function isTempEmail(email) {
  return tempDomains.some(domain => email && email.toLowerCase().includes(domain));
}

// Register
router.post('/register', async (req, res) => {
  const { username, password, email, avatar, role } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  if (isTempEmail(email)) {
    return res.status(400).json({ error: 'We do not allow temporary email services. Please use a valid email for full access.' });
  }
  const existing = await User.findOne({ username });
  if (existing) return res.status(409).json({ error: 'Username already exists' });
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hash, email, avatar, role: role || 'user' });
  await user.save();
  res.json({ message: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password, email } = req.body;
  if (isTempEmail(email)) {
    return res.status(400).json({ error: 'We do not allow temporary email services. Please use a valid email for full access.' });
  }
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { username: user.username, email: user.email, avatar: user.avatar, role: user.role } });
});

// Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Role check middleware
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) return res.status(403).json({ error: 'Forbidden' });
    next();
  };
}

module.exports = { router, requireAuth, requireRole, User };
