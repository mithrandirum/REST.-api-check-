const express = require("express");
const {
  uploadImage,
  createProfile,
  deleteProfile,
  getProfiles,
  updateProfile,
  getUserProfile,
} = require("../controlers/profile");
const auth = require("../middleware/auth");

const router = express.Router();

router.route("/image").post(auth, uploadImage);
router.route("/create").post(auth, createProfile);
router.route("/delete/:profileId").delete(auth, deleteProfile);
router.route("/update").put(auth, updateProfile);
router.route("/profiles").get(getProfiles);
router.route("/me").get(auth, getUserProfile);

module.exports = router;
