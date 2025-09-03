const express = require('express');
const router = express.Router();

// Basic auth routes for now
router.get('/test', (req, res) => {
  res.json({ message: 'Auth service is working' });
});

module.exports = router;
