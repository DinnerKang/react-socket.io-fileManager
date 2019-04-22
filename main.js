const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const serveStatic = require('serve-static');
const path = require('path');




// 집
//const databaseUrl = 'mongodb://127.0.0.1:27017/local';
// 구름 IDE
const databaseUrl = 'mongodb://14.38.25.223:27017/local';
let database;


const app = express();
const port = 5000;


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
app.get('/api', function(req, res) {
  res.send('test');
});

app.use('/api/users', require('./api/users/users'));
app.use('/api/auth', require('./api/auth/auth'));
app.use('/api/file', require('./api/file/file'));


/*
app.listen(port, () =>{
	connectDB();
	console.log('Server port', port);
});*/

// 소켓 부분
const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', ()=>{
	console.log('Socket 연결 !');
	
	socket.on('login', function(data){
		console.log('Client logged : '+ data);
	});
	
	socket.on('disconnect', ()=>{
		console.log('user disconnect');
	});
});

server.listen(port, ()=> {
	connectDB();
	console.log('서버 접속 Port :' + port);
});
