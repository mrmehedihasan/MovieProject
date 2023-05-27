const { User } = require("../model/User");

const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");
const { validatePassword } = require("../helper/passwordvalidator.helper");

/**
 * Authenticates the token provided in the request headers and sets the decoded
 * payload as the user property of the request object.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @return {void}
 */

const authenticateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  next();
};
const authenticateTokenAdmin = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "Invalid token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Invalid token" });
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;

    const user = await User.findById(req.user.id);
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ msg: "You are not authorized to do this operation" });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Invalid token" });
  }
  next();
};

async function verifyToken(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    res.status(200).json(req.user);
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
}
module.exports = {
  authenticateToken,
  verifyToken,
  authenticateTokenAdmin,
};
