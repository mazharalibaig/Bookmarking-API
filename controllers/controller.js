var mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true});

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

var tagsDatabase = mongoose.model('tags', tagSchema);

var bookmarksDatabase = mongoose.model('bookmarks', bookmarkSchema);

// var tag1 = tagsDatabase({tagname: "tagnamefrommongodb"}).save((err) => {

//     if(err)
//         throw err;
    
//     console.log("Object inserted");

// });

// var tag1 = tagsDatabase.find({tagname: "tagnamefrommongodb"},(err,data) => {
    
//     console.log("Found object!");

//     console.log(data);
// });

// console.log(tag1);

// var x = bookmarksDatabase({bookmarkUrl: 'www.xyz.com',bookmarkTitle: 'this is a title',bookmarkPublisher: 'publisher ka naam',bookmarkTags: [tag1]}).save((err,data) => {

//     if(err)
//     {
//         console.log("inser error");
//         console.log(err);
//     }

//     console.log(data);

// });

// var data = [{ bookmarkUrl:'www.xyz.com', bookmarkTitle: 'asdfsa', bookmarkPublisher: 'adsfgsfd',bookmarkTags: ['tag1','tag2','tag3']},{bookmarkUrl:'www.xyz.com', bookmarkTitle: 'asdfsa', bookmarkPublisher: 'adsfgsfd',bookmarkTags: ['tag1','tag2','tag3']}];
// var tags = [{tagname: 'politics'},{tagname: 'science'},{tagname: 'sports'}];

var urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = function(app){

    app.get('/', (req,res) => {

        res.render('home-page');

    });

    app.get('/bookmarks', (req,res) => {

        bookmarksDatabase.find({}, (err,data) => {

            if(err)
                throw err;

            res.render('bookmarks',{bookmarks: data}); 

        });

    });

    app.post('/bookmarks',urlencodedParser,(req,res) => {

        console.log(req.body);

        var tagsStringArr = req.body.bookmarkTags.split(" ");

        var bookmarkObject = {

            bookmarkUrl: req.body.bookmarkUrl, 
            bookmarkTitle: req.body.bookmarkTitle, 
            bookmarkPublisher: req.body.bookmarkPublisher, 
            bookmarkTopicTags: tagsStringArr
        
        };

        tagsStringArr.forEach( (e) => {

            tagsDatabase.find({tagname: e}, (err,data) => {

                if(err)
                    throw err;

                if(data.length === 0)
                {
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

        console.log(bookmarkObject);

        bookmarksDatabase(bookmarkObject).save((err,data) => {

            if(err)
                throw err;

            console.log(data);

            res.render('bookmarks',{bookmarks: data});

        });
    });

    app.get('/tags', (req,res) => {

        tagsDatabase.find({}, (err,data) => {

            if(err)
                throw err;
            
            res.render('tags',{tags: data}); 
        });
    });

    app.post('/tags',urlencodedParser,(req,res) => {

        tagsDatabase(req.body).save((err,data) => {

                if(err)
                    throw err;

                res.render('tags',{tags: data});
            });
    });

    app.delete('/tags/:item',(req,res) => {
        
        console.log(req.params.item);

        tagsDatabase.find({tagname: req.params.item}).remove((err,data) => {

            if(err)
                throw err;

            res.render('tags',{tags: data});
        });
    });

};