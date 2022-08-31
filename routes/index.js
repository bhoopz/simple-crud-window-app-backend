var express = require('express');
const { route } = require('../app');
var router = express.Router();
const {displayIndex, deleteRecord, editRecord, addRecord, register, login, ifLogged} = require('../controllers/indexController');

/* GET home page. */
router.route('/').get(displayIndex);
router.route('/window/:id').delete(deleteRecord).put(editRecord);
router.route('/window/add').post(addRecord);
router.route('/register').post(register);
router.route('/login').post(login).get(ifLogged);


module.exports = router;
