let mongoose = require('mongoose');

let ChatSchema = mongoose.Schema({
	sender: {type: String},
	recepient : {type: String},
	message : { type : String }
});

mongoose.model('chats',ChatSchema);

module.exports = mongoose.model('chats');