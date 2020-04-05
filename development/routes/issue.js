/**
 * @module
 * this class will be used to handle get requests for issue
 */

const express = require('express')
const db = require('../config/db.config.js');

//create router
const router = express.Router();

router.get('/getIssue', (req, res) => {
    const queryString = "SELECT * FROM issue, status, user WHERE issue.status_id = status.status_id AND issue.user_id = user.user_id;"

    db.query(queryString, (err, results) => {

        if (err) {
            return res.status(400).send({
                err
            });
        }

        else {
            res.render('user', {
                'username': req.session.username,
                'issues': results
            });
        }
    });

});

router.post('/postIssue', (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    var username = req.session.username;

    //curent date
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


    var dateTime = date + ' ' + time;
    const query_postIssue = "INSERT INTO issue(issue_id, title, description, user_id, status_id, date) values (@issue_id, ? , ? , (SELECT user_id FROM user where username = ? ) , 1, ?);"


    db.query(query_postIssue, [title, description, username, dateTime], (err, results) => {

        if (err) {
            message = "Failed to submit issue: " + err;
            console.log(message);
            res.redirect('/submitIssue')
        } else {
            message = "Successfully submit issue";
            console.log(message);
            console.log('Body: ', req.body);
            res.redirect('/user')
        }
    });
});
























module.exports = router