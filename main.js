const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serveStatic = require('serve-static');
const path = require('path');
const socketio = require('socket.io');


const User = require('./models/User');
const Chat = require('./models/Chat');

// 집
//const databaseUrl = 'mongodb://127.0.0.1:27017/local';
// 구름 IDE
const databaseUrl = 'mongodb://14.38.25.223:27017/local';
let database;


const app = express();
const port = 5000;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use('/upload', serveStatic(path.join(__dirname, 'upload')));



function connectDB(){
	mongoose.Promise = global.Promise;
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
	database.on('error', function(){
		console.log('데이터베이스 error');
	});
	database.on('open', function(){
		console.log('데이터베이스 연결 성공');
	});
}


app.use('/api/users', require('./api/users/users'));
app.use('/api/auth', require('./api/auth/auth'));
app.use('/api/file', require('./api/file/file'));



// 소켓 부분

const server = require('http').createServer(app).listen(app.get('port'), function(){
	console.log('서버 시작. 포트 : ' + app.get('port'));
	connectDB();
});
const io = socketio.listen(server);
console.log('Socket 준비 !'); 

io.sockets.on('connection', (socket)=>{
	console.log('socket 연결 됨');
	// 채팅 최근순 50개 제한
	socket.on('login', function(data){
		if(data.user_id != null){
			User.updateOne({ id:  data.user_id}, { $set : {state : true}}, {upsert: true}, function(err, docs){
				if(err) console.log('update err');
				console.log('userid: ' + data.user_id);
				User.find({}, {_id:0, id :1, state: 1}, function(err, docs){
					io.sockets.emit('login', docs);
				});
			});
			
			
			Chat.find({recepient : 'ALL'}, {_id:0}, function(err, docs){
				io.sockets.emit('all_msg', docs);
			}).sort({"created": -1}).limit(50);
		}
	});
	
	socket.on('all_msg', function(data) {
		let date = new Date();
		Chat.create({
			sender: data.sender,
			recepient : data.recepient,
			message : data.message,
			created: date
		});
		if(data.recepient === 'ALL'){
			io.sockets.emit('new_all_msg', data);
		}
		
    });
	
	socket.on('logout', function(data){
		console.log('logout',data);
		if(data.user_id != null){
			User.update({ id: data.user_id}, { $set : {state : false}}, {upsert: true}, function(err, docs){
				if(err) console.log('update err');
				User.find({}, {_id:0, id :1, state: 1}, function(err, docs){
					io.sockets.emit('logout', docs);
				});
			});
		}
	});
	
	socket.on('disconnect', (reason)=>{
		console.log('user disconnect', reason);
		if(reason === 'client namespace disconnect'){
			console.log('클라에서 끔');
		}
	});
	
	
});