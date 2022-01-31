const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ClientSchema = new schema ({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    clientName: {
        type: String,
        required: [true, 'Client name is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;