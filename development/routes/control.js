const express = require('express')
const db = require('../config/db.config.js');

//create router
const router = express.Router();

//update disable status 
router.put('/disableUser', (req, res) => {
    const disable = req.query.disable;
    const user_id = req.query.user_id;
    const queryDisable = "UPDATE user SET disable = ? where user_id = ?;";
    db.query(queryDisable, [disable, user_id], (err, result2) => {
        if (err) {
            return res.status(400).send({
                err
            });
        }
        else {
            console.log('Sucessfully updated disable on user_id: ' + user_id);
            res.status(200).send(result2);
        }

    })

  
});


//delete issue
router.delete('/deleteIssue', (req, res) => {
    var issue_id = req.query.issue_id;
    const queryDeleteIssue = "DELETE FROM issue WHERE issue_id = ?";

    db.query(queryDeleteIssue, [issue_id], (err, results) => {
        if (err) {
            return res.status(400).send({
                err
            });
        }
        else {
            console.log("Successfully deleted issue with issue_id: " + issue_id);
            res.status(200).send(results);
        }



    })
});



//delete user
router.delete('/deleteUser', (req, res) => {
    var user_id = req.query.user_id;
    const queryDeleteUser = "DELETE FROM user WHERE user_id = ?;";
    console.log("user_id: " + user_id)
    db.query(queryDeleteUser, [user_id], (err, results) => {
        if (err) {
            return res.status(400).send({
                err
            });
        }
        else {
            console.log("Successfully deleted user with user_id: " + user_id);
            res.status(200).send(results);
        }

    })



});





module.exports = router