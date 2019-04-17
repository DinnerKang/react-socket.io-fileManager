const Files = require('../../models/File');
const fs = require('fs');
const unzip = require('unzip');

exports.fileUpload = (req, res) =>{
	
	const fileObj = req.file;
	const user = req.body.user;
	
	fs.createReadStream(fileObj.path).pipe(unzip.Extract({ path: `upload/${fileObj.originalname.split('.')[0]}` }));
		
	return res.status(200).send('업로드 성공');
};

exports.test = (req, res) =>{
	
	
	
	return res.send('업로드 성공');
};