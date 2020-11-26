var mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true});

var Schema = mongoose.Schema;

var tagSchema = new Schema({

    tagname: String

},{timestamps: true});

var tagsDatabase = mongoose.model('tags', tagSchema);

// var tag1 = tags({tagname: "tagnamefrommongodb"}).save((err) => {

//     if(err)
//         throw err;
    
//     console.log("Object inserted");

// });

var data = [{ bookmarkUrl:'www.xyz.com', bookmarkTitle: 'asdfsa', bookmarkPublisher: 'adsfgsfd',bookmarkTags: ['tag1','tag2','tag3']},{bookmarkUrl:'www.xyz.com', bookmarkTitle: 'asdfsa', bookmarkPublisher: 'adsfgsfd',bookmarkTags: ['tag1','tag2','tag3']}];
// var tags = [{tagname: 'politics'},{tagname: 'science'},{tagname: 'sports'}];

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

        tagsDatabase.find({}, (err,data) => {

            if(err)
                throw err;

            console.log(data);
            
            res.render('tags',{tags: data}); 
        });
    });

    app.post('/tags',urlencodedParser,(req,res) => {

        tagsDatabase(req.body).save((err,data) => {

                if(err)
                    throw err;

                console.log(data);

                res.render('tags',{tags: data});
            
            });
    });

    app.delete('/tags/:item',(req,res) => {
        
        console.log(req.params.item);

        tagsDatabase.find({tagname: req.params.item}).remove((err,data) => {

            if(err)
                throw err;
            else
                console.log(data);

            res.render('tags',{tags: data});

        });

    });

};