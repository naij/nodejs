var site = require('../controllers/site');
var article = require('../controllers/article');

module.exports = function(app) {
    // 首页
    app.get('/', site.index);

    // 文章详情
    app.get('/article/:aid', article.index);
}