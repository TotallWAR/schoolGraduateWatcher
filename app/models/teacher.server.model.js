var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TeacherSchema = new Schema({
    userId: {type: "ObjectId"},
    subjects: []
}, {collection:'teachers'});


mongoose.model('Teacher', TeacherSchema);