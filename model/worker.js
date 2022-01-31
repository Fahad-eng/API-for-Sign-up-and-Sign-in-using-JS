const req = require('express/lib/request');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const locationSchema = new schema ({
    workerName: {
        type: String,
        required: [true, 'Name is required'] 
    },
    expertise: {
        type: String,
        required: [true, 'Expertise is required']
    },
    available: {
        type: Boolean,
        default: false,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            required: true,
            index: "2dsphere"
    }
}
});

let LocationCollection = mongoose.model('[lng, lat]', locationSchema);

module.exports = LocationCollection;