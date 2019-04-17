const File = require('../../models/File');
const fs = require('fs');
const multer = require('multer');


exports.fileUpload = (req, res) =>{
	
	const fileObj = req.file;
	console.log(fileObj);
	return res.send('업로드 성공');
};
