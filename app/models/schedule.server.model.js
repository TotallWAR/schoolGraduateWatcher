var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
    var Lesson = new mongoose.Schema({
    Subject : String,
    StartTime : String,
    EndTime : String,
    Teacher : String,
    Homework : String,
    Room: String
});
var ScheduleSchema = new Schema({
    class:{type: "ObjectId"},
    monday: [{}],
    tuesday: [{}],
    wednesday: [{}],
    thursday: [{}],
    friday: [{}]
}, {collection:'schedule'});


mongoose.model('Schedule', ScheduleSchema);