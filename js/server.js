var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://reversio:elcomandante@edociif-5wsli.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
.catch(function(err) {
    console.log(err);
});

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var user = require('./UserSchema.js');

app.use(express.static('frontend', {
    extensions: ['html', 'htm']
}));

app.post('/register', function(req, res) {
    var data = req.body;
    if(data !== '{}') {
        bcrypt.hash(data.password, null, null, function(err, hash) {
            data.password = hash;
            var newUser = new user(data);
            newUser.save(function(err) {
                if(err)
                    res.send({
                        success: false,
                        message: err._message
                    });
                else
                    res.send({
                        success: true,
                        message: 'User registered!'
                    });
            })
        });
    }
});

app.listen('4000');
console.log('Listening');