// /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
// /*  Route to handle root element: return uri's for available resources & note on authentication   */
// /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

'use strict';

const sample = require('../models/sample.model');

const router = require('koa-router')(); // router middleware for koa
// import * as Router from "koa-router";
// const router: Router = new Router();

router.get('/', sample.sampleFunction);
router.get('/json', sample.sampleJson);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

module.exports = router.middleware();
