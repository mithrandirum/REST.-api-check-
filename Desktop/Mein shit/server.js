const express = require("express");
require("dotenv").config();
const connect = require("./utils/connection");
const app = express();
const colors = require("colors");
const authRoute = require("./routes/auth");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const profileRoute = require("./routes/profileRoute");

connect();

app.use(express.json());
app.use(fileUpload());
app.use(cors());

app.use("/auth", authRoute);
app.use("/profile", profileRoute);

process.on("uncaughtException", function (err) {
  console.log(err);
});

app.listen(process.env.PORT, () => {
  console.log(`server listenning on port ${process.env.PORT}`.bold.yellow);
});
