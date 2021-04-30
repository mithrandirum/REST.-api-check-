const express = require("express");
require("dotenv").config();
const connect = require("./utils/connection");
const app = express();
const colors = require("colors");
const authRoute = require("./routes/auth");

connect();

app.use(express.json());

app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`server listenning on port ${process.env.PORT}`.bold.yellow);
});
