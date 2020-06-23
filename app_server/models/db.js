'use strict';

//mongoDB drive to establish database connections
const mongoose = require('mongoose');

/*  SIGINT module that fires on successful disconnections/closing of connections to mongodb
    to avoid redundant open connections through Node.js process */
const readLine = require('readline');

//establish mongoDB database on the localhost
const dbURI = "mongodb://localhost:127.0.0.1/newLoc8r";

//Set the database URI based on the Environment
if(process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb://heroku_t0zs37gc:1k3t3pgo8sb5enosk314gj@ds159330.mlab.com:59330/ heroku_t0zs37gc';//replace this with your live environment
} else {
    process.env.NODE_ENV === 'development';
}
/* Create multiple database connections. Use the createConnection() method other than
    the connect() method on mongoose ------ mongoose.connect is suitable for keeping a single
     uptime connection for the application
*/
const dbConnection = mongoose.createConnection(dbURI, {
    useNewUrlParser: true,  //tells mongoose to use its new internal URL parser avoiding deprecation warnings due to mongoDB deprecating
    useUnifiedTopology: true,
    poolSize: 20,   //max number of connections per instance
    auto_reconnect: true    //automatic reconnection
}, (err, db) => {
    /* MONITORING THE CONNECTION WITH MONGOOSE CONNECTION EVENTS */
    //Monitor for connection errors and bad connection and log the error
    if(err) {
        console.log('There was a problem connecting to MongoDB database.');
        db.close();
        console.log('Database connection terminated.')
        process.exit(1);
    } else if(db) {//Monitor a successful connection
        console.log('Database connection established successfully.');
        console.log(`Mongoose connected to ${dbURI}`);
        console.log('newLoc8r database is Now Active.')
    } else {
        //gracefully close down anything else you need to before the process ends.
        if (process.platform === 'win32') {
            const rl = readLine.createInterface ({
                input: process.stdin,
                output: process.stdout
            });
            rl.on('SIGINT', () => {
                process.emit("SIGINT");
            });
        }
        console.log('Mongoose disconnected.')
    }
});

/*  Handle successful disconnections of the application on different platforms  */
//  Function to handle disconnection events
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`\nMongoose disconnected through: ${msg}`);
        callback();
    });
};

//Monitor disconnection events
//for successful Node process: SIGUSR2 on nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
       process.kill(process.pid, 'SIGUSR2');
    });
});

//for successful app termination on SIGINT
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
       process.exit(0);
    });
});

//for successful HEROKU app termination
process.on('SIGTERM', () => {
   gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
   });
});

//bring in the mongoose Schema from the location.js within the models
require('./locations');