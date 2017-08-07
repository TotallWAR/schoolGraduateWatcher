var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SubjectSchema = new Schema({
    subjectName: String
});


mongoose.model('Subject', SubjectSchema);