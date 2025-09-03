const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({ 
    message: 'User profile endpoint',
    user: req.user 
  });
});

module.exports = router;
