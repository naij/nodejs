var mongoose = require('mongoose');
var config = require('../config').config;

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
    else{
        console.log('connect to "%s" success', config.db);
    }
});

// models
require('./article');

var Article = mongoose.model('article');
// var article = new Article();
// article.title="lalala";
// article.content="test";
// article.update="2012-08-07";
// article.save(function(err){
//     if(err){
//         console.log(err);
//     }
// });
//
// Article.find(function(err,doc){
//     console.log(doc);
// });

exports.Article = mongoose.model('article');
