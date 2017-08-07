var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash');
session = require('express-session');
favicon = require('serve-favicon');
cookieParser = require('cookie-parser');
async = require("async");
https = require('https');

// exphbs = require('express-handlebars');
module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'MathObesAlexDima',
        maxAge: 60 * 60 * 1000 / 2,
        minAge: 60 * 60 * 1000 / 4
    }));

    app.use(favicon(__dirname + '/../public/favicon.ico'));
    //app.engine('.hbs', exphbs({defaultLayout: './../../app/views/layouts/main', extname: '.hbs'}));
    app.engine('html', require('ejs').renderFile);
    app.set('views', './app/views');
    app.set('view engine', 'html');

    app.use(cookieParser());
    //app.use(bodyParser());

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/pupil.server.routes.js')(app);
    require('../app/routes/adminApi.server.routes.js')(app);
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/teacher.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/socket.server.routes.js')(app);
    require('../app/routes/upDownLoad.server.routes.js')(app);

    app.use(express.static(__dirname + "/../"));

    return app;
};
