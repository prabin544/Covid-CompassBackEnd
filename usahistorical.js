'use strict';

const axios = require('axios');

function usahistorical(req, res) {
  axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.ACT_NOW_API_KEY}`)
  .then(usahistoricaldata => {
    const usahistoryArray = usahistoricaldata.data;
    //console.log(usaArray);
    res.status(200).send(usahistoryArray);
  })
}

module.exports = usahistorical;