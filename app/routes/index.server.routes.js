module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.redirectLogin);

    app.get('/indexParent', index.renderIndexParent);
    app.get('/indexTeacher', index.renderIndexTeacher);
    app.get('/indexAdmin', index.renderIndexAdmin);
    
    //равносильно
	/*
	app.route('/')
    	.get(index.render);
	*/
};