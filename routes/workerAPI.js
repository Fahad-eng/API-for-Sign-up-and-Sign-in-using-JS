const express = require('express');
const router = express.Router();
const Worker = require('../model/worker');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
    Worker.aggregate([{
        $geoNear: {
           near: { type: "Point", coordinates: [parseFloat(req.query.lng) , parseFloat(req.query.lat)] },
           distanceField: "dist.calculated",
            maxDistance: 100000,
            spherical: true
        }
      }
    ]).exec((err, geometry) => {
        if(err) {
            console.log(err);
            return res.status(500).send({
                status: false,
                data: err
            });
        }
        if(geometry) {
            res.status(200).send( geometry);
        }
    })
});

router.post('/', checkAuth, (req, res, next) => {
    Worker.find({workerName: req.body.workerName}).then(user => {
        if (user.length >= 1){
            console.log(user.length)
            return res.status(422).json({
                message: 'Worker already exists'
            });
        } else {
            Worker.create(req.body).then(worker => {
                res.send(worker)
            }).catch(err => {
                res.status(422).json({
                    error: err.message
                });
            });
        }
    });
});

router.put('/:id', (req, res, next) => {
    Worker.findByIdAndUpdate({ _id: req.params.id}, req.body).then(result => {
        Worker.findOne({ _id: req.params.id}).then(result => {
            res.send(result);
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Worker.findByIdAndRemove({ _id: req.params.id }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        console.log(err.message);
        res.status(500).json({
            error: err.message
        });
    });
});

module.exports = router;