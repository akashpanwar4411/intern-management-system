const express = require('express');
const morgan = require('morgan');
const internRouter = require('./routes/internRoute');

const app = express();

// Middlewares
app.use(morgan()); 

app.use(express.json({limit: '10kb'}));

// Mounting Router
app.use('/interns', internRouter);

module.exports = app;