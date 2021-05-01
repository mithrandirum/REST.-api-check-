const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();
const {
  register,
  getUsers,
  login,
  getUser,
  updateUser,
} = require("../controlers/auth");

router.route("/register").post(register);
router.route("/users").get(getUsers);
router.route("/login").post(login);
router.route("/users/me").get(auth, getUser);
router.route("/users/update/:id").put(auth, updateUser);
module.exports = router;
