const express = require('express');
const router = express.Router();
const { auth } = require('../auth');
let jwt = require('jsonwebtoken');
const userDB = require('../models/UserSchema');
const { gatherData } = require('./git_fetch');

router.post('/', tokenify, function (req, res) {

    gatherData(req.body.username).then(data => {
        //further db inplementation
        let x = auth(req);
        const bunic = jwt.verify(x, 'murePeSeDe'); //console.log(bunic);
        data.bunic = bunic.payload.username;
        data.username = req.body.username;


        res.send(data);
        res.end(200);


        let newChild = new userDB.gitData(data);


        newChild.save((err) => {
            if (err) {
                console.log(err)
            }
        })
    })
});


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