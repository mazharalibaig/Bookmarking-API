var mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('dotenv').config();

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true});

var urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = function(app){

    app.get('/', (req,res) => {

        console.log("ALL IS WELL!!\n");

        res.end('Sab Changa Si!\n');

    });

};