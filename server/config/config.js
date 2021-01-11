// PORT
process.env.PORT = process.env.PORT || 3000;

// ENV
process.env.ENV = process.env.ENV || 'DEV';

// DB
if (process.env.ENV == 'DEV') process.env.URL_DB = 'mongodb://localhost:27017/bco_products'
else process.env.URL_DB = 'mongodb+srv://admin:50HgvAimB63WXEdm@cluster0.4ynpz.mongodb.net/bco_products'