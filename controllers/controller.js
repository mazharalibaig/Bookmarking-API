var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//to hide mongodbURL
require('dotenv').config();

//connecting to database
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true});

// Both Schemas present below
var Schema = mongoose.Schema;

var tagSchema = new Schema({

    tagname: {
        type: String,
        unique: true
    }

},{timestamps: true});

var bookmarkSchema = new Schema({

    bookmarkUrl: {
        type: String,
        unique: true
    },
    bookmarkTitle: {
        type: String
    },
    bookmarkPublisher: {
        type: String
    },
    bookmarkTopicTags: [String]

},{timestamps: true});

// Models here
var tagsDatabase = mongoose.model('tags', tagSchema);

var bookmarksDatabase = mongoose.model('bookmarks', bookmarkSchema);

// for parsing body of requests
var urlencodedParser = bodyParser.urlencoded({ extended: true });


module.exports = function(app){

    app.get('/', (req,res) => {

        res.render('home-page');

    });

    app.get('/bookmarks', (req,res) => {

        //listing all bookmarks
        bookmarksDatabase.find({}, (err,data) => {

            if(err)
                throw err;

            res.render('bookmarks',{bookmarks: data}); 

        });

    });

    app.post('/bookmarks',urlencodedParser,(req,res) => {

        // as tags are seperated by spaces we are creating a new array to store all tag names
        var tagsStringArr = req.body.bookmarkTags.split(" ");

        // object that represents bookmark schema
        var bookmarkObject = {

            bookmarkUrl: req.body.bookmarkUrl, 
            bookmarkTitle: req.body.bookmarkTitle, 
            bookmarkPublisher: req.body.bookmarkPublisher, 
            bookmarkTopicTags: tagsStringArr
        
        };

        // function to check whether tag is in database or not, if not will be inserted
        tagsStringArr.forEach( (e) => {

            tagsDatabase.find({tagname: e}, (err,data) => {

                if(err)
                    throw err;
                
                // if not found in DB
                if(data.length === 0)
                {
                    // new tag inserted
                    tagsDatabase({tagname: e}).save((err,data) => {

                        if(err)
                        {
                            console.log("Error in creating tag\n");
                            throw err;
                        }

                    });
                }

            });
        
        });

        // new bookmark created after ensuring all tags inserted in DB
        bookmarksDatabase(bookmarkObject).save((err,data) => {

            if(err)
                throw err;

            console.log(data);

            res.render('bookmarks',{bookmarks: data});

        });
    });

    app.delete('/bookmarks/:url', (req,res) => {

        // finding the document in DB and removing it
        bookmarksDatabase.find({bookmarkUrl: req.params.url}).remove( (err,data) => {

            if(err)
                throw err;

            res.render('bookmarks',{bookmarks: data});

        });

    });

    app.get('/tags', (req,res) => {

        // listing all tags
        tagsDatabase.find({}, (err,data) => {

            if(err)
                throw err;
            
            res.render('tags',{tags: data}); 
        });
    });

    app.post('/tags',urlencodedParser,(req,res) => {

        // inserting tag into DB
        tagsDatabase(req.body).save((err,data) => {

                if(err)
                    throw err;

                res.render('tags',{tags: data});
            });
    });

    app.delete('/tags/:tag',(req,res) => {

        //finding tag and deleting it
        tagsDatabase.find({tagname: req.params.tag}).remove((err,data) => {

            if(err)
                throw err;

            res.render('tags',{tags: data});
        });
    });

};