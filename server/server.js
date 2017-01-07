var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use('/static', express.static('client'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, './../client/Html/main.html'));
});

app.listen(PORT, function(){
  console.log("Listening on port", PORT);
});