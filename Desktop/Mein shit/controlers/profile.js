const path = require("path");
const Profile = require("../models/Profile");
const normalize = require("normalize-url");

exports.uploadImage = async (req, res) => {
  try {
    // Make sure the image is a photo
    if (
      !req.files ||
      !req.files.file ||
      !req.files.file.mimetype.startsWith("image")
    ) {
      return res.status(400).json({ errors: ["please upload an image file"] });
    }
    const file = req.files.file;
    console.log(req);

    console.log("image route is hit");
    // Create custom filename
    file.name = `photo_${req.user._id}${path.parse(file.name).ext}`;

    file.mv(`${__dirname}/../client/public/image/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ errors: ["failed to add image"] });
      }

      const fprofile = await Profile.findOne({ user: req.user.id });

      if (!fprofile)
        res.status(404).json({ errors: ["user does not have a profile yet"] });

      const profile = await Profile.findOneAndUpdate(
        { user: fprofile.user },
        { image: file.name }
      );

      await profile.save();

      res.status(200).json({
        profile,
      });
    });
  } catch (error) {
    console.error(error);
  }
};

exports.createProfile = async (req, res) => {
  const { description, facebook, instagram, youtube } = req.body;

  const social = {
    facebook,
    instagram,
    youtube,
  };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(social)) {
    if (value && value.length > 0)
      social[key] = normalize(value, { forceHttps: true });
  }

  const hasProfile = await Profile.findOne({ user: req.user.id });

  if (hasProfile)
    return res.status(403).json({ errors: ["user already has a profile"] });

  try {
    const mprofile = await new Profile({
      description,
      social,
      user: req.user._id,
    });

    const profile = await mprofile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: ["server error"] });
  }
};

exports.deleteProfile = async (req, res) => {
  const profileId = req.params.profileId;

  try {
    console.log(req.params.profileId);
    const profile = await Profile.findById({ _id: profileId });
    //console.log(profile);

    if (!profile)
      return res.status(404).json({ errors: ["profile does not exist"] });

    if (profile.user.toString() !== req.user.id && req.user.role !== "admin") {
      console.log(profile.user, req.user.id);
      return res.status(401).json({ errors: ["unaithorized"] });
    }

    await Profile.findByIdAndDelete({ _id: profileId });

    res.status(200).json({ data: {}, success: true });
  } catch (error) {
    res.status(500).json();
  }
};

//get all Profiles

exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate({
      path: "user",
      select: "psuedo",
    });

    if (!profiles) {
      return res.status(404).json({ errors: ["no profiles found"] });
    }

    res.status(200).json(profiles);

    console.log("fires");
  } catch (error) {
    res.status(500).json(error);
  }
};

//profile/me
// get current user profile once loged in

exports.getUserProfile = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate({
    path: "user",
    select: "psuedo",
  });

  if (!profile) {
    return res.status(404).json({ errors: ["profile not found"] });
  }

  console.log(profile);
  res.status(200).json(profile);
};

//edit profile

exports.updateProfile = async (req, res) => {
  const { description, facebook, instagram, youtube } = req.body;

  const social = {
    facebook,
    instagram,
    youtube,
  };

  // normalize social fields to ensure valid url
  for (const [key, value] of Object.entries(social)) {
    if (value && value.length > 0)
      social[key] = normalize(value, { forceHttps: true });
  }

  try {
    const pro = await Profile.findOne({ user: req.user.id });

    if (!pro) return res.status(404).send("user does not have a profile");

    const obj = {
      description,
      social: {
        facebook,
        instagram,
        youtube,
      },
    };

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: pro.user },
      obj,
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(500).send("an error occured during updating");
    }

    await updatedProfile.save();

    res.json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
};
