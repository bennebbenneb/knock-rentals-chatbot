let express = require('express');
const mongoDBPromise = require('./database/mongodb');
let compression = require('compression');
let path = require("path");
let app = express();
app.use(compression({level: 9}));

// store the chathistory
app.post("/service/chatbot/", (req, res) => {
    mongoDBPromise.then((db) => {
        db.collection("chatbot").insertOne({
                test: "test"
            },
            (err, result) => {
                console.log("inserted");
            }
        );
    });
});

// serve the static files
app.use('/', express.static(path.join(__dirname, '../ui/build/')));

// start listening
let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});
