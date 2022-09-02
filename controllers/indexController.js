const Window = require("../models/window");
const User = require("../models/user");
const bcrypt = require("bcrypt");
require("dotenv").config();

const displayIndex = async (req, res) => {
  const { q } = req.query;
  const keys = ["type", "size", "material", "color", "price"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some(
        (key) =>
          item[key].toLowerCase().includes(q) ||
          item[key].toUpperCase().includes(q) ||
          item[key].includes(q)
      )
    );
  };

  await Window.find()
    .then((result) => {
      res.status(200).json(search(result));
    })
    .catch((error) => res.status(500).send(error));
};

const deleteRecord = async (req, res) => {
  await Window.deleteOne({ _id: req.params.id })
    .then(() => res.status(204).send())
    .catch((error) => res.status(404).send(error));
};

const editRecord = async (req, res) => {
  await Window.findById(req.params.id, function (err) {
    if (err) {
      res.status(404).send({ message: "Window does not exist" });
    }
  })
    .clone()
    .catch(function (err) {
      console.log(err);
    });

  const updatedWindow = req.body;
  await Window.findOneAndUpdate({ _id: req.params.id }, updatedWindow)
    .then(() => res.status(200).json(updatedWindow))
    .catch((error) => res.status(500).send(error));
};

const addRecord = async (req, res) => {
  const newWindow = req.body;
  const window = new Window(newWindow);
  await window
    .save()
    .then(() => res.status(201).send(window))
    .catch((error) => res.status(500).send(error));
};

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

module.exports = {
  displayIndex,
  deleteRecord,
  editRecord,
  addRecord,
  register,
  login,
};
