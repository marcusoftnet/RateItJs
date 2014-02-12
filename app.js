// :( - disappointed
// :| - meh
// :) - happy
// :D - above expectation
// set up
var express	= require("express");
var app = express();
var mongoose = require("mongoose");
var config = require('./config')();

// config
mongoose.connect(config.mongoUrl);

app.configure(function () {
	app.use(express.static(__dirname + "/public"));
	app.use(express.logger("dev"));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
});

// load routes
//require('./app/routes')(app);

// start it up
app.listen(config.port);
console.log("RateItJs (in '" + config.mode + "' mode) listening on port" + config.port);
