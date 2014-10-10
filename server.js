var express = require('express'),
  config = require('./config')(),
  mongoose = require('mongoose'),
  passport = require('passport'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session');

var app = express();

console.log('Connected to MongoDb at ' + config.mongoDbUri);
mongoose.connect(config.mongoDbUri);

require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser());
app.set('view engine', 'jade');
app.use(session({
  secret: 'aptitudAptitudaptitudAptitud'
}));
app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js')(app, passport);

app.listen(config.appPort);
console.log('The magic happens on port ' + config.appPort);