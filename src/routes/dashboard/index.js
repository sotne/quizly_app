const MainDahsboardRouter = require('express').Router();

MainDahsboardRouter.route('/')
    .get(require('./dashboard.view'))

module.exports = MainDahsboardRouter