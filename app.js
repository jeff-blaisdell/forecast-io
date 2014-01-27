var express = require('express');
var app = express();
var Forecast = require('forecast');

var forecast = new Forecast({
  service: 'forecast.io',
  key: 'c4d2cc751f78d2f8c7d9ca03257baede',
  units: 'fahrenheit', // Only the first letter is parsed
  cache: true,      // Cache API requests?
  ttl: {           // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
	  minutes: 27,
	  seconds: 45
	}
});


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/weather/:latitude/:longitude', function(req, res){

  var latitude = req.params.latitude;
  var longitude = req.params.longitude;
  if (latitude && longitude) {
	forecast.get([latitude, longitude], function(err, weather) {
		if(err) {
			console.log(err);
			res.send(500, { message: 'Internal Server Error.' });
		} else {
			res.setHeader('Content-Type', 'application/json');
			res.send(weather);
		}
	});
  }
});

app.listen(9010);
console.log('Listening on port 9010');