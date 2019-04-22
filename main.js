const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const serveStatic = require('serve-static');
const path = require('path');
const socketio = require('socket.io');



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
	
	socket.on('login', function(data){
		console.log('Client logged-in:\n userid: ' + data.user_id);
	});
	
	socket.on('all_msg', function(data) {
   	 console.log('Message ', data);
		
		if(data.recepient === 'ALL'){
			io.sockets.emit('all_msg', data);
		}
    });
			  
	socket.on('disconnect', ()=>{
		console.log('user disconnect');
	});
	
	
});