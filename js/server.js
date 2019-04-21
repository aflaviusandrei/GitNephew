let express = require('express');
const app = express();
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
const { gatherData } = require("./db_handler/git_fetch");
const login = require('./user_handler/login');
const register = require('./user_handler/register');
const userDB = require('./models/UserSchema');
let udb = userDB;

mongoose.connect('mongodb+srv://omaygad:elcomandante@edociif-5wsli.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .catch(function (err) {
        console.log(err);
    });



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('frontend', {
    extensions: ['html', 'htm']
}));
app.use('/login', login);
app.use('/register', register);



app.post('/git', tokenify, function (req, res) {

    gatherData(req.body.username).then(data => {
        //further db inplementation
        let x = auth(req);
        const bunic = jwt.verify(x, 'murePeSeDe'); //console.log(bunic);
        data.bunic = bunic.payload.username;
        data.username = req.body.username;


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


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Port ${port} is live right now...`));
