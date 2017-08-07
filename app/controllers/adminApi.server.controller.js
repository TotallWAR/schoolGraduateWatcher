var User = require('mongoose').model('User');

exports.sendRequestForRegisterToAdmin = function(req, res, next) {
    User.find({username: req.data["username"]}, function(err, users) {
		if (err) {
			return next(err);
		}
		else {
			res.json(users);
		}
	});
};

exports.findNotApprovedUsers = function(req, res, next) {
    User.find({isAcceptedByAdmin: false}, function(err, users) {
		if (err) {
			return next(err);
		}
		else {
			res.status(200).json(users);
		}
	});
};