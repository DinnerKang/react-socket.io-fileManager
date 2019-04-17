const Files = require('../../models/File');
const fs = require('fs');
const unzip = require('unzip');


let dirTree = require("directory-tree");
let tree;

function getTree(user){
	tree = dirTree(`upload/${user}/`);
	return tree;
}


exports.fileUpload = (req, res) =>{
	
	const fileObj = req.file;
	const user = req.body.user;
	console.log(fileObj);
	console.log(user);
	
	fs.createReadStream(fileObj.path).pipe(unzip.Extract({ path: `upload/${user}/${fileObj.uploadedFile.name}` }));
	return res.send('파일 Event 성공');
};

exports.filePath = (req, res) =>{
	const user = req.params.id;
	let path = getTree(user);
	console.log(path);
	return res.status(200).json({
		'path' : path,
	});
};