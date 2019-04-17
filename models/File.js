let mongoose = require('mongoose');

let FileSchema = mongoose.Schema({
	id: {type :String},
	originalName : {type: String},
	fileName: {type :String, unique: true},
	mimeType: {type: String},
	path: {type : String}
});

mongoose.model('files',FileSchema);

module.exports = mongoose.model('files');