var express = require('express');
var router = express.Router();
let verifyToken = require('../middlewares/verifyToken');

router.use('/user',require('./user'));
router.use('/file',require('./file'));
router.use('/post',require('./post'));
router.use('/protect', verifyToken, require('./protected'));

module.exports = router;
