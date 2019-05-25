const Files = require('../../models/File');
const fs = require('fs');
const unzip = require('node-unzip-2');
const tar = require('tar');

let dirTree = require("directory-tree");
let tree;

function getTree(user){
	tree = dirTree(`upload/${user}/`);
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


exports.fileUpload = async (req, res) =>{
	
	const fileObj = req.file;
	const user = req.body.user;
	
	if(fileObj.uploadedFile.ext === 'zip'){
		try{
			const unzipResult = await unzipFunc(fileObj, user);
			const path = await getTree(user);
			return res.status(200).json({
							path : path
					});
		}catch(e){
			return res.status(500).json({
						'err' : e
					});
		}
	}else{
		try{
			const unzipResult = await untarFunc(fileObj, user);
			const path = await getTree(user);
			return res.status(200).json({
							path : path
					});
		}catch(e){
			return res.status(500).json({
						'err' : e
					});
		}
	}
	
};

exports.filePath = (req, res) =>{
	const user = req.params.id;
	let path = getTree(user);
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
	fs.readFile(path, 'utf8', function(err, data){
		if(err) return res.status(500).send('Read Error');
		return res.status(200).send(JSON.stringify(data));
	});
};

exports.fileSave = (req, res) =>{
	const path = req.body.path;
	const data = req.body.data;
	fs.writeFile(path, data, 'utf8', function(err){
		if(err) return res.status(500).send('Write Error');
		return res.send('성공');
	});
};
