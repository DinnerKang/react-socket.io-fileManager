module.exports = (server) =>{
	const User = require('./models/User');
	const Chat = require('./models/Chat');
	const io = require('socket.io').listen(server);
	let login_ids = {};
	

	io.sockets.on('connection', (socket)=>{
		// 채팅 최근순 50개 제한
		socket.on('login', function(data){
			if(data.user_id != null){
				console.log(data.user_id,'님이 입장');
				login_ids[data.user_id] = socket.id;
				io.sockets.emit('now_user', login_ids);
				
				User.find({}, {_id:0, id :1}, function(err, docs){
						io.sockets.emit('login', docs);
				});
				Chat.find({recepient : 'ALL'}, {_id:0}, function(err, docs){
					io.sockets.emit('all_msg', docs);
				}).sort({"created": -1}).limit(50);
			}
		});


		socket.on('message', function(data) {
			let now_date = new Date();
			Chat.create({
				sender: data.sender,
				recepient : data.recepient,
				message : data.message,
				created: now_date
			});
			if(data.recepient === 'ALL'){
				io.sockets.emit('new_all_msg', data);
			}else{
				io.sockets.to(login_ids[data.recepient]).emit('new_whisper', data);
				io.sockets.to(login_ids[data.sender]).emit('new_whisper', data);
			}
		});


		socket.on('whisper_msg', function(data){
			Chat.find( {$or:[{sender: data.sender,recepient : data.recepient},{sender: data.recepient,recepient : data.sender}]}, {_id:0}, function(err, docs){
				io.sockets.to(login_ids[data.recepient]).emit('whisper', docs);
			}).sort({"created": -1}).limit(50);
		});

		socket.on('logout', function(data){
			if(data.user_id != null){
					console.log(data.user_id,'님이 퇴장');
					delete login_ids[data.user_id];
					io.sockets.emit('logout', login_ids);
				
			}
		});
	});
	return io;
};




