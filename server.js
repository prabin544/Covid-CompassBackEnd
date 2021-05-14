'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const usastats = require('./usastats.js');
const usahistorical = require('./usahistorical.js');
const worldstats = require('./worldstats.js');
app.use(cors());
app.use(express.json());
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/covid-compass', { useNewUrlParser: true, useUnifiedTopology: true });

const { User } = require('./models/User');

const PORT = process.env.PORT || 3001;

//const myUser = new User({
  //userName: 'Michael',
  //savedLocations: [{locationName: 'Mexico'}],
  //userEmail: 'michael3hendricks@gmail.com',
//});

//myUser.save(function (err) {
  //if(err) {
    //console.log(err);
  //} else {
    //console.log('user saved');
  //}
//});

app.get('/users', (req, res) => {
  User.find((err, databaseResults) => {
    res.send(databaseResults);
  });
})

app.get('/', (req, res) => {
  res.send('hello, world');
});

app.get('/usastats', usastats);
app.get('/usahistorical', usahistorical)

app.get('/worldstats', worldstats);



app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
