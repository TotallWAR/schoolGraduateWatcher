module.exports = function(app) {
    var teachers = require('../controllers/teacher.server.controller');
    
    app.route  ('/teacher/:id')
        .get(teachers.getTeacherById);
    
    app.route ('/teachers/')
        .get(teachers.getTeachers);
    
    app.route ('/marks/save')
        .post(teachers.saveMark);
    //равносильно
	/*
	app.route('/')
    	.get(index.render);
	*/
};