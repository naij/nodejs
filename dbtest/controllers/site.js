var article_ctrl = require('./article');
var util = require('../libs/util');
//var EventProxy = require('eventproxy').EventProxy;

exports.index = function(req, res, next) {
    article_ctrl.get_full_article(function(err, doc){
        if (err) {
            next(err);
        }

        var tempDate = '';

        for(var i=0;i<doc.length;i++){
            tempDate = util.format_date(doc[i].update);
            doc[i].publishDate = tempDate;
        }

        res.render('index', {
            article : doc
        });
    });
};