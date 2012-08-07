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