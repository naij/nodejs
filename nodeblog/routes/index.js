/*
 * route
 * Copyright(c) 2012
 */

/**
 * Module dependencies.
 */

var site = require('../controllers/site');

module.exports = function (app) {
  // home page
  app.get('/', site.index);
};
