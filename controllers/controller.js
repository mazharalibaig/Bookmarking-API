var mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('dotenv').config();

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true});

var data = [{link:'www.xyz.com',title:'asdfsa'},{link:'www.abc.com',title:'gvbhio'}];

var urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = function(app){

    app.get('/', (req,res) => {

        res.render('home-page');

    });

    app.get('/bookmarks', (req,res) => {

        console.log("ALL IS WELL!!\n");

        res.render('bookmarks',{bookmarks: data});

    });

    app.post('/bookmarks',urlencodedParser,(req,res) => {

        console.log(req.body);

        res.render('bookmarks',{bookmarks: data});
    });

    app.get('/tags', (req,res) => {

        console.log("ALL IS WELL!!\n");

        res.render('tags',{bookmarks: data});

    });

    app.post('/tags',urlencodedParser,(req,res) => {

        console.log(req.body);

        res.render('tags',{bookmarks: data});
    });

};