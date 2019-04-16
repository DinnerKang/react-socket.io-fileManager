const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
// const socketio = require('socket.io');


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

app.get('/api', (req, res) => {
	console.log('test--------------------------');
	testF(database, 'test01', '123456', function(err, docs){
		console.log(docs);
	});
  res.send('Hi');
});


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

app.listen(port, () =>{
	connectDB();
	console.log('Server port', port);
});

/*
let server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Server port', port);
	connectDB();
});
let io = socketio.listen(server);
console.log('socket 준비 완료');*/