const express = require('express');
const controller = require('./file.controller');
const router = express.Router();


const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
      cb(null, 'upload/');
    },

    // 서버에 저장할 파일 명
    filename: function (req, file, cb) {
		console.log(file);
      file.uploadedFile = {
        name: file.originalname.split('.')[0],
        ext: file.originalname.split('.')[1]
      };
      cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
    }
});
const upload = multer({ storage: storage});



router.post('/', upload.single('myFile'), controller.fileUpload);
router.get('/', controller.test);


module.exports = router;