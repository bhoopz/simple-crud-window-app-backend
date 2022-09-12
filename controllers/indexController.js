const Window = require("../models/window");
const User = require("../models/user");
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

module.exports = {
  displayIndex,
  deleteRecord,
  editRecord,
  addRecord,
};
