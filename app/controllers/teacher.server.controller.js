var Teacher = require('mongoose').model('Teacher'),
    Mark = require('mongoose').model('Mark');
exports.getTeacherById = function(req, res) {
    Teacher.findById({_id: req.params.id}, function(err, teacher) {
		if (err) {
			return next(err);
		}
		else {
			res.status(200).json(teacher);
		}
	});
};


exports.getTeachers = function(req, res) {
    Teacher.find({}, function(err, teachers) {
		if (err) {
			return next(err);
		}
		else {
            var returnedObj = {user: req.user, teachers: teachers};
			res.status(200).json(returnedObj);
		}
	});
};

exports.saveMark = function (req, res, next) {
    Mark.find({
        pupilId: req.body.pupilId,
        subjectId: req.body.subjectId
    }, function (err, mark) {
        Mark.findById(mark[0]._id, function (err, obj) {
            obj[req.body.typeOfWork].push({
                date: req.body.date,
                grade: req.body.grade
            });
        //var markUpdated = new Mark(mark);
        obj.save(function(err, updatedMark) {
            if (err) {
                return next(err);
            }
            else {
                res.json(updatedMark);
            }
	   });
        });
    });
};
        
        
        