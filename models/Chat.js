let mongoose = require('mongoose');

let ChatSchema = mongoose.Schema({
	sender: {type: String},
	recepient : {type: String},
	message : { type : String },
	created: {type: Date }
});

mongoose.model('chats',ChatSchema);

module.exports = mongoose.model('chats');