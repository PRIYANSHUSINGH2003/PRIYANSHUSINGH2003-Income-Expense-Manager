const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { isTempEmail } = require('../utils/emailUtils');
const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register user
async function register(req, res) {
    try {
        const { username, password, email, avatar, role, profileImage } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }
        if (isTempEmail(email)) {
            return res.status(400).json({ error: 'We do not allow temporary email services. Please use a valid email for full access.' });
        }
        const existing = await User.findOne({ username });
        if (existing) return res.status(409).json({ error: 'Username already exists' });
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hash, email, avatar, role: role || 'user', profileImage: profileImage || null });
        await user.save();
        res.json({ message: 'User registered' });
    } catch (err) {
        res.status(500).json({ error: 'Registration error', details: err.message });
    }
}

// Login user
async function login(req, res) {
    try {
        const { username, password, email } = req.body;
        if (isTempEmail(email)) {
            return res.status(400).json({ error: 'We do not allow temporary email services. Please use a valid email for full access.' });
        }
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, SECRET, { expiresIn: '7d' });
        res.json({
            token,
            user: {
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                role: user.role,
                profileImage: user.profileImage || null
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Login error', details: err.message });
    }
}

// Get profile (protected)
async function getProfile(req, res) {
    try {
        const user = await User.findOne({ username: req.user.username });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            profileImage: user.profileImage || null
        });
    } catch (err) {
        res.status(500).json({ error: 'Profile error', details: err.message });
    }
}

// Update profile image (protected)
async function updateProfileImage(req, res) {
    try {
        const username = req.user.username;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });
        user.profileImage = `/profile_images/${req.file.filename}`;
        await user.save();
        res.json({ message: 'Profile image updated', profileImage: user.profileImage });
    } catch (err) {
        res.status(500).json({ error: 'Profile image update error', details: err.message });
    }
}

module.exports = {
    register,
    login,
    getProfile,
    updateProfileImage
};
