var fs = require('fs');
var path = require('path'); // get path
var readdir = require('fs-readdir-promise');
module.exports = function(app) {
    var uploads = require('../controllers/upDownLoad.server.controller');

    app.post('/savedata', uploads.saveFiles, uploads.saveFileUser, function(req, res, next) {
        console.log('Uploade Successful ', req.file, req.body);
    });

    app.get('/download/:userId', function(req, res) { // create download route
        uploads.getFilesByUserId(req, res).then(function(userFiles) {
            var dir = path.resolve(".") + '/public/uploads/'; // give path
            readdir(dir).then(function(list) { // read directory return  error or list
                var arrayOfUserFiles = [];
                for (var i = 0; i < list.length; i++) {
                    for (var j = 0; j < userFiles.length; j++) {
                        if (list[i] == userFiles[j].fileName) {
                            arrayOfUserFiles.push(list[i]);
                            break;
                        }
                    }
                }
                res.json(arrayOfUserFiles);
            }).catch(function(err) {
                return res.json(err.message);
            });


        });


    });


    app.get('/downloadingProcess/:file(*)', function(req, res) { // this routes all types of file

        var file = req.params.file;

        var pathFile = path.resolve(".") + '/public/uploads/' + file;

        res.download(pathFile); // magic of download fuction

    });

};
