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
  //userName: 'David',
  //userEmail: 'michael3hendricks@gmail.com',
  //savedLocations: [{locationName: 'Australia', locationCases: 30, locationRecovered: 50, locationDeaths: 90}],
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

app.post('/users', (req, res) => {
  let user = req.query.user;
  console.log(user);
  User.find({ userEmail: user}, (err, userData) => {
    if (userData.length < 1) {
      res.send(400).send('user does not exist');
    } else {
      userData[0].savedLocations.push({
        locationName: req.body.savedCountryName, locationCases: req.body.savedCountryConfirmed,
        locationRecovered: req.body.savedCountryRecovered,
        locationDeaths: req.body.savedCountryDeaths,

      });
      userData[0].save().then(() => {
        User.find((err, databaseResults) => {
          res.send(databaseResults);
        });
      })
    }
  })
});

app.get('/users/:id', (req, res) => {
  let email = req.query.user;
  User.find({ userEmail: email},(err, userData) => {
    let user = userData[0];
    user.savedLocations = user.savedLocations.filter(location => `${location.loationName}` !== req.params.id);
    user.save().then(userData => {
      res.send(userData.savedLocations);
    });
  });
})

app.delete('/users/:id', (req, res) => {
  let email = req.query.user;
  User.find({ userEmail: email},(err, userData) => {
    let user = userData[0];
    user.savedLocations = user.savedLocations.filter(location => `${location._id}` !== req.params.id);
    user.save().then(userData => {
      res.send(userData.savedLocations);
    });
  });
})



app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
