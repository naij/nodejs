var article_ctrl = require('./article');
//var EventProxy = require('eventproxy').EventProxy;

exports.index = function(req, res, next) {
    article_ctrl.get_full_article(function(err, doc){
        if (err) {
            next(err);
        }

        res.render('index', {
            title : 'My Blog',
            article : doc
        });
    });
};

exports.article = function(req, res, next) {
    var article_id = req.params.aid;

    if (article_id.length !== 24) {
        console.log('此话题不存在或已被删除。');
        return;
    }

    article_ctrl.get_article_by_id(article_id,function(err, doc){
        if (err) {
            next(err);
        }

        res.render('article', {
            title : 'My Blog',
            article : doc
        });
    });
};