const Files = require('../../models/File');
const fs = require('fs');
const unzip = require('unzip');


let dirTree = require("directory-tree");
let tree;

exports.fileUpload = (req, res) =>{
	
	const fileObj = req.file;
	const user = req.body.user;
	console.log(fileObj);
	
	fs.createReadStream(fileObj.path)
		.pipe(unzip.Parse())
		.on('entry', function (entry) {
			var fileName = entry.path;
			var type = entry.type; // 'Directory' or 'File'
			var size = entry.size;
			if (fileName === "this IS the file I'm looking for") {
			  entry.pipe(fs.createWriteStream(`upload/${user}/${fileObj.uploadedFile.name}`));
			} else {
			  entry.autodrain();
			}
		  	})
		.on('close', function(){
			tree = dirTree(`upload/${user}/${fileObj.uploadedFile.name}`);
			console.log(tree);
			return res.status(200).json({
				'path' : tree
			});
	});
};

exports.filePath = (req, res) =>{
	
	
	
	return res.status(200).json({
		'msg' : '성공',
		
	});
};