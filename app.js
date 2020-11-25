var express = require('express');
var portNumber = process.env.PORT || 3000;
var controller = require('./controllers/controller');
var app = express();

// setup template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//firing controllers
controller(app);

//listen to port    
app.listen(portNumber,'0.0.0.0', () => {
    console.log('You are listening to port 3000');
});