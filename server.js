const express = require('express');
const request = require('got');
const path = require('path');


const app = express();
app.enable('trust proxy');

app.use(express.static('public'));
app.use(express.static('images'));


const METADATA_NETWORK_INTERFACE_URL = 'http://metadata/computeMetadata/v1/' +
'/instance/network-interfaces/0/access-configs/0/external-ip';

function getExternalIp () {
  const options = {
    headers: {
      'Metadata-Flavor': 'Google'
    },
    json: true
  };

  return request(METADATA_NETWORK_INTERFACE_URL, options)
    .then((response) => response.body)
    .catch((err) => {
      if (err || err.statusCode !== 200) {
        console.log('Error while talking to metadata server, assuming localhost');
        return 'localhost';
      }
      return Promise.reject(err);
    });
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/thanks', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/thanks.html'));
});

/*
app.get('/', (req, res, next) => {
  getExternalIp()
    .then((externalIp) => {
      res.status(200).send(`External IP: ${externalIp}`).end();
    })
    .catch(next);
});
*/

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});



