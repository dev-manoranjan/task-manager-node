const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const { JWT_SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log(decoded);
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      throw new Error("Invalid token");
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = auth;
