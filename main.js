const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serveStatic = require('serve-static');
const path = require('path');



// 구름 IDE
const databaseUrl = 'mongodb://14.38.25.223:27017/local';

// 집
//const databaseUrl = 'mongodb://localhost:27017/local';

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
		console.log('데이터베이스 연결 실패');
	});
	database.on('open', function(){
		console.log('데이터베이스 연결 성공');
	});
}


app.use('/api/users', require('./api/users/users'));
app.use('/api/auth', require('./api/auth/auth'));
app.use('/api/file', require('./api/file/file'));




const server = require('http').createServer(app).listen(app.get('port'), function(){
	console.log('서버 시작. 포트 : ' + app.get('port'));
	connectDB();
});
const io = require('./socket.js')(server);

