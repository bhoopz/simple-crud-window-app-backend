var express = require("express");
var router = express.Router();
const {
  displayIndex,
  deleteRecord,
  editRecord,
  addRecord,
} = require("../controllers/windowController");

/* GET home page. */
router.route("/").get(displayIndex);
router.route("/windows/:id").delete(deleteRecord).put(editRecord);
router.route("/windows").post(addRecord);

module.exports = router;
