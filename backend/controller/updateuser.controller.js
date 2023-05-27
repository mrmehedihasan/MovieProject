const { User } = require("./../model/User");
const bycrypt = require("bcrypt");
const { validatePassword } = require("./../helper/passwordvalidator.helper");

async function updateUserData(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    const salt = user.salt;

    const newName =
      req.body.fullname === "" ? user.fullname : req.body.fullname;

    const newPassword =
      req.body.password === ""
        ? user.password
        : await bycrypt.hash(req.body.password, salt);

    const newEmail = req.body.email === "" ? user.email : req.body.email;
    const newProfilePhotoUrl = !req.file
      ? user.profilePhoto
      : `${req.protocol}://${req.get("host")}/${req.file.filename}`;
    const newUserData = {
      fullname: newName,
      password: newPassword,
      email: newEmail,
      profilePhoto: newProfilePhotoUrl,
    };

    const resp = await User.findByIdAndUpdate(id, newUserData);

    const userdata = {
      id: resp._id,
      username: user.username,
      fullname: newUserData.fullname,
      email: newUserData.email,
      role: user.role,
      profile: newProfilePhotoUrl,
    };

    return res
      .status(200)
      .json({ message: "Updated Successfully", user: userdata });
  } catch (err) {
    res.status(500).json({ message: err.codeName });
  }
}

module.exports = { updateUserData };
