const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

router.get('/', controller.showAll);
router.post('/', controller.register);
router.delete('/:id', controller.destroy);


module.exports = router;