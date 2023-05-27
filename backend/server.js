const express = require("express");
const mongoose = require("mongoose");
const api = require("./routes/api");
const auth = require("./routes/auth");
const cors = require("cors");
const { DB_URI } = require("./config/config");
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api", api);
app.use("/auth", auth);
app.use(express.static("photos"));

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
