var config = require('./config'),
    mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
module.exports = function() {
    var db = mongoose.connection.openUri(config.db, {
    useMongoClient: true
  }).then(
    () => {
      console.log('Connected to mongo server.');
    },
    err => console.log(err)
  );

    require('../app/models/user.server.model');
    require('../app/models/lesson.server.model');
    require('../app/models/pupil.server.model');
    require('../app/models/schedule.server.model');
    require('../app/models/subject.server.model');
    require('../app/models/teacher.server.model');
    require('../app/models/message.server.model');
    require('../app/models/mark.server.model');
    require('../app/models/user_file.server.model');
    require('../app/models/class.server.model');
    require('../app/models/attendance.server.model');
    require('../app/models/subscribtions.server.model');



    return db;
};
