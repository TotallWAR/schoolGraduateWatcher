module.exports = function(app) {
    var pupils = require('../controllers/pupils.server.controller');

    app.route  ('/pupil')
        .get(pupils.getPupilByParentId);
    app.route  ('/pupils/:pupilId')
        .get(pupils.getPupilById);
     app.route  ('/pupils')
        .get(pupils.getPupils);

    app.route('/schedules')
        .get(pupils.getSchedules);

    app.route ('/schedule/:id')
        .get(pupils.getScheduleById);

    app.route ('/schedule/byClassId/:id')
        .get(pupils.getScheduleByClassId);

    app.route ('/marks/:subjectId/:pupilId')
        .get(pupils.getMarksBySubjectId);

    app.route ('/subjects')
        .get(pupils.getSubjects);

    app.route ('/subjects/:id')
        .get(pupils.getSubjectById);

    app.route ('/classes')
        .get(pupils.getClasses);

    app.route ('/schedule/update/:id/:weekDay')
        .post(pupils.updateScheduleById);

    app.route ('/schedule/updateByAdmin/:id/:weekDay')
        .post(pupils.updateScheduleByAdminById);

    app.route('/schedule/lesson/delete/:id/:weekDay')
        .post(pupils.deleteLessonSchedule);

    app.route('/schedule/lesson/create')
        .post(pupils.createLessonSchedule);

    app.route('/attendance/:classId/:subjectId')
        .get(pupils.getAttendanceByClassIdSubjectId);

    app.route('/attendance/save')
        .post(pupils.saveAttendance);


    //равносильно
	/*
	app.route('/')
    	.get(index.render);
	*/
};
