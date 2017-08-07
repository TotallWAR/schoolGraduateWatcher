var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var PupilSchema = new Schema({
    lastName: String, 
    firstName: String,
    fullName: String,
    parendId: {type: "ObjectId"},
    scheduleId: {type: "ObjectId"},
    schoolName: String,
    class: String,
    sex: String
});


mongoose.model('Pupil', PupilSchema);