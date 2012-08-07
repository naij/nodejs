var site = require('../controllers/site');

module.exports = function(app) {
    // home page
    app.get('/', site.index);

    app.get('article/:aid', site.article);
}