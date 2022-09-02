var express = require("express");
var router = express.Router();
const {
  displayIndex,
  deleteRecord,
  editRecord,
  addRecord,
  register,
  login,
} = require("../controllers/indexController");

/* GET home page. */
router.route("/").get(displayIndex);
router.route("/windows/:id").delete(deleteRecord).put(editRecord);
router.route("/windows/add").post(addRecord);
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
