const jwt = require('jsonwebtoken');
const User = require('../models/User');

console.log("✅ auth middleware file loaded");

const protect = async (req, res, next) => {
  console.log("🔥 protect middleware HIT");

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      return next(); // ✅ MUST return
    } catch (error) {
      console.error("JWT ERROR:", error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 🔴 No token provided
  return res.status(401).json({ message: 'Not authorized, no token' });
};

module.exports = { protect };
