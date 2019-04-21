const express = require('express');
const router = express.Router();
const { auth } = require('../auth');
let jwt = require('jsonwebtoken');
const userDB = require('../models/UserSchema');
const { gatherData } = require('./git_fetch');

router.post('/', tokenify, function (req, res) {

    gatherData(req.body.username).then(data => {

        let x = auth(req);
        const bunic = jwt.verify(x, 'murePeSeDe'); //console.log(bunic);
        data.bunic = bunic.payload.username;
        data.username = req.body.username;
        console.log(data.username);
        userDB.gitData.findOne({ username: req.body.username }, function (err, user) {
            //console.log(`${user} + on database right now`);
            if (err) {
                res.send(err);
            } else if (!user) {
                console.log(`adding new user - ${req.body.username} `);
                saveUser(data);
            }
            else {
                console.log(`user already exists, adding new parent - ${data.bunic}`);
                userDB.gitData.findOneAndUpdate({ username: req.body.username },{ $push: { bunic: data.bunic } },{ safe: true, upsert: true }, function (err, model) {
                        console.log(err);
                    });
            }
        });

    });
});

function saveUser(data) {
    let newChild = new userDB.gitData(data);
    newChild.save((err) => {
        if (err) {
            console.log(err)
        }
    })
}

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

module.exports = router;