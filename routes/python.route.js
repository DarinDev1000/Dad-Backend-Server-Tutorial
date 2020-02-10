// /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
// /*  Route to handle root element: return uri's for available resources & note on authentication   */
// /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

'use strict';

const python = require('../models/python.model');

const router = require('koa-router')(); // router middleware for koa
// import * as Router from "koa-router";
// const router: Router = new Router();

router.get('/python/test', python.testFunction);
// router.post('/python/add', users.addUser);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.middleware();
