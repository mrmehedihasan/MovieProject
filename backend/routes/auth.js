const express = require("express");
const router = express.Router();
const { userSignup, adminSignup } = require("../controller/signup.controller");
const { userLogin } = require("../controller/login.controller");
const {
  authenticateToken,
  verifyToken,
} = require("./../controller/auth.controller");
const { updateUserData } = require("./../controller/updateuser.controller");
const { uploadMiddleWare } = require("../helper/upload.helper");
router.get("/signup", (req, res) => {
  res.json("signup");
});

router.post("/signup", uploadMiddleWare.single("photo"), userSignup);
router.post("/admin-signup", uploadMiddleWare.single("photo"), adminSignup);

router.post("/login", userLogin);

router.get("/verify", verifyToken);
router.post(
  "/updateuser",
  authenticateToken,
  uploadMiddleWare.single("photo"),
  updateUserData
);
module.exports = router;
