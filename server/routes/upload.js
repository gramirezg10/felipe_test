const express = require('express');
const app = express();

const _rest = '/upload'

app.post(_rest, function(req, res) {
    res.json({
        process: true,
        msg: 'process to upload file'
    })
})

module.exports = app;