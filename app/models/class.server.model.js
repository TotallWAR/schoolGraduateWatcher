
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var ClassSchema = new Schema({
    name : String
});


mongoose.model('Class', ClassSchema);