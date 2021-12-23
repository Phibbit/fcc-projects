require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('main'));
app.use("/Timestamp-Microservice", express.static('Timestamp-Microservice'));
app.use("/Headerparser-Microservice", express.static('Headerparser-Microservice'));

app.get("/Timestamp-Microservice/api/:date?", (req, res) => {
  let input = req.params.date;
  let timestamp = parseInt(input);
  let times = { unix: null, utc: null };
  let e = { error: "Invalid Date" };

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

app.get("/Headerparser-Microservice/api/whoami", (req, res) => {
  console.log(req.headers)
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
