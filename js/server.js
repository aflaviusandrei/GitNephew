let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt-nodejs');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
const { gatherData } = require("./git_fetch");
const userDB = require('./UserSchema');
let router = express.Router();

let udb = userDB;

mongoose.connect('mongodb+srv://omaygad:elcomandante@edociif-5wsli.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .catch(function (err) {
        console.log(err);
    });

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('frontend', {
    extensions: ['html', 'htm']
}));

app.post('/register', function (req, res) {
    console.log(req.body);
    let data = req.body;
    console.log(data);
    if (data !== '{}') {
        bcrypt.hash(data.password, null, null, function (err, hash) {
            data.password = hash;
            let newUser = new udb.user(data);
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
    let data = req.body;


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
                    let payload = {
                        username: data.username
                    };


                    jwt.sign({ payload }, 'murePeSeDe', { expiresIn: '24h' }, (err, token) => {
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
        let x = auth(req);
        const bunic = jwt.verify(x, 'murePeSeDe'); //console.log(bunic);

        data.bunic = bunic.payload.username;

        res.send(data);
        res.end(200);

        let newChild = new udb.gitData(data);

        newChild.save((err) => {
            if (err) {
                console.log(err)
            }
        })
    })
});

app.post('/db', function (req, res) {
        const token = auth(req);
        const decoded = jwt.verify(token, 'murePeSeDe');

        console.log(decoded.payload.username);

        userDB.gitData.find({ bunic: decoded.payload.username }, function (err, user) {
            //console.log(`${user} + on database right now`);
            res.send(user);
        }); 
});

function auth(req) {
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