var models = require('../models');
var util = require('../libs/util');
var Article = models.Article;

exports.index = function(req, res, next) {
    var article_id = req.params.aid;

    if (article_id.length !== 24) {
        console.log('此话题不存在或已被删除。');
        return;
    }

    get_article_by_id(article_id,function(err, doc){
        if (err) {
            next(err);
        }

        //格式化时间
        var tempDate = util.format_date(doc.update);
        doc.publishDate = tempDate;

        res.render('article/article', {
            article : doc
        });
    });
};


function get_article_by_id(id, callback) {
    Article.findOne({_id: id}, function(err, doc) {
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