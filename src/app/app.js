const express = require('express');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoPromise = require('../database/mongodb');
const app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser())
app.use(session({
    secret: "23141234123412341234dasDAS",
    maxAge: new Date(Date.now() + 3600000),
    store: new mongoStore({ dbPromise: mongoPromise }),
    resave: true,
    saveUninitialized: true
}));

module.exports = app;