require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index.routes');
const pasteRouter = require('./routes/paste.routes');
const { registerPastesCleanerJob } = require('./services/pastesCleaner');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/paste', pasteRouter);

registerPastesCleanerJob();

module.exports = app;
