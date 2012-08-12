var sanitize = require('validator').sanitize;
var markdown = require('markdown-js');
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


exports.showEdit = function(req, res, next){
    var article_id = req.params.aid;

    if (!req.session.user) {
        return res.redirect('home');
    }

    if (article_id.length !== 24) {
        console.log('此话题不存在或已被删除。');
        return;
    }

    get_article_by_id(article_id,function(err, doc){
        if (err) {
            next(err);
        }

        res.render('article/edit', {
            article : doc
        });
    });
}

exports.edit = function(req, res, next){
    var id = sanitize(req.body.id).trim();
    var title = sanitize(req.body.title).trim();
    var content = req.body.content;

    content = markdown.makeHtml(content);

    get_article_by_id(id,function(err, doc){
        if (err) {
            next(err);
        }

        doc.title = title;
        doc.content = content;
        doc.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('home');
        });
    });
}


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