'use strict'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(cors());
const connectDB = require('./config/db');
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 3001;

const User = require('./models/Users')
const TotalAmt = require('./models/TotalAmt')

const newUser = new User({
  name: 'Prabin Singh',
  email: 'pravin544@gmail.com', 
  countries:
    [
      {
        name: 'Nepal',
        confirmedCases: 123455,
        deaths: 123,
        recovered: 123
      },

      {
          name: 'India',
          confirmedCases: 123455,
          deaths: 123,
          recovered: 123
      } 
    ]
})

newUser.save();

const newTotalAmt = new TotalAmt({
  name: 'Donation',
  totalAmt: 123,
})

newTotalAmt.save();


// app.get('/', (request, response) => {
//     // response.send('hello! from best-books backend');
//     User.find((err, userData) => {
//       response.send(userData);
//     });
//   });

// app.get('/users/:email', (request, response) => {
//   User.find({email: request.params.email},
//     (err, userData) => {
//       response.send(userData)
//     });
// });



// app.get('/books', getAllUsers)

// app.post('/books', (req, res) => {
//   // for post requests, data is inside of the body
//   // as long as we have the app.use(express.json()) line at the top of the file
//   console.log(req.body);
//   // find the relevant user in the database
//   User.find({email: req.body.email}, (err, userData) => {
//     if(userData.length < 1) {
//       res.status(400).send('user does not exist');
//     } else {
//       // add the new gift info to that user
//       let user = userData[0];
//       user.books.push({
//         name: req.body.name,
//         description: req.body.description,
//         status: req.body.status
//       });
//       // save the user
//       user.save().then( (userData) => {
//         console.log(userData);
//         res.send(userData.books);
//       });
//     }
//   });
// });

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


// app.get('/amt', (req, res) => {
//   //TotalAmt.findAll({ name: req.query.name }, (err, totalAmt) => {
//   TotalAmt.find({name: "Donation"}, (err, totalAmt) => {
//     console.log(totalAmt[0].totalAmt)
//   });
// });

// app.delete('/books/:id', (req, res) => {
//   let email = req.query.user;
//   // find the user
//   User.find({email: email}, (err, userData) => {
//     let user = userData[0];
//     // delete the book
//     user.books = user.books.filter(book => `${book._id}` !== req.params.id);
//     // save the user
//     console.log(user.books);
//     user.save().then(userData => {
//       res.send(userData.books);
//     });
//   });
// });

// app.put('/books/:id', (req, res) => {
//   // find the user
//   let email = req.body.user;
//   Users.find({email: email}, (err, userData) => {
//     // update the book
//     let bookId = req.params.id;
//     let user = userData[0];
//     user.books.forEach(book => {
//       if(`${book._id}` === bookId) {
//         // we found the correct book! update it
//         book.name = req.body.name;
//         book.description = req.body.description;
//       }
//     });
//     // save the updated user/book
//     user.save().then(savedUserData => {
//       // send back the new data
//       res.send(savedUserData.books);
//     });
//   });
// });

// function getAllUsers(request, response) {
//   console.log(request)
//   const name = request.query.name;
//   console.log({name});
//   User.find({name}, (err, person) => {
//     if(err) return console.error(err);
//     console.log({person})
//     if (person && person.length > 0){
//       response.send(person[0].books);
//     } else {
//       response.status(400).send('user does not exist');
//     }
    
//   })
// }


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)); 