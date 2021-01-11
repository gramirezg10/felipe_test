const express = require('express');
const app = express();

app.use(require('./products'));
app.use(require('./smoke-test'));

module.exports = app;