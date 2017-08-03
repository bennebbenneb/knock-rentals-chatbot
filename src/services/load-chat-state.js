const app = require("../app/app");
app.get("/services/load-chat-state/", (req, res) => {
    res.send(req.session.state);
});
