var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var favicon = require('serve-favicon');

var db = require('./model/db'),
    blob = require('./model/blobs'),
    show = require('./model/shows'),
    user = require('./model/user'),
    project = require('./model/project');

var routes = require('./routes/index'),
    blobs = require('./routes/blobs'),
    shows = require('./routes/shows'),
    users = require('./routes/users'),
    projects = require('./routes/projects'),
	contact = require('./routes/contact');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static( __dirname + '/public'))

app.use('/', routes);
app.use('/blobs', blobs);
app.use('/shows', shows);
app.use('/users', users);
app.use('/projects', projects);
app.use('/contact', contact);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;