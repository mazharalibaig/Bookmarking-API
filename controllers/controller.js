var mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('dotenv').config();

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true});

var data = [{link:'www.xyz.com',title:'asdfsa'},{link:'www.abc.com',title:'gvbhio'}];

var urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = function(app){

    app.get('/', (req,res) => {

        console.log("ALL IS WELL!!\n");

        // res.write(data[0].link);

        res.render('bookmarks',{bookmarks: data});

        res.end('Sab Changa Si!\n');

    });

};