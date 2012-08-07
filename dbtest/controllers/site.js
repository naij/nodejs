var article_ctrl = require('./article');
var config = require('../config').config;
//var EventProxy = require('eventproxy').EventProxy;

exports.index = function(req, res, next) {
    article_ctrl.get_full_article(function(err, doc){
        if (err) {
            next(err);
        }

        res.render('index', {
            title : config.name,
            article : doc
        });
    });
};