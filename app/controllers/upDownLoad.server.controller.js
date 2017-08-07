var path = require('path');
var multer = require('multer');
var FileUser = require('mongoose').model('UserFile');
var fileName = '';

var storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename: function(req, file, cb) {
        fileName = file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname);

        cb(null, fileName);
    }
});

var upload = multer({
    storage: storage
});


exports.saveFiles = upload.single('file');

exports.saveFileUser = function(req, res) {
    var obj = {
        fileName: fileName,
        userId: req.user.id
    };
    var fileUser = new FileUser(obj);
    fileUser.save(function(err) {
        if (err) {
            var errorMessage = getErrorMessage(err);
            return errorMessage;
        } else {
            return true;
        }
    });
};



exports.getFilesByUserId = function(req, res) {
    var promise = new Promise(function(resolved, rejected) {
        FileUser.find({
            userId: req.params.userId
        }, function(err, files) {
            if (err) {
                return next(err);
            } else {
                return files;
            }
        }).then(function(files) {
            if (files !== undefined)
                resolved(files);
            else
                rejected("Not found");
        });

    });
    return promise;
};
