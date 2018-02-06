var express = require('express');
var router = express.Router();
let verifyToken = require('../middlewares/verifyToken');

router.use('/user',require('./user'));
router.use('/froala',require('./froala'));
router.use('/file',require('./file'));
router.use('/post',require('./post'));
router.use('/tags', verifyToken, require('./tags'));
router.use('/protect', verifyToken, require('./protected'));

module.exports = router;
