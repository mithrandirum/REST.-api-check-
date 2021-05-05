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

    // Create custom filename
    file.name = `photo_${req.user._id}${path.parse(file.name).ext}`;

    file.mv(`${__dirname}/downloads/image/${file.name}`, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ errors: ["failed to add image"] });
      }

      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile)
        res.status(404).json({ errors: ["user does not have a profile yet"] });

      const updated = await Profile.findOneAndUpdate(
        { user: profile.user },
        { image: file.name }
      );

      res.status(200).json({
        success: true,
        data: file.name,
        updated,
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
    return res.status(400).json({ errors: ["user already has a profile"] });

  try {
    const profile = await new Profile({
      description,
      social,
      user: req.user._id,
    });

    const createdProfile = await profile.save();

    res.json(createdProfile);
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

    res.status(400).json({ data: {}, success: true });
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

    res.status(200).json({ profiles });
  } catch (error) {
    res.status(500).json(error);
  }
};

//update a profile by id
