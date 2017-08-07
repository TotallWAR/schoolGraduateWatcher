module.exports = function(app) {
    var users = require('../controllers/users.server.controller'),
        passport = require('passport');


    app.get('/users/:id', users.userByID);

    app.route('/login')
        .get(users.renderLogin);

    app.post('/login', users.login);

    /*app.route('/recaptchedRequaetAuthorization')
        .get(function (){
            passport.authenticate('local', {
                successRedirect: 'index',
                successFlash: 'success',
                failureRedirect: 'login',
                failureFlash: true
            });
        });
    */
    app.get('/currentUser', function(req, res) {
        return res.status(200).send(req.user.id);
    });

    app.get('/logout', users.logout);

    app.route('/registry')
        .get(users.renderRegistry)
        .post(users.registry);

    app.get('/parents', users.getParents);

    app.post('/user/updateApprovance', users.updateApprovance);
    //равносильно
    /*
	app.route('/')
    	.get(index.render);
	*/
};
