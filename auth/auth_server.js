var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
require('./models/users_model.js');
require('./models/Posts');
var conn = mongoose.connect('mongodb://localhost/posts');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge:2628000000},
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({
      mongooseConnection:mongoose.connection
    })
  }));
require('./routes')(app);
var routes = require('./routes/index');
app.use('/', routes);
app.listen(3000);
