const express = require('express');
const app = express();

const ProductSch = require('../models/products');

const _rest = '/products'

app.get(_rest, function(req, res) {
    let _username = req.headers.username
    if (!_username) {
        return res.status(400).json({
            process: false,
            err: 'username is required in headers'
        });
    }
    ProductSch.find({ username: _username }, (err, products) => {
        if (err) {
            return res.status(400).json({
                process: false,
                err
            });
        }
        if (products) {
            res.json({
                process: true,
                products
            });
        }
    });
})

app.post(_rest, async function(req, res) {
    let body = req.body
    let _username = req.headers.username
    let productExist = false;

    if (!body.productName) {
        return res.status(400).json({
            process: false,
            err: 'productName is required'
        });
    }
    if (!body.quantity ||  isNaN(body.quantity)) {
        return res.status(400).json({
            process: false,
            err: 'quantity is required and must be numeric'
        });
    }
    if (!_username) {
        return res.status(400).json({
            process: false,
            err: 'username is required in headers'
        });
    }

    productExist = await ProductSch.find({ productName: body.productName.toUpperCase().trim(), username: _username }, (err, productFound) => {
        if (err) {
            return res.json({
                process: false,
                err
            })
        }
    })

    if (productExist.length > 0) {
        return res.status(400).json({
            process: false,
            message: 'product already exist'
        })
    }

    let _product = new ProductSch({
        productName: body.productName.toUpperCase().trim(),
        quantity: body.quantity,
        description: body.description,
        username: _username
    });
    _product.save((err, productDB) => {
        if (err) {
            return res.status(400).json({
                process: false,
                err
            });
        }

        res.json({
            process: true,
            message: 'product has been created',
            product: productDB
        })
    })
})

app.put(_rest + '/:id', function(req, res) {
    let id = req.params.id;
    let body = req.body;

    if (!body.quantity ||  isNaN(body.quantity)) {
        return res.status(400).json({
            process: false,
            err: 'quantity is required and must be numeric'
        });
    }
    if (!body.description) {
        body.description = "";
    }

    ProductSch.findByIdAndUpdate(id, { quantity: body.quantity, description: body.description }, (err, productFound) => {
        if (err) {
            return res.status(400).json({
                process: false,
                err
            });
        }
        if (!productFound) {
            res.json({
                process: false,
                message: 'id doesnt exist'
            })
        } else {
            res.json({
                process: true,
                message: 'product updated'
            })
        }
    })
})

app.delete(_rest + '/:id', function(req, res) {
    let id = req.params.id;

    ProductSch.findByIdAndUpdate(id, { enable: false }, (err, productDel) => {
        if (err) {
            return res.status(400).json({
                process: false,
                err
            });
        }
        if (!productDel) {
            res.json({
                process: false,
                message: 'id doesnt exist'
            })
        } else {
            res.json({
                process: true,
                message: 'product deleted'
            })
        }
    })
})


module.exports = app;