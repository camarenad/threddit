var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/users',userCtrl.index)

// router.post('/',userCtrl.createUser);



module.exports = router;
