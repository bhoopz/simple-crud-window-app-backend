const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

const register = async (req, res) => {
  const userExist = await User.find({ username: req.body.username });
  if (userExist.length > 0)
    return res.status(400).send({ message: "User already exists" });
  const emailExist = await User.find({ email: req.body.email });
  if (emailExist.length > 0)
    return res.status(400).send({ message: "Email is already in use" });

  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({ error: err });
    }

    let user = new User({
      username: req.body.username,
      password: hashedPass,
      email: req.body.email,
      admin: req.body.admin,
    });
    user
      .save()
      .then(() => res.status(200).send("Successfully registered"))
      .catch((error) => res.status(500).send(error));
  });
};

const login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(401)
      .send({ message: "Incorrect username or password", isLogged: false });
  }

  if (await bcrypt.compare(password, user.password)) {
    return res.status(200).json({ isLogged: true, isAdmin: user.admin });
  } else {
    return res
      .status(401)
      .send({ message: "Incorrect username or password", isLogged: false });
  }
};

module.exports = { register, login };
