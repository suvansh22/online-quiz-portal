var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var db = require('./routes/mongodb')
var bodyParser = require('body-parser')
const config = require('./routes/config')

const quizRouter = require('./routes/router/quiz-router')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
var app = express();

//Models
require('./routes/schema/dynamicSchema')
require('./routes/schema/otpSchema')
require('./routes/schema/quizInfoSchema')
require('./routes/schema/quizSchema')
// view engine setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
 
db.on('error',console.error.bind(console,'MongoDB connection error:'))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/users', usersRouter);
app.use('/database',quizRouter);

if(process.env.NODE_ENV === 'production')
{
  console.log("ASD")
const buildPath = path.join(__dirname,'..','build');
app.use(express.static(buildPath))
app.get('*',(req,res)=>{
  return res.sendFile(path.resolve(buildPath,'index.html'))
})
}


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

module.exports = app;
