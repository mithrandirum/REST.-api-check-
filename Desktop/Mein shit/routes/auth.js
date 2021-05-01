const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();
const { register, getUsers, login, getUser } = require("../controlers/auth");

router.route("/register").post(register);
router.route("/users").get(getUsers);
router.route("/login").post(auth, login);
router.route("/users/me").get(auth, getUser);
module.exports = router;
