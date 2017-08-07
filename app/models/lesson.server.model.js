
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var LessonSchema = new Schema({
    SubjectName : String,
    StartTime : String,
    EndTime : String,
    Teacher : String
});


mongoose.model('Lesson', LessonSchema);