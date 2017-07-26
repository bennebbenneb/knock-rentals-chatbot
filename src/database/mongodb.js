const mongodb = require("mongodb");
const Promise = require('promise');

const promise = new Promise((resolve, reject) => {
    let mongodoURI = process.env.MONGODB_URI;

    mongodb.MongoClient.connect(mongodoURI, function (err, database) {
        if (err) {
            console.log(err);
            reject();
            process.exit(1);
        }

        // Save database object from the callback for reuse.
        resolve(database);
    });
});

module.exports = promise;