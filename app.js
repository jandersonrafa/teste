// set up ======================================================================
var express = require('express');

var app = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./server/config/database'); 			// load the database config

var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration ===============================================================
// Connection options
const defaultOptions = {
    // Use native promises (in driver)
    promiseLibrary: global.Promise,
    useMongoClient: true,
    // Write concern (Journal Acknowledged)
    w: 1,
    j: true
};

function connect(mongoose, dbURI, options = {}) {
    // Merge options with defaults
    const driverOptions = Object.assign(defaultOptions, options);

    // Use Promise from options (mongoose)
    mongoose.Promise = driverOptions.promiseLibrary;

    // Connect
    mongoose.connect(dbURI, driverOptions);

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            process.exit(0);
        });
    });

    return mongoose.connection;
}
connect(mongoose, database.url)
// mongoose.connect(database.url, { useMongoClient: true }); 	// connect to mongoDB database on modulus.io
// db.ON('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/directives', express.static(__dirname + '/client/directives')); 				// set the static files location /public/img will be /img for users
app.use('/index', express.static(__dirname + '/client/index')); 				// set the static files location /public/img will be /img for users
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/angular')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/angular-ui-router/release')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// routes ======================================================================
require('./server/controllers/controllers.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
