var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MarkSchema = new Schema({
    subjectId: {type: "ObjectId"},
    pupilId: {type: "ObjectId"},
    classExam:[{}],
    assignment:[{}],
    homework:[{}]
}, {collection:'marks'});


mongoose.model('Mark', MarkSchema);