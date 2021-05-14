const mongoose = require ('mongoose');
const { Schema } = mongoose;


const locationSchema = new Schema({
  locationName: String,
  locationCases: Number,
  locationRecovered: Number,
  locationDeaths: Number,
})


const userSchema = new Schema ({
  name: String,
  savedLocations: [locationSchema],
  userEmail: String
});


const User = mongoose.model('User', userSchema);
module.exports = {User};