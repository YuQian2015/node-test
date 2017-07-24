var express = require('express');
var router = express.Router();
let verifyToken = require('../middlewares/verifyToken');

router.use('/api/user',require('./user'));
router.use('/api/file',require('./file'));
router.use('/api/protect', verifyToken, require('./protected'));

module.exports = router;
