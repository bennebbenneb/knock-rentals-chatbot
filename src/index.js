const express = require('express');
const path = require("path");
const compression = require('compression');
const mongoDBPromise = require('./database/mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression({level: 9}));

// store the chathistory
app.post("/service/chatbot/", (req, res) => {
    const history = req.body.history;
    const user = req.body.user;
    mongoDBPromise.then((db) => {

        let ipAddr = req.headers["x-forwarded-for"];
        if (ipAddr){
            const list = ipAddr.split(",");
            ipAddr = list[list.length-1];
        } else {
            ipAddr = req.connection.remoteAddress;
        }
        user.ip = ipAddr;
        db.collection("chatbot").insertOne({
                history:history,
                user:user
            },
            (err, result) => {
                if (err) {
                    res.status(500);
                }
                res.send(JSON.stringify({}));
            }
        );
    }).catch((error)=>{
        res.status(500);
        res.send(JSON.stringify({}));
    });
});

// serve the static files
app.use('/', express.static(path.join(__dirname, '../ui/build/')));

// start listening
let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});
