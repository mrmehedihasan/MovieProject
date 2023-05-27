const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validatePassword } = require("../helper/passwordvalidator.helper");
const { User } = require("../model/User");

async function userSignup(req, res) {
  console.log(req.body);
  const { username, fullname, password, passwordRep, email } = req.body;
  if (username === null || username === undefined || username === "") {
    res.status(400).json({ message: "Username is required" });
    return;
  }
  if (email === null || email === undefined || email === "") {
    res.status(400).json({ message: "Email is required" });
    return;
  }
  if (password === null || password === undefined || password === "") {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  if (password !== passwordRep) {
    res.status(400).json({ message: "Passwords don't match" });
    return;
  }
  if (!req.file) {
    res.status(400).json({ message: "Image is required" });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).json({
      message:
        "Must use one uppercase, one lowercase, one number and one special character",
    });
    return;
  }

  const checkOldUsernameAnsPassword = await User.find({
    $or: [{ username: username }, { email: email }],
  });

  if (checkOldUsernameAnsPassword.length > 0) {
    res.status(400).json({ message: "User/Email already exists" });
    return;
  }

  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);
  const imageUrl = `${req.protocol}://${req.get("host")}/${req.file.filename}`;
  try {
    const user = new User({
      username,
      fullname,
      password: hashedPassword,
      email,
      salt,
      role: "user",
      profilePhoto: imageUrl,
    });

    await user.save();
    res.status(201).json({ message: "User created. Please login to continue" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
async function adminSignup(req, res) {
  const { username, fullname, password, passwordRep, email } = req.body;
  if (username === null || username === undefined || username === "") {
    res.status(400).json({ message: "Username is required" });
    return;
  }
  if (email === null || email === undefined || email === "") {
    res.status(400).json({ message: "Email is required" });
    return;
  }
  if (password === null || password === undefined || password === "") {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  if (password !== passwordRep) {
    res.status(400).json({ message: "Passwords don't match" });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).json({
      message:
        "Must use one uppercase, one lowercase, one number and one special character",
    });
    return;
  }
  if (!req.file) {
    res.status(400).json({ message: "Profile photo is required" });
    return;
  }

  const checkOldUsernameAnsPassword = await User.find({
    $or: [{ username: username }, { email: email }],
  });

  if (checkOldUsernameAnsPassword.length > 0) {
    res.status(400).json({ message: "User/Email already exists" });
    return;
  }

  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);
  const photourl = `${req.protocol}://${req.get("host")}/${req.file.filename} `;
  try {
    const user = new User({
      username,
      fullname,
      password: hashedPassword,
      email,
      salt,
      role: "admin",
      profilePhoto: photourl,
    });

    await user.save();
    res.status(201).json({ message: "User created. Please login to continue" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { userSignup, adminSignup };
