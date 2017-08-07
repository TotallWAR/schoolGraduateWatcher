var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserFileSchema = new Schema({
    fileName: String,
    userId: {type: "ObjectId"}
}, {collection: 'userFiles'});


mongoose.model('UserFile', UserFileSchema);