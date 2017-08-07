var passport = require('passport'),
	mongoose = require('mongoose');

module.exports = function() {
	var User = mongoose.model('User');

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
      User.findById(id, function(err,user){
        err 
          ? done(err)
          : done(null,user);
      });
    });
        

	require('./strategies/local.js')();
};