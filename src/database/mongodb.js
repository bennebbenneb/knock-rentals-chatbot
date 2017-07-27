const mongodb = require("mongodb");
const Promise = require('promise');

const promise = new Promise((resolve, reject) => {
    const mongodoURI = process.env.MONGODB_URI || "mongodb://heroku_c88p2w2j:44k2khan7lsr4mfogabggq8mhm@ds125623.mlab.com:25623/heroku_c88p2w2j";
    mongodb.MongoClient.connect(mongodoURI, function (err, database) {
        if (err) {
            console.log(err);
            reject(err);
            process.exit(1);
            return;
        }
        resolve(database);
    });
});

module.exports = promise;