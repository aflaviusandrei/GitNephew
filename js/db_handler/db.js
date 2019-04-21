const express = require('express');
const router = express.Router();
const { auth } = require('../auth');
let jwt = require('jsonwebtoken');
const userDB = require('../models/UserSchema');



router.post('/', function (req, res) {
    const token = auth(req);
    const decoded = jwt.verify(token, 'murePeSeDe');

    console.log(decoded.payload.username);

    userDB.gitData.find({ bunic: decoded.payload.username }, function (err, user) {
        //console.log(`${user} + on database right now`);
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }    
    });
});


module.exports = router;