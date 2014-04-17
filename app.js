var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var r = require('rethinkdb');

var app = express();
//var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var onConnect = function(callback) {
    r.connect({
        host:'localhost',
        port: 28015,
        db: 'tiny_monsters'
    }, function(err, conn) {
        callback(err, conn);
    });
}



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Tiny Monster'
    })
});

app.get('/api/toylist', function(req, res) {
    onConnect(function(err, conn) {
        console.log(err)
        r.table('toys').run(conn, function(err, cursor) {
            console.log(err, cursor)
            cursor.toArray(function(err, toys) {
                res.json(toys);
                conn.close();    
            });
            
        });

    });
});

app.get('/api/toys/:toy_id', function() {

});

app.post('/api/toys', function() {

});

app.put('/api/toys/:toy_id', function() {

});

app.delete('/api/toys/:toy_id', function() {

});

/// error handlers

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





var server = app.listen(4000, function() {
    console.log('Listening on port %d', server.address().port);
});

module.exports = app;
