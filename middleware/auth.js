const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
