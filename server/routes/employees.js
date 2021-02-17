const express = require('express');
const app = express();

const employeeSch = require('../models/employees');

const _rest = '/employees'

app.get(_rest, function(req, res) {
    employeeSch.find({}, (err, employesDB) => {
        if (err) {
            return res.status(400).json({
                process: false,
                err
            });
        }
        if (employesDB) {
            res.json({
                process: true,
                employesDB
            });
        }
    });
})

app.post(_rest, async function(req, res) {
    let body = req.body
    console.log(body)

    let _employee = new employeeSch(body);

    _employee.save((err, employeeDB) => {
        if (err) {
            return res.status(400).json({
                process: false,
                err
            });
        }

        res.json({
            process: true,
            message: 'Employe has been created',
            employee: employeeDB
        })
    })
})



module.exports = app;