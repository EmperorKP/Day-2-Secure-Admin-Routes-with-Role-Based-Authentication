const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin protected route
router.get('/dashboard', verifyToken, isAdmin, (req, res) => {
  res.json({
    role: req.user.role,
    content: 'Welcome to the Admin Panel',
  });
});


module.exports = router;
