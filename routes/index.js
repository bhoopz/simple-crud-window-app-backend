var express = require('express');
var router = express.Router();
const {displayIndex, deleteRecord, editRecord} = require('../controllers/indexController');

/* GET home page. */
router.route('/').get(displayIndex);
router.route('/window/:id').delete(deleteRecord).put(editRecord);



module.exports = router;
