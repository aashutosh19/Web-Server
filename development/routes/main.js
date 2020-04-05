const express = require('express')
const db = require('../config/db.config.js');
var path = require('path');
var fs = require('fs');


//create router
const router = express.Router()

function requireLogin(req, res, next) {
    if (req.session.loggedIn) {
        next(); // allow the next route to run
    } else {
        // require the user to log in
        res.redirect("/login"); // or render a form, etc.
        console.log("Must log in as a User");
    }
}



function requireAdmin(req, res, next) {
    if (req.session.loggedIn && req.session.role_id === 2) {
        next(); // allow the next route to run
    } else {
        // require the user to log in
        res.redirect("/login"); // or render a form, etc.
        console.log("Must log in as an Admin");
        console.log("Role_id must be 2, role_id: " + req.session.role_id);
    }
}


router.get('/', (req, res) => {
    res.render('login');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/submitIssue', requireLogin, (req, res) => {
    res.render('submitIssue', {
        'username': req.session.username
    })
})

router.all("/user/*", requireLogin, function (req, res, next) {
    next(); // if the middleware allowed us to get here,
    // just move on to the next route handler
});

router.get('/user', requireLogin, (req, res) => {
    console.log('Inside http://localhost:3000/user :');
    console.log('session.username: ' + req.session.username);
    console.log('session.role_id: ' + req.session.role_id);
    const queryString = "SELECT * FROM issue, status, user WHERE issue.status_id = status.status_id AND issue.user_id = user.user_id ORDER BY `issue_id` ASC;";

    db.query(queryString, (err, results) => {

        if (err) {
            return res.status(400).send({
                err
            });
        }

        else {
            console.log(results);

            res.render('user', {
                'username': req.session.username,
                'issues': results
            });
        }
    });
});

// Automatically apply the `requireLogin` middleware to all
// routes starting with `/admin`
router.all("/admin/*", requireAdmin, function (req, res, next) {
    next(); // if the middleware allowed us to get here,
    // just move on to the next route handler
});

router.get("/admin", requireAdmin, function (req, res) {
    console.log('Inside http://localhost:3000/admin :');
    console.log('session.username: ' + req.session.username);
    console.log('session.role_id: ' + req.session.role_id);
    const queryString = "SELECT * FROM issue, status, user WHERE issue.status_id = status.status_id AND issue.user_id = user.user_id ORDER BY `issue_id` ASC;";
    const queryUser = "SELECT * FROM user, user_role where user.role_id = user_role.role_id ORDER BY `user_id` ASC;";


    db.query(queryString, (err, result1) => {

        if (err) {
            return res.status(400).send({
                err
            });
        }

        else {
            //console.log(results);
            // res.render('admin',{
            //     'username': req.session.username,
            //     'issues': results
            // });


            db.query(queryUser, (err, result2) => {

                if (err) {
                    return res.status(400).send({
                        err
                    });
                }

                else {
                    console.log(result1);
                    console.log(result2);

                    res.render('admin', {
                        'username': req.session.username,
                        'issues': result1,
                        'users': result2
                    });
                }
            });
        }


    });

    // db.query(queryUser, (err, results) => {

    //     if(err){
    //         return res.status(400).send({
    //             err
    //         });
    //     }

    //     else{
    //         console.log(results);

    //         res.render('admin',{
    //             'username': req.session.username,
    //             'users': results
    //         });
    //     }

    // });



});

module.exports = router