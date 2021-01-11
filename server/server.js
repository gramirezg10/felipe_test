require('../config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())




const _rest = '/products'

app.get(_rest, function (req, res) {
    res.json('get products API');
})

app.post(_rest, function (req, res) {
    let body = req.body
    res.json({
        message: 'ok',
        body
    });
})

app.put(_rest + '/:id', function (req, res) {
    let id = req.params.id;
    res.json('put product API with id=' + id);
})

app.delete(_rest + '/:id', function (req, res) {
    let id = req.params.id;
    res.json('delete product API with id=' + id);
})



app.listen(process.env.PORT, () => {
    console.log('Running on port: ', process.env.PORT);
})