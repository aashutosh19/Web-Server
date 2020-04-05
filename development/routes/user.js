const express = require('express');
const db = require('../config/db.config.js');
var path = require('path');
var fs = require('fs');
var session = '';
const bcrypt = require('bcryptjs');
const saltRounds = 10;



//create router
const router = express.Router()

//route for signup/register
router.post('/register', (req, res) => {

    console.log('username:' + req.body.username);
    console.log('password:' + req.body.password);
    //hash password
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        const queryString = "Insert into user(user_id, username, password, role_id, disable) values (@user_id, ?, ?, 1, 0);";
        console.log('Hashed password:' + hash);
        db.query(queryString, [req.body.username, req.body.password], (err, results) => {
            if (err) {
                return res.status(400).send({
                    err
                });
            } else {
                res.redirect('/login');
            }
        });
    });

});

//route to login and authenticate user
router.post('/auth', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const queryString = "select * from user where username = ? and password = ? and disable = 0;"

    db.query(queryString, [username, password], (err, results) => {

        if (err) {
            return res.status(400).send({
                err
            });

        }

        else {
            // if(req.body.username === username && req.body.password === password && disable === 0){
            //     res.redirect('/home.html');
            // }
            // else if(req.body.username !== username && req.body.password !== password && disable !== 0){
            //     res.send("Your account has been disabled or unknown account");
            // }

            if (results.length > 0) {
                console.log("role_id: " + results[0].role_id)
                console.log("disable: " + results[0].disable)
                if (results[0].role_id === 1) {
                    req.session.loggedIn = true;
                    req.session.username = username;
                    req.session.role_id = results[0].role_id;
                    res.redirect('/user');
                    console.log("User has signed in");
                }
                if (results[0].role_id === 2) {
                    req.session.loggedIn = true;
                    req.session.username = username;
                    req.session.role_id = results[0].role_id;
                    res.redirect('/admin')
                    console.log("Admin has signed in");
                }


                console.log("Username: " + req.session.username);
                console.log("Role_id : " + req.session.role_id);
            }
            else {
                res.send("Incorrect account information or account has been disabled");
                console.log("Incorrect account information or account has been disabled");
            }

            console.log(results);

        }

    });


});





//route for logout
  router.get('/logout' , (req, res) =>{

    req.session.destroy(function() {
        console.log("user/admin has signed out.")
    });
    res.redirect('/');
  });
  
  






module.exports = router