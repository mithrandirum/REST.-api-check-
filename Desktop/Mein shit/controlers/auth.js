const User = require("../models/User");

//@register user
//@ public
//@ auth/register
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

//@get all users
//@ public
//@ auth/users

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).json([{ msg: "no users" }]);
    }

    res.status(200).json({ users, succsess: true });
  } catch (error) {
    res.status(500).json([{ error: error.message }]);
  }
};

//@login user
//@ public
//@ auth/login

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json([{ msg: "please fill out all fields" }]);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json([{ msg: "wrong credentials" }]);
    }

    const ismatch = await user.comparePassword(password);

    if (!ismatch) {
      res.json([{ msg: "wrong credentials" }]);
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json([{ msg: error.message }]);
  }
};

//@get single user
//@ private
//@ auth/users/me

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id }).select("-password");

    if (!user) {
      return res.status(401).json([{ msg: "unauthorized" }]);
    }

    res.status(200).json([{ data: user, success: true }]);
  } catch (error) {
    console.error(error);
    res.status(500).json([{ msg: error.message }]);
  }
};

//@update user
//@ private
//@ auth/users/update/:id

exports.updateUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (req.params.id !== req.user._id.toString()) {
      return res
        .status(401)
        .json([{ msg: "user unauthorized to commit this action" }]);
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { email, password },
      { runValidators: true, new: true }
    );

    if (!updateUser) {
      return res
        .status(500)
        .json([{ msg: "something happened while updating the user" }]);
    }

    await updateUser.save();

    res.status(200).json({ data: updateUser, success: true });
  } catch (error) {
    res.status(500).json([{ msg: error.message }]);
  }
};

//admin
