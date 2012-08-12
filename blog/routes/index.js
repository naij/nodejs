var site = require('../controllers/site');
var article = require('../controllers/article');
var sign = require('../controllers/sign');

module.exports = function(app) {
    // 首页
    app.get('/', site.index);

    // 文章详情
    app.get('/article/:aid', article.index);

    // 文章编辑
    app.get('/edit/:aid', article.showEdit);
    app.post('/edit',article.edit);

    // 账户
    app.get('/signin', sign.showLogin);
    app.post('/signin', sign.login);
    app.get('/signout', sign.signout);
}