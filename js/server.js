var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const { gatherData } = require("./git_fetch");
const userDB = require('./UserSchema');
var router = express.Router();

let udb = userDB;

mongoose.connect('mongodb+srv://omaygad:elcomandante@edociif-5wsli.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .catch(function (err) {
        console.log(err);
    });

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('frontend', {
    extensions: ['html', 'htm']
}));

app.post('/register', function (req, res) {
    console.log(req.body);
    var data = req.body;
    console.log(data);
    if (data !== '{}') {
        bcrypt.hash(data.password, null, null, function (err, hash) {
            data.password = hash;
            var newUser = new udb.user(data);
            console.log(newUser);
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


    userDB.user.findOne({ username: data.username }, function (err, user) {
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


                    jwt.sign({ payload }, 'murePeSeDe', { expiresIn: '10m' }, (err, token) => {
                        res.json({
                            token
                        })
                    });

                    // var token = jwt.sign(payload, 'dfhdrfydrtd', { expiresIn: '1h' });
                    // if (token !== '')
                    //     res.send({
                    //         success: true,
                    //         message: 'Succesfully authenticated',
                    //         token: token
                    //     });
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

app.post('/git', tokenify, function (req, res) {

    console.log(req.body);
    gatherData(req.body.username).then(data => {
        //further db inplementation
        res.send(data);
    })

});


function tokenify(req, res, next) {
    jwt.verify(req.token, 'murePeSeDe', (err, authData) => {
        const hBearer = req.headers['authorization'];

        if (typeof hBearer !== 'undefined') {
            const bearer = hBearer.split(' ');

            const token = bearer[1];

            req.token = token;

            next();

        } else {
            res.sendStatus(403);
        }
    });
}



app.use('/admin', router);
app.listen('4000');
console.log('Listening');