const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
      .then(() => res.status(201).send("Successfully registered"))
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
    const accessToken = jwt.sign({ user }, process.env.JWT_SECRET);

    return res
      .status(200)
      .json({ isLogged: true, isAdmin: user.admin, accessToken: accessToken });
  } else {
    return res
      .status(401)
      .send({ message: "Incorrect username or password", isLogged: false });
  }
};

const authenticateToken = (req, res, next) => {
  var token = req.headers.authorization.split(" ")[1];

  if (token == null) res.status(401);
  console.log(token);
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) res.status(403);
    req.user = user;
    console.log(user);
    if (req.user) next();
    else res.status(403).send("Token required");
  });
};

module.exports = { register, login, authenticateToken };
