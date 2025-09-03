/**
 * Authentication Middleware
 */

const jwt = require('jsonwebtoken');
const config = require('../config/app');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        error: 'Access token required',
        status: 401
      });
    }

    const decoded = jwt.verify(token, config.security.jwtSecret);
    req.user = decoded;
    next();
    
  } catch (error) {
    return res.status(403).json({
      error: 'Invalid or expired token',
      status: 403
    });
  }
};

module.exports = authMiddleware;
