var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/frontend/', {
    extensions: ['html', 'htm']
}));

app.post('/register', function(req, res) {
    var data = req.body;
    console.log(data);
});

app.listen('4000');
console.log('Listening');