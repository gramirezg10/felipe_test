const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let employeeSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'firstName name is required']
    },
    last_name: {
        type: String,
        required: [true, 'lastName is required']
    },
    email: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    enable: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('employeeSch', employeeSchema);