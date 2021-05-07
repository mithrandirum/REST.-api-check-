const User = require("../models/User");

//@register user
//@ public
//@ auth/register
exports.register = async (req, res) => {
  const { email, password, psuedo } = req.body;

  const result = validateEmail(email);
  console.log(result);

  try {
    if (!result) {
      return res.status(400).send("please fill a valid email");
    }

    if (password.length < 6) {
      return res.status(400).send("min length 6");
    }

    const match = await User.findOne({ email });
    if (match) {
      return res.status(400).send("a user with that email already exist");
    }

    const user = new User({
      email,
      password,
      psuedo,
    });

    const newUser = await user.save();

    const token = newUser.signJwtToken();

    res.json({ token });
  } catch (err) {
    err.status(500).send("server error");
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

  const result = validateEmail(email);

  if (!result) return res.status(400).send("please enter a valid email");

  if (password.length < 6)
    return res.status(400).send("password minlength is 6");

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("user not found");
    }

    const ismatch = await user.comparePassword(password);

    if (!ismatch) {
      return res.status(401).send("wrong credentials");
    }
    const token = user.signJwtToken();

    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).send("server error");
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

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json([{ msg: error.message }]);
  }
};

//@update user
//@ private
//@ auth/users/update/:id

exports.updateUser = async (req, res) => {
  const { email, password, psuedo } = req.body;

  console.log(req);

  try {
    if (
      req.params.id !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json([{ msg: "user unauthorized to commit this action" }]);
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { email, password, psuedo },
      { runValidators: true, new: true }
    );

    if (!updateUser) {
      return res
        .status(500)
        .json([{ msg: "something happened while updating the user" }]);
    }

    const user = await updateUser.save();

    const token = user.signJwtToken();

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json([{ msg: error.message }]);
  }
};

//delete user
//@admin auth/users/delete/:id
//private

exports.deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      res.status(401).json([{ msg: "unauthorized" }]);
    }

    const removed = await User.findByIdAndDelete({ _id: req.params.id });

    if (!removed) {
      return res.status(500).json([{ msg: "server erorr" }]);
    }

    return res.status(200).json([{ data: {}, succsess: true }]);
  } catch (error) {
    res.status(500).json([{ msg: "server error" }]);
  }
};

//validate email
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
