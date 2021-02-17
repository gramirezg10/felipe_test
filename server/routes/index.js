const express = require('express');
const app = express();

app.use(require('./products'));
app.use(require('./employees'));
// app.use(require('./smoketest'));

module.exports = app;