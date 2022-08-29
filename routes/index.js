var express = require('express');
var router = express.Router();
const {getWindows, displayIndex} = require('../controllers/indexController');

/* GET home page. */
router.route('/').get(displayIndex);
router.route('/dashboard').get(getWindows);



module.exports = router;
