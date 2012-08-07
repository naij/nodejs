var models = require('../models');
var Article = models.Article;

function get_article_by_id(id, callback) {
    Article.findOne({_id: id}, function(err, topic) {
        if (err) return callback(err);
        callback(null, doc);
    });
}

function get_full_article(callback) {
    Article.find(function(err, doc) {
        if (err) return callback(err);
        callback(null, doc);
    });
}

exports.get_article_by_id = get_article_by_id;
exports.get_full_article = get_full_article;