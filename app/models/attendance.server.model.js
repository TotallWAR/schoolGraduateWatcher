var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AttendanceSchema = new Schema({
    date: String,
    classId: {type: "ObjectId"},
    subjectId:{type: "ObjectId"},
    attendance : {}
}, {collection:'attendance'});


mongoose.model('Attendance', AttendanceSchema);