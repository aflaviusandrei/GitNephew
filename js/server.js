let express = require('express');
const app = express();
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const login = require('./user_handler/login');
const register = require('./user_handler/register');
const git = require('./db_handler/git');
const db = require('./db_handler/db');


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
app.use('/git', git); //create nephew
app.use('/db', db); //create nephew



const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Port ${port} is live right now...`));
