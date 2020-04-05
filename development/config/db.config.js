/**
 * @class
 * this class serves as setup to connect to mysql.
 */

const mysql = require('mysql')

//change password to your own password for mysql workbench connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Test123',
    database: 'csc651_db',
    port: 3306,
    multipleStatements: true
});

//check if database is connected
db.connect((err)=>{
    if(err){
        throw err;
    }
    else{
    console.log('Database Connected!');
    }
})


module.exports = db