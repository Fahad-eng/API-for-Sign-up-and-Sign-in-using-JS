const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bCrypt = require('bcrypt');
const Client = require('../model/client');
const jwt = require('jsonwebtoken');

// router.use(express.static('SignUp'));

// router.get('/signup', function(req, res){
//     res.sendFile('index.html', {
//         root: './SignUp'
//     });
// });

// router.post('/submit', (req, res) => {
//     console.log(req.body);
//     res.render('index', ({
//         title: 'Form',
//         h1: 'Data Saved Successfully'
//     }));
// });

router.post('/signup', (req,res, next) => {
    Client.find({email: req.body.email}).exec().then(user => {
        if (user.length >= 1){
            return res.status(422).json({
                message: 'User already exists'
            });
        } else {
            bCrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        error: err.message
                    });
                }
                else {
                    const client = new Client ({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        clientName: req.body.clientName,
                        password: hash
                    });
                    client.save().then((client) => {
                        res.json({
                            message: 'User saved'
                        });
                    }).catch(err => {
                        res.status(501).json({
                            error: err.message
                        });
                        console.log(err.message);
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {
    Client.find({ email: req.body.email}).exec().then(user => {
        if (user.length < 1) {
            res.status(401).json({
                message: 'Authorization failed'
            });
        }
        bCrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                res.status(401).json({
                    message: 'Authorization failed'
                });
            } else if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, {
                    expiresIn: "10h"
                });
                res.status(200).json({
                    message: 'Authorization successful',
                    token: token
                });
            } else {
                res.status(401).json({
                    message: 'Authorization failed'
                });
            }
        });
    })
    .catch(err => {
        res.status(501).json({
            error: err.message
        });
        res.end();
    })
});

router.delete('/:clientId', (req, res, next) => {
    Client.remove({ _id: req.params.clientId }).exec().then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    }).catch(err => {
        console.log(err.message);
        res.status(500).json({
            error: err.message
        });
    });
});

module.exports = router;
