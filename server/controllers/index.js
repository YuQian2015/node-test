var express = require('express');
var router = express.Router();
let verifyToken = require('../middlewares/verifyToken');

router.use('/user',require('./user'));
router.use('/protected', verifyToken, require('./protected'));

module.exports = router;
