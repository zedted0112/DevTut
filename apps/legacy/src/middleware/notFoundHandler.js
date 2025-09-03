/**
 * 404 Not Found Handler Middleware
 */

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Route Not Found',
    status: 404,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method
  });
};

module.exports = notFoundHandler;
