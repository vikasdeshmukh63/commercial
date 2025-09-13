const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    next();
  };
};

// Check if user can edit (Admin or Partner)
exports.canEdit = (req, res, next) => {
  if (!['Admin', 'Partner'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to edit this resource'
    });
  }
  next();
};

// Check if user can view (all roles)
exports.canView = (req, res, next) => {
  if (!['Admin', 'Partner', 'Customer'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this resource'
    });
  }
  next();
};