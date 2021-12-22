// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {
  let input = req.params.date;
  let timestamp = parseInt(input);
  let times = {unix: null, utc: null};
  let e = {error: "Invalid Date"};

  if (input == undefined) {
    times.unix = Date.parse(new Date());
  }
  else if (input == timestamp.toString() && new Date(timestamp) != e.error) {
    times.unix = timestamp;
  } 
  else if (new Date(input) != e.error) {
    times.unix = Date.parse(input);
  }
  else {
    return res.json(e)
  }

  times.utc = new Date(times.unix).toUTCString();
  res.json(times);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
