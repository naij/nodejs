/**
 * config
 */

var path = require('path');

exports.config = {
    debug: true,
    name: '记事本',
    description: 'My Blog',
    version: '0.1',

    db: 'mongodb://127.0.0.1/test',
    session_secret: 'node_blog',
  	auth_cookie_name: 'node_blog',

  	// admin 管理员权限
  	admins: { admin: true }
};