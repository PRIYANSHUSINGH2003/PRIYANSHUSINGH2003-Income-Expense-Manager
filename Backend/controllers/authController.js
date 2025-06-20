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
        // Generate activation token
        const activationToken = jwt.sign({ email }, SECRET, { expiresIn: '1d' });
        const { sendEmail } = require('../utils/emailUtils');
        const activationLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/activate?token=${activationToken}`;

        // Check for email credentials
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            return res.status(500).json({ error: 'Email service credentials are not set. Please contact support.' });
        }

        try {
            await sendEmail({
                to: email,
                subject: 'Activate your account',
                text: `Click the following link to activate your account: ${activationLink}`,
                html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Activate Your Account</title>
</head>
<body style="margin:0;padding:0;background:linear-gradient(135deg,#f4f4f7 0%,#e0e7ff 100%);font-family:Arial,sans-serif;">
  <table width="100%" bgcolor="#f4f4f7" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:500px;background:#fff;border-radius:16px;box-shadow:0 4px 24px rgba(79,70,229,0.08);padding:0 0 32px 0;overflow:hidden;">
          <tr>
            <td align="center" style="background:#4f46e5;padding:32px 24px 16px 24px;border-radius:16px 16px 0 0;">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/money-bag.png" alt="Finance Manager" width="48" height="48" style="display:block;margin-bottom:8px;"/>
              <h2 style="margin:0;color:#fff;font-size:28px;letter-spacing:-1px;font-weight:700;">Finance Manager</h2>
              <span style="display:inline-block;margin-top:8px;background:#fff;color:#4f46e5;font-size:12px;font-weight:bold;padding:2px 10px;border-radius:12px;vertical-align:middle;">SECURE ACTIVATION</span>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 24px 0 24px;">
              <img src="https://cdn-icons-png.flaticon.com/512/545/545682.png" alt="Welcome" width="80" height="80" style="margin-bottom:12px;"/>
              <h3 style="margin:0;color:#2d3748;font-size:22px;font-weight:600;">Welcome to Finance Manager!</h3>
              <p style="margin:12px 0 0 0;color:#4a5568;font-size:16px;">Thank you for joining us! Please confirm your email address to activate your account and unlock all features.</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:32px 24px 0 24px;">
              <a href="${activationLink}" style="display:inline-block;padding:16px 40px;background:#4f46e5;color:#fff;font-size:18px;font-weight:bold;border-radius:8px;text-decoration:none;box-shadow:0 2px 8px rgba(79,70,229,0.15);letter-spacing:0.5px;">Activate Account</a>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 24px 0 24px;">
              <hr style="border:none;border-top:1px solid #e0e7ff;margin:32px 0 16px 0;"/>
              <p style="margin:0;color:#718096;font-size:14px;">If the button above does not work, copy and paste this link into your browser:</p>
              <p style="word-break:break-all;color:#4f46e5;font-size:13px;margin:8px 0 0 0;">${activationLink}</p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:24px 24px 0 24px;">
              <p style="margin:0;color:#a0aec0;font-size:13px;">If you did not create an account, you can safely ignore this email.<br>Need help? Contact support at <a href="mailto:support@financemanager.com" style="color:#4f46e5;text-decoration:none;">support@financemanager.com</a></p>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:32px 24px 0 24px;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td><a href="https://facebook.com/" style="margin:0 6px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24" height="24" style="display:block;"/></a></td>
                  <td><a href="https://twitter.com/" style="margin:0 6px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="24" height="24" style="display:block;"/></a></td>
                  <td><a href="https://instagram.com/" style="margin:0 6px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" width="24" height="24" style="display:block;"/></a></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:16px 24px 0 24px;">
              <p style="margin:0;color:#cbd5e1;font-size:12px;">&copy; ${new Date().getFullYear()} Finance Manager. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
            });
        } catch (emailErr) {
            return res.status(500).json({ error: 'Registration error: Could not send activation email. Please check your email address or try again later.', details: emailErr.message });
        }

        // Only save user if email sent successfully
        const user = new User({
            username,
            password: hash,
            email,
            avatar,
            role: role || 'user',
            profileImage: profileImage || null,
            isVerified: false
        });
        try {
            await user.save();
        } catch (saveErr) {
            return res.status(500).json({ error: 'Registration error: Could not save user to database.', details: saveErr.message });
        }
        res.json({ message: 'User registered. Activation link sent to email.' });
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
        if (!user.isVerified) return res.status(403).json({ error: 'Account not verified. Please verify your email.' });
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
        console.log('req.user:', req.user);
        console.log('req.file:', req.file);
        const username = req.user && req.user.username;
        if (!username) {
            console.log('No username in JWT payload');
            return res.status(400).json({ error: 'No username in JWT payload' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        user.profileImage = `/profile_images/${req.file.filename}`;
        await user.save();
        console.log('Profile image updated:', user.profileImage);
        res.json({ message: 'Profile image updated', profileImage: user.profileImage });
    } catch (err) {
        console.log('Error updating profile image:', err);
        res.status(500).json({ error: 'Profile image update error', details: err.message });
    }
}

// Activate user via activation link
async function activateUser(req, res) {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ error: 'Activation token required' });
        }
        let payload;
        try {
            payload = jwt.verify(token, SECRET);
        } catch (err) {
            return res.status(400).json({ error: 'Invalid or expired activation token' });
        }
        const user = await User.findOne({ email: payload.email });
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.isVerified) return res.status(400).json({ error: 'User already verified' });
        user.isVerified = true;
        await user.save();
        res.json({ message: 'User activated. You can now log in.' });
    } catch (err) {
        res.status(500).json({ error: 'Activation error', details: err.message });
    }
}

module.exports = {
    register,
    login,
    getProfile,
    updateProfileImage,
    activateUser
};
