const { User } = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, EXPIRES_IN } = require("../config/config");

async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters" });
  }

  const user = await User.find({
    $or: [{ email: email }, { username: email }],
  });

  if (user.length === 0) {
    res.status(400).json({ msg: "Invalid credentials" });
    return;
  }
  if (user && (await bcrypt.compare(password, user[0].password))) {
    const token = jwt.sign({ id: user[0]._id }, SECRET_KEY, {
      expiresIn: EXPIRES_IN,
    });

    res.status(200).json({
      token,
      user: {
        id: user[0]._id,
        username: user[0].username,
        email: user[0].email,
        fullname: user[0].fullname,
        role: user[0].role,
        profile: user[0].profilePhoto,
      },
    });
  } else {
    res.status(400).json({ msg: "Invalid credentials" });
  }
}

module.exports = { userLogin };
