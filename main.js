const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const crypto = require('crypto');
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


app.use('/api/users', require('./api/users/user'));
app.use('/api/auth', require('./api/auth/auth'));


app.listen(port, () =>{
	console.log('Server port', port);
});