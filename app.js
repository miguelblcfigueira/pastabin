require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const pasteRouter = require('./routes/paste.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/paste', pasteRouter);

module.exports = app;
