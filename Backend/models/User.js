const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    avatar: { type: String, default: null },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    profileImage: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
