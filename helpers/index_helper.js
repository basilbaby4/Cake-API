const { cake_master } = require('../models');
let index_helper = {

    validate: (req, res, next) => {

        let post = req.body;
        let valid = true;
        let message = '';
        if (post.name == '' || post.name == undefined) {
            valid = false;
            message = 'Name is required';
        } else if (valid && (post.comment == '' || post.comment == undefined)) {
            valid = false;
            message = 'Comment is required';
        } else if (valid && (req.file == '' || req.file == undefined)) {
            valid = false;
            message = 'Image is required';
        }
        if (valid) {
            next();
        } else {
            let response = { status: false, data: {}, message: message };
            res.json(response);
        }
    },
    createCake: (req, res, next) => {
        let post = req.body;
        let data = {
            name: post.name,
            comment: post.comment,
            imageUrl: req.file.filename,
            yumFactor: Math.floor(Math.random() * 5) + 1
        };
        cake_master.create(data).then((result) => {
            if (result.insertId > 0) {
                data.id = result.insertId;
            }
            let response = { status: true, data: data, message: 'New data added successfully' };
            res.json(response);
        }).catch(() => {
            let response = { status: false, data: {}, message: 'Server Error, Try later.' };
            res.json(response);
        })
    },
    getAllCakes: (req, res, next) => {
        var post = req.query;
        var cond = {};
        if (post.id >= 0 && post.id != undefined) {
            cond = { id: post.id };
        }
        cake_master.findAll({ where: cond }).then((data) => {
            if (post.id >= 0 && post.id != undefined) {
                if (data.length) {
                    data = data[0];
                }
            }
            let response = { status: true, data: data, message: '' };
            res.json(response);
        }).catch(() => {
            let response = { status: false, data: {}, message: 'Server Error, Try later.' };
            res.json(response);
        })
    },

    deleteCake: (req, res, next) => {
        var post = req.query
        cake_master.destroy({ where: { id: post.id } }).then((data) => {
            if (data) {
                var response = { status: true, data: {}, message: 'Data deleted successfully' };
            } else {
                var response = { status: false, data: {}, message: 'No records found.' };
            }
            res.json(response);
        }).catch((err) => {
            let response = { status: false, data: err, message: 'Server Error, Try later.' };
            res.json(response);
        })
    }
}

module.exports = index_helper;
