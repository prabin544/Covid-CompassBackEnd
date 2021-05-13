'use strict';

const axios = require('axios');

function usastats(req, res) {
  axios.get(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.ACT_NOW_API_KEY}`)
  .then(usadata => {
    const usaArray = usadata.data;
    //console.log(usaArray);
    res.status(200).send(usaArray);
  })
}

module.exports = usastats;