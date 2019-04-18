const Files = require('../../models/File');
const fs = require('fs');
const unzip = require('node-unzip-2');
const tar = require('tar');

let dirTree = require("directory-tree");
let tree;

function getTree(user){
	tree = dirTree(`upload/${user}/`);
	console.log('tree', tree);
	return tree;
}

function unzipFunc(fileObj, user){
		return new Promise( function(resolve, reject){
			fs.mkdir(`upload/${user}`, function(){
				fs.createReadStream(fileObj.path).pipe(unzip.Extract({ path: `upload/${user}/` }))
				.on('close', function(){
					fs.unlink(fileObj.path);
					resolve('close');
				});
			});
			
	});
}
function untarFunc(fileObj, user){
	return new Promise( function (resolve, reject){
		let user_id = user;
		fs.mkdir(`upload/${user_id}`, function(){
			console.log('폴더 생성 완료');
			tar.x(
			{	cwd : `upload/${user_id}`,
				file: fileObj.path,
			}).then( res=> {
				console.log(fileObj.path);
				fs.unlink(fileObj.path);
				resolve('resolve');
			});
		});
	});
}

exports.fileUpload = (req, res) =>{
	
	const fileObj = req.file;
	const user = req.body.user;
	console.log(fileObj);
	console.log(user);
	if(fileObj.uploadedFile.ext === 'zip'){
		console.log('zip');
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
	}else{
		console.log('tar');
		untarFunc(fileObj, user).then(
				result=>{
					console.log('tar res');
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
	}
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
		return res.status(300).json({
		'path' : 'null',
		});
	}
};

exports.fileInfo = (req, res) =>{
	const path = req.body.path;
	console.log(path);
	fs.readFile(path, 'utf8', function(err, data){
		if(err) return res.status(500).send('Read Error');
		return res.status(200).send(JSON.stringify(data));
	});
	
};
