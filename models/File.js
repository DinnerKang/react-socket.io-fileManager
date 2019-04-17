let mongoose = require('mongoose');

let FileSchema = mongoose.Schema({
	id: {type :String, required: true, unique: true},
	password: {type :String, required: true}
});

mongoose.model('file',FileSchema);

module.exports = mongoose.model('file');