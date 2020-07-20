var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors')
var bodyParser=require('body-parser')
var mongoose=require('mongoose');
const passport = require("passport");
const authenticate = require("./authenticate");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter=require('./routes/products-route');
var suppliersRouter=require('./routes/suppliers-route');
var sysSetupRouter=require('./routes/sys-setup-route');
var mediaRouter=require("./routes/media-route");
var categoriesRouter =require("./routes/categories-route");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json({extended:false}));
app.use(bodyParser.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
//connect to DB
//mongoose.connect(process.env.OgatDBConnection, { useNewUrlParser: true,useUnifiedTopology:true })
mongoose.connect("mongodb://localhost:27017/fashion", { useNewUrlParser: true,useUnifiedTopology:true })
.then(()=>console.log("connected to DB"))
.catch(()=>console.log("Couldn't connect to DB"))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);
app.use('/sys-setup', sysSetupRouter);
app.use('/media', mediaRouter);
app.use('/categories', categoriesRouter);

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
