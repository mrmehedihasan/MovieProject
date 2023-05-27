const { makeid } = require("./universal.helper");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "photos");
  },
  filename: function (req, file, cb) {
    cb(null, makeid(10) + "_" + file.originalname);
  },
});

const uploadMiddleWare = multer({ storage: storage });

module.exports = { uploadMiddleWare };
