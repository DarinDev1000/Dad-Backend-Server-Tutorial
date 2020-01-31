// /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
// /*  Route to handle root element: return uri's for available resources & note on authentication   */
// /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

'use strict';

const users = require('../models/users.model');

const router = require('koa-router')(); // router middleware for koa
// import * as Router from "koa-router";
// const router: Router = new Router();

router.get('/users/get', users.getUsers);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.middleware();
