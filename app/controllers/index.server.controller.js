//var Choice = require('mongoose').model('Choice');
var http = require('http');
var fs = require('fs');
var User = require('mongoose').model('User')

exports.redirectLogin = function(req, res) {
    if (req.isAuthenticated()) {
        User.findById({_id:req.user.id}, (err, user) => {
            if (user.type === "Parent") {
                res.user = user;
                res.redirect('/indexParent');
            }
            if (user.type === "Teacher") {
                res.user = user;
                res.redirect('/indexTeacher');

            }
            if (user.type === "Admin") {
                res.user = user;
                res.redirect('/indexAdmin');
            }
        });
    }
	else
		res.redirect('/login');
};

exports.renderIndexParent = function(req, res, next) {
    if (req.isAuthenticated()) {
		res.render('indexParent', {
			title: 'IndexParent',
			messages: req.flash('error') || req.flash('info')
			//answer:res.json(req.choice)
		});
    }
    else {
		return res.redirect('/login');
	}
};

exports.renderIndexTeacher = function(req, res, next) {
    if (req.isAuthenticated()) {
		res.render('indexTeacher', {
			title: 'IndexTeacher',
			messages: req.flash('error') || req.flash('info')
			//answer:res.json(req.choice)
		});
    }
    else {
		return res.redirect('/login');
	}
};

exports.renderIndexAdmin = function(req, res, next) {
    if (req.isAuthenticated()) {
		res.render('indexAdmin', {
			title: 'IndexAdmin',
			messages: req.flash('error') || req.flash('info')
			//answer:res.json(req.choice)
		});
    }
    else {
		return res.redirect('/login');
	}
};