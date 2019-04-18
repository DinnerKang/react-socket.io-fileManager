const Files = require('../../models/File');
const fs = require('fs');
const unzipper = require('unzipper');
const stream = require('stream');

let dirTree = require("directory-tree");
let tree;

function getTree(user){
	tree = dirTree(`upload/${user}/`);
	console.log('tree', tree);
	return tree;
}

function unzipFunc(fileObj, user){
		return new Promise( function(resolve, reject){
			fs.createReadStream(fileObj.path).pipe(unzipper.Extract({ path: `upload/${user}/${fileObj.uploadedFile.name}` }))
				.on('close', function(){
					resolve('close');
				});
	});
}


exports.fileUpload = (req, res) =>{
	
	const fileObj = req.file;
	const user = req.body.user;
	console.log(fileObj);
	console.log(user);
	
	
	
	unzipFunc(fileObj, user).then(
		result=>{
			console.log('res');
			console.log(result);
			let path =  getTree(user);
			return res.status(200).json({
				path : path
			});
		},
		err=>{
			return res.status(500).json({
				'err' : err

			});
		}
	);
};

exports.filePath = (req, res) =>{
	const user = req.params.id;
	let path = getTree(user);
	console.log(path);
	if(path){
		return res.status(200).json({
		'path' : path,
		});
	}else{
		return res.status(500).json({
		'path' : 'null',
		});
	}
	
};