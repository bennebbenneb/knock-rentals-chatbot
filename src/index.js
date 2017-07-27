const express = require('express');
const path = require("path");
const compression = require('compression');
const app = express();
const mongoDBPromise = require('./database/mongodb');
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.use(compression({level: 9}));

// store the chathistory
app.post("/service/chatbot/", (req, res) => {
    let userChatLog = req.body.userChatLog;
    console.log()
    mongoDBPromise.then((db) => {
        db.collection("chatbot").insertOne({
                test: "test"
            },
            (err, result) => {
                if (err) {
                    res.status(500);
                }
                res.send(JSON.stringify({}));
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
