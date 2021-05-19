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
const connectDB = require('./config/db');

connectDB()

// mongoose.connect('mongodb://localhost:27017/covid-compass', { useNewUrlParser: true, useUnifiedTopology: true });

const { User } = require('./models/User');
const TotalAmt = require('./models/TotalAmt')

const PORT = process.env.PORT || 3001;

const newUser = new User({
  userEmail: 'michael3hendricks@gmail.com',
  savedLocations: [{locationName: 'Australia', locationCases: 30, locationRecovered: 50, locationDeaths: 90}],
});

newUser.save(function (err) {
  if(err) {
    console.log(err);
  } else {
    console.log('user saved');
  }
});

const newTotalAmt = new TotalAmt({
  name: 'Donation',
  totalAmt: 123,
})

newTotalAmt.save();

app.get('/users', (req, res) => {
  User.find((err, newUserData) => {
    res.send(newUserData);
  });
})

app.get('/users/:email', (req, res) => {
  User.find({userEmail: req.query.user}, (err, userData) => {
    if(userData.length < 1) {
      // create the user!
      let newUser = new User({userEmail: req.query.user});
      newUser.save().then(newUserData => {
        console.log(userData)
        res.send([newUserData]);
      });
    } else {
      
      res.send(userData);
    }
  });
});


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
      let newUser = new User({
        userEmail: req.query.user,
        savedLocations: [
          {locationName: req.body.savedCountryName,locationCases: req.body.savedCountryConfirmed,locationRecovered:req.body.savedCountryRecovered,locationDeaths:req.body.savedCountryDeaths}
        ]
      });
      newUser.save().then(newUserData => {
        res.send([newUserData]);
      });
    } else {
      let user = userData[0];
      user.savedLocations.push({
        locationName: req.body.savedCountryName,
        locationCases: req.body.savedCountryConfirmed,
        locationRecovered: req.body.savedCountryRecovered,
        locationDeaths: req.body.savedCountryDeaths,

      });
      user.save().then((newUserData) => {
          res.send([newUserData]);
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

app.post('/amt', (req, res) => {
  console.log(req.body);
  TotalAmt.update(
    { name: "Donation" },
    { $inc: { totalAmt: req.body.amt } }
    ).then(userData => {
      res.send("Amt Updated");
  });
});

app.get('/amt', (request, response) => {
TotalAmt.find({name: "Donation"}, (err, totalAmt) => {
  if(err) return console.error(err);
  if (totalAmt && totalAmt.length > 0){
    response.status(200).send((totalAmt[0].totalAmt).toString());
  } else {
    response.status(400).send('user does not exist');
  }
  
})
});



app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
