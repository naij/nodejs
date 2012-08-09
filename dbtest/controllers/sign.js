var sanitize = require('validator').sanitize;

// var crypto = require('crypto');
var config = require('../config').config;


/**
 * Show user login page.
 *
 * @param  {HttpRequest} req
 * @param  {HttpResponse} res
 */
exports.showLogin = function(req, res) {
    //req.session._loginReferer = req.headers.referer;
    res.render('sign/signin');
};


/**
 * define some page when login just jump to the home page
 * @type {Array}
 */
// var notJump = ['/active_account', //active page
// '/reset_pass', //reset password page, avoid to reset twice
// '/signup', //regist page
// '/search_pass' //serch pass page
// ];

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
    //             error: '这个用户不存在。'
    //         });
    //     }
    //     pass = md5(pass);
    //     if (pass !== user.pass) {
    //         return res.render('sign/signin', {
    //             error: '密码错误。'
    //         });
    //     }
    //     if (!user.active) {
    //         res.render('sign/signin', {
    //             error: '此帐号还没有被激活。'
    //         });
    //         return;
    //     }
    //     // store session cookie
    //     gen_session(user, res);
    //     //check at some page just jump to home page 
    //     var refer = req.session._loginReferer || 'home';
    //     for (var i = 0, len = notJump.length; i != len; ++i) {
    //         if (refer.indexOf(notJump[i]) >= 0) {
    //             refer = 'home';
    //             break;
    //         }
    //     }
    //     res.redirect(refer);
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