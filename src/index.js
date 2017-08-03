const path = require("path");
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const app = require("./app/app");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(compression({level: 9}));

// service for storing the completed chat session
require("./services/save-complete-chat-session");

require("./services/load-chat-state");
require("./services/save-chat-state");

// serve the static files
app.use('/', express.static(path.join(__dirname, '../ui/build/')));

// start listening
let port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Server started on port ' + port);
});