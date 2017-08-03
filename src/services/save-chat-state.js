const app = require("../app/app");
app.post("/services/save-chat-state/", (req, res) => {
    req.session.state = req.body;
    res.send(JSON.stringify({}));
});