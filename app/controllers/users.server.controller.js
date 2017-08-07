var User = require('mongoose').model('User'),
    passport = require('passport');

var getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }

    return message;
};
exports.renderLogin = function(req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Log-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/index');
    }
};

exports.renderRegistry = function(req, res, next) {
    if (!req.user) {
        res.render('registry', {
            title: 'Register Form',
            messages: req.flash('error')
        });
    } else
        res.redirect("/index");
};

exports.registry = function(req, res, next) {

    var user = new User(req.body);
    var message = null;
    user.provider = 'local';
    user.isAcceptedByAdmin = false;
    user.save(function(err) {
        if (err) {
            var message = getErrorMessage(err);
            req.flash('error', message);
            return res.status(500).send(message);
        } else {
            var message = "User has been successfully created!"
            return res.status(200).send(message);
        }
    });
};

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/login');
};

exports.create = function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function(req, res, next) {
    User.find({}, function(err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.read = function(req, res) {
    res.json(req.user);
};

exports.userByID = function(req, res, next) {
    User.findOne({
            _id: req.params.id
        },
        function(err, user) {
            if (err) {
                return next(err);
            } else {
                res.status(200).json(user);
            }
        }
    );
};

exports.getUsers = function(req, res, next) {
    User.find({},
        function(err, user) {
            if (err) {
                return next(err);
            } else {
                req.user = user;
                next();
            }
        }
    );
};

exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};
exports.updateApprovance = function(req, res, next) {
    req.body.user.isAcceptedByAdmin = req.body.boolApprovance;
    User.findByIdAndUpdate(req.body.user._id, req.body.user, function(err, user) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(user);
        }
    });
};

exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    })
};



exports.getParents = function(req, res, next) {
    User.find({
        type: "Parent",
        isAcceptedByAdmin: true
    }, function(err, parents) {
        if (err) {
            return next(err);
        } else {
            var returnedObj = {
                user: req.user,
                parents: parents
            };
            res.status(200).json(returnedObj);
        }
    });
};


exports.login = function(req, res, next) {
    passport.authenticate('local',
        function(err, user, info) {
            return err ?
                next(err) :
                user ?
                req.logIn(user, function(err) {
                    return err ?
                        next(err)
                        //if we dont have error we return a function which well be immidiatly executed
                        :
                        (() => {
                            if (user.type === "Parent") {
                                res.user = user;
                                res.status(200).send('/indexParent');
                            }
                            if (user.type === "Teacher") {
                                res.user = user;
                                res.status(200).send('/indexTeacher');

                            }
                            if (user.type === "Administrator") {
                                res.user = user;
                                res.status(200).send('/indexAdmin');
                            }

                        })()

                }) :
                res.status(401).send(info);

        }
    )(req, res, next);
};
