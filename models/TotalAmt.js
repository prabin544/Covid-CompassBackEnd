const mongoose = require('mongoose');
const { Schema } = mongoose;

const TotalAmtSchema = new Schema({
  name: {
    type: String,
  },  
  totalAmt: {
        type: Number,
      },
});

// make a model out of the schema
const TotalAmt = mongoose.model('TotalAmt', TotalAmtSchema);

// export the model
module.exports = TotalAmt;