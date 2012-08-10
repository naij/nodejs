var sanitize = require('validator').sanitize;
var crypto = require('crypto');
var config = require('../config').config;


/**
 * Show user login page.
 *
 * @param  {HttpRequest} req
 * @param  {HttpResponse} res
 */
exports.showLogin = function(req, res) {
    res.render('sign/signin');
};

/**
 * Handle user login.
 *
 * @param  {HttpRequest} req
 * @param  {HttpResponse} res
 * @param  {Function} next
 */
exports.login = function(req, res, next) {
    var loginname = sanitize(req.body.name).trim().toLowerCase();
    var pass = sanitize(req.body.pass).trim();

    if (!loginname || !pass) {
        return res.render('sign/signin', {
            error: '用户名或者密码错误'
        });
    }

    // User.findOne({
    //     'loginname': loginname
    // }, function(err, user) {
    //     if (err) return next(err);
    //     if (!user) {
    //         return res.render('sign/signin', {
    //             error: '用户不存在。'
    //         });
    //     }
    //     if (pass !== user.pass) {
    //         return res.render('sign/signin', {
    //             error: '密码错误。'
    //         });
    //     }
    //     // store session cookie
    //     gen_session(user, res);
    // });
};

// // sign out
// exports.signout = function(req, res, next) {
//     req.session.destroy();
//     res.clearCookie(config.auth_cookie_name, {
//         path: '/'
//     });
//     res.redirect(req.headers.referer || 'home');
// };

// // private
// function gen_session(user, res) {
//     var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.pass + '\t' + user.email, config.session_secret);
//     res.cookie(config.auth_cookie_name, auth_token, {
//         path: '/',
//         maxAge: 1000 * 60 * 60 * 24 * 30
//     }); //cookie 有效期30天
// }

// function encrypt(str, secret) {
//     var cipher = crypto.createCipher('aes192', secret);
//     var enc = cipher.update(str, 'utf8', 'hex');
//     enc += cipher.final('hex');
//     return enc;
// }

// function md5(str) {
//     var md5sum = crypto.createHash('md5');
//     md5sum.update(str);
//     str = md5sum.digest('hex');
//     return str;
// }