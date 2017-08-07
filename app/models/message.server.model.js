var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MessageSchema = new Schema({
    parentId: {type: "ObjectId"},
    teacherId: {type: "ObjectId"},
    ownerId: {type: "ObjectId"},
    date: String,
    message: String
}, {collection:'messages'});


mongoose.model('Message', MessageSchema);