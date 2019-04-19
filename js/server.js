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
                            token,
                            success: true
                        })
                        console.log(token);
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

app.post('/git', tokenify, function (req, res) {

    gatherData(req.body.username).then(data => {
        //further db inplementation
        let x = auth(req, res);
        let bunic = jwt.verify(x, 'murePeSeDe');
        console.log(bunic);
        data.bunic = bunic.payload.username;
        res.send(data);
        res.end(200);
        var newChild = new udb.gitData(data);
        newChild.save((err) => {
            if (err) {
                console.log(err)
            }
        })
    })
});

app.post('/db', function (req, res) {
    let hBearer = req.headers['x-access-token'] || req.headers['authorization'];
    if (typeof hBearer !== 'undefined') {
        const bearer = hBearer.split(' ');

        const token = bearer[1];
        var decoded = jwt.verify(token, 'murePeSeDe');
        console.log(decoded.payload.username);
        userDB.gitData.find({ bunic: decoded.payload.username }, function (err, user) {
            console.log(`${user} + on database right now`);
            res.send(user);
        });
    }
});

function auth(req, res) {
    let hBearer = req.headers['x-access-token'] || req.headers['authorization'];

    if (typeof hBearer !== 'undefined') {

        const bearer = hBearer.split(' ');
        const token = bearer[1];

        return token;
    }
}

//TODO: CLEAN FUNCTIONS!!!



function tokenify(req, res, next) {
    let hBearer = req.headers['x-access-token'] || req.headers['authorization'];
    if (typeof hBearer !== 'undefined') {
        const bearer = hBearer.split(' ');

        const token = bearer[1];
        jwt.verify(token, 'murePeSeDe', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                req.token = token
                next();
            }
        });

    } else {
        res.sendStatus(403);
    }

}


app.use('/admin', router);
app.listen('4000');
console.log('Listening');