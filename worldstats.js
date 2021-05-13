'use strict';

const axios = require('axios');

function worldstats(req, res) {
  axios.get('https://api.quarantine.country/api/v1/summary/latest')
  .then(worlddata => {
    const worldArray = worlddata.data;
    //console.log(worldArray);
    res.status(200).send(worldArray);
  })
}

module.exports = worldstats;