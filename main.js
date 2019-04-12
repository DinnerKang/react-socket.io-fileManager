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
  res.send('Hi');
});

let database;


// 보류
function connectDB(){
	var databaseUrl = 'mongodb://localhost:27017/local';
	
	console.log('DB 연동');
	mongoose.Promise = global.Promise;
	mongoose.connect(databaseUrl);
	database = mongoose.connection;
	
	database.on('error', console.error.bind(console, 'mongoose error'));
	database.on('open', function(){
		console.log('연결 성공');
	});
}



app.use('/api/users', require('./api/users/users'));
//app.use('/api/auth', require('./api/auth/auth'));


app.listen(port, () =>{
	console.log('Server port', port);
});