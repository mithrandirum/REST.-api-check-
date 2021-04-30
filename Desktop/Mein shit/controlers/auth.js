const User = require("../models/User");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const match = await User.findOne({ email });
    if (match) {
      return res
        .status(400)
        .json([{ msg: "a user with that email already exist" }]);
    }

    const user = new User({
      email,
      password,
    });

    const newUser = await user.save();

    const token = newUser.signJwtToken();
    // console.log(newUser.methods.signJwtToken);

    res.json({ newUser, token });
  } catch (err) {
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ errors: message });
    }
  }
};
