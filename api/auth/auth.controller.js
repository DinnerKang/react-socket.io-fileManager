const User = require('../../models/User');
const crypto = require('crypto');
const secret = require('../../config').KEY.secret;
const jwt = require('jsonwebtoken');
const jwt_secret = 'DinnerKang';

// 로그인
exports.login = (req, res) =>{
	
	
	const hash = crypto.createHmac('sha256', secret)
        .update(req.body.password)
        .digest('base64');
	
	User.find({ id: req.body.id, password: hash }, function(err, docs){
		if(err) return res.status(500).send('User 로그인 실패');
		
		
		if(docs.length){
			const getToken = new Promise( (resolve, reject)=>{
				jwt.sign({
					id: req.body.id,
				},
				jwt_secret,{
					expiresIn: '7d',
          	   	    issuer: 'Dinner',
            	    subject: 'userInfo'
				},(err, token) => {
           		    if (err) reject(err);
            	    resolve(token);
              });
			});
			getToken.then(
				token =>{
					return res.status(200).json({
						'status' : 200,
						'msg' : '로그인 성공',
						token
					});
				}
			);
			
		}else{
			return res.status(500).send('로그인 실패'); 
		}
	});
};

exports.check = (req, res)=> {
	const token = req.headers['x-access-token'] || req.query.token;
	
	if (!token) {
      res.status(400).json({
        'status': 400,
        'msg': 'Token 없음'
      });
    }
	
    const checkToken = new Promise((resolve, reject) => {
      jwt.verify(token, jwt_secret, function (err, decoded) {
        if (err) reject(err);
        resolve(decoded);
      });
    });
	
    checkToken.then(
      token => {
        res.status(200).json({
          'status': 200,
          'msg': '사용자 인증 성공',
        });
      }
    )	;
	
};


