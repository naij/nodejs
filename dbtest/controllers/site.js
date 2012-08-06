// var topic_ctrl = require('./topic');
// var EventProxy = require('eventproxy').EventProxy;

exports.index = function(req, res, next) {
    res.render('index', {
        cnt : 'xxx'
    });
};