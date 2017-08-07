var Pupil = require('mongoose').model('Pupil'),
    Schedule = require('mongoose').model('Schedule'),
    Mark = require('mongoose').model('Mark'),
    Subject = require('mongoose').model('Subject'),
    Class = require('mongoose').model('Class'),
    Attendance = require('mongoose').model('Attendance');

exports.getPupilByParentId = function(req, res, next) {
    Pupil.find({
        parendId: req.user.id
    }, function(err, pupils) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(pupils);
        }
    });
};

exports.getPupilById = function(req, res, next) {
    Pupil.findById({
        _id: req.params.pupilId
    }, function(err, pupil) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(pupil);
        }
    });
};

exports.getPupils = function(req, res, next) {
    Pupil.find({}, function(err, pupils) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(pupils);
        }
    });
};

exports.getScheduleById = function(req, res, next) {
    Schedule.findById({
        _id: req.params.id,
        pupilId: req.params.pupilId
    }, function(err, schedule) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(schedule);
        }
    });
};

exports.getScheduleByClassId = function(req, res, next) {
    Schedule.findOne({
        class: req.params.id
    }, function(err, schedule) {
        if (err) {
            return next(err);
        } else {
            if (schedule === undefined || schedule === null) { //если для данного класса нет schedule вовсе
                schedule = new Schedule({
                    "class": req.params.id,
                    "monday": [],
                    "tuesday": [],
                    "wednesday": [],
                    "thursday": [],
                    "friday": []
                });
                var pushedObj = {
                    "Subject": "Change value here",
                    "Teacher": "Change value here",
                    "StartTime": "9:00",
                    "EndTime": "10:00",
                    "Homework": "Change value here",
                    "Room": "Change value here"
                };
                schedule.monday.push({});
                schedule.tuesday.push({});
                schedule.wednesday.push({});
                schedule.thursday.push({});
                schedule.friday.push({});

                schedule.monday.set(schedule.monday.length - 1, pushedObj);
                schedule.tuesday.set(schedule.tuesday.length - 1, pushedObj);
                schedule.wednesday.set(schedule.wednesday.length - 1, pushedObj);
                schedule.thursday.set(schedule.thursday.length - 1, pushedObj);
                schedule.friday.set(schedule.friday.length - 1, pushedObj);
                schedule.save(function(err, updatedSchedule) {
                    if (err) {
                        return next(err);
                    } else {
                        res.status(200).json(updatedSchedule);
                    }
                });

            } else {
                res.status(200).json(schedule);
            }
        }
    });
};

exports.getSchedules = function(req, res, next) {
    Schedule.find({}, function(err, schedule) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(schedule);
        }
    });
};

exports.getClasses = function(req, res, next) {
    Class.find({}, function(err, classes) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(classes);
        }
    });
};

exports.getMarksBySubjectId = function(req, res, next) {
    Mark.find({
        subjectId: req.params.subjectId
    }, function(err, marks) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(marks);
        }
    });
};

exports.getSubjects = function(req, res, next) {
    Subject.find({}, function(err, subjects) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(subjects);
        }
    });
};

exports.getSubjectById = function(req, res, next) {
    Subject.findById({
        _id: req.params.id
    }, function(err, subject) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(subject);
        }
    });
};

exports.getAttendanceByClassIdSubjectId = function(req, res, next) {
    Attendance.find({
        classId: req.params.classId,
        subjectId: req.params.subjectId
    }, (err, attendance) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(attendance);
        }
    });

};

exports.saveAttendance = (req, res, next) => {
    Attendance.findOne({
        _id: req.body._id
    }, function(err, attendance) {
        attendance.attendance = req.body.attendance;
        attendance.save(function(err, updatedAttendance) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(updatedAttendance);
            }
        });
    });

};



exports.updateScheduleById = function(req, res, next) {
    Schedule.findOne({
        _id: req.params.id
    }, {
        _id: false
    }, function(err, schedule) {
        var promise = new Promise(function(resolved, rejected) {
            schedule[res.req.params.weekDay].forEach(function(item, i, arr) {
                if (item.StartTime == res.req.body.StartTime &&
                    item.EndTime == res.req.body.EndTime) {
                    if (res.req.body.Homework !== undefined || res.req.body.Homework !== null) {
                        item.Homework = res.req.body.Homework;
                    }
                    schedule[res.req.params.weekDay].set(i, item);
                    schedule._id = res.req.params.id;
                    resolved(schedule);
                }
            });
        });
        promise.then(function(schedule) {
            //doc.markModified(schedule[res.req.params.weekDay]);
            schedule.save(function(err, updatedSchedule) {
                if (err) {
                    return next(err);
                } else {
                    res.status(200).json(updatedSchedule);
                }
            });
        });

    });
};

exports.updateScheduleByAdminById = function(req, res, next) {
    Schedule.findOne({
        _id: req.params.id
    }, {
        _id: false
    }, function(err, schedule) {
        var promise = new Promise(function(resolved, rejected) {
            schedule[res.req.params.weekDay].forEach(function(item, i, arr) {
                if (item.StartTime.replace(/\s/g, '') == res.req.body.StartTime.replace(/\s/g, '') &&
                    item.EndTime.replace(/\s/g, '') == res.req.body.EndTime.replace(/\s/g, '')) {
                    if (res.req.body.Room !== undefined) {
                        item.Room = res.req.body.Room;
                    }
                    if (res.req.body.Teacher !== undefined) {
                        item.Teacher = res.req.body.Teacher;
                    }
                    if (res.req.body.Subject !== undefined) {
                        item.Subject = res.req.body.Subject;
                    }
                    if (res.req.body.eventDate !== undefined) {
                        var arrOfTime = res.req.body.eventDate.split('-');
                        item.StartTime = arrOfTime[0];
                        item.EndTime = arrOfTime[1];
                    }


                    schedule[res.req.params.weekDay].set(i, item);
                    schedule._id = res.req.params.id;
                    resolved(schedule);
                }
            });
        });
        promise.then(function(schedule) {
            //doc.markModified(schedule[res.req.params.weekDay]);
            schedule.save(function(err, updatedSchedule) {
                if (err) {
                    return next(err);
                } else {
                    res.status(200).json(updatedSchedule);
                }
            });
        });

    });
};

exports.deleteLessonSchedule = function(req, res, next) {
    Schedule.findOne({
        _id: req.params.id
    }, {
        _id: false
    }, function(err, schedule) {
        var promise = new Promise(function(resolved, rejected) {
            schedule[res.req.params.weekDay].forEach(function(item, i, arr) {
                if (item.StartTime.replace(/\s/g, '') == res.req.body.StartTime.replace(/\s/g, '') &&
                    item.EndTime.replace(/\s/g, '') == res.req.body.EndTime.replace(/\s/g, '')) {

                    schedule[res.req.params.weekDay].splice(i, 1);
                    schedule._id = res.req.params.id;
                    resolved(schedule);
                }
            });
        });
        promise.then(function(schedule) {
            //doc.markModified(schedule[res.req.params.weekDay]);
            schedule.save(function(err, updatedSchedule) {
                if (err) {
                    return next(err);
                } else {
                    res.status(200).json(updatedSchedule);
                }
            });
        });
    });
};
exports.createLessonSchedule = function(req, res, next) {
    Schedule.findOne({
        _id: req.body.id
    }, {
        _id: false
    }, function(err, schedule) {
        //если для данного класса есть schedule
        if (schedule !== undefined && schedule !== null) {
            schedule[res.req.body.weekDay].push({});
            schedule[res.req.body.weekDay].set(schedule[res.req.body.weekDay].length - 1, {
                "Subject": "Change value here",
                "Teacher": "Change value here",
                "StartTime": res.req.body.StartTime,
                "EndTime": res.req.body.EndTime,
                "Homework": "Change value here",
                "Room": "Change value here"
            });
            schedule._id = res.req.body.id;
        }
        schedule.save(function(err, updatedSchedule) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(updatedSchedule);
            }
        });
    });
};
