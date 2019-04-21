const express = require('express');
const router = express.Router();
let bcrypt = require('bcrypt-nodejs');
let jwt = require('jsonwebtoken');
const userDB = require('../models/UserSchema');

router.post('/', (req, res) => {
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


module.exports = router;