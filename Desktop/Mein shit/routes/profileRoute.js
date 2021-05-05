const express = require("express");
const {
  uploadImage,
  createProfile,
  deleteProfile,
  getProfiles,
  updateProfile,
} = require("../controlers/profile");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/image").post(auth, uploadImage);
router.route("/create").post(auth, createProfile);
router.route("/delete/:profileId").delete(auth, deleteProfile);
//router.route("/update/:profileId").put(auth, updateProfile);
router.route("/profiles").get(getProfiles);

module.exports = router;
