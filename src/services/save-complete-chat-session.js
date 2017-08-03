const mongoDBPromise = require('../database/mongodb');
const app = require("../app/app");
app.post("/service/save-complete-chat-session/", (req, res) => {
    mongoDBPromise.then((db) => {

        let ipAddr = req.headers["x-forwarded-for"];
        if (ipAddr) {
            const list = ipAddr.split(",");
            ipAddr = list[list.length - 1];
        } else {
            ipAddr = req.connection.remoteAddress;
        }
        db.collection("chatbot").insertOne(
            Object.assign(req.body,{
                ipAddress: ipAddr,
                userAgent: req.headers['user-agent']
            }),
            (err, result) => {
                if (err) {
                    res.status(500);
                }
                req.session.state = "";
                res.send(JSON.stringify({}));
            }
        );
    }).catch((error) => {
        res.status(500);
        res.send(JSON.stringify({}));
    });
});
