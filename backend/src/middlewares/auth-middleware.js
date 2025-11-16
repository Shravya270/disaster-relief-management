const jwt = require('jsonwebtoken');
const User = require('../models/user');

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success:false, error: 'Unauthorized' });

  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role, email }
    return next();
  } catch (err) {
    return res.status(401).json({ success:false, error: 'Unauthorized' });
  }
}

function authorize(roles = []) { // roles = array of allowed roles
  return function(req, res, next) {
    if (!req.user) return res.status(401).json({ success:false, error:'Unauthorized' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success:false, error:'Forbidden' });
    }
    return next();
  }
}

module.exports = { authMiddleware, authorize };
