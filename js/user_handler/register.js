const express = require('express');
const router = express.Router();
const userDB = require('../models/UserSchema');
let bcrypt = require('bcrypt-nodejs');
let udb = userDB.user;

router.post('/', function (req, res) {
    let data = req.body;
    console.log(data);

    if (data !== '{}') {
        bcrypt.hash(data.password, null, null, function (err, hash) {

            data.password = hash;
            let newUser = new userDB.user(data);
            console.log(newUser);

            newUser.save(function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send({
                        success: false,
                        message: err._message
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: 'User registered!'
                    });
                }
            })
        });
    }
});

module.exports = router;