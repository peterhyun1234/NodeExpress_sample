var express = require('express');
var createError = require('http-errors');
var path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

var app = express();

app.set('view engine', 'pug');

app.set('port', process.env.PORT || 3345);

// URL REST-API SERVER
app.listen(app.get('port'), function() {
    console.log('Express API server listening on port ' + app.get('port'));
});


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Router 정의
const apisRouter = require('./router/apis');

app.use('/apis', apisRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/files', express.static(__dirname + '/files'));

module.exports = app;
module.exports = router;

const gracfulCleanJob = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Disconnected from port " + app.get('port'));
        resolve();
    }, app.get('port'));
});

process.on('SIGINT', function() {
    console.log("Caught interrupt signal");
    gracfulCleanJob().then(() => {
        process.exit();
    })
});
