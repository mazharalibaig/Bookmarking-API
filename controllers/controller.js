var mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('dotenv').config();

// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true});

var data = [{ bookmarkUrl:'www.xyz.com', bookmarkTitle: 'asdfsa', bookmarkPublisher: 'adsfgsfd',bookmarkTags: ['tag1','tag2','tag3']},{bookmarkUrl:'www.xyz.com', bookmarkTitle: 'asdfsa', bookmarkPublisher: 'adsfgsfd',bookmarkTags: ['tag1','tag2','tag3']}];
var tags = [{tagname: 'politics'},{tagname: 'science'},{tagname: 'sports'}];

var urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = function(app){

    app.get('/', (req,res) => {

        res.render('home-page');

    });

    app.get('/bookmarks', (req,res) => {

        res.render('bookmarks',{bookmarks: data});

    });

    app.post('/bookmarks',urlencodedParser,(req,res) => {

        console.log(req.body);

        var tagsArr = req.body.bookmarkTags.split(" ");

        console.log(tagsArr);

        data.push({bookmarkUrl: req.body.bookmarkUrl, bookmarkTitle: req.body.bookmarkTitle, bookmarkPublisher: req.body.bookmarkPublisher, bookmarkTags: tagsArr});

        res.render('bookmarks',{bookmarks: data});
    });

    app.get('/tags', (req,res) => {

        // console.log("ALL IS WELL!!\n");

        res.render('tags',{tags: tags});

    });

    app.post('/tags',urlencodedParser,(req,res) => {

        // console.log(req.body.tagname + 'from tag post');

        tags.push(req.body);

        // console.log(tags);

        res.render('tags',{tags: tags});
    });

};