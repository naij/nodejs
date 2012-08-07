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

exports.Article = mongoose.model('article');
