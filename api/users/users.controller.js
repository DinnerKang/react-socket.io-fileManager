const User = require('../../models/User');
const crypto = require('crypto');
const secret = require('../../config').KEY.secret;


// 사용자 전체 리스트
exports.showAll = (req, res) =>{
	User.find( {}, function(err, docs){
		if(err) return res.status(500).send('User 조회 실패');
		let users =[];
		console.log(docs[0]);
		for(let i=0, len=docs.length; i< len; i++){
			users.push(docs[i].id);
		}
		
		res.status(200).send(users);
	});
	
};

// 사용자 추가
exports.register = (req, res) =>{
	const hash = crypto.createHmac('sha256', secret)
        .update(req.body.password)
        .digest('base64');
	
	User.find({ id: req.body.id }, function(err, docs){
		
		if(docs.length){
			 return res.status(501).json({
				 'msg' : 'ID 중복'
			 });
		}else{
			User.create({
				id: req.body.id,
				password : hash
			},
			function(err, docs){
				if(err) return res.status(500).send('User 생성 실패');
				res.status(200).send(docs);
			});
		}
	});
};


// 사용자 삭제
exports.destroy = (req, res) =>{
	console.log(req.params.id);
	User.deleteOne({id:req.params.id}, function(err, docs){
		if(err) return res.status(500).send('User 삭제 실패');
		res.status(200).send('삭제 완료');
	});
};

