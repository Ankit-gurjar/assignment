const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min in milliseconds
  max: 30,
  message: "You have exceeded the 30 requests in 1 min limit!",
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = rateLimiter;
