var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var fetch = require('node-fetch');
var getGitData = require('./log_repos.js');

mongoose.connect('mongodb+srv://reversio:elcomandante@edociif-5wsli.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .catch(function (err) {
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

app.post('/register', function (req, res) {
    var data = req.body;
    if (data !== '{}') {
        bcrypt.hash(data.password, null, null, function (err, hash) {
            data.password = hash;
            var newUser = new user.user(data);
            newUser.save(function (err) {
                if (err)
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

app.post('/login', function (req, res) {
    var data = req.body;

    user.findOne({ username: data.username }, function (err, user) {
        if (err)
            res.send({
                success: false,
                message: err._message
            });
        else if (user) {
            bcrypt.compare(data.password, user.password, function (err, response) {
                if (err)
                    console.warn(err._message);
                else if (response) {
                    var payload = {
                        username: data.username
                    };
                    var token = jwt.sign(payload, 'dfhdrfydrtd', { expiresIn: '1h' });
                    if (token !== '')
                        res.send({
                            success: true,
                            message: 'Succesfully authenticated',
                            token: token
                        });
                } else
                    res.send({
                        success: false,
                        message: 'Incorrect password'
                    });
            });
        } else
            res.send({
                success: false,
                message: 'No username found with the name of ' + data.username
            });
    });
});

app.post('/git', function (req, response) {
    let countRepos = [];
    let userData = {
        projectNames: '',
        projectCount: '',
    };

    fetch('https://api.github.com/users/funchal/repos', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'token b4fec8be06201d9277b3cac763786b4d60a65923'
        },
    })
        .then(res => res.json()) // expecting a json response
        .then(json => {
            for (var i in json) {
                countRepos.push(json[i].name);
            }
            userData.projectNames = countRepos;
            userData.projectCount = json.length - 1;
            console.log(userData);
            var gitUser = new user.gitData(userData);
            gitUser.save(function(err) {
                if(err)
                    console.log(err);
                else {
                    response.send({
                        success: true,
                        message: 'Success',
                        userData
                    });
                }
            });
        });
});

app.listen('4000');
console.log('Listening');