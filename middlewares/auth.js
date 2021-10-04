const jwt = require('jsonwebtoken');
// const asyncHandler = require('./async');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
    // Set token from cookie
  }
 

  // Make sure token exists
  if (!token) {
    return res.status(400).json({message : "not authorized"})
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findByPk(decoded.id);

    next();
  } catch (err) {
    return res.status(401).json({message : "user not found"});
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({message : 'not authorized to access'})
    }
    next();
  };
};
