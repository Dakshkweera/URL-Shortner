const controller = require('../controller/url');
const express = require('express');
const router = express.Router();
const authorizeadmin = require('../middleware/authorize');

router.post('/',controller.createUrl);
router.get('/analy/:shortid',authorizeadmin, controller.gethistory);
router.get('/:shortid', controller.geturl);


module.exports = router;