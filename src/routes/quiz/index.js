const QuizdashboardRouter = require('express').Router();

QuizdashboardRouter.route('/create')
    .get(require('./editor'))
    .post(require('./create'))

module.exports = QuizdashboardRouter;