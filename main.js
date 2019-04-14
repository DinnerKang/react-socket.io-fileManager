const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

let database;
var databaseUrl = 'mongodb://14.38.25.223:27017/local';
// 보류
function connectDB(){
	mongoose.Promise = global.Promise;
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
	database.on('error', function(){
		console.log('데이터베이스 error');
	});
	database.on('open', function(){
		console.log('데이터베이스 연결');
		testF(database);
	});
}
connectDB();

let testF = function(database){
	let users = database.collection('users');
	console.log('testFunc');

	users.find({ "id" : 'test01', "password" : '123456'}).toArray(function(err, docs){
		if(err){
			console.log(err, 'errrrrrrrrrrrr');
		}
		console.log(docs);
	});
};


app.use('/api/users', require('./api/users/users'));
//app.use('/api/auth', require('./api/auth/auth'));


app.listen(port, () =>{
	console.log('Server port', port);
});