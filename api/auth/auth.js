const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');

router.post('/login', controller.login);
router.get('/check', controller.check);

module.exports = router;