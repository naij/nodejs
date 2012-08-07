var models = require('../models');
var Article = models.Article;

// Article.find(function(err, doc) {
//     console.log(doc);
// });

function get_full_article(callback) {
    Article.find(function(err, doc) {
        if (err) return callback(err);
        callback(null, doc);
    });
}

exports.get_full_article = get_full_article;