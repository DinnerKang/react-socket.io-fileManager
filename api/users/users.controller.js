const User = require('../../models/User');



// 사용자 전체 리스트
exports.showAll = (req, res) =>{
	User.find( {}, function(err, docs){
		if(err) return res.status(500).send('User 조회 실패');
		res.status(200).send(docs);
	});
};

// 사용자 추가
exports.register = (req, res) =>{
	User.create({
		id: req.body.id,
		password : req.body.password
	},
	function(err, docs){
		if(err) return res.status(500).send('User 생성 실패');
		res.status(200).send(docs);
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

