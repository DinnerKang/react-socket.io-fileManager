const express = require('express');
const controller = require('./file.controller');
const router = express.Router();


const multer = require('multer');
const upload = multer({ dest: `upload/`});



router.post('/', upload.single('myFile'), controller.fileUpload);



module.exports = router;