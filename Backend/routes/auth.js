const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateJWT = require('../middlewares/auth.middleware');

// Multer setup for profile image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'profile_images');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, req.user.username + ext);
    }
});
const upload = multer({ storage });

router.post('/register', authController.register);
router.post('/login', authController.login);
// Activation link endpoint
router.post('/activate', authController.activateUser);
router.get('/profile', authenticateJWT, authController.getProfile);
router.post('/profile/image', authenticateJWT, upload.single('profileImage'), authController.updateProfileImage);

module.exports = router;
