require('dotenv').config();
var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/hello', (req, res) => {
  res.json({greeting: 'hello API'});
});

let resObject = {};
app.get('/api/whoami', (req, res) => {
  let ipaddress = req.ip;
  let lan = req.get('Accept-Language');
  let sw = req.get('User-Agent');
  resObject['ipaddress'] = ipaddress;
  resObject['language'] = lan;
  resObject['software'] =  sw;

  res.json(resObject);
})

var listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});


// A request to / api / whoami should return a JSON object with your IP address in the ipaddress key.

// A request to / api / whoami should return a JSON object with your preferred language in the language key.

// A request to / api / whoami should return a JSON object with your software in the software key.
