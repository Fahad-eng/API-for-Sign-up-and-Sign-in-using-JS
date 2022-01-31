const express = require('express');
const bodYParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const workerAPI = require('./routes/workerAPI');
const clientAPI = require('./routes/clientAPI');
const dotenv = require('dotenv');

dotenv.config();

port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port}`));

mongoose.connect('mongodb://localhost/user');
mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodYParser.urlencoded({extended: false}));
app.use(bodYParser.json());

app.use('/api/worker', workerAPI);

app.use('/api/client', clientAPI);