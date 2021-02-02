require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionSuccesssStatus: 200,
    methods: 'GET, PUT, POST, DELETE',
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.use(require('./routes/index'));

app.use(cors(corsOptions));






mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    else console.log('DB running');
});

app.listen(process.env.PORT, () => {
    console.log('Running on port: ', process.env.PORT);
})