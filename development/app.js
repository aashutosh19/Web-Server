const express = require('express')
const app = express();
const path = require('path');
const port = 3000;

//use hbs view engine
const hbs = require('hbs');

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'hbs');

//use bodyParser middleware
const bodyParser = require('body-parser');

//use session
var session = require('express-session');



//set public folder as static folder for static file
app.use(express.static('./views'));


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



const main = require('./routes/main.js');
app.use(main);

const user = require('./routes/user.js');
app.use(user);

const issue = require('./routes/issue.js');
app.use(issue);

const control = require('./routes/control.js');
app.use(control);


app.listen(port, () =>{
    console.log("Server is up listening on "+ port +" ...")
})