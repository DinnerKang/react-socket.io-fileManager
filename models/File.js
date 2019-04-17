let mongoose = require('mongoose');

let FileSchema = mongoose.Schema({
	title: {type :String, required: true, unique: true},
	orgFileName: {type :String},
	saveFileName : {type : String}
});

mongoose.model('file',FileSchema);

module.exports = mongoose.model('file');