const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let productSchema = new Schema({
    productName: {
        type: String,
        required: [true, 'product name is required']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required']
    },
    description: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: [true, 'username is required']
    },
    enable: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('productSch', productSchema);