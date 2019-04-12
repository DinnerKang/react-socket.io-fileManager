const express = require('express');
const app = express();



app.get('/api/greet', (req, res) => {
  res.send('Hi');
});




const port = 5000;

app.listen(port, () =>{
	console.log('Server port', port);
});